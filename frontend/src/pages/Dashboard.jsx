import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Heart, Brain, Zap, Clock, Star, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { taskService, analyticsService, recommendationService } from '../services/api';
import TaskCard from '../components/TaskCard';
import { FocusTimer, MoodTracker, QuickNotes } from '../components/DashboardWidgets';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tasksRes, statsRes] = await Promise.all([
        taskService.getTasks(),
        analyticsService.getSummary()
      ]);
      setTasks(tasksRes.data.filter(t => t.status === 'pending').slice(0, 3));
      setStats(statsRes.data);
      
      const recRes = await recommendationService.getRecommendations(3, 30);
      setRecommendations(recRes.data.slice(0, 2));
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
      setLoading(false);
    }
  };

  const chartData = [
    { name: 'Mon', tasks: 4 },
    { name: 'Tue', tasks: 7 },
    { name: 'Wed', tasks: 5 },
    { name: 'Thu', tasks: 8 },
    { name: 'Fri', tasks: 6 },
    { name: 'Sat', tasks: 3 },
    { name: 'Sun', tasks: 2 },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10"
    >
      {/* Hero Welcome Section */}
      <motion.section variants={item}>
        <div className="relative overflow-hidden rounded-6xl bg-white border border-sage-100 shadow-soft p-10 md:p-14 flex flex-col md:flex-row items-center gap-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-sage-50/50 -skew-x-12 translate-x-1/4"></div>
          
          <div className="relative z-10 flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-sage-50 text-sage-600 text-xs font-bold uppercase tracking-widest">
              <Sparkles size={14} /> Daily Inspiration
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-sage-900 leading-tight">
              Good morning, <span className="text-sage-400">{user?.name || 'Friend'}</span>. <br />
              Ready for a cozy day?
            </h2>
            <p className="text-sage-600 text-lg font-medium max-w-lg leading-relaxed">
              "Productivity is being able to do things that you were never able to do before." 🌿
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => navigate('/tasks')}
                className="sage-button"
              >
                View Todo List
              </button>
              <button 
                onClick={() => navigate('/bucket-list')}
                className="sage-button-secondary"
              >
                Explore Bucket List
              </button>
            </div>
          </div>
          
          <div className="relative z-10 w-full md:w-[320px] aspect-square flex items-center justify-center">
             <motion.img 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               src="/hero-illustration.png" 
               alt="Cozy Illustration" 
               className="w-full h-full object-contain drop-shadow-2xl" 
             />
          </div>
        </div>
      </motion.section>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={item} className="lg:col-span-1">
          <FocusTimer />
        </motion.div>
        <motion.div variants={item}>
          <MoodTracker />
        </motion.div>
        <motion.div variants={item}>
          <QuickNotes />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-2xl font-heading font-bold text-sage-900">Recommended for you</h3>
              <p className="text-sage-500 font-medium">Gentle nudges based on your energy</p>
            </div>
            <button 
              onClick={() => navigate('/recommendations')}
              className="text-sage-400 font-bold text-sm flex items-center gap-1 hover:text-sage-600 transition-colors"
            >
              See all <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.length > 0 ? (
              recommendations.map((rec) => (
                <div key={rec.task._id} className="space-y-4">
                  <div className="bg-sage-50 text-sage-600 border border-sage-100 text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-xl w-fit">
                    {rec.explanation.split('|')[0]}
                  </div>
                  <TaskCard task={rec.task} />
                </div>
              ))
            ) : (
              <div className="col-span-2 p-12 text-center bg-white border-2 border-dashed border-sage-100 rounded-5xl">
                <img src="/empty-state.png" alt="Empty" className="w-24 h-24 mx-auto mb-4 opacity-50" />
                <p className="text-sage-400 font-bold">No recommendations yet. Add some tasks! ✨</p>
              </div>
            )}
          </div>

          <div className="pt-6 space-y-6">
            <h3 className="text-2xl font-heading font-bold text-sage-900">Your Weekly Vibe</h3>
            <div className="cozy-card h-[320px] bg-white">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a8d1a8" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#a8d1a8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '24px', border: 'none', background: '#3d523d', color: '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="tasks" stroke="#a8d1a8" strokeWidth={4} fillOpacity={1} fill="url(#colorTasks)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-8">
          <h3 className="text-2xl font-heading font-bold text-sage-900">Cozy Insights</h3>
          
          <motion.div whileHover={{ scale: 1.02 }} className="cozy-card bg-sage-100/50 border-sage-200 shadow-none">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white rounded-2xl text-sage-600 shadow-soft">
                <Brain size={22} />
              </div>
              <h4 className="font-heading font-bold text-lg text-sage-900">Mindful Tip</h4>
            </div>
            <p className="text-sage-600 leading-relaxed font-medium">
              You're most productive with high-energy tasks before 11 AM. Tomorrow, maybe try tackling that creative project early? 🌿
            </p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="cozy-card bg-soft-cream border-amber-100 shadow-none">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white rounded-2xl text-rose-400 shadow-soft">
                <Heart size={22} />
              </div>
              <h4 className="font-heading font-bold text-lg text-sage-900">Self-Care</h4>
            </div>
            <p className="text-sage-600 leading-relaxed font-medium">
              You've completed 5 tasks today! Don't forget to take a 10-minute stretch break and hydrate. 💧
            </p>
          </motion.div>

          <div className="cozy-card">
            <h4 className="font-heading font-bold text-lg text-sage-900 mb-6">Quick Stats</h4>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-sage-400 uppercase tracking-widest">Tasks Done</span>
                  <span className="font-heading font-bold text-2xl text-sage-900">{stats?.completed_tasks || 0}</span>
                </div>
                <div className="w-full bg-sage-50 h-3 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} transition={{ duration: 1.5, ease: "easeOut" }} className="bg-sage-400 h-full rounded-full"></motion.div>
                </div>
              </div>
              
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-sage-400 uppercase tracking-widest">Aspirations</span>
                  <span className="font-heading font-bold text-2xl text-sage-900">82%</span>
                </div>
                <div className="w-full bg-sage-50 h-3 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '82%' }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }} className="bg-sage-900 h-full rounded-full"></motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
