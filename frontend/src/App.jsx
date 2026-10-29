import React, { useState, useEffect } from 'react';
import { 
  Target, TrendingUp, Dumbbell, Utensils, Bot, Database, 
  ArrowLeft, Sparkles, Flame, Droplets, Clock 
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { generateAIPlan } from './api/client.js';

import Login from './components/Login.jsx';
import ProfileForm from './components/ProfileForm.jsx';
import PlanDisplay from './components/PlanDisplay.jsx';
import ProgressTracker from './components/ProgressTracker.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';

// New Complete Pages
import Workouts from './pages/Workouts.jsx';
import Nutrition from './pages/Nutrition.jsx';
import RagExplorer from './pages/RagExplorer.jsx';
import Pricing from './pages/Pricing.jsx';
import Community from './pages/Community.jsx';
import AICoachStudio from './pages/AICoachStudio.jsx';

function DashboardContent({ user, setUser, loading, setLoading, isDarkMode, toggleTheme, onLogout }) {
  const [activeTab, setActiveTab] = useState('plan');

  const handleGeneratePlan = async () => {
    setLoading(true);
    try {
      const res = await generateAIPlan(user._id);
      setUser(res.data);
    } catch (err) {
      alert("AI Generation Failed: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const dashboardTabs = [
    { id: 'plan', label: 'My AI Plan', icon: <Target size={18} /> },
    { id: 'progress', label: 'Track Progress', icon: <TrendingUp size={18} /> },
    { id: 'studio', label: 'Exercise Studio', icon: <Dumbbell size={18} /> },
    { id: 'nutrition', label: 'Nutrition & Macros', icon: <Utensils size={18} /> },
    { id: 'coach', label: 'AI Coach Chat', icon: <Bot size={18} /> },
  ];

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? 'dark bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} pb-24`}>
      <Navbar 
        user={user} 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        onLogout={onLogout} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Athlete Overview Welcome Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/20 dark:shadow-none mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {user.avatar ? (
              <img src={user.avatar} alt={user.username} className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500 shadow-lg" />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                {(user.username || 'A')[0].toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  Welcome back, {user.username || 'Athlete'}!
                </h1>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Active
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                Goal: <strong className="text-indigo-600 dark:text-indigo-400">{user.profile?.goal || 'General Health'}</strong> • Split: <strong>{user.profile?.schedule || '6-Day Split'}</strong>
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 min-w-[110px]">
              <span className="block text-[10px] font-black uppercase text-slate-400">Target Calories</span>
              <span className="text-base font-black text-slate-900 dark:text-white">
                {user.aiPlan?.dietPlan?.targetCalories || 2000} <span className="text-xs font-semibold text-emerald-500">kcal</span>
              </span>
            </div>
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 min-w-[110px]">
              <span className="block text-[10px] font-black uppercase text-slate-400">Current Weight</span>
              <span className="text-base font-black text-slate-900 dark:text-white">
                {user.profile?.weight || 70} <span className="text-xs font-semibold text-indigo-500">kg</span>
              </span>
            </div>
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 min-w-[110px]">
              <span className="block text-[10px] font-black uppercase text-slate-400">Logs Recorded</span>
              <span className="text-base font-black text-slate-900 dark:text-white">
                {user.progressLogs?.length || 0} <span className="text-xs font-semibold text-purple-500">days</span>
              </span>
            </div>
          </div>
        </div>

        {/* Action Tabs Bar */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 custom-scrollbar">
          {dashboardTabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)} 
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 scale-102' 
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="space-y-8">
          {activeTab === 'plan' && (
            <>
              {!user.aiPlan?.workoutPlan ? (
                <div className="space-y-6">
                  <ProfileForm user={user} onProfileSaved={setUser} />
                  <button 
                    onClick={handleGeneratePlan} 
                    disabled={loading} 
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white p-5 rounded-3xl font-black text-lg shadow-xl shadow-indigo-600/20 active:scale-98 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles size={20} />
                    <span>{loading ? "RAG Engine is Grounding Your Plan..." : "Generate Grounded AI Diet & Workout Plan ⚡"}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <button
                      onClick={handleGeneratePlan}
                      disabled={loading}
                      className="px-5 py-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800/50 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
                    >
                      <Sparkles size={16} />
                      <span>{loading ? "Re-generating..." : "Regenerate Plan with New Biometrics"}</span>
                    </button>
                  </div>
                  <PlanDisplay aiPlan={user.aiPlan} user={user} />
                </div>
              )}
            </>
          )}

          {activeTab === 'progress' && (
            <ProgressTracker user={user} onProgressUpdated={setUser} />
          )}

          {activeTab === 'studio' && (
            <Workouts />
          )}

          {activeTab === 'nutrition' && (
            <Nutrition />
          )}

          {activeTab === 'coach' && (
            <AICoachStudio user={user} />
          )}
        </div>
      </div>
    </div>
  );
}

function AppRoutes() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('fitai_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') !== 'light';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('fitai_user', JSON.stringify(userData));
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('fitai_user');
    localStorage.removeItem('fitai_token');
    navigate('/home');
  };

  const handleNavigateFromHome = (action) => {
    if (user && (action === 'login' || action === 'onboarding')) {
      navigate('/dashboard');
    } else {
      navigate(`/${action}`);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      
      {/* Home Route */}
      <Route 
        path="/home" 
        element={
          <Home 
            onNavigate={handleNavigateFromHome} 
            isDarkMode={isDarkMode} 
            toggleTheme={toggleTheme} 
            user={user} 
            onLogout={handleLogout} 
          />
        } 
      />

      {/* Complete Pages */}
      <Route path="/workouts" element={
        <div className={isDarkMode ? 'dark bg-slate-950 text-white min-h-screen' : 'bg-slate-50 text-slate-900 min-h-screen'}>
          <Navbar user={user} isDarkMode={isDarkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
          <Workouts />
        </div>
      } />

      <Route path="/nutrition" element={
        <div className={isDarkMode ? 'dark bg-slate-950 text-white min-h-screen' : 'bg-slate-50 text-slate-900 min-h-screen'}>
          <Navbar user={user} isDarkMode={isDarkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
          <Nutrition />
        </div>
      } />

      <Route path="/coach" element={
        <div className={isDarkMode ? 'dark bg-slate-950 text-white min-h-screen' : 'bg-slate-50 text-slate-900 min-h-screen'}>
          <Navbar user={user} isDarkMode={isDarkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
          <AICoachStudio user={user} />
        </div>
      } />

      <Route path="/rag-explorer" element={
        <div className={isDarkMode ? 'dark bg-slate-950 text-white min-h-screen' : 'bg-slate-50 text-slate-900 min-h-screen'}>
          <Navbar user={user} isDarkMode={isDarkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
          <RagExplorer />
        </div>
      } />

      <Route path="/pricing" element={
        <div className={isDarkMode ? 'dark bg-slate-950 text-white min-h-screen' : 'bg-slate-50 text-slate-900 min-h-screen'}>
          <Navbar user={user} isDarkMode={isDarkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
          <Pricing />
        </div>
      } />

      <Route path="/community" element={
        <div className={isDarkMode ? 'dark bg-slate-950 text-white min-h-screen' : 'bg-slate-50 text-slate-900 min-h-screen'}>
          <Navbar user={user} isDarkMode={isDarkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
          <Community />
        </div>
      } />

      {/* Auth Route */}
      <Route path="/login" element={
        user ? (
          <Navigate to="/dashboard" replace />
        ) : (
          <div className={isDarkMode ? 'dark' : ''}>
            <button 
              onClick={() => navigate('/home')} 
              className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full shadow-lg text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-bold text-sm border border-slate-200 dark:border-slate-700"
            >
              <ArrowLeft size={16} /> Back to Home
            </button>
            <Login onLoginSuccess={handleLoginSuccess} />
          </div>
        )
      } />

      <Route path="/onboarding" element={
        user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
      } />

      {/* Dashboard Route */}
      <Route path="/dashboard" element={
        user ? (
          <DashboardContent 
            user={user} 
            setUser={(updated) => {
              setUser(updated);
              localStorage.setItem('fitai_user', JSON.stringify(updated));
            }} 
            loading={loading} 
            setLoading={setLoading}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            onLogout={handleLogout}
          />
        ) : (
          <Navigate to="/login" replace />
        )
      } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}