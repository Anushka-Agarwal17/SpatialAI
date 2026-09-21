from fastapi import APIRouter, Query

from app.models.schemas import ShopResult
from app.services import shops

router = APIRouter()


@router.get("/", response_model=list[ShopResult])
def nearby_shops(item: str = Query(..., description="e.g. 'wardrobe'"),
                  lat: float = Query(...),
                  lon: float = Query(...)):
    """
    Returns nearby shops for a given furniture/decor item using
    OpenStreetMap's free Overpass API (no billing account needed).
    """
    return shops.search_nearby(item=item, lat=lat, lon=lon)