import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, LayoutDashboard, ListTodo, PieChart, Heart, MessageCircle, Plus, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Todo List', path: '/tasks', icon: <ListTodo size={20} /> },
    { name: 'Bucket List', path: '/bucket-list', icon: <Heart size={20} /> },
    { name: 'Insights', path: '/recommendations', icon: <Sparkles size={20} /> },
    { name: 'Journal', path: '/reflection', icon: <MessageCircle size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <PieChart size={20} /> },
  ];

  return (
    <nav className="w-[280px] h-[calc(100vh-40px)] fixed top-5 left-5 bg-white/90 backdrop-blur-xl border border-sage-100 rounded-5xl flex flex-col justify-between py-10 z-50 shadow-soft">
      <div>
        <div className="px-8 mb-12 flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-sage-400 shadow-soft flex items-center justify-center text-white"
          >
            <Cloud size={24} />
          </motion.div>
          <div>
            <h2 className="text-2xl font-heading font-bold tracking-tight text-sage-900">Taskora</h2>
            <p className="text-[10px] uppercase tracking-widest font-bold text-sage-400">Cozy Planner</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-4 px-6 py-4 rounded-3xl transition-all duration-500 font-medium ${
                  isActive 
                    ? 'bg-sage-400 text-white shadow-soft translate-x-2' 
                    : 'text-sage-600 hover:bg-sage-50 hover:text-sage-900'
                }`
              }
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {item.icon}
              </motion.div>
              <span className="font-bold tracking-tight">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="px-6 space-y-6">
        <div className="p-6 bg-sage-50 rounded-4xl border border-sage-100 relative overflow-hidden group">
          <div className="absolute -right-2 -bottom-2 text-sage-200/50 group-hover:scale-110 transition-transform duration-500">
            <Heart size={60} />
          </div>
          <p className="text-xs font-bold text-sage-500 mb-2 relative z-10">Daily Reminder</p>
          <p className="text-sm text-sage-700 font-medium leading-relaxed relative z-10">
            You are doing your best, and that is enough. ✨
          </p>
        </div>

        <NavLink
          to="/add-task"
          className="w-full bg-sage-900 text-white shadow-soft hover:shadow-hover py-5 rounded-3xl flex items-center justify-center gap-2 font-bold transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
        >
          <Plus size={20} />
          <span>New Task</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
