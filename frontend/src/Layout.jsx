import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, User } from 'lucide-react';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-sage-50 flex text-sage-900 overflow-hidden">
      {/* Sidebar Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 ml-[320px] p-8 h-screen overflow-y-auto relative z-10 scroll-smooth">
        <header className="mb-10 flex justify-between items-center bg-white/40 backdrop-blur-md rounded-5xl p-6 px-10 border border-sage-100 shadow-soft">
          <div className="flex items-center gap-6 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-sage-400" size={18} />
              <input 
                type="text" 
                placeholder="Search your thoughts..." 
                className="w-full pl-12 pr-6 py-3 rounded-2xl bg-sage-50/50 border-transparent focus:bg-white focus:border-sage-200 focus:ring-0 transition-all duration-300 text-sm font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="w-12 h-12 rounded-2xl bg-white border border-sage-100 flex items-center justify-center text-sage-400 hover:text-sage-600 hover:shadow-hover transition-all duration-300 relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-rose-400 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-4 pl-6 border-l border-sage-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-sage-900 leading-none">Alex Rivera</p>
                <p className="text-[10px] font-bold text-sage-400 uppercase tracking-widest mt-1">Free Soul</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-sage-200 border-2 border-white flex items-center justify-center text-sage-600 shadow-soft overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Layout;
