from fastapi import FastAPI, Query
from .config import THREAT_SOURCES, PLAN_SOURCES, THREAT_INTEL_SERVICE_URL
import httpx
import logging


app = FastAPI(
    title="H-Trace Source Connector Service",
    version="1.0.0"
)

logging.basicConfig(level=logging.INFO)


@app.get("/sources")
def get_available_sources(plan: str = Query("free")):
    allowed = PLAN_SOURCES.get(plan, [])
    return {s: THREAT_SOURCES[s] for s in allowed if s in THREAT_SOURCES}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/fetch")
async def fetch_and_store(plan: str = "free"):
    allowed = PLAN_SOURCES.get(plan, [])
    results = []
    async with httpx.AsyncClient() as client:
        for source_name in allowed:
            try:
                mock_ioc = {
                    "type": "domain",
                    "value": f"{source_name}-malware.tn",
                    "source": source_name,
                    "threat_level": "medium",
                    "tags": "demo,source-connector",
                    "description": f"Automated fetch from {source_name}"
                }
                resp = await client.post(
                    f"{THREAT_INTEL_SERVICE_URL}/iocs",
                    json=mock_ioc
                )
                results.append({source_name: resp.status_code})
            except Exception as e:
                results.append({source_name: str(e)})
    return {"fetch_results": results}