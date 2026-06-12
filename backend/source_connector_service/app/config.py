import os
import json
from dotenv import load_dotenv

load_dotenv()  # Load .env from the current working directory

# List of enabled source identifiers
RAW_SOURCES = os.getenv("THREAT_SOURCES", '[]')
ENABLED_SOURCES = json.loads(RAW_SOURCES)

# Source configuration
SOURCE_CONFIGS = {
    "abuseipdb": {
        "api_url": "https://api.abuseipdb.com/api/v2/blacklist",
        "api_key_env": "ABUSEIPDB_API_KEY",
        "connector": "abuseipdb"
    },
    "urlhaus": {
        "api_url": "https://urlhaus-api.abuse.ch/v1/urls/recent/",
        "api_key_env": None,
        "connector": "urlhaus"
    },
    "phishtank": {
        "api_url": "http://data.phishtank.com/data/online-valid.json",
        "api_key_env": "PHISHTANK_API_KEY",
        "connector": "phishtank"
    }
}

# Which sources are available per plan
PLAN_SOURCES = {
    "free": ["urlhaus"],
    "pro": ["urlhaus", "abuseipdb"],
    "enterprise": ENABLED_SOURCES  # all enabled sources
}

THREAT_INTEL_SERVICE_URL = os.getenv(
    "THREAT_INTEL_SERVICE_URL",
    "http://threat_intel_service:8002"
)
REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379")
FETCH_INTERVAL = int(os.getenv("FETCH_INTERVAL", "3600"))