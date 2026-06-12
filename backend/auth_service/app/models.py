from sqlalchemy import Column, Integer, String, Boolean, Enum as SqlEnum
from .database import Base
import enum

class UserRole(str, enum.Enum):
    admin = "admin"
    hanicar_team = "hanicar_team"
    user = "user"

class PlanType(str, enum.Enum):
    free = "free"
    pro = "pro"
    enterprise = "enterprise"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    role = Column(SqlEnum(UserRole), default=UserRole.user, nullable=False)
    plan = Column(SqlEnum(PlanType), default=PlanType.free, nullable=False)
    is_active = Column(Boolean, default=True)
