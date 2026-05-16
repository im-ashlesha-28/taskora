import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, LayoutDashboard, ListTodo, PieChart, Heart, MessageCircle, Plus, Cloud, LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
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
        <div className="flex items-center gap-3 px-4 py-3 bg-sage-50 rounded-3xl border border-sage-100">
          <div className="w-10 h-10 rounded-full bg-sage-900 flex items-center justify-center text-white shadow-soft">
            <User size={20} />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold text-sage-900 truncate">{user?.name || 'User'}</p>
            <button 
              onClick={logout}
              className="text-[10px] font-bold text-rose-400 hover:text-rose-600 transition-colors uppercase tracking-widest flex items-center gap-1"
            >
              <LogOut size={10} /> Logout
            </button>
          </div>
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
