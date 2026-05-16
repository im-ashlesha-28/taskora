import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Brain, Calendar, Trash2, CheckCircle, RotateCcw } from 'lucide-react';

const TaskCard = ({ task, onComplete, onPostpone, onDelete }) => {
  const getPriorityColor = (p) => {
    switch (p) {
      case 3: return 'bg-rose-50 text-rose-600 border-rose-100';
      case 2: return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-sage-50 text-sage-600 border-sage-100';
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
      whileHover={{ y: -6, scale: 1.01 }}
      className="cozy-card group relative bg-white border border-sage-100"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-xl text-[10px] uppercase tracking-wider font-bold border ${getPriorityColor(task.priority)}`}>
          {getPriorityLabel(task.priority)}
        </span>
        <button 
          onClick={() => onDelete && onDelete(task._id)}
          className="p-2 rounded-xl bg-sage-50 text-sage-300 opacity-0 group-hover:opacity-100 hover:text-rose-400 hover:bg-rose-50 transition-all duration-300"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <h3 className="text-xl font-heading font-bold text-sage-900 mb-2 leading-tight group-hover:text-sage-400 transition-colors duration-300">
        {task.title}
      </h3>
      <p className="text-sm text-sage-500 mb-5 line-clamp-2 leading-relaxed font-medium">
        {task.description}
      </p>

      <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6 border-t border-sage-50 pt-4">
        <div className="flex items-center gap-2 text-sage-400 text-xs font-bold">
          <Clock size={14} />
          <span>{task.estimated_time}m</span>
        </div>
        <div className="flex items-center gap-2 text-sage-400 text-xs font-bold">
          <Zap size={14} className="text-amber-400" />
          <span>Energy: {task.energy_level}/5</span>
        </div>
        <div className="flex items-center gap-2 text-sage-400 text-xs font-bold">
          <Brain size={14} className="text-sage-300" />
          <span>Load: {task.mental_load}/5</span>
        </div>
        {task.due_date && (
          <div className="flex items-center gap-2 text-sage-400 text-xs font-bold">
            <Calendar size={14} />
            <span>{new Date(task.due_date).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-4">
        <button 
          onClick={() => onComplete && onComplete(task._id)}
          className="flex-1 sage-button !py-2.5 !text-xs group-hover:bg-sage-900"
        >
          <CheckCircle size={16} /> Complete
        </button>
        <button 
          onClick={() => onPostpone && onPostpone(task._id)}
          className="flex-1 sage-button-secondary !py-2.5 !text-xs"
        >
          <RotateCcw size={16} /> Postpone
        </button>
      </div>

      {task.postpone_count >= 3 && (
        <div className="absolute top-0 right-0 left-0 h-1 bg-rose-400 opacity-50" />
      )}
      
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 bg-sage-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-5xl pointer-events-none"></div>
    </motion.div>
  );
};

export default TaskCard;
