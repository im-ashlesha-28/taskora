import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Heart, Brain, Zap, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { taskService, analyticsService, recommendationService } from '../services/api';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const navigate = useNavigate();
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
      
      // Default recommendation for low energy/30min
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

  return (
    <div className="space-y-12 animate-float">
      {/* Welcome Section */}
      <section>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2.5rem] p-10 border border-white/60 shadow-xl"
        >
          <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-purple/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-heading font-bold text-dark-slate mb-4 flex items-center gap-3">
              How are you feeling today? <Sparkles className="text-accent-purple" size={28} />
            </h2>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed">
              Take a moment to check in with yourself. Remember, productivity is not about doing more, but doing what matters with the energy you have.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="pill-button bg-white/80 text-dark-slate border border-white/50 backdrop-blur-sm">
                I'm focused 🧘‍♀️
              </button>
              <button className="pill-button bg-white/80 text-dark-slate border border-white/50 backdrop-blur-sm">
                A bit tired ☁️
              </button>
              <button 
                onClick={() => navigate('/recommendations')}
                className="pill-button bg-dark-slate text-white hover:bg-slate-800"
              >
                Get Recommendations
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Recommendations Column */}
        <div className="xl:col-span-2 space-y-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="text-2xl font-heading font-bold text-dark-slate">Best for you right now</h3>
              <p className="text-slate-500 mt-1">Based on your current energy levels</p>
            </div>
            <button className="text-accent-purple font-semibold flex items-center gap-1 hover:underline mb-1">
              See all <ArrowRight size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.length > 0 ? (
              recommendations.map((rec) => (
                <div key={rec.task._id} className="space-y-3">
                  <div className="bg-white/60 text-accent-purple border border-white/50 shadow-sm text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full w-fit backdrop-blur-sm">
                    {rec.explanation.split('|')[0]}
                  </div>
                  <TaskCard task={rec.task} />
                </div>
              ))
            ) : (
              <div className="col-span-2 p-12 text-center bg-white/40 backdrop-blur-sm rounded-[2rem] border-2 border-dashed border-white/60 shadow-inner">
                <p className="text-slate-500 text-lg">Add some tasks to get personalized recommendations ✨</p>
              </div>
            )}
          </div>

          <div className="mt-12 space-y-6 pt-6">
            <h3 className="text-2xl font-heading font-bold text-dark-slate">Your Progress</h3>
            <div className="card-soft h-[320px] bg-white/60">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a18cd1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#a18cd1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.5)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 500}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 500}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="tasks" stroke="#a18cd1" strokeWidth={4} fillOpacity={1} fill="url(#colorTasks)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-8">
          <h3 className="text-2xl font-heading font-bold text-dark-slate">Gentle Insights</h3>
          
          <div className="card-soft bg-gradient-to-br from-white/80 to-white/40 border-white/60">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-accent-blue/30 rounded-2xl text-purple-700">
                <Brain size={22} />
              </div>
              <h4 className="font-heading font-bold text-lg text-dark-slate">Patterns</h4>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              You're most productive with high-energy tasks before 11 AM. Tomorrow, maybe try tackling that creative project early? 🌿
            </p>
          </div>

          <div className="card-soft bg-gradient-to-br from-white/80 to-white/40 border-white/60">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-emerald-100 rounded-2xl text-emerald-600">
                <Heart size={22} />
              </div>
              <h4 className="font-heading font-bold text-lg text-dark-slate">Self-Care</h4>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              You've completed 5 tasks today! Don't forget to take a 10-minute stretch break and hydrate. 💧
            </p>
          </div>

          <div className="card-soft bg-white/70">
            <h4 className="font-heading font-bold text-lg text-dark-slate mb-6">Quick Stats</h4>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Tasks Completed</span>
                  <span className="font-heading font-bold text-xl text-dark-slate">{stats?.completed_tasks || 0}</span>
                </div>
                <div className="w-full bg-slate-200/50 h-2.5 rounded-full overflow-hidden shadow-inner">
                  <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} transition={{ duration: 1, delay: 0.2 }} className="bg-emerald-400 h-full rounded-full"></motion.div>
                </div>
              </div>
              
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Energy Harmony</span>
                  <span className="font-heading font-bold text-xl text-dark-slate">82%</span>
                </div>
                <div className="w-full bg-slate-200/50 h-2.5 rounded-full overflow-hidden shadow-inner">
                  <motion.div initial={{ width: 0 }} animate={{ width: '82%' }} transition={{ duration: 1, delay: 0.4 }} className="bg-accent-purple h-full rounded-full"></motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
