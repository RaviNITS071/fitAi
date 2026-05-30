import React from 'react';
import { Activity, Sun, Moon, LogOut } from 'lucide-react';

export default function Navbar({ user, isDarkMode, toggleTheme, onLogout }) {
  return (
    <nav className="w-full mb-8">
      <div className="bg-[#111827] border border-slate-800 rounded-2xl px-6 py-4 shadow-2xl flex items-center justify-between transition-all">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">
            <Activity className="text-white w-5 h-5" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            FitAI <span className="text-blue-500">Pro</span>
          </span>
        </div>

        {/* Right: Actions (Matches image_2dfcdd.png) */}
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-300 hidden sm:inline">
              Hi, <span className="uppercase text-white">{user?.username || 'USER'}</span>
            </span>
            <button 
              onClick={toggleTheme}
              className="text-slate-400 hover:text-amber-400 transition-colors p-1"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 bg-[#1f2937] hover:bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl transition-all active:scale-95 group"
          >
            <LogOut size={18} className="text-rose-500 group-hover:-translate-x-1 transition-transform" />
            <span className="text-rose-500 font-black text-xs md:text-sm uppercase tracking-wider">Logout</span>
          </button>
        </div>
        
      </div>
    </nav>
  );
}