import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Sparkles, Clock, Zap, Brain, Calendar } from 'lucide-react';
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
    <div className="max-w-2xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors mb-8"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-soft"
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
          Create New Task <Sparkles className="text-dusty-rose" />
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">Title</label>
            <input 
              type="text"
              required
              className="w-full px-4 py-3 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-soft-lavender transition-all"
              placeholder="What needs to be done?"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">Description (Optional)</label>
            <textarea 
              className="w-full px-4 py-3 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-soft-lavender transition-all min-h-[100px]"
              placeholder="Add some details..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2 flex items-center gap-2">
                <Clock size={16} className="text-warm-beige" /> Est. Time (min)
              </label>
              <input 
                type="number"
                required
                className="w-full px-4 py-3 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-soft-lavender transition-all"
                value={formData.estimated_time}
                onChange={(e) => setFormData({...formData, estimated_time: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2 flex items-center gap-2">
                <Calendar size={16} className="text-sage-green" /> Due Date
              </label>
              <input 
                type="date"
                className="w-full px-4 py-3 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-soft-lavender transition-all"
                value={formData.due_date}
                onChange={(e) => setFormData({...formData, due_date: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-6 pt-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <Zap size={16} className="text-soft-lavender" /> Energy Level
                </label>
                <span className="text-xs font-bold text-soft-lavender">{formData.energy_level}/5</span>
              </div>
              <input 
                type="range" min="1" max="5" 
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-soft-lavender"
                value={formData.energy_level}
                onChange={(e) => setFormData({...formData, energy_level: parseInt(e.target.value)})}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <Brain size={16} className="text-blush-pink" /> Mental Load
                </label>
                <span className="text-xs font-bold text-blush-pink">{formData.mental_load}/5</span>
              </div>
              <input 
                type="range" min="1" max="5" 
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blush-pink"
                value={formData.mental_load}
                onChange={(e) => setFormData({...formData, mental_load: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div className="pt-8">
            <button 
              type="submit"
              className="w-full py-4 bg-dusty-rose text-white rounded-2xl font-bold shadow-lg hover:bg-muted-lilac transition-all flex items-center justify-center gap-2"
            >
              <Save size={20} /> Create Task
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddTaskPage;
