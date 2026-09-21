from typing import Optional
from pydantic import BaseModel


class ScanResult(BaseModel):
    width_m: float
    length_m: float
    height_m: Optional[float] = None
    doors_detected: int
    windows_detected: int
    reference_object: str
    confidence: float  # 0-1


class RoomProfile(BaseModel):
    scan: ScanResult
    purpose: str  # e.g. "bedroom", "hospital_ward", "lobby"
    is_renovation: bool = False  # False = bare plot/empty room, True = has existing furniture


class LayoutSuggestion(BaseModel):
    summary: str
    vastu_notes: list[str]
    furniture_items: list[str]


class ShopResult(BaseModel):
    name: str
    address: str
    distance_km: Optional[float] = None
    url: Optional[str] = None