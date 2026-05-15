import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { PieChart as PieIcon, TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
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

  const COLORS = ['#F8D7DA', '#DCCEF9', '#DCE8D5', '#E8B4B8', '#C8B6E2'];

  const mockDistribution = [
    { name: 'Focused', value: 40 },
    { name: 'Low Energy', value: 30 },
    { name: 'Balanced', value: 30 },
  ];

  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Reflective Insights</h2>
        <p className="text-slate-500">A gentle look at your patterns and growth 🌿</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<CheckCircle2 className="text-green-600" />} 
          label="Tasks Completed" 
          value={stats?.completed_tasks || 0} 
          color="bg-sage-green/20"
        />
        <StatCard 
          icon={<AlertCircle className="text-amber-600" />} 
          label="Total Postpones" 
          value={stats?.postponed_tasks || 0} 
          color="bg-warm-beige/20"
        />
        <StatCard 
          icon={<Clock className="text-purple-600" />} 
          label="Avg. Time Error" 
          value={`${Math.round(stats?.average_estimation_error || 0)}m`} 
          color="bg-soft-lavender/20"
        />
        <StatCard 
          icon={<TrendingUp className="text-rose-600" />} 
          label="Focus Score" 
          value="85%" 
          color="bg-blush-pink/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="card-soft">
          <h3 className="text-lg font-bold text-slate-700 mb-8 flex items-center gap-2">
            <PieIcon size={20} className="text-soft-lavender" /> Energy Distribution
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
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {mockDistribution.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="text-xs text-slate-500">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-soft">
          <h3 className="text-lg font-bold text-slate-700 mb-8">Most Postponed Tasks</h3>
          <div className="space-y-4">
            {stats?.most_postponed_tasks?.length > 0 ? (
              stats.most_postponed_tasks.map((task, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-700">{task.title}</span>
                    <span className="text-xs text-slate-400">Postponed {task.postpone_count} times</span>
                  </div>
                  <div className="text-blush-pink">
                    <AlertCircle size={20} />
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400 text-sm">
                No procrastination detected yet! You're doing great. 🌸
              </div>
            )}
          </div>
          <div className="mt-8 p-4 bg-blush-pink/10 rounded-2xl border border-blush-pink/20">
            <p className="text-xs text-rose-800 leading-relaxed">
              <span className="font-bold">Tip:</span> If a task is postponed often, it might be too large. Try breaking it into 3 smaller, manageable steps. ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <motion.div whileHover={{ scale: 1.02 }} className="card-soft p-5">
    <div className={`w-10 h-10 ${color} rounded-2xl flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <div className="text-sm text-slate-400 mb-1">{label}</div>
    <div className="text-2xl font-bold text-slate-800">{value}</div>
  </motion.div>
);

export default AnalyticsPage;
