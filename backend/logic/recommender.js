const calculateScore = (task, currentEnergy, availableTime) => {
  let score = 0.0;
  let explanationParts = [];

  // 1. Energy Match
  if (task.energy_level <= currentEnergy) {
    score += 3;
    explanationParts.push("Fits your current energy level ✨");
  } else {
    if (task.mental_load >= 4 && currentEnergy <= 2) {
      score -= 3;
      explanationParts.push("Might be too heavy for your energy right now ☁️");
    } else {
      score -= 1;
    }
  }

  // 2. Time Fit
  if (task.estimated_time <= availableTime) {
    score += 3;
    if (task.estimated_time <= 15) {
      explanationParts.push("Quick task for your available time 🌸");
    } else {
      explanationParts.push("Fits well within your available time ⏳");
    }
  } else {
    score -= 2;
  }

  // 3. Priority
  if (task.priority === 3) {
    score += 2;
    explanationParts.push("High priority task 🌟");
  } else if (task.priority === 2) {
    score += 1;
  }

  // 4. Postpone Count
  if (task.postpone_count >= 3) {
    score -= 2;
    explanationParts.push("This has been postponed a few times, maybe break it down? 🌿");
  }

  // 5. Overdue
  if (task.due_date && new Date(task.due_date) < new Date()) {
    score -= 2;
    explanationParts.push("This is slightly overdue, but we can handle it gently 🍃");
  }

  return {
    score,
    explanation: explanationParts.length > 0 ? explanationParts.join(" | ") : "A good balanced choice for now."
  };
};

const getRecommendations = (tasks, currentEnergy, availableTime) => {
  return tasks
    .filter(task => task.status === 'pending')
    .map(task => {
      const { score, explanation } = calculateScore(task, currentEnergy, availableTime);
      return { task, score, explanation };
    })
    .sort((a, b) => b.score - a.score);
};

module.exports = { getRecommendations };
