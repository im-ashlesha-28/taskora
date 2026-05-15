import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen pb-32 pt-12 px-6 lg:px-24 max-w-7xl mx-auto">
      <header className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Taskora</h1>
          <p className="text-slate-500 font-medium">Your gentle productivity companion ✨</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-soft-lavender flex items-center justify-center text-white soft-shadow">
          <span className="font-bold">JD</span>
        </div>
      </header>
      
      <main>
        <Outlet />
      </main>

      <Navbar />
    </div>
  );
};

export default Layout;
