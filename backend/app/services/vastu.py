"""
Vastu Shastra is rule-based, not something to leave to an LLM to guess —
encode the actual principles here as explicit rules.

This is a starting skeleton; expand with real Vastu references for
each room purpose (direction, placement, do's and don'ts).
"""
from app.models.schemas import RoomProfile

RULES_BY_PURPOSE = {
    "bedroom": [
        "Place the bed so the head points south or east while sleeping.",
        "Avoid placing a mirror directly facing the bed.",
    ],
    "hospital_ward": [
        "Beds are best oriented with the head towards the south.",
        "Keep the entrance in the north or east for better airflow and light.",
    ],
    "living_room": [
        "The living room works best in the north, east, or north-east of the plot.",
    ],
}


def check(profile: RoomProfile) -> list[str]:
    return RULES_BY_PURPOSE.get(
        profile.purpose,
        ["No Vastu rules defined yet for this room purpose."],
    )