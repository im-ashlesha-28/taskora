import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Sparkles, Clock, Zap, Brain, Calendar, Star } from 'lucide-react';
import { taskService } from '../services/api';

const AddTaskPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    estimated_time: 30,
    energy_level: 3,
    mental_load: 3,
    priority: 2,
    due_date: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await taskService.createTask(formData);
      navigate('/tasks');
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sage-400 hover:text-sage-600 transition-colors mb-10 font-bold"
      >
        <ArrowLeft size={20} /> Back to Sanctuary
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="cozy-card bg-white"
      >
        <div className="mb-10 text-center">
          <div className="inline-flex p-4 rounded-3xl bg-sage-50 text-sage-400 mb-4">
            <Sparkles size={32} />
          </div>
          <h2 className="text-3xl font-heading font-bold text-sage-900">New Intention</h2>
          <p className="text-sage-500 font-medium">Add a new task to your mindful list. ✨</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-sage-400 uppercase tracking-widest ml-4">Title</label>
            <input 
              type="text"
              required
              className="soft-input"
              placeholder="What's your focus?"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-sage-400 uppercase tracking-widest ml-4">Description (Optional)</label>
            <textarea 
              className="soft-input min-h-[120px] resize-none"
              placeholder="Any gentle details or thoughts..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-sage-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                <Clock size={14} /> Est. Time (min)
              </label>
              <input 
                type="number"
                required
                className="soft-input"
                value={formData.estimated_time}
                onChange={(e) => setFormData({...formData, estimated_time: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-sage-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                <Calendar size={14} /> Due Date
              </label>
              <input 
                type="date"
                className="soft-input"
                value={formData.due_date}
                onChange={(e) => setFormData({...formData, due_date: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-6 border-y border-sage-50">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-sage-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                  <Zap size={14} className="text-amber-400" /> Energy Required
                </label>
                <span className="text-sm font-bold text-sage-900">{formData.energy_level}/5</span>
              </div>
              <input 
                type="range" min="1" max="5" 
                className="w-full h-2 bg-sage-50 rounded-lg appearance-none cursor-pointer accent-sage-400"
                value={formData.energy_level}
                onChange={(e) => setFormData({...formData, energy_level: parseInt(e.target.value)})}
              />
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-sage-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                  <Brain size={14} className="text-sage-300" /> Mental Load
                </label>
                <span className="text-sm font-bold text-sage-900">{formData.mental_load}/5</span>
              </div>
              <input 
                type="range" min="1" max="5" 
                className="w-full h-2 bg-sage-50 rounded-lg appearance-none cursor-pointer accent-sage-400"
                value={formData.mental_load}
                onChange={(e) => setFormData({...formData, mental_load: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              className="w-full sage-button !py-5 !text-lg"
            >
              <Save size={20} /> Plant this Seed
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddTaskPage;
