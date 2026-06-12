import time
from fastapi import HTTPException, Request
from .redis_client import redis_client
from .config import RATE_LIMITS


async def check_rate_limit(request: Request, user: dict):
    plan = user.get("plan", "free")
    limit = RATE_LIMITS.get(plan, 10)
    key = f"rate_limit:{user['email']}:{int(time.time() / 60)}"

    current = redis_client.get(key)
    if current is None:
        redis_client.setex(key, 60, 1)
    else:
        if int(current) >= limit:
            raise HTTPException(
                status_code=429,
                detail=f"Rate limit exceeded for {plan} plan"
            )
        redis_client.incr(key)

    daily_key = f"daily_requests:{user['email']}:{time.strftime('%Y-%m-%d')}"
    redis_client.incr(daily_key)
    redis_client.expire(daily_key, 86400)
