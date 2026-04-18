from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse, FileResponse
import httpx
import uvicorn

app = FastAPI()

# Base URL for your Spring Boot service
BASE_URL = "http://localhost:8080"

@app.get("/login-form", response_class=FileResponse)
async def login_form_page():
    return "login.html"

@app.get("/token_display.html", response_class=FileResponse)
async def token_display_page():
    return "token_display.html"

@app.post("/authenticate")
async def authenticate(username: str = Form(), password: str = Form(), state: str = Form(), callback: str = Form()):
    async with httpx.AsyncClient() as client:
        payload = {"username": username, "password": password}
        res = await client.post(f"{BASE_URL}/api/auth/authenticate", json=payload)

        if res.status_code == 200:
            token = res.json().get("token")
            # On success, redirect to the display page with the token in the URL
            return RedirectResponse(url=f"{callback}?token={token}&state={state}", status_code=303)
        else:
            return HTMLResponse(content=f"<h1>Login Failed</h1><p>{res.text}</p>", status_code=res.status_code)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
