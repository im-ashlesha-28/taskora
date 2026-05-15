import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Brain, Calendar, Trash2, CheckCircle, RotateCcw } from 'lucide-react';

const TaskCard = ({ task, onComplete, onPostpone, onDelete }) => {
  const getPriorityColor = (p) => {
    switch (p) {
      case 3: return 'bg-blush-pink text-red-600';
      case 2: return 'bg-soft-lavender text-purple-600';
      default: return 'bg-sage-green text-green-700';
    }
  };

  const getPriorityLabel = (p) => {
    switch (p) {
      case 3: return 'High';
      case 2: return 'Medium';
      default: return 'Low';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card-soft relative group overflow-hidden"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
          {getPriorityLabel(task.priority)}
        </span>
        <button 
          onClick={() => onDelete && onDelete(task._id)}
          className="text-slate-300 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <h3 className="text-lg font-semibold text-slate-700 mb-2">{task.title}</h3>
      <p className="text-sm text-slate-500 mb-4 line-clamp-2">{task.description}</p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="flex items-center gap-2 text-slate-400">
          <Clock size={14} className="text-warm-beige" />
          <span className="text-xs">{task.estimated_time}m</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Zap size={14} className="text-soft-lavender" />
          <span className="text-xs">Energy: {task.energy_level}/5</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Brain size={14} className="text-blush-pink" />
          <span className="text-xs">Load: {task.mental_load}/5</span>
        </div>
        {task.due_date && (
          <div className="flex items-center gap-2 text-slate-400">
            <Calendar size={14} className="text-sage-green" />
            <span className="text-xs">{new Date(task.due_date).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => onComplete && onComplete(task._id)}
          className="flex-1 py-2 bg-sage-green/20 text-green-700 rounded-xl hover:bg-sage-green/40 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
        >
          <CheckCircle size={16} /> Complete
        </button>
        <button 
          onClick={() => onPostpone && onPostpone(task._id)}
          className="flex-1 py-2 bg-warm-beige/30 text-amber-700 rounded-xl hover:bg-warm-beige/50 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
        >
          <RotateCcw size={16} /> Postpone
        </button>
      </div>

      {task.postpone_count >= 3 && (
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-blush-pink to-transparent opacity-70" />
      )}
    </motion.div>
  );
};

export default TaskCard;
