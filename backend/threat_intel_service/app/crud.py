from sqlalchemy.orm import Session
from . import models, schemas

def create_ioc(db: Session, ioc: schemas.IOCCreate):
    db_ioc = models.IOC(**ioc.model_dump())
    db.add(db_ioc)
    db.commit()
    db.refresh(db_ioc)
    return db_ioc

def get_iocs(db: Session, skip: int = 0, limit: int = 100, ioc_type: str = None):
    query = db.query(models.IOC)
    if ioc_type:
        query = query.filter(models.IOC.type == ioc_type)
    return query.offset(skip).limit(limit).all()

def get_ioc_by_value(db: Session, value: str):
    return db.query(models.IOC).filter(models.IOC.value == value).first()
