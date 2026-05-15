import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Brain, Calendar, MessageSquare, Sparkles } from 'lucide-react';
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
      <header className="max-w-2xl">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Your Reflection Journey 🌿</h2>
        <p className="text-slate-500 text-lg">
          Take a look back at what you've achieved and how you felt along the way. Self-awareness is the key to sustainable growth.
        </p>
      </header>

      <div className="space-y-8">
        {reflections.length > 0 ? (
          reflections.map((ref, idx) => (
            <motion.div
              key={ref._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card-soft border-l-4 border-l-soft-lavender flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-slate-700">{ref.task_id?.title || 'Unknown Task'}</h3>
                  <span className="px-3 py-1 bg-sage-green/20 text-green-700 rounded-full text-xs font-bold">
                    Completed
                  </span>
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-warm-beige" />
                    <span>Est: {ref.task_id?.estimated_time}m | Actual: {ref.actual_time_taken}m</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain size={16} className="text-blush-pink" />
                    <span>Difficulty: {ref.perceived_difficulty}/5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-soft-lavender" />
                    <span>{new Date(ref.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {ref.reflection_text && (
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-4">
                    <MessageSquare size={20} className="text-dusty-rose shrink-0 mt-1" />
                    <p className="text-slate-600 italic">"{ref.reflection_text}"</p>
                  </div>
                )}
              </div>

              <div className="hidden md:flex flex-col items-center justify-center p-6 bg-soft-lavender/10 rounded-3xl min-w-[120px]">
                <Heart size={32} className="text-dusty-rose mb-2" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Achieved</span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="p-20 text-center bg-white rounded-[40px] border-2 border-dashed border-slate-100 soft-shadow">
            <Sparkles className="mx-auto text-dusty-rose mb-4" size={40} />
            <p className="text-slate-400 font-medium">No reflections yet. Complete a task and share how you felt to see it here. 🌸</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReflectionPage;
