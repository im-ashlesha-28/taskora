import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Clock, Brain, Save } from 'lucide-react';
import { reflectionService } from '../services/api';

const ReflectionModal = ({ task, isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    task_id: task?._id,
    actual_time_taken: task?.estimated_time || 30,
    perceived_difficulty: 3,
    reflection_text: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reflectionService.createReflection({
        ...formData,
        task_id: task._id
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving reflection", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl p-8 overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-300 hover:text-slate-500 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Gentle Reflection 🌿</h3>
              <p className="text-slate-500">You completed: <span className="font-semibold text-dusty-rose">{task?.title}</span></p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2 flex items-center gap-2">
                  <Clock size={16} className="text-warm-beige" /> How long did it actually take? (min)
                </label>
                <input 
                  type="number"
                  className="w-full px-4 py-3 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-soft-lavender transition-all"
                  value={formData.actual_time_taken}
                  onChange={(e) => setFormData({...formData, actual_time_taken: parseInt(e.target.value)})}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Brain size={16} className="text-blush-pink" /> How difficult was it?
                  </label>
                  <span className="text-xs font-bold text-blush-pink">{formData.perceived_difficulty}/5</span>
                </div>
                <input 
                  type="range" min="1" max="5" 
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blush-pink"
                  value={formData.perceived_difficulty}
                  onChange={(e) => setFormData({...formData, perceived_difficulty: parseInt(e.target.value)})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2 flex items-center gap-2">
                  <Heart size={16} className="text-dusty-rose" /> Any thoughts or feelings?
                </label>
                <textarea 
                  className="w-full px-4 py-3 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-soft-lavender transition-all min-h-[100px]"
                  placeholder="I felt a bit overwhelmed at first, but then..."
                  value={formData.reflection_text}
                  onChange={(e) => setFormData({...formData, reflection_text: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-sage-green text-white rounded-2xl font-bold shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Save size={20} /> Save Reflection
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReflectionModal;
