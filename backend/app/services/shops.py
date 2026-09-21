"""
Nearby-shop lookup using OpenStreetMap's Overpass API — completely
free, no billing account or API key required.

This is a minimal example query; refine the OSM tags per item type
(furniture store, hardware store, etc.) as you build this out.
"""
import requests

from app.models.schemas import ShopResult

OVERPASS_URL = "https://overpass-api.de/api/interpreter"


def search_nearby(item: str, lat: float, lon: float, radius_m: int = 5000) -> list[ShopResult]:
    query = f"""
    [out:json];
    (
      node["shop"="furniture"](around:{radius_m},{lat},{lon});
      node["shop"="doityourself"](around:{radius_m},{lat},{lon});
    );
    out center 10;
    """
    try:
        resp = requests.post(OVERPASS_URL, data={"data": query}, timeout=10)
        resp.raise_for_status()
        elements = resp.json().get("elements", [])
    except requests.RequestException:
        elements = []

    results = []
    for el in elements:
        tags = el.get("tags", {})
        results.append(ShopResult(
            name=tags.get("name", "Unnamed shop"),
            address=tags.get("addr:street", "Address not available"),
        ))
    return results