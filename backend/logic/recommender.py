from datetime import datetime
import sys
import os

# Add parent directory to path to allow importing models
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import models

def calculate_score(task, current_energy: int, available_time: int):
    score = 0.0
    explanation_parts = []

    # 1. Energy Match (+3 if exact match, lower if not)
    if task.energy_level <= current_energy:
        score += 3
        explanation_parts.append("Fits your current energy level ✨")
    else:
        # Penalize thinking-heavy tasks during low energy
        if task.mental_load >= 4 and current_energy <= 2:
            score -= 3
            explanation_parts.append("Might be too heavy for your energy right now ☁️")
        else:
            score -= 1

    # 2. Time Fit (+3 if fits)
    if task.estimated_time <= available_time:
        score += 3
        if task.estimated_time <= 15:
            explanation_parts.append("Quick task for your available time 🌸")
        else:
            explanation_parts.append("Fits well within your available time ⏳")
    else:
        score -= 2

    # 3. Priority
    if task.priority == 3: # High
        score += 2
        explanation_parts.append("High priority task 🌟")
    elif task.priority == 2: # Medium
        score += 1
    
    # 4. Postpone Count
    if task.postpone_count >= 3:
        score -= 2
        explanation_parts.append("This has been postponed a few times, maybe break it down? 🌿")
    
    # 5. Overdue
    if task.due_date and task.due_date < datetime.utcnow():
        score -= 2
        explanation_parts.append("This is slightly overdue, but we can handle it gently 🍃")

    # Combine explanations
    explanation = " | ".join(explanation_parts) if explanation_parts else "A good balanced choice for now."
    
    return score, explanation

def get_recommendations(tasks: list, current_energy: int, available_time: int):
    scored_tasks = []
    for task in tasks:
        if task.status != "pending":
            continue
            
        score, explanation = calculate_score(task, current_energy, available_time)
        scored_tasks.append({
            "task": task,
            "score": score,
            "explanation": explanation
        })
    
    # Sort by score descending
    scored_tasks.sort(key=lambda x: x["score"], reverse=True)
    return scored_tasks
