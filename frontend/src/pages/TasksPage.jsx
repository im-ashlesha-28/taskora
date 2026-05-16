import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { taskService } from '../services/api';
import TaskCard from '../components/TaskCard';
import ReflectionModal from '../components/ReflectionModal';
import { ListTodo, Calendar, Filter, ArrowUpDown, Sparkles } from 'lucide-react';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

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
    if (window.confirm("Are you sure you want to let this task go? 🌿")) {
      try {
        await taskService.deleteTask(id);
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task", error);
      }
    }
  };

  // Simple Drag and Drop logic
  const onDragStart = (e, index) => {
    setDraggedItem(tasks[index]);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  const onDragOver = (index) => {
    const draggedOverItem = tasks[index];
    if (draggedItem === draggedOverItem) return;

    let items = tasks.filter(item => item !== draggedItem);
    items.splice(index, 0, draggedItem);
    setTasks(items);
  };

  const onDragEnd = () => {
    setDraggedItem(null);
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-heading font-bold text-sage-900 mb-2 flex items-center gap-3">
            Task Sanctuary <ListTodo className="text-sage-400" />
          </h2>
          <p className="text-sage-500 font-medium italic">"One step at a time, with love and intention." 🌸</p>
        </div>
        
        <div className="flex gap-3">
           <button className="px-5 py-2.5 rounded-2xl bg-white border border-sage-100 text-sage-600 font-bold text-sm flex items-center gap-2 hover:shadow-soft transition-all">
             <Calendar size={18} /> Today
           </button>
           <button className="px-5 py-2.5 rounded-2xl bg-white border border-sage-100 text-sage-600 font-bold text-sm flex items-center gap-2 hover:shadow-soft transition-all">
             <Filter size={18} /> Filters
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar Organization */}
        <div className="lg:col-span-1 space-y-8">
           <div className="cozy-card bg-sage-900 text-white p-6 space-y-6">
             <h4 className="font-heading font-bold text-lg flex items-center gap-2">
               <Sparkles size={20} className="text-sage-400" /> Daily Stats
             </h4>
             <div className="space-y-4">
               <div className="flex justify-between items-center text-sm">
                 <span className="text-sage-400 font-bold uppercase tracking-widest text-[10px]">Pending</span>
                 <span className="font-bold">{pendingTasks.length}</span>
               </div>
               <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                 <div className="bg-sage-400 h-full w-[40%]"></div>
               </div>
               
               <div className="flex justify-between items-center text-sm pt-2">
                 <span className="text-sage-400 font-bold uppercase tracking-widest text-[10px]">Completed</span>
                 <span className="font-bold">{completedTasks.length}</span>
               </div>
               <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                 <div className="bg-white h-full w-[60%]"></div>
               </div>
             </div>
           </div>

           <div className="cozy-card p-6 space-y-4 bg-soft-cream border-amber-100 shadow-none">
             <h4 className="font-heading font-bold text-sage-900 flex items-center gap-2">
               <ArrowUpDown size={18} className="text-amber-500" /> Quick Tips
             </h4>
             <p className="text-xs text-sage-600 font-medium leading-relaxed">
               Drag and drop tasks to prioritize your day. Most important tasks should be at the top! 🌿
             </p>
           </div>
        </div>

        {/* Main Tasks List */}
        <div className="lg:col-span-3 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {pendingTasks.map((task, index) => (
                <div 
                  key={task._id}
                  draggable
                  onDragStart={(e) => onDragStart(e, index)}
                  onDragOver={() => onDragOver(index)}
                  onDragEnd={onDragEnd}
                  className="cursor-move"
                >
                  <TaskCard 
                    task={task} 
                    onComplete={handleComplete}
                    onPostpone={handlePostpone}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </AnimatePresence>
          </div>

          {pendingTasks.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-20 text-center bg-white border-4 border-dashed border-sage-100 rounded-6xl"
            >
              <img src="/empty-state.png" alt="Empty" className="w-32 h-32 mx-auto mb-6 opacity-60" />
              <p className="text-sage-400 font-bold text-xl">The sanctuary is quiet... for now. ✨</p>
              <p className="text-sage-300 text-sm mt-2 font-medium">Add a new task when you're ready to bloom.</p>
            </motion.div>
          )}
        </div>
      </div>

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
