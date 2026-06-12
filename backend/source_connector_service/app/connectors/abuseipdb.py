import os
import httpx
from typing import List, Dict, Any


async def fetch_iocs() -> List[Dict[str, Any]]:
    api_key = os.getenv("ABUSEIPDB_API_KEY")
    if not api_key:
        return []

    url = "https://api.abuseipdb.com/api/v2/blacklist"
    headers = {"Key": api_key, "Accept": "application/json"}
    params = {"confidenceMinimum": 90, "limit": 100}

    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(
                url, headers=headers, params=params, timeout=30.0
            )
            resp.raise_for_status()
            data = resp.json()
        except Exception as e:
            print(f"AbuseIPDB fetch error: {e}")
            return []

    iocs = []
    for item in data.get("data", []):
        iocs.append({
            "type": "ip",
            "value": item["ipAddress"],
            "source": "abuseipdb",
            "threat_level": "high",
            "tags": "abuse,blacklist",
            "description": f"AbuseIPDB confidence: {item['abuseConfidenceScore']}%"
        })
    return iocs