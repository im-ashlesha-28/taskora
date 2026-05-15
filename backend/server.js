const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Task = require('./models/Task');
const Reflection = require('./models/Reflection');
const recommender = require('./logic/recommender');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskora';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB ✨'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// --- Tasks Routes ---

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Recommendations ---

app.post('/recommend', async (req, res) => {
  const { current_energy, available_time } = req.body;
  try {
    const tasks = await Task.find({ status: 'pending' });
    const recommendations = recommender.getRecommendations(tasks, current_energy, available_time);
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Reflections ---

app.get('/reflections', async (req, res) => {
  try {
    const reflections = await Reflection.find().populate('task_id').sort({ created_at: -1 });
    res.json(reflections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/reflection', async (req, res) => {
  const reflection = new Reflection(req.body);
  try {
    const newReflection = await reflection.save();
    
    // Update task status
    await Task.findByIdAndUpdate(req.body.task_id, { status: 'completed' });
    
    res.status(201).json(newReflection);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- Analytics ---

app.get('/analytics', async (req, res) => {
  try {
    const tasks = await Task.find();
    const reflections = await Reflection.find().populate('task_id');
    
    const total_tasks = tasks.length;
    const completed_tasks = tasks.filter(t => t.status === 'completed').length;
    const postponed_tasks = tasks.reduce((acc, t) => acc + (t.postpone_count || 0), 0);
    
    let totalError = 0;
    reflections.forEach(r => {
      if (r.task_id) {
        totalError += Math.abs(r.actual_time_taken - r.task_id.estimated_time);
      }
    });
    const avg_error = reflections.length > 0 ? totalError / reflections.length : 0;
    
    const most_postponed_tasks = await Task.find().sort({ postpone_count: -1 }).limit(5);
    
    res.json({
      total_tasks,
      completed_tasks,
      postponed_tasks,
      average_estimation_error: avg_error,
      most_postponed_tasks
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
