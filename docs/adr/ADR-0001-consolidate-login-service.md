# ADR-0001: Consolidate the Python Login Service

**Status:** Proposed
**Date:** 2026-04-19
**Deciders:** Veera (tech lead), backend maintainers, MCP server maintainer
**Related code:**
- `services/login/login-service/main.py` (FastAPI, port 8001)
- `services/backend/src/main/java/com/example/financemanager/auth/` (Spring Boot, port 8080)
- `services/backend/src/main/java/com/example/financemanager/security/JwtService.java`

## Context

The repo currently runs two services that both sit on the auth critical path:

1. **Spring Boot backend (`:8080`)** — owns the user table, `PasswordEncoder` (BCrypt),
   `AuthenticationManager`, `JwtService` (token signing/verification) and exposes
   `POST /api/auth/register` and `POST /api/auth/authenticate`. This is where the real
   authentication logic lives.

2. **Python login service (`:8001`)** — ~30 lines of FastAPI. It serves a static
   `login.html` form and a `token_display.html` page, accepts a `POST /authenticate`
   form submission (with `username`, `password`, `state`, `callback`), forwards the
   credentials to Spring Boot's `/api/auth/authenticate`, and on success issues an HTTP
   303 redirect to `{callback}?token={jwt}&state={state}`.

The Python service exists because the MCP server needs a browser-based login flow to
obtain a user's JWT before making tool calls against the backend — effectively a
poor-man's OAuth authorization-code flow. Spring Boot today only exposes a JSON API,
not an HTML login page.

### Forces at play
- **Duplication of responsibility.** Two services speak "auth", one in Java and one in
  Python. Credentials transit both. A bug in either breaks login.
- **Security surface area.** Passwords are posted in plaintext form to port 8001, then
  re-serialized as JSON to port 8080. Two TLS configurations to get right, two rate
  limits to maintain, two audit logs to correlate.
- **Operational cost.** An extra process, image, port, health check, and CI test suite
  for what is currently a redirect wrapper.
- **Hardcoded coupling.** `BASE_URL = "http://localhost:8080"` is baked into `main.py`,
  and there is no env-var override. Works for dev, will not work in Docker Compose or
  k8s without changes.
- **Monorepo reality.** From `CLAUDE.md`, this is a mono-repo with atomic commits
  across services — the cross-service boundary is artificial, not organizational.
- **Valid underlying need.** The MCP server genuinely does need a browser-visible
  login + callback redirect; that is not something the current Spring Boot JSON API
  provides out of the box.

## Decision

**Consolidate the login HTML + OAuth-style callback flow into the Spring Boot backend,
and retire the separate Python login service.** Spring Boot will serve the login page
and the `/authorize → /authenticate → redirect-with-token` flow directly, using
Spring Security's built-in form-login + authorization-server support. The MCP server
continues to point at the same callback URLs; only the hostname/port change.

## Options Considered

### Option A: Status quo — keep the Python login service
| Dimension | Assessment |
|-----------|------------|
| Complexity | Medium — two runtimes, two test suites |
| Cost | Extra container, port 8001, duplicate health checks |
| Scalability | Fine at current scale; bottleneck is Spring Boot anyway |
| Team familiarity | Mixed — Python and Java both required |
| Security | Larger attack surface; credentials transit two hops |
| Effort to adopt | Zero |

**Pros:** No migration work. Clear separation of the "browser-facing OAuth adapter"
from the JSON API. Easy to swap later for Keycloak.
**Cons:** Duplication without a real boundary. Hardcoded `localhost:8080`. No tests
visible for `login-service/main.py`. Two languages for one domain. Any change to the
auth response shape (e.g., refresh tokens) requires a coordinated change in both
services.

### Option B: Consolidate into Spring Boot *(recommended)*
| Dimension | Assessment |
|-----------|------------|
| Complexity | Low — Spring Security already handles form login and OAuth2 server flows |
| Cost | One fewer service, port, and Dockerfile |
| Scalability | Same or better (one hop instead of two) |
| Team familiarity | Java/Spring is already the primary backend stack |
| Security | Single choke point; BCrypt, JWT, session, CSRF all in one place |
| Effort to adopt | ~1–2 days: add a `/login` controller serving Thymeleaf (or static) HTML, add `/oauth/authorize` + callback, delete `services/login/` |

**Pros:** One auth owner. One rate-limiter, one audit log, one place to add MFA or
refresh tokens later. Removes the hardcoded `localhost:8080`. Eliminates one language
from the hot path. Fewer moving parts in `docker-compose.yml` and `/start-backend`.
**Cons:** Spring Boot now also owns presentation (a login page). Requires writing the
HTML + callback redirect logic in Java. Breaking change for any external caller of
`:8001` (appears to be only the MCP server — easy to update).

### Option C: Replace with an off-the-shelf identity provider (Keycloak / Auth0 / Cognito)
| Dimension | Assessment |
|-----------|------------|
| Complexity | High — new infra component, realm/client config, OIDC wiring across all 4 services |
| Cost | Free self-host (Keycloak) to paid SaaS tier; plus ops burden if self-hosted |
| Scalability | Excellent; built for this |
| Team familiarity | Low — no signal in the repo that anyone runs Keycloak today |
| Security | Best in class; handled by specialists |
| Effort to adopt | 1–2 weeks to wire up properly |

**Pros:** Future-proof. Gets MFA, social login, password reset, account lockout,
refresh tokens, SCIM, etc. for free. Both Spring Boot and the MCP server become pure
OIDC clients — no custom auth code to maintain.
**Cons:** Large effort for a personal-finance app's current scale. Adds operational
complexity (another thing to run and upgrade). Over-engineering if user count stays
small. Worth reconsidering if this ever adds multi-tenancy, SSO, or B2B customers.

### Option D: Keep the Python service but upgrade it into a real auth gateway
| Dimension | Assessment |
|-----------|------------|
| Complexity | Medium-high — now two real services instead of a shim + core |
| Cost | Still an extra service, but now it earns its keep |
| Scalability | Good |
| Team familiarity | Requires comfort with Python *and* Java |
| Security | Two well-defined components |
| Effort to adopt | ~3–5 days to add real logic (rate limiting, session, OIDC front) |

**Pros:** Clear boundary: Python owns browser/OAuth concerns, Java owns data.
**Cons:** You are building half of Keycloak. Same duplication pain, more code to
maintain. Does not match the monorepo's "atomic commit across services" workflow
(CLAUDE.md explicitly calls this out).

## Trade-off Analysis

The core tension is **single-owner simplicity (B) vs. future-proof-ness (C)**. Option A
is clearly dominated — the Python service as it exists is a 30-line redirect with no
tests and a hardcoded URL; it is not pulling its weight. Option D is worse than A
unless you are sure you want to invest in Python becoming a real auth plane.

Between B and C: the right tiebreaker is **expected future demand on auth**. If the
roadmap is likely to include social login, SSO for enterprise customers, MFA
compliance, or multi-tenant isolation, jump straight to C — the cost of migrating to
Keycloak *later from a custom Java login flow* is roughly the same as the cost of
migrating to Keycloak *now from a Python shim*. If the roadmap is "keep this
personal/small-team for the foreseeable future", B is the simpler, cheaper answer and
does not preclude C later (Spring Security speaks OIDC natively, so bolting Keycloak
on is a config change, not a rewrite).

I recommend **B now, with a revisit trigger** (see Consequences) for C.

## Consequences

**What becomes easier**
- One service owns authentication end-to-end. One audit log, one rate limiter.
- `/start-backend` starts one fewer process; `docker-compose.yml` shrinks.
- No more hardcoded `localhost:8080` — Spring Boot calls itself internally.
- Simpler security review: all password/JWT code lives in one language, one framework.
- Easier to add refresh tokens, password reset, or MFA later — one place to change.

**What becomes harder**
- Spring Boot now owns a small amount of view/HTML code (Thymeleaf template or static
  `login.html` served from `src/main/resources/static/`). Team must be OK with that.
- The MCP server must update `LOGIN_SERVICE_URL` to point at Spring Boot (e.g.,
  `http://localhost:8080/oauth/authorize`). This is a one-line `.env` change plus a
  code update if any paths hard-code `/authenticate`.
- Any future "we want auth written in Python" future is foreclosed without a rewrite.

**What we will need to revisit**
- **Revisit trigger for Option C (Keycloak/OIDC):** any of
  - A requirement for SSO / social login / SAML.
  - A second product or B2B customer needs to share the user pool.
  - MFA becomes a compliance requirement.
  - User count > 10k or login QPS > 50 (neither is a hard limit, but pressure on the
    custom flow becomes real here).

## Action Items

1. [ ] Design the Spring Boot replacement endpoints:
   - `GET /oauth/authorize?state=…&callback=…` → renders `login.html`
   - `POST /oauth/login` → validates creds (reuse `AuthenticationService`), issues
     JWT, 303-redirects to `{callback}?token={jwt}&state={state}`
2. [ ] Port `login.html` and `token_display.html` into `services/backend/src/main/resources/templates/`
   (Thymeleaf) or `static/` if kept as plain HTML.
3. [ ] Add integration tests covering the new flow — bad creds, good creds, missing
   `callback`, CSRF, `state` echo-back.
4. [ ] Update the MCP server's `LOGIN_SERVICE_URL` default and any hardcoded
   `/authenticate` path; add a test.
5. [ ] Update `docker-compose.yml`, `/start-backend`, and `CLAUDE.md` to remove the
   login service. Drop port `8001` from `.env.example`.
6. [ ] Delete `services/login/` in the same commit, with a note pointing to this ADR.
7. [ ] Run `/test-all` with `--coverage`; confirm auth paths hit the 85%+ target the
   old login service held.
8. [ ] Security spot-check: verify BCrypt cost, JWT signing key rotation story, CSRF
   on the new form POST, and that credentials never appear in URL/logs.
9. [ ] Tag a follow-up issue: "Evaluate Keycloak/OIDC when any Option-C revisit
   trigger fires."

## Appendix: What the Python service does today

```python
# services/login/login-service/main.py  (abbreviated)
BASE_URL = "http://localhost:8080"

@app.post("/authenticate")
async def authenticate(username, password, state, callback):
    res = await httpx.post(f"{BASE_URL}/api/auth/authenticate",
                           json={"username": username, "password": password})
    if res.status_code == 200:
        token = res.json()["token"]
        return RedirectResponse(f"{callback}?token={token}&state={state}", 303)
    return HTMLResponse("<h1>Login Failed</h1>…", status_code=res.status_code)
```

That is the entirety of the login service's logic. Spring Security can express the
same flow in a handful of `@Configuration` lines plus one controller — which is why
Option B is the recommended path.
