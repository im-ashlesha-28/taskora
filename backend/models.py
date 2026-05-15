from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, nullable=True)
    estimated_time = Column(Integer)  # in minutes
    energy_level = Column(Integer)   # 1-5
    mental_load = Column(Integer)    # 1-5
    priority = Column(Integer)       # 1-3 (1: Low, 2: Medium, 3: High)
    status = Column(String, default="pending")  # pending, completed, postponed
    postpone_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    due_date = Column(DateTime, nullable=True)

    reflections = relationship("Reflection", back_populates="task")

class Reflection(Base):
    __tablename__ = "reflections"

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey("tasks.id"))
    actual_time_taken = Column(Integer)  # in minutes
    perceived_difficulty = Column(Integer) # 1-5
    reflection_text = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    task = relationship("Task", back_populates="reflections")
