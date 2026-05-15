import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, LayoutDashboard, ListTodo, PieChart, MessageCircle, Plus } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'All Tasks', path: '/tasks', icon: <ListTodo size={20} /> },
    { name: 'Recommendations', path: '/recommendations', icon: <Sparkles size={20} /> },
    { name: 'Reflections', path: '/reflection', icon: <MessageCircle size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <PieChart size={20} /> },
  ];

  return (
    <nav className="w-[240px] h-[calc(100vh-40px)] fixed top-5 left-5 glass-morphism rounded-[2rem] flex flex-col justify-between py-10 z-50">
      <div>
        <div className="px-8 mb-12 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-accent-purple">
            <Sparkles size={22} />
          </div>
          <h2 className="text-2xl font-heading font-bold tracking-tight text-dark-slate">Taskora</h2>
        </div>

        <div className="flex flex-col gap-2 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium ${
                  isActive 
                    ? 'bg-white/60 text-accent-purple shadow-sm translate-x-2' 
                    : 'text-slate-600 hover:bg-white/40 hover:text-dark-slate'
                }`
              }
            >
              {item.icon}
              <span className="font-semibold">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="px-4">
        <NavLink
          to="/add-task"
          className="w-full bg-white/60 hover:bg-white/90 text-dark-slate shadow-sm hover:shadow-md py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all duration-300 transform hover:-translate-y-1"
        >
          <Plus size={20} className="text-accent-purple" />
          <span>New Task</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
