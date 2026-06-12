import asyncio
import importlib
from fastapi import FastAPI, Query
from .config import (
    ENABLED_SOURCES,
    SOURCE_CONFIGS,
    PLAN_SOURCES,
    THREAT_INTEL_SERVICE_URL,
    FETCH_INTERVAL
)
import httpx
import logging


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="H-Trace Source Connector Service",
    version="1.0.0"
)


async def fetch_all_sources():
    """Fetch IOCs from all enabled sources and push to Threat Intel."""
    logger.info("Starting full fetch cycle...")
    for source_name in ENABLED_SOURCES:
        config = SOURCE_CONFIGS.get(source_name)
        if not config:
            continue
        try:
            module = importlib.import_module(
                f".connectors.{config['connector']}",
                package="app"
            )
            iocs = await module.fetch_iocs()
            logger.info(
                f"Fetched {len(iocs)} IOCs from {source_name}"
            )
            async with httpx.AsyncClient() as client:
                for ioc in iocs:
                    try:
                        await client.post(
                            f"{THREAT_INTEL_SERVICE_URL}/iocs",
                            json=ioc,
                            timeout=10.0
                        )
                    except Exception as e:
                        logger.error(f"Push IOC error: {e}")
        except Exception as e:
            logger.error(f"Source {source_name} error: {e}")


async def background_fetcher():
    """Periodic background fetch."""
    while True:
        await fetch_all_sources()
        await asyncio.sleep(FETCH_INTERVAL)


@app.on_event("startup")
async def startup_event():
    asyncio.create_task(background_fetcher())


@app.get("/sources")
def get_available_sources(plan: str = Query("free")):
    allowed = PLAN_SOURCES.get(plan, [])
    return {
        s: SOURCE_CONFIGS[s]["api_url"]
        for s in allowed if s in SOURCE_CONFIGS
    }


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/fetch")
async def manual_fetch(plan: str = "free"):
    """Manual trigger – only for allowed sources based on plan."""
    allowed = PLAN_SOURCES.get(plan, [])
    results = []
    async with httpx.AsyncClient() as client:
        for source_name in allowed:
            config = SOURCE_CONFIGS.get(source_name)
            if not config:
                continue
            try:
                module = importlib.import_module(
                    f".connectors.{config['connector']}",
                    package="app"
                )
                iocs = await module.fetch_iocs()
                count = 0
                for ioc in iocs:
                    try:
                        resp = await client.post(
                            f"{THREAT_INTEL_SERVICE_URL}/iocs",
                            json=ioc,
                            timeout=10.0
                        )
                        if resp.status_code == 201:
                            count += 1
                    except Exception:
                        pass
                results.append(
                    {source_name: f"pushed {count} new IOCs"}
                )
            except Exception as e:
                results.append({source_name: str(e)})
    return {"fetch_results": results}
    