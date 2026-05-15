const mongoose = require('mongoose');
require('dotenv').config();
const Task = require('./models/Task');
const Reflection = require('./models/Reflection');

const seedDB = async () => {
  try {
    console.log('Seeding database... 🌿');

    await Task.deleteMany({});
    await Reflection.deleteMany({});

    const tasks = [
      {
        title: "Read 10 pages of a book 📖",
        description: "A gentle way to start the day or wind down.",
        estimated_time: 20,
        energy_level: 2,
        mental_load: 2,
        priority: 1,
        due_date: new Date(Date.now() + 86400000)
      },
      {
        title: "Design Taskora Dashboard 🎨",
        description: "Deep work session focusing on the aesthetic UI.",
        estimated_time: 90,
        energy_level: 5,
        mental_load: 5,
        priority: 3,
        due_date: new Date(Date.now() + 172800000)
      },
      {
        title: "Reply to emails 📧",
        description: "Just clear the inbox, don't overthink.",
        estimated_time: 30,
        energy_level: 3,
        mental_load: 3,
        priority: 2
      },
      {
        title: "Water the plants 🌿",
        description: "A quick break from the screen.",
        estimated_time: 10,
        energy_level: 1,
        mental_load: 1,
        priority: 1
      },
      {
        title: "Update project documentation 📝",
        description: "Refine the README and add setup instructions.",
        estimated_time: 45,
        energy_level: 4,
        mental_load: 4,
        priority: 2,
        postpone_count: 3
      }
    ];

    await Task.insertMany(tasks);
    console.log('Sample tasks inserted! ✨');

    const completedTask = new Task({
      title: "Morning Yoga 🧘‍♀️",
      description: "Daily movement for clarity.",
      estimated_time: 15,
      energy_level: 3,
      mental_load: 1,
      priority: 2,
      status: "completed"
    });
    await completedTask.save();

    const reflection = new Reflection({
      task_id: completedTask._id,
      actual_time_taken: 20,
      perceived_difficulty: 2,
      reflection_text: "Felt great after stretching!"
    });
    await reflection.save();

    console.log('Database seeded successfully! 🌸');
  } catch (err) {
    console.error('Error seeding DB:', err);
  }
};

module.exports = seedDB;
