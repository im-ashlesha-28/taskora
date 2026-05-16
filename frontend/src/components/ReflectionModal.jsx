import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Clock, Brain, Save, Sparkles } from 'lucide-react';
import { reflectionService } from '../services/api';

const ReflectionModal = ({ task, isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    task_id: '',
    actual_time_taken: 30,
    perceived_difficulty: 3,
    reflection_text: ''
  });

  useEffect(() => {
    if (task) {
      setFormData(prev => ({
        ...prev,
        task_id: task._id,
        actual_time_taken: task.estimated_time || 30
      }));
    }
  }, [task]);

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
            className="absolute inset-0 bg-sage-900/40 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-xl rounded-6xl shadow-hover p-10 md:p-12 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-sage-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 text-sage-300 hover:text-sage-900 transition-colors z-20"
            >
              <X size={28} />
            </button>

            <div className="mb-10 relative z-10">
              <div className="inline-flex p-3 rounded-2xl bg-sage-50 text-sage-400 mb-4">
                <Sparkles size={24} />
              </div>
              <h3 className="text-3xl font-heading font-bold text-sage-900 mb-2">Gentle Reflection 🌿</h3>
              <p className="text-sage-500 font-medium leading-relaxed">
                You've bloomed! Tell us about your journey with: <br />
                <span className="font-bold text-sage-900">"{task?.title}"</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="space-y-3">
                <label className="text-xs font-bold text-sage-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                  <Clock size={16} className="text-sage-400" /> Actual Time Taken (min)
                </label>
                <input 
                  type="number"
                  className="soft-input !py-4"
                  value={formData.actual_time_taken}
                  onChange={(e) => setFormData({...formData, actual_time_taken: parseInt(e.target.value)})}
                />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-sage-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                    <Brain size={16} className="text-sage-300" /> Perceived Difficulty
                  </label>
                  <span className="text-sm font-bold text-sage-900">{formData.perceived_difficulty}/5</span>
                </div>
                <input 
                  type="range" min="1" max="5" 
                  className="w-full h-2 bg-sage-50 rounded-lg appearance-none cursor-pointer accent-sage-400"
                  value={formData.perceived_difficulty}
                  onChange={(e) => setFormData({...formData, perceived_difficulty: parseInt(e.target.value)})}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-sage-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                  <Heart size={16} className="text-rose-400" /> Heart's Whispers
                </label>
                <textarea 
                  className="soft-input min-h-[120px] resize-none !py-4 font-handwritten text-xl"
                  placeholder="How did this task make you feel?"
                  value={formData.reflection_text}
                  onChange={(e) => setFormData({...formData, reflection_text: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                className="w-full sage-button !py-5 !text-lg"
              >
                <Save size={20} /> Capture this Moment
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReflectionModal;
