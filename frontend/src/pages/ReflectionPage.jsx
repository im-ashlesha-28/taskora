import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Clock, Brain, Calendar, MessageSquare, Sparkles, BookOpen } from 'lucide-react';
import { reflectionService } from '../services/api';

const ReflectionPage = () => {
  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReflections();
  }, []);

  const fetchReflections = async () => {
    try {
      const res = await reflectionService.getReflections();
      setReflections(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reflections", error);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <header className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-sage-50 text-sage-600 text-xs font-bold uppercase tracking-widest mb-6">
          <BookOpen size={14} /> Your Journal
        </div>
        <h2 className="text-4xl font-heading font-bold text-sage-900 mb-4">Reflection Journey 🌿</h2>
        <p className="text-sage-500 text-lg font-medium leading-relaxed">
          A gentle space to look back at your path. Celebrate your achievements and listen to your heart's whispers.
        </p>
      </header>

      <div className="space-y-8">
        <AnimatePresence>
          {reflections.length > 0 ? (
            reflections.map((ref, idx) => (
              <motion.div
                key={ref._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="cozy-card border-l-8 border-l-sage-400 flex flex-col md:flex-row gap-10 items-start bg-white"
              >
                <div className="flex-1 space-y-6 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-heading font-bold text-sage-900">{ref.task_id?.title || 'Unknown Task'}</h3>
                      <span className="px-3 py-1 bg-sage-50 text-sage-600 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-sage-100">
                        Blooming
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sage-400 font-bold text-xs bg-sage-50/50 px-3 py-1.5 rounded-xl">
                      <Calendar size={14} />
                      <span>{new Date(ref.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 border-y border-sage-50 py-4">
                    <div className="flex items-center gap-2 text-sage-500 font-bold text-xs">
                      <Clock size={16} className="text-sage-400" />
                      <span>Est: {ref.task_id?.estimated_time}m <span className="mx-2 opacity-30">|</span> Actual: {ref.actual_time_taken}m</span>
                    </div>
                    <div className="flex items-center gap-2 text-sage-500 font-bold text-xs">
                      <Brain size={16} className="text-sage-400" />
                      <span>Difficulty: {ref.perceived_difficulty}/5</span>
                    </div>
                  </div>

                  {ref.reflection_text && (
                    <div className="bg-sage-50/50 p-6 rounded-3xl border border-sage-100 flex gap-4 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 text-sage-100 group-hover:scale-110 transition-transform duration-500">
                        <MessageSquare size={40} />
                      </div>
                      <p className="text-sage-700 font-medium italic leading-relaxed relative z-10 font-handwritten text-xl">
                        "{ref.reflection_text}"
                      </p>
                    </div>
                  )}
                </div>

                <div className="hidden md:flex flex-col items-center justify-center p-8 bg-sage-900 rounded-4xl min-w-[140px] text-white shadow-soft">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Heart size={32} className="text-rose-400 fill-rose-400 mb-3" />
                  </motion.div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-sage-400">Harvested</span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-24 text-center bg-white border-4 border-dashed border-sage-100 rounded-6xl">
              <img src="/empty-state.png" alt="Empty" className="w-32 h-32 mx-auto mb-8 opacity-60" />
              <p className="text-sage-400 font-bold text-xl">Your journal is waiting for its first entry... 🖋️</p>
              <p className="text-sage-300 text-sm mt-2 font-medium">Complete a task to capture your mindful reflection.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReflectionPage;
