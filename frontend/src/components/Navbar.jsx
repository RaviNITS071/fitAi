import React, { useState } from 'react';
import { 
  Sun, Moon, User, LogOut, LayoutDashboard, Dumbbell, 
  Utensils, Sparkles, Database, Tag, Users, Menu, X, Bot
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar({ user, isDarkMode, toggleTheme, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Workouts', path: '/workouts', icon: <Dumbbell size={16} /> },
    { name: 'Nutrition', path: '/nutrition', icon: <Utensils size={16} /> },
    { name: 'AI Coach', path: '/coach', icon: <Bot size={16} /> },
    { name: 'RAG Engine', path: '/rag-explorer', icon: <Database size={16} />, badge: 'GenAI' },
    { name: 'Pricing', path: '/pricing', icon: <Tag size={16} /> },
    { name: 'Community', path: '/community', icon: <Users size={16} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-600 to-emerald-400 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-all duration-300">
            F
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Fit<span className="text-indigo-600 dark:text-indigo-400">AI</span></span>
            <span className="hidden sm:inline-block ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/40">RAG Pro</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
              {item.badge && (
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Right Action Icons & Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 focus:outline-none"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={19} className="text-amber-400" /> : <Moon size={19} className="text-slate-600" />}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-sm ${
                  isActive('/dashboard')
                    ? 'bg-indigo-600 text-white shadow-indigo-500/20'
                    : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800/40'
                }`}
              >
                <LayoutDashboard size={16} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>

              {/* User Avatar badge */}
              <div className="flex items-center gap-2 pl-1 pr-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username} className="w-7 h-7 rounded-full object-cover" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                    {(user.username || 'U')[0].toUpperCase()}
                  </div>
                )}
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 max-w-[90px] truncate hidden md:inline">
                  {user.username}
                </span>
              </div>

              <button
                onClick={onLogout}
                className="p-2.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/login"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 active:scale-95 transition-all"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors ml-1"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 px-6 py-4 space-y-2 backdrop-blur-xl animate-in slide-in-from-top-2">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${
                isActive(item.path)
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
          {user && (
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30"
            >
              <LayoutDashboard size={18} />
              <span>Go to Dashboard</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}