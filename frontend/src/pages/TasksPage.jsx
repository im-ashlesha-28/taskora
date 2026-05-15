import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { taskService } from '../services/api';
import TaskCard from '../components/TaskCard';
import ReflectionModal from '../components/ReflectionModal';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await taskService.getTasks();
      setTasks(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks", error);
      setLoading(false);
    }
  };

  const handleComplete = (id) => {
    const task = tasks.find(t => t._id === id);
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handlePostpone = async (id) => {
    const task = tasks.find(t => t._id === id);
    try {
      await taskService.postponeTask(id, task.postpone_count);
      fetchTasks();
    } catch (error) {
      console.error("Error postponing task", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to let this task go? 🌸")) {
      try {
        await taskService.deleteTask(id);
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task", error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Your Task Sanctuary</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.filter(t => t.status === 'pending').map(task => (
          <TaskCard 
            key={task._id} 
            task={task} 
            onComplete={handleComplete}
            onPostpone={handlePostpone}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {tasks.filter(t => t.status === 'pending').length === 0 && (
        <div className="p-20 text-center bg-white rounded-[40px] border-2 border-dashed border-slate-100 soft-shadow">
          <p className="text-slate-400 font-medium">The list is empty. Take a deep breath and enjoy the moment, or add a new task when you're ready. 🌸</p>
        </div>
      )}

      <ReflectionModal 
        isOpen={isModalOpen} 
        task={selectedTask} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchTasks}
      />
    </div>
  );
};

export default TasksPage;
