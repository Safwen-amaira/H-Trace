from fastapi import Request, Depends, HTTPException
from fastapi.routing import APIRouter
import httpx
from .config import (
    AUTH_SERVICE_URL,
    THREAT_INTEL_SERVICE_URL,
    SOURCE_CONNECTOR_SERVICE_URL,
    PLAN_SOURCES
)
from .dependencies import get_current_user
from .rate_limiter import check_rate_limit


router = APIRouter()


@router.api_route(
    "/auth/{path:path}",
    methods=["GET", "POST", "PUT", "DELETE"]
)
async def proxy_auth(request: Request, path: str):
    async with httpx.AsyncClient() as client:
        body = await request.body()
        headers = {
            k: v for k, v in request.headers.items() if k != "host"
        }
        url = f"{AUTH_SERVICE_URL}/auth/{path}"
        resp = await client.request(
            method=request.method,
            url=url,
            content=body,
            headers=headers,
        )
        if resp.headers.get("content-type") == "application/json":
            return resp.json()
        return resp.text


@router.api_route(
    "/threats/{path:path}",
    methods=["GET", "POST", "PUT", "DELETE"]
)
async def proxy_threats(
    request: Request,
    path: str,
    user=Depends(get_current_user)
):
    await check_rate_limit(request, user)
    plan = user.get("plan", "free")

    async with httpx.AsyncClient() as client:
        body = await request.body()
        headers = {
            k: v for k, v in request.headers.items() if k != "host"
        }
        headers["X-User-Email"] = user["email"]
        headers["X-User-Role"] = user["role"]
        headers["X-User-Plan"] = plan

        if path == "sources":
            url = f"{SOURCE_CONNECTOR_SERVICE_URL}/sources"
            resp = await client.get(
                url, params={"plan": plan}
            )
            return resp.json()

        if request.method == "GET" and path == "iocs":
            allowed = PLAN_SOURCES.get(plan, [])
            if allowed:
                query_params = dict(request.query_params)
                query_params["source"] = ",".join(allowed)
                url = f"{THREAT_INTEL_SERVICE_URL}/iocs"
                resp = await client.get(url, params=query_params)
                return resp.json()

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


@router.api_route(
    "/admin/{path:path}",
    methods=["GET", "POST", "PUT", "DELETE"]
)
async def proxy_admin(
    request: Request,
    path: str,
    user=Depends(get_current_user)
):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    async with httpx.AsyncClient() as client:
        body = await request.body()
        headers = {
            k: v for k, v in request.headers.items() if k != "host"
        }
        url = f"{AUTH_SERVICE_URL}/admin/{path}"
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
