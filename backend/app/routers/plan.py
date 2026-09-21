from fastapi import APIRouter

from app.models.schemas import RoomProfile, LayoutSuggestion
from app.services import vastu

router = APIRouter()


@router.post("/", response_model=LayoutSuggestion)
def suggest_layout(profile: RoomProfile):
    """
    Given a room's measurements + stated purpose, return a furniture
    layout suggestion checked against Vastu rules.
    """
    vastu_notes = vastu.check(profile)

    # Placeholder layout logic — replace with your actual suggestion
    # engine (rule-based or model-based) once the scan pipeline is solid.
    furniture_items = _default_furniture_for(profile.purpose)

    return LayoutSuggestion(
        summary=f"Suggested layout for a {profile.purpose.replace('_', ' ')} "
                f"({profile.scan.width_m}m x {profile.scan.length_m}m).",
        vastu_notes=vastu_notes,
        furniture_items=furniture_items,
    )


def _default_furniture_for(purpose: str) -> list[str]:
    catalog = {
        "bedroom": ["bed", "wardrobe", "study table", "bedside lamp"],
        "hospital_ward": ["hospital bed", "IV stand", "visitor chair", "storage cabinet"],
        "living_room": ["sofa set", "coffee table", "TV unit", "bookshelf"],
    }
    return catalog.get(purpose, ["furniture list not yet defined for this purpose"])