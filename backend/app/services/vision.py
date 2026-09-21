"""
Vision service.

Plug in here:
  1. Run YOLO (Ultralytics) on the uploaded image to detect walls,
     doors, windows, and the reference object (e.g. an A4 sheet).
  2. Compute the pixel-to-real-world scale from the reference object's
     known physical size vs. its detected pixel size.
  3. Convert detected wall/corner pixel distances to metres using
     that scale.

For now this returns a fixed placeholder so the API contract is
usable while the model is being trained.
"""
from app.models.schemas import ScanResult


def estimate_dimensions(image_bytes: bytes) -> ScanResult:
    # TODO: replace with real YOLO inference + scale calculation
    return ScanResult(
        width_m=4.1,
        length_m=3.4,
        height_m=2.9,
        doors_detected=1,
        windows_detected=1,
        reference_object="A4 sheet",
        confidence=0.92,
    )