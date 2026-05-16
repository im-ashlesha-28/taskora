import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Clock, ArrowRight, RefreshCcw, Compass } from 'lucide-react';
import { recommendationService } from '../services/api';
import TaskCard from '../components/TaskCard';

const RecommendationPage = () => {
  const [energy, setEnergy] = useState(3);
  const [time, setTime] = useState(30);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleGetRecommendations = async () => {
    setLoading(true);
    try {
      const res = await recommendationService.getRecommendations(energy, time);
      setRecommendations(res.data);
      setHasSearched(true);
    } catch (error) {
      console.error("Error getting recommendations", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <header className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-sage-50 text-sage-600 text-xs font-bold uppercase tracking-widest mb-6">
          <Compass size={14} /> Guided Experience
        </div>
        <h2 className="text-4xl font-heading font-bold text-sage-900 mb-4">Mindful Guidance ✨</h2>
        <p className="text-sage-500 text-lg font-medium leading-relaxed">
          How's your heart today? Tell us your energy and time, and we'll reveal the tasks that harmonize best with your current state.
        </p>
      </header>

      <section className="cozy-card bg-white max-w-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sage-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 space-y-10">
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs font-bold text-sage-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                <Zap size={16} className="text-amber-400" /> Your Energy
              </label>
              <span className="px-4 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold border border-amber-100">
                {energy === 1 ? 'Gentle' : energy === 3 ? 'Balanced' : energy === 5 ? 'Vibrant' : energy}/5
              </span>
            </div>
            <input 
              type="range" min="1" max="5" 
              className="w-full h-3 bg-sage-50 rounded-xl appearance-none cursor-pointer accent-sage-400"
              value={energy}
              onChange={(e) => setEnergy(parseInt(e.target.value))}
            />
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs font-bold text-sage-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                <Clock size={16} className="text-sage-400" /> Time Sanctuary (min)
              </label>
              <span className="px-4 py-1 bg-sage-50 text-sage-600 rounded-full text-xs font-bold border border-sage-100">
                {time} minutes
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {[15, 30, 45, 60, 120].map(val => (
                <button
                  key={val}
                  onClick={() => setTime(val)}
                  className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                    time === val ? 'bg-sage-900 text-white shadow-soft' : 'bg-sage-50 text-sage-400 hover:bg-sage-100'
                  }`}
                >
                  {val}m
                </button>
              ))}
              <input 
                type="number"
                className="w-24 px-4 py-2.5 rounded-2xl bg-sage-50 border-sage-100 text-sm font-bold text-sage-600 focus:ring-sage-400 focus:border-sage-400 transition-all"
                value={time}
                onChange={(e) => setTime(parseInt(e.target.value))}
              />
            </div>
          </div>

          <button 
            onClick={handleGetRecommendations}
            disabled={loading}
            className="w-full sage-button !py-5 !text-lg"
          >
            {loading ? <RefreshCcw className="animate-spin" /> : <Sparkles size={20} />}
            Reveal My Best Tasks
          </button>
        </div>
      </section>

      <AnimatePresence>
        {hasSearched && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sage-900 text-white flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-sage-900">Perfectly chosen for you</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations.map((rec) => (
                <div key={rec.task._id} className="space-y-4">
                  <div className="bg-white border border-sage-100 p-5 rounded-3xl text-sm text-sage-600 font-medium italic flex gap-4 shadow-soft">
                    <Sparkles className="text-sage-400 shrink-0" size={18} />
                    <span>{rec.explanation}</span>
                  </div>
                  <TaskCard task={rec.task} />
                </div>
              ))}
            </div>

            {recommendations.length === 0 && (
              <div className="p-16 text-center bg-white border-2 border-dashed border-sage-100 rounded-5xl">
                 <img src="/empty-state.png" alt="Empty" className="w-24 h-24 mx-auto mb-6 opacity-60" />
                 <p className="text-sage-400 font-bold text-lg">No matches found for this specific state.</p>
                 <p className="text-sage-300 text-sm mt-1 font-medium">Try a lighter energy or give yourself more time? 🌿</p>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecommendationPage;
