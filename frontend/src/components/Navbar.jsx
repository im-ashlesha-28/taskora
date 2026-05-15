import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, LayoutDashboard, ListTodo, PieChart, Heart, PlusCircle, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'All Tasks', path: '/tasks', icon: <ListTodo size={20} /> },
    { name: 'Recommendations', path: '/recommendations', icon: <Sparkles size={20} /> },
    { name: 'Reflections', path: '/reflection', icon: <MessageCircle size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <PieChart size={20} /> },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 glass-morphism rounded-full soft-shadow flex items-center gap-6 border border-white/40">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-all duration-300 ${
              isActive ? 'text-dusty-rose scale-110 font-semibold' : 'text-slate-400 hover:text-slate-600'
            }`
          }
        >
          {item.icon}
          <span className="text-[10px] uppercase tracking-wider">{item.name}</span>
        </NavLink>
      ))}
      <NavLink
        to="/add-task"
        className="ml-2 w-10 h-10 bg-dusty-rose text-white rounded-full flex items-center justify-center shadow-lg hover:bg-muted-lilac transition-colors duration-300"
      >
        <PlusCircle size={20} />
      </NavLink>
    </nav>
  );
};

export default Navbar;
