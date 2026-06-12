import os

AUTH_SERVICE_URL = os.getenv(
    "AUTH_SERVICE_URL",
    "http://auth_service:8001"
)
THREAT_INTEL_SERVICE_URL = os.getenv(
    "THREAT_INTEL_SERVICE_URL",
    "http://threat_intel_service:8002"
)
SOURCE_CONNECTOR_SERVICE_URL = os.getenv(
    "SOURCE_CONNECTOR_SERVICE_URL",
    "http://source_connector_service:8003"
)
SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "super-secret-key-change-in-production"
)
ALGORITHM = "HS256"

REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379")

# Rate limits: requests per minute
RATE_LIMITS = {
    "free": 10,
    "pro": 60,
    "enterprise": 600
}
