const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Task = require('./models/Task');
const Reflection = require('./models/Reflection');
const recommender = require('./logic/recommender');

const authRoutes = require('./routes/auth');
const auth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

const { MongoMemoryServer } = require('mongodb-memory-server');
const seedDB = require('./seed');

let mongoServer;
const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (MONGODB_URI && MONGODB_URI.startsWith('mongodb')) {
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to Production MongoDB ✨');
    } else {
      mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      await mongoose.connect(uri);
      console.log('Connected to In-Memory MongoDB ✨');
      await seedDB();
    }
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
  }
};
connectDB();

// --- Tasks Routes ---

app.get('/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/tasks', auth, async (req, res) => {
  const task = new Task({ ...req.body, user_id: req.userId });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/tasks/:id', auth, async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user_id: req.userId }, 
      req.body, 
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user_id: req.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Recommendations ---

app.post('/recommend', auth, async (req, res) => {
  const { current_energy, available_time } = req.body;
  try {
    const tasks = await Task.find({ user_id: req.userId, status: 'pending' });
    const recommendations = recommender.getRecommendations(tasks, current_energy, available_time);
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Reflections ---

app.get('/reflections', auth, async (req, res) => {
  try {
    const reflections = await Reflection.find({ user_id: req.userId }).populate('task_id').sort({ created_at: -1 });
    res.json(reflections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/reflection', auth, async (req, res) => {
  const reflection = new Reflection({ ...req.body, user_id: req.userId });
  try {
    const newReflection = await reflection.save();
    
    // Update task status
    await Task.findOneAndUpdate({ _id: req.body.task_id, user_id: req.userId }, { status: 'completed' });
    
    res.status(201).json(newReflection);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- Analytics ---

app.get('/analytics', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.userId });
    const reflections = await Reflection.find({ user_id: req.userId }).populate('task_id');
    
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
    
    const most_postponed_tasks = await Task.find({ user_id: req.userId }).sort({ postpone_count: -1 }).limit(5);
    
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
