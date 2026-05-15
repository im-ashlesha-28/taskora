import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Clock, ArrowRight, RefreshCcw } from 'lucide-react';
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
      <header className="max-w-2xl">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Personalized Guidance ✨</h2>
        <p className="text-slate-500 text-lg">
          Tell us how you're feeling and how much time you have, and we'll help you find the perfect task for this moment.
        </p>
      </header>

      <section className="card-soft max-w-2xl">
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                <Zap size={18} className="text-soft-lavender" /> Your Energy Level
              </label>
              <span className="px-3 py-1 bg-soft-lavender/20 text-purple-700 rounded-full text-xs font-bold">
                {energy === 1 ? 'Resting' : energy === 3 ? 'Balanced' : energy === 5 ? 'Vibrant' : energy}/5
              </span>
            </div>
            <input 
              type="range" min="1" max="5" 
              className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-soft-lavender"
              value={energy}
              onChange={(e) => setEnergy(parseInt(e.target.value))}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                <Clock size={18} className="text-warm-beige" /> Available Time (min)
              </label>
              <span className="px-3 py-1 bg-warm-beige/20 text-amber-700 rounded-full text-xs font-bold">
                {time} minutes
              </span>
            </div>
            <div className="flex gap-3">
              {[15, 30, 45, 60, 120].map(val => (
                <button
                  key={val}
                  onClick={() => setTime(val)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    time === val ? 'bg-warm-beige text-amber-700' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {val}m
                </button>
              ))}
              <input 
                type="number"
                className="w-20 px-3 py-2 rounded-xl border-slate-100 bg-slate-50 text-sm focus:ring-2 focus:ring-warm-beige transition-all"
                value={time}
                onChange={(e) => setTime(parseInt(e.target.value))}
              />
            </div>
          </div>

          <button 
            onClick={handleGetRecommendations}
            disabled={loading}
            className="w-full py-4 bg-dusty-rose text-white rounded-2xl font-bold shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
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
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-800">The perfect choices for now</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations.map((rec) => (
                <div key={rec.task._id} className="space-y-4">
                  <div className="bg-white/80 backdrop-blur-sm border border-slate-100 p-4 rounded-2xl text-sm text-slate-600 italic flex gap-3">
                    <Sparkles className="text-dusty-rose shrink-0" size={18} />
                    {rec.explanation}
                  </div>
                  <TaskCard task={rec.task} />
                </div>
              ))}
            </div>

            {recommendations.length === 0 && (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-100">
                <p className="text-slate-400">No matches found for this specific state. Maybe try a lighter energy or more time? 🌸</p>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecommendationPage;
