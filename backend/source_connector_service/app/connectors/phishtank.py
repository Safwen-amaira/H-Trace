import os
import httpx
from typing import List, Dict, Any


async def fetch_iocs() -> List[Dict[str, Any]]:
    api_key = os.getenv("PHISHTANK_API_KEY")
    if not api_key:
        return []

    url = "http://data.phishtank.com/data/online-valid.json"
    # PhishTank API can use a key parameter
    params = {"format": "json", "app_key": api_key}

    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(
                url, params=params, timeout=30.0
            )
            resp.raise_for_status()
            data = resp.json()
        except Exception as e:
            print(f"PhishTank fetch error: {e}")
            return []

    iocs = []
    for item in data[:100]:
        iocs.append({
            "type": "url",
            "value": item["url"],
            "source": "phishtank",
            "threat_level": "medium",
            "tags": "phishing,phishtank",
            "description": "PhishTank verified phishing site"
        })
    return iocs

    