import os

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://htrace:htrace_secret@postgres_threats/threats"
)
ELASTICSEARCH_URL = os.getenv(
    "ELASTICSEARCH_URL",
    "http://elasticsearch:9200"
)