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
    <div className="space-y-12">
      {/* Welcome Section */}
      <section>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-soft-lavender/30 to-blush-pink/30 p-8 rounded-[40px] border border-white/50 soft-shadow"
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              How are you feeling today? <Sparkles className="text-dusty-rose" size={24} />
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Take a moment to check in with yourself. Remember, productivity is not about doing more, but doing what matters with the energy you have.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="pill-button bg-white text-slate-700 shadow-sm border border-slate-100">
                I'm focused 🧘‍♀️
              </button>
              <button className="pill-button bg-white text-slate-700 shadow-sm border border-slate-100">
                A bit tired ☁️
              </button>
              <button 
                onClick={() => navigate('/recommendations')}
                className="pill-button bg-dusty-rose text-white shadow-md"
              >
                Get Recommendations
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recommendations Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-800">Best for you right now</h3>
            <button className="text-dusty-rose font-semibold flex items-center gap-1 hover:underline">
              See all <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.length > 0 ? (
              recommendations.map((rec) => (
                <div key={rec.task._id} className="space-y-3">
                  <div className="bg-sage-green/10 text-sage-green text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full w-fit">
                    {rec.explanation.split('|')[0]}
                  </div>
                  <TaskCard task={rec.task} />
                </div>
              ))
            ) : (
              <div className="col-span-2 p-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400">Add some tasks to get personalized recommendations 🌸</p>
              </div>
            )}
          </div>

          <div className="mt-12 space-y-6">
            <h3 className="text-xl font-bold text-slate-800">Your Progress</h3>
            <div className="card-soft h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E8B4B8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#E8B4B8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="tasks" stroke="#E8B4B8" strokeWidth={3} fillOpacity={1} fill="url(#colorTasks)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-slate-800">Gentle Insights</h3>
          
          <div className="card-soft bg-warm-beige/20 border-warm-beige/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-warm-beige rounded-xl text-amber-700">
                <Brain size={20} />
              </div>
              <h4 className="font-bold text-slate-700">Patterns</h4>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              You're most productive with high-energy tasks before 11 AM. Tomorrow, maybe try tackling that creative project early? 🌿
            </p>
          </div>

          <div className="card-soft bg-soft-lavender/20 border-soft-lavender/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-soft-lavender rounded-xl text-purple-700">
                <Heart size={20} />
              </div>
              <h4 className="font-bold text-slate-700">Self-Care</h4>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              You've completed 5 tasks today! Don't forget to take a 10-minute stretch break and hydrate. 💧
            </p>
          </div>

          <div className="card-soft">
            <h4 className="font-bold text-slate-700 mb-6">Quick Stats</h4>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Tasks Completed</span>
                <span className="font-bold text-slate-700">{stats?.completed_tasks || 0}</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-sage-green h-full" style={{ width: '65%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Energy Harmony</span>
                <span className="font-bold text-slate-700">82%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-soft-lavender h-full" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
