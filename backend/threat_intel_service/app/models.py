from sqlalchemy import (
    Column, Integer, String, DateTime, Enum as SqlEnum, Float
)
from sqlalchemy.sql import func
from .database import Base
import enum


class IOCType(str, enum.Enum):
    ip = "ip"
    domain = "domain"
    url = "url"
    hash = "hash"
    email = "email"


class ThreatLevel(str, enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"


class IOC(Base):
    __tablename__ = "iocs"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(SqlEnum(IOCType), nullable=False)
    value = Column(String, nullable=False, index=True)
    source = Column(String, default="manual")
    threat_level = Column(SqlEnum(ThreatLevel),
                          default=ThreatLevel.medium)
    tags = Column(String)
    description = Column(String)
    first_seen = Column(DateTime(timezone=True),
                        server_default=func.now())
    last_seen = Column(DateTime(timezone=True),
                       server_default=func.now(),
                       onupdate=func.now())
    confidence = Column(Float, default=50.0)
