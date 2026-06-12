import os
import json

RAW_SOURCES = os.getenv(
    "THREAT_SOURCES",
    '{"openioc":"https://openioc.example.com/api",'
    '"phishtank":"https://phishtank.example.com/api"}'
)
THREAT_SOURCES = json.loads(RAW_SOURCES)

PLAN_SOURCES = {
    "free": ["openioc"],
    "pro": ["openioc", "phishtank"],
    "enterprise": list(THREAT_SOURCES.keys())
}

THREAT_INTEL_SERVICE_URL = os.getenv(
    "THREAT_INTEL_SERVICE_URL",
    "http://threat_intel_service:8002"
)
REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379")
FETCH_INTERVAL = int(os.getenv("FETCH_INTERVAL", "3600"))