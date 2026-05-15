import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Brain, Calendar, Trash2, CheckCircle, RotateCcw } from 'lucide-react';

const TaskCard = ({ task, onComplete, onPostpone, onDelete }) => {
  const getPriorityColor = (p) => {
    switch (p) {
      case 3: return 'bg-rose-500/10 text-rose-600 border border-rose-200';
      case 2: return 'bg-accent-purple/10 text-purple-700 border border-purple-200';
      default: return 'bg-emerald-500/10 text-emerald-700 border border-emerald-200';
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
      className="card-soft relative group overflow-hidden bg-white/80"
    >
      {/* Decorative Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary-gradient-start to-accent-purple opacity-0 group-hover:opacity-10 transition duration-500 blur-lg rounded-3xl pointer-events-none" />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${getPriorityColor(task.priority)}`}>
          {getPriorityLabel(task.priority)}
        </span>
        <button 
          onClick={() => onDelete && onDelete(task._id)}
          className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <h3 className="text-xl font-heading font-bold text-dark-slate mb-2 leading-tight relative z-10">{task.title}</h3>
      <p className="text-sm text-slate-500 mb-5 line-clamp-2 leading-relaxed relative z-10">{task.description}</p>

      <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6 relative z-10">
        <div className="flex items-center gap-2 text-slate-500">
          <Clock size={16} className="text-accent-purple" />
          <span className="text-xs font-medium">{task.estimated_time}m</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <Zap size={16} className="text-amber-500" />
          <span className="text-xs font-medium">Energy: {task.energy_level}/5</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <Brain size={16} className="text-rose-400" />
          <span className="text-xs font-medium">Load: {task.mental_load}/5</span>
        </div>
        {task.due_date && (
          <div className="flex items-center gap-2 text-slate-500">
            <Calendar size={16} className="text-emerald-500" />
            <span className="text-xs font-medium">{new Date(task.due_date).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <div className="flex gap-3 relative z-10">
        <button 
          onClick={() => onComplete && onComplete(task._id)}
          className="flex-1 py-2.5 bg-emerald-50/80 text-emerald-700 rounded-xl hover:bg-emerald-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 text-sm font-semibold shadow-sm hover:shadow-md"
        >
          <CheckCircle size={18} /> Complete
        </button>
        <button 
          onClick={() => onPostpone && onPostpone(task._id)}
          className="flex-1 py-2.5 bg-amber-50/80 text-amber-700 rounded-xl hover:bg-amber-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 text-sm font-semibold shadow-sm hover:shadow-md"
        >
          <RotateCcw size={18} /> Postpone
        </button>
      </div>

      {task.postpone_count >= 3 && (
        <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent opacity-80" />
      )}
    </motion.div>
  );
};

export default TaskCard;
