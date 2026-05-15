const mongoose = require('mongoose');

const ReflectionSchema = new mongoose.Schema({
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  actual_time_taken: { type: Number, required: true },
  perceived_difficulty: { type: Number, required: true, min: 1, max: 5 },
  reflection_text: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reflection', ReflectionSchema);
