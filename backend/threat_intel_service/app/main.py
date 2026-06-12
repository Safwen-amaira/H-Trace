from fastapi import FastAPI, Depends, HTTPException, Query
from .database import engine, SessionLocal
from . import models, schemas, crud
from typing import List, Optional


models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="H-Trace Threat Intel Service", version="1.0.0")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/iocs", response_model=schemas.IOCOut, status_code=201)
def create_ioc(ioc: schemas.IOCCreate, db=Depends(get_db)):
    existing = crud.get_ioc_by_value(db, ioc.value)
    if existing:
        raise HTTPException(status_code=400, detail="IOC already exists")
    return crud.create_ioc(db=db, ioc=ioc)


@app.get("/iocs", response_model=List[schemas.IOCOut])
def read_iocs(
    skip: int = 0,
    limit: int = 100,
    ioc_type: Optional[str] = Query(None, alias="type"),
    db=Depends(get_db)
):
    iocs = crud.get_iocs(
        db, skip=skip, limit=limit, ioc_type=ioc_type
    )
    return iocs


@app.get("/health")
def health():
    return {"status": "ok"}