from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from .models import IOCType, ThreatLevel


class IOCBase(BaseModel):
    type: IOCType
    value: str
    source: Optional[str] = "manual"
    threat_level: Optional[ThreatLevel] = ThreatLevel.medium
    tags: Optional[str] = None
    description: Optional[str] = None
    confidence: Optional[float] = 50.0


class IOCCreate(IOCBase):
    pass


class IOCOut(IOCBase):
    id: int
    first_seen: datetime
    last_seen: datetime

    class Config:
        from_attributes = True
