from sqlalchemy.orm import Session
from . import models


def create_ioc(db: Session, ioc):
    db_ioc = models.IOC(**ioc.model_dump())
    db.add(db_ioc)
    db.commit()
    db.refresh(db_ioc)
    return db_ioc


def get_iocs(db: Session, skip=0, limit=100, ioc_type=None, source=None):
    query = db.query(models.IOC)
    if ioc_type:
        query = query.filter(models.IOC.type == ioc_type)
    if source:
        sources = source.split(",")
        query = query.filter(models.IOC.source.in_(sources))
    return query.offset(skip).limit(limit).all()


def get_ioc_by_value(db: Session, value: str):
    return db.query(models.IOC).filter(
        models.IOC.value == value
    ).first()