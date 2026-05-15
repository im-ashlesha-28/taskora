from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    estimated_time: int
    energy_level: int
    mental_load: int
    priority: int
    due_date: Optional[datetime] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    estimated_time: Optional[int] = None
    energy_level: Optional[int] = None
    mental_load: Optional[int] = None
    priority: Optional[int] = None
    status: Optional[str] = None
    postpone_count: Optional[int] = None
    due_date: Optional[datetime] = None

class Task(TaskBase):
    id: int
    status: str
    postpone_count: int
    created_at: datetime

    class Config:
        from_attributes = True

class ReflectionBase(BaseModel):
    task_id: int
    actual_time_taken: int
    perceived_difficulty: int
    reflection_text: Optional[str] = None

class ReflectionCreate(ReflectionBase):
    pass

class Reflection(ReflectionBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class RecommendationRequest(BaseModel):
    current_energy: int
    available_time: int

class RecommendationResponse(BaseModel):
    task: Task
    score: float
    explanation: str

class AnalyticsSummary(BaseModel):
    total_tasks: int
    completed_tasks: int
    postponed_tasks: int
    average_estimation_error: float
    most_postponed_tasks: List[Task]
