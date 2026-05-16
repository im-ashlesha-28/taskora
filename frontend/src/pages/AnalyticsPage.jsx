import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { PieChart as PieIcon, TrendingUp, AlertCircle, CheckCircle2, Clock, BarChart2 } from 'lucide-react';
import { analyticsService } from '../services/api';

const AnalyticsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await analyticsService.getSummary();
      setStats(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stats", error);
      setLoading(false);
    }
  };

  const COLORS = ['#9caf88', '#d1dfc5', '#6b705c', '#e9edc9', '#fefae0'];

  const mockDistribution = [
    { name: 'Focused', value: 40 },
    { name: 'Gentle', value: 30 },
    { name: 'Balanced', value: 30 },
  ];

  return (
    <div className="space-y-12">
      <header className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-sage-50 text-sage-600 text-xs font-bold uppercase tracking-widest mb-6">
          <BarChart2 size={14} /> Performance Analytics
        </div>
        <h2 className="text-4xl font-heading font-bold text-sage-900 mb-4">Mindful Insights</h2>
        <p className="text-sage-500 text-lg font-medium leading-relaxed">
          A gentle look at your patterns and growth. Understand your rhythms to bloom more beautifully. 🌿
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<CheckCircle2 className="text-sage-600" />} 
          label="Tasks Done" 
          value={stats?.completed_tasks || 0} 
          color="bg-sage-50"
        />
        <StatCard 
          icon={<AlertCircle className="text-amber-500" />} 
          label="Postponed" 
          value={stats?.postponed_tasks || 0} 
          color="bg-amber-50"
        />
        <StatCard 
          icon={<Clock className="text-sage-400" />} 
          label="Avg. Error" 
          value={`${Math.round(stats?.average_estimation_error || 0)}m`} 
          color="bg-sage-50"
        />
        <StatCard 
          icon={<TrendingUp className="text-rose-400" />} 
          label="Harmony" 
          value="85%" 
          color="bg-rose-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="cozy-card bg-white">
          <h3 className="text-xl font-heading font-bold text-sage-900 mb-8 flex items-center gap-2">
            <PieIcon size={20} className="text-sage-400" /> Energy Harmony
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {mockDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="outline-none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', background: '#363d2d', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-6">
            {mockDistribution.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="text-xs font-bold text-sage-400">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="cozy-card bg-white">
          <h3 className="text-xl font-heading font-bold text-sage-900 mb-8">Mindful Opportunities</h3>
          <div className="space-y-4">
            {stats?.most_postponed_tasks?.length > 0 ? (
              stats.most_postponed_tasks.map((task, idx) => (
                <div key={idx} className="flex items-center justify-between p-5 bg-sage-50 rounded-3xl border border-sage-100 group hover:bg-white hover:shadow-soft transition-all duration-300">
                  <div className="flex flex-col">
                    <span className="font-bold text-sage-900">{task.title}</span>
                    <span className="text-xs font-bold text-sage-400 uppercase tracking-widest mt-1">
                      Postponed {task.postpone_count} times
                    </span>
                  </div>
                  <div className="text-amber-500">
                    <AlertCircle size={20} />
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-sage-400 font-bold">
                 <img src="/empty-state.png" alt="Empty" className="w-20 h-20 mx-auto mb-4 opacity-50" />
                 No procrastination detected yet! You're doing great. 🌸
              </div>
            )}
          </div>
          <div className="mt-10 p-6 bg-sage-900 rounded-4xl text-white relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 text-white/5 group-hover:scale-110 transition-transform duration-500">
              <Sparkles size={80} />
            </div>
            <p className="text-sm font-medium leading-relaxed relative z-10 italic">
              <span className="font-bold text-sage-400 block mb-1 uppercase tracking-widest text-[10px]">Gentle Tip</span>
              "If a task is postponed often, it might be too large. Try breaking it into 3 smaller, manageable steps. You've got this!" ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <motion.div whileHover={{ y: -5 }} className="cozy-card bg-white p-6">
    <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-6 shadow-soft`}>
      {icon}
    </div>
    <div className="text-xs font-bold text-sage-400 uppercase tracking-widest mb-1">{label}</div>
    <div className="text-3xl font-heading font-bold text-sage-900">{value}</div>
  </motion.div>
);

export default AnalyticsPage;
