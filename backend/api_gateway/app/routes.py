from fastapi import Request, Depends, HTTPException
from fastapi.routing import APIRouter
import httpx
from .config import AUTH_SERVICE_URL, THREAT_INTEL_SERVICE_URL
from .dependencies import get_current_user

router = APIRouter()

# Proxy to auth service (no auth required – auth endpoints handle their own)
@router.api_route("/auth/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def proxy_auth(request: Request, path: str):
    async with httpx.AsyncClient() as client:
        body = await request.body()
        headers = {k: v for k, v in request.headers.items() if k != "host"}
        url = f"{AUTH_SERVICE_URL}/auth/{path}"
        resp = await client.request(
            method=request.method,
            url=url,
            content=body,
            headers=headers,
        )
        # Return raw response if not JSON
        if resp.headers.get("content-type") == "application/json":
            return resp.json()
        return resp.text

# Proxy to threat intel (requires authentication)
@router.api_route("/threats/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def proxy_threats(request: Request, path: str, user = Depends(get_current_user)):
    async with httpx.AsyncClient() as client:
        body = await request.body()
        headers = {k: v for k, v in request.headers.items() if k != "host"}
        headers["X-User-Email"] = user["email"]
        headers["X-User-Role"] = user["role"]
        url = f"{THREAT_INTEL_SERVICE_URL}/{path}"
        resp = await client.request(
            method=request.method,
            url=url,
            content=body,
            headers=headers,
        )
        if resp.headers.get("content-type") == "application/json":
            return resp.json()
        return resp.text

@router.get("/health")
def health():
    return {"status": "ok", "gateway": "running"}
