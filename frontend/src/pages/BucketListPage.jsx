import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, Trash2, CheckCircle, Star, Palette, Sparkles } from 'lucide-react';

const CATEGORIES = [
  { id: 'travel', name: 'Travel', icon: '✈️', color: 'bg-blue-100 text-blue-600' },
  { id: 'skill', name: 'Skill', icon: '🎨', color: 'bg-purple-100 text-purple-600' },
  { id: 'health', name: 'Health', icon: '🧘', color: 'bg-green-100 text-green-600' },
  { id: 'adventure', name: 'Adventure', icon: '⛰️', color: 'bg-orange-100 text-orange-600' },
  { id: 'personal', name: 'Personal', icon: '✨', color: 'bg-rose-100 text-rose-600' },
];

const BucketList = () => {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('taskora_bucket_list');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'See the Northern Lights', category: 'travel', emoji: '🌌', completed: false },
      { id: 2, title: 'Learn to play Ukulele', category: 'skill', emoji: '🎸', completed: true },
      { id: 3, title: 'Run a 5k Marathon', category: 'health', emoji: '🏃‍♀️', completed: false },
    ];
  });

  const [newGoal, setNewGoal] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('personal');

  useEffect(() => {
    localStorage.setItem('taskora_bucket_list', JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (!newGoal.trim()) return;
    const category = CATEGORIES.find(c => c.id === selectedCategory);
    const goal = {
      id: Date.now(),
      title: newGoal,
      category: selectedCategory,
      emoji: category.icon,
      completed: false,
    };
    setGoals([goal, ...goals]);
    setNewGoal('');
  };

  const toggleGoal = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const completedCount = goals.filter(g => g.completed).length;
  const progress = goals.length > 0 ? (completedCount / goals.length) * 100 : 0;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-heading font-bold text-sage-900 mb-2 flex items-center gap-3">
            Your Bucket List <Heart className="text-rose-400 fill-rose-400" />
          </h2>
          <p className="text-sage-500 font-medium">Dream big, live better. Track your life aspirations here. ✨</p>
        </div>
        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-3xl border border-sage-100 shadow-soft flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest font-bold text-sage-400">Total Progress</p>
            <p className="text-xl font-heading font-bold text-sage-900">{Math.round(progress)}%</p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-sage-50 flex items-center justify-center relative">
             <svg className="w-12 h-12 transform -rotate-90">
              <circle
                cx="24" cy="24" r="20"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-sage-100"
              />
              <circle
                cx="24" cy="24" r="20"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={125.6}
                strokeDashoffset={125.6 - (125.6 * progress) / 100}
                className="text-sage-400 transition-all duration-1000 ease-out"
              />
            </svg>
            <Star className="absolute text-sage-400" size={14} />
          </div>
        </div>
      </div>

      <div className="cozy-card bg-sage-100/30 border-sage-200/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-sage-900">Add a new dream</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="What's on your mind?..."
                className="soft-input !bg-white"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addGoal()}
              />
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-300 ${
                      selectedCategory === cat.id 
                        ? 'bg-sage-900 text-white shadow-soft' 
                        : 'bg-white text-sage-600 hover:bg-sage-50'
                    }`}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
              <button 
                onClick={addGoal}
                className="sage-button w-full"
              >
                <Plus size={20} /> Add to Bucket List
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center">
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="w-48 h-48 bg-white/40 rounded-full flex items-center justify-center border-4 border-dashed border-sage-200"
             >
                <Sparkles className="text-sage-400" size={60} />
             </motion.div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {goals.map((goal) => (
            <motion.div
              key={goal.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -5 }}
              className={`cozy-card relative overflow-hidden group ${goal.completed ? 'bg-sage-50/50' : 'bg-white'}`}
            >
              {goal.completed && (
                <div className="absolute top-4 right-4 text-sage-400">
                  <CheckCircle size={24} className="fill-sage-100" />
                </div>
              )}
              
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl group-hover:scale-125 transition-transform duration-500">{goal.emoji}</div>
                <div>
                  <div className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider mb-2 inline-block ${CATEGORIES.find(c => c.id === goal.category)?.color}`}>
                    {goal.category}
                  </div>
                  <h4 className={`text-lg font-bold text-sage-900 leading-tight ${goal.completed ? 'line-through opacity-50' : ''}`}>
                    {goal.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-sage-50">
                <button 
                  onClick={() => toggleGoal(goal.id)}
                  className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                    goal.completed 
                      ? 'bg-sage-100 text-sage-600 hover:bg-sage-200' 
                      : 'bg-sage-400 text-white hover:bg-sage-500'
                  }`}
                >
                  {goal.completed ? 'Mark as Dream' : 'Mark Complete'}
                </button>
                <button 
                  onClick={() => deleteGoal(goal.id)}
                  className="text-sage-300 hover:text-rose-400 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {goals.length === 0 && (
        <div className="text-center py-20 bg-white/40 rounded-5xl border-4 border-dashed border-sage-100">
           <p className="text-sage-400 font-bold text-xl">Your dreams are waiting to be written down... 🖋️</p>
        </div>
      )}
    </div>
  );
};

export default BucketList;
