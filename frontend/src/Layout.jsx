import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-animated-gradient flex text-dark-slate">
      {/* Sidebar Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 ml-[280px] p-8 overflow-y-auto h-screen relative z-10">
        <header className="mb-12 flex justify-between items-center glass-morphism rounded-[2rem] p-6 px-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-dark-slate tracking-tight">Welcome back</h1>
            <p className="text-slate-600 font-medium mt-1">Your gentle productivity companion ✨</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/40 border-2 border-white flex items-center justify-center text-accent-purple shadow-sm">
            <span className="font-heading font-bold">JD</span>
          </div>
        </header>
        
        <main className="max-w-6xl mx-auto pb-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
