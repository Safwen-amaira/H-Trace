import httpx
from typing import List, Dict, Any


async def fetch_iocs() -> List[Dict[str, Any]]:
    url = "https://urlhaus-api.abuse.ch/v1/urls/recent/"

    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(url, timeout=30.0)
            resp.raise_for_status()
            data = resp.json()
        except Exception as e:
            print(f"URLhaus fetch error: {e}")
            return []

    iocs = []
    for entry in data.get("urls", [])[:100]:
        iocs.append({
            "type": "url",
            "value": entry["url"],
            "source": "urlhaus",
            "threat_level": "medium",
            "tags": "malware,urlhaus",
            "description": f"URLhaus malware URL: {entry.get('threat', 'unknown')}"
        })
    return iocs
    