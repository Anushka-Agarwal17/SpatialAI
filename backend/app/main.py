"""
Aangan API — entrypoint.

Run locally:
    uvicorn app.main:app --reload
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import scan, plan, sourcing

app = FastAPI(
    title="Aangan API",
    description="Room/plot scanning, layout suggestion, and sourcing API.",
    version="0.1.0",
)

# Wide-open CORS for the college-project demo stage.
# Tighten this to your deployed frontend origin before sharing the link publicly.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(scan.router, prefix="/scan", tags=["scan"])
app.include_router(plan.router, prefix="/plan", tags=["plan"])
app.include_router(sourcing.router, prefix="/sourcing", tags=["sourcing"])


@app.get("/health")
def health():
    return {"status": "ok"}