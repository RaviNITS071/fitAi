import React, { useState, useEffect } from 'react';
import { 
  Target, TrendingUp, Dumbbell, Utensils, Bot, 
  ArrowLeft, CheckCircle2, ChevronRight, Activity, Zap, Sparkles
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { generateAIPlan } from './api/client.js';

import Login from './components/Login.jsx';
import ProfileForm from './components/ProfileForm.jsx';
import PlanDisplay from './components/PlanDisplay.jsx';
import ProgressTracker from './components/ProgressTracker.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';

// Pages
import Workouts from './pages/Workouts.jsx';
import Nutrition from './pages/Nutrition.jsx';
import RagExplorer from './pages/RagExplorer.jsx';
import Pricing from './pages/Pricing.jsx';
import Community from './pages/Community.jsx';
import AICoachStudio from './pages/AICoachStudio.jsx';
import ErrorPagesShowcase from './components/ErrorPagesShowcase.jsx';

function DashboardContent({ user, setUser, loading, setLoading, isDarkMode, toggleTheme, onLogout }) {
  const [activeTab, setActiveTab] = useState('plan');
  const [errorModal, setErrorModal] = useState(null);

  const handleGeneratePlan = async () => {
    setLoading(true);
    try {
      const res = await generateAIPlan(user._id);
      setUser(res.data);
      setErrorModal(null);
    } catch (err) {
      console.warn("Plan Generation Encountered Issue:", err);
      // Rather than raw browser alert, trigger the modern AI Credits / Rate Limit error view
      setErrorModal({
        type: 'ai-credits',
        message: err.response?.data?.error || err.message
      });
    } finally {
      setLoading(false);
    }
  };

  const dashboardTabs = [
    { id: 'plan', label: 'Workout & Diet Plan', icon: <Target size={16} /> },
    { id: 'progress', label: 'Daily Tracking', icon: <TrendingUp size={16} /> },
    { id: 'studio', label: 'Exercise Library', icon: <Dumbbell size={16} /> },
    { id: 'nutrition', label: 'Macro Calculator', icon: <Utensils size={16} /> },
    { id: 'coach', label: 'AI Coach Chat', icon: <Bot size={16} /> },
  ];

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? 'dark bg-[#0B0F17] text-white' : 'bg-[#F8FAFC] text-slate-900'} pb-20`}>
      <Navbar 
        user={user} 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        onLogout={onLogout} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Athlete Overview KPI Bar - Clean, High Density, Apple/Strava Style */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-card mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {user.avatar ? (
                <img src={user.avatar} alt={user.username} className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-slate-700" />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-slate-900 dark:bg-slate-800 text-white font-bold text-lg flex items-center justify-center">
                  {(user.username || 'A')[0].toUpperCase()}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                    {user.username || 'Athlete'}
                  </h1>
                  <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    Active
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Goal: <span className="font-semibold text-slate-700 dark:text-slate-300">{user.profile?.goal || 'General Health'}</span> • Schedule: <span className="font-semibold text-slate-700 dark:text-slate-300">{user.profile?.schedule || '6-Day Split'}</span>
                </p>
              </div>
            </div>

            {/* Core Athlete Metrics */}
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 min-w-[110px]">
                <span className="block text-[11px] font-medium text-slate-500 uppercase tracking-wide">Target Calories</span>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {user.aiPlan?.dietPlan?.targetCalories || 2000} <span className="text-xs font-normal text-slate-500">kcal</span>
                </span>
              </div>
              <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 min-w-[110px]">
                <span className="block text-[11px] font-medium text-slate-500 uppercase tracking-wide">Weight</span>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {user.profile?.weight || 70} <span className="text-xs font-normal text-slate-500">kg</span>
                </span>
              </div>
              <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 min-w-[110px]">
                <span className="block text-[11px] font-medium text-slate-500 uppercase tracking-wide">Days Logged</span>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {user.progressLogs?.length || 0} <span className="text-xs font-normal text-slate-500">days</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs - Clean Segmented Control */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-6 custom-scrollbar bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg w-fit">
          {dashboardTabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)} 
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id 
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div>
          {activeTab === 'plan' && (
            <>
              {!user.aiPlan?.workoutPlan ? (
                <div className="space-y-6">
                  <ProfileForm user={user} onProfileSaved={setUser} />
                  <button 
                    onClick={handleGeneratePlan} 
                    disabled={loading} 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white p-3.5 rounded-lg font-medium text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>{loading ? "Generating Your Training & Nutrition Plan..." : "Generate Personalized Plan"}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <button
                      onClick={handleGeneratePlan}
                      disabled={loading}
                      className="px-4 py-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 shadow-sm"
                    >
                      <Sparkles size={14} className="text-emerald-500" />
                      <span>{loading ? "Regenerating..." : "Regenerate Plan"}</span>
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

      {/* Modern SaaS Error State Modal Overlay */}
      {errorModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-4xl relative">
            <ErrorPagesShowcase 
              initialError={errorModal} 
              onClose={() => setErrorModal(null)} 
              onRetry={handleGeneratePlan} 
            />
          </div>
        </div>
      )}
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

      {/* Primary Athlete Pages */}
      <Route path="/workouts" element={
        <div className={isDarkMode ? 'dark bg-[#0B0F17] text-white min-h-screen' : 'bg-[#F8FAFC] text-slate-900 min-h-screen'}>
          <Navbar user={user} isDarkMode={isDarkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
          <Workouts />
        </div>
      } />

      <Route path="/nutrition" element={
        <div className={isDarkMode ? 'dark bg-[#0B0F17] text-white min-h-screen' : 'bg-[#F8FAFC] text-slate-900 min-h-screen'}>
          <Navbar user={user} isDarkMode={isDarkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
          <Nutrition />
        </div>
      } />

      <Route path="/coach" element={
        <div className={isDarkMode ? 'dark bg-[#0B0F17] text-white min-h-screen' : 'bg-[#F8FAFC] text-slate-900 min-h-screen'}>
          <Navbar user={user} isDarkMode={isDarkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
          <AICoachStudio user={user} />
        </div>
      } />

      <Route path="/rag-explorer" element={
        <div className={isDarkMode ? 'dark bg-[#0B0F17] text-white min-h-screen' : 'bg-[#F8FAFC] text-slate-900 min-h-screen'}>
          <Navbar user={user} isDarkMode={isDarkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
          <RagExplorer />
        </div>
      } />

      <Route path="/pricing" element={
        <div className={isDarkMode ? 'dark bg-[#0B0F17] text-white min-h-screen' : 'bg-[#F8FAFC] text-slate-900 min-h-screen'}>
          <Navbar user={user} isDarkMode={isDarkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
          <Pricing />
        </div>
      } />

      <Route path="/community" element={
        <div className={isDarkMode ? 'dark bg-[#0B0F17] text-white min-h-screen' : 'bg-[#F8FAFC] text-slate-900 min-h-screen'}>
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
              className="fixed top-4 left-4 z-50 flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 rounded-lg shadow-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium text-xs border border-slate-200 dark:border-slate-800"
            >
              <ArrowLeft size={14} /> Back to Home
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

      {/* Error & Status Pages Suite Showcase */}
      <Route path="/errors" element={<ErrorPagesShowcase />} />
      <Route path="/error-showcase" element={<ErrorPagesShowcase />} />

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
