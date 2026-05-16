const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  estimated_time: { type: Number, required: true }, // in minutes
  energy_level: { type: Number, required: true, min: 1, max: 5 },
  mental_load: { type: Number, required: true, min: 1, max: 5 },
  priority: { type: Number, required: true, min: 1, max: 3 }, // 1: Low, 2: Medium, 3: High
  status: { type: String, default: 'pending', enum: ['pending', 'completed', 'postponed'] },
  postpone_count: { type: Number, default: 0 },
  due_date: { type: Date },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);
