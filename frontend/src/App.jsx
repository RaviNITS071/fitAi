import React, { useState, useEffect } from 'react';
import { Activity, Target, TrendingUp, Sun, Moon, LogOut } from 'lucide-react';
import { generateAIPlan } from './api/client';
import Login from './components/Login';
import ProfileForm from './components/ProfileForm';
import PlanDisplay from './components/PlanDisplay';
import ProgressTracker from './components/ProgressTracker';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('plan');
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
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

  const handleGeneratePlan = async () => {
    setLoading(true);
    try {
      const res = await generateAIPlan(user._id);
      setUser(res.data);
    } catch (err) {
      alert("AI Generation Failed");
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className={isDarkMode ? 'dark' : ''}>
        <Login onLoginSuccess={setUser} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? 'dark bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'} p-4 md:p-8`}>
      <div className="max-w-5xl mx-auto">
        
        <div className="flex justify-between items-center mb-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm transition-colors">
          <h1 className="text-xl font-bold flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Activity /> FitAI Pro
          </h1>
          
          <div className="flex items-center gap-4">
             <span className="text-slate-600 dark:text-slate-300 font-medium hidden md:block">
               Hi, {user.username}
             </span>
             
             <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                title="Toggle Dark Mode"
              >
               {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
             </button>

             <button 
                onClick={() => setUser(null)} 
                className="flex items-center gap-1 text-red-500 font-bold hover:text-red-700 bg-red-50 dark:bg-red-500/10 px-4 py-2 rounded-lg transition-colors"
              >
               <LogOut size={16} /> <span className="hidden md:inline">Logout</span>
             </button>
          </div>
        </div>

        {user.aiPlan?.workoutPlan && (
          <div className="flex gap-4 mb-6">
            <button 
              onClick={() => setActiveTab('plan')} 
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors ${activeTab === 'plan' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
            >
              <Target size={20} /> My Plan
            </button>
            <button 
              onClick={() => setActiveTab('progress')} 
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors ${activeTab === 'progress' ? 'bg-purple-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
            >
              <TrendingUp size={20} /> Track Progress
            </button>
          </div>
        )}

        {activeTab === 'plan' ? (
          <>
            {!user.aiPlan?.workoutPlan ? (
              <>
                <ProfileForm user={user} onProfileSaved={setUser} />
                <button onClick={handleGeneratePlan} disabled={loading} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transition-colors text-white p-4 rounded-xl font-bold text-lg">
                  {loading ? "AI is generating your plan..." : "Generate AI Diet & Workout Plan ⚡"}
                </button>
              </>
            ) : (
              <PlanDisplay aiPlan={user.aiPlan} />
            )}
          </>
        ) : (
          <ProgressTracker user={user} onProgressUpdated={setUser} />
        )}
      </div>
    </div>
  );
}
