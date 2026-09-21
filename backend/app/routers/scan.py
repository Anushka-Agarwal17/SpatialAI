from fastapi import APIRouter, UploadFile, File

from app.models.schemas import ScanResult
from app.services import vision

router = APIRouter()


@router.post("/", response_model=ScanResult)
async def scan_room(image: UploadFile = File(...)):
    """
    Accepts a single photo (with a reference object such as an A4 sheet
    in frame) and returns estimated room dimensions.

    Swap the body of `vision.estimate_dimensions` for your trained
    YOLO model + scale-calculation logic.
    """
    image_bytes = await image.read()
    result = vision.estimate_dimensions(image_bytes)
    return result