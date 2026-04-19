from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse, FileResponse
import httpx
import uvicorn
import os

app = FastAPI()

# Base URL for the Spring Boot backend - use env var for Docker, fallback to localhost
BASE_URL = os.getenv("BACKEND_URL", "http://localhost:8080")

@app.get("/health")
async def health():
    return {"status": "UP"}

# Serve the static login form
@app.get("/login-form", response_class=FileResponse)
async def login_form_page():
    return "login.html"

# Serve the static page that displays the token
@app.get("/token-display", response_class=FileResponse)
async def token_display_page():
    return "token_display.html"

# Handle the form submission from login.html
@app.post("/authenticate")
async def authenticate(username: str = Form(), password: str = Form()):
    """Authenticates against the backend and redirects to display the token."""
    async with httpx.AsyncClient() as client:
        payload = {"username": username, "password": password}
        res = await client.post(f"{BASE_URL}/api/auth/authenticate", json=payload)

        if res.status_code == 200:
            token = res.json().get("token")
            # Redirect to the display page, passing the token in the URL
            return RedirectResponse(url=f"/token-display?token={token}", status_code=303)
        else:
            # If login fails, show an error page
            return HTMLResponse(content=f"<h1>Login Failed</h1><p>{res.text}</p>", status_code=res.status_code)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
