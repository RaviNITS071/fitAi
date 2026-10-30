import React, { useState, useMemo } from 'react';
import { logUserProgress } from '../api/client.js';
import Chatbot from './Chatbot';
import { 
  TrendingUp, Droplet, Flame, CheckCircle, Calendar, 
  History, Dumbbell, Clock, AlertCircle, Info, Wind, 
  Utensils, RotateCcw, ShieldCheck, ChevronRight
} from 'lucide-react';

export default function ProgressTracker({ user, onProgressUpdated }) {
  const [logData, setLogData] = useState({
    weight: user?.profile?.weight || '', 
    waterIntake: '', 
    caloriesConsumed: '', 
    sleepHours: '',
    energyLevel: 'High',
    workoutCompleted: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Smart Adaptive Logic Engine
  const adaptiveInsights = useMemo(() => {
    const insights = [];
    const calIntake = Number(logData.caloriesConsumed);
    const sleep = Number(logData.sleepHours);
    const water = Number(logData.waterIntake);
    
    // Recovery Check
    if (logData.energyLevel === 'Low' || (sleep > 0 && sleep < 6)) {
      insights.push({
        type: 'recovery',
        title: 'Active Recovery Protocol',
        desc: 'Reduced sleep or elevated fatigue detected. Recommend mobility work or a 15-minute walk instead of maximal compound lifting.',
        icon: <Wind size={16} />,
        border: 'border-amber-200 dark:border-amber-800/60',
        bg: 'bg-amber-50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-300'
      });
    }

    // Caloric Intake Check
    if (calIntake > 2600) {
      insights.push({
        type: 'diet',
        title: 'Caloric Surplus Management',
        desc: 'Energy intake above baseline. Recommend high-protein lean sources and a 10-minute post-meal walk for glycemic control.',
        icon: <Utensils size={16} />,
        border: 'border-slate-200 dark:border-slate-700',
        bg: 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200'
      });
    } else if (calIntake > 0 && calIntake < 1200) {
      insights.push({
        type: 'diet',
        title: 'Low Calorie Alert',
        desc: 'Intake is significantly below minimum metabolic needs. Prioritize nutrient-dense proteins to prevent catabolic breakdown.',
        icon: <AlertCircle size={16} />,
        border: 'border-rose-200 dark:border-rose-800/60',
        bg: 'bg-rose-50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-300'
      });
    }

    // Hydration Check
    if (water > 0 && water < 2) {
      insights.push({
        type: 'hydration',
        title: 'Hydration Deficit',
        desc: 'Fluid intake below target. Hydrate with 500ml water to sustain intra-muscular glycogen storage and cognitive focus.',
        icon: <Droplet size={16} />,
        border: 'border-blue-200 dark:border-blue-800/60',
        bg: 'bg-blue-50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-300'
      });
    }

    return insights;
  }, [logData]);

  // Historical Analytics Engine
  const stats = useMemo(() => {
    const logs = user?.progressLogs || [];
    if (logs.length === 0) return null;

    const last7 = logs.slice(-7);
    const avgWater = (last7.reduce((acc, curr) => acc + (Number(curr.waterIntake) || 0), 0) / last7.length).toFixed(1);
    const avgCalories = Math.round(last7.reduce((acc, curr) => acc + (Number(curr.caloriesConsumed) || 0), 0) / last7.length);
    const weightChange = logs.length > 1 ? (logs[logs.length - 1].weight - logs[0].weight).toFixed(1) : 0;
    
    let streak = 0;
    const sortedLogs = [...logs].sort((a, b) => new Date(b.date) - new Date(a.date));
    for (let i = 0; i < sortedLogs.length; i++) {
      if (sortedLogs[i].workoutCompleted) streak++;
      else break;
    }

    return { 
      avgWater, 
      avgCalories, 
      weightChange, 
      streak, 
      totalLogs: logs.length,
      completionRate: Math.round((logs.filter(l => l.workoutCompleted).length / logs.length) * 100) || 0
    };
  }, [user?.progressLogs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        date: new Date(),
        weight: Number(logData.weight),
        waterIntake: Number(logData.waterIntake),
        caloriesConsumed: Number(logData.caloriesConsumed),
        sleepHours: Number(logData.sleepHours),
        energyLevel: logData.energyLevel,
        workoutCompleted: logData.workoutCompleted
      };
      const res = await logUserProgress(user._id, payload);
      onProgressUpdated(res.data);
      // Reset daily form
      setLogData({
        weight: user?.profile?.weight || '',
        waterIntake: '',
        caloriesConsumed: '',
        sleepHours: '',
        energyLevel: 'High',
        workoutCompleted: false
      });
    } catch (err) {
      console.error(err);
      alert("Failed to save progress log");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Athlete Performance Summary Bar - Minimalist High Contrast */}
      <div className="bg-slate-900 dark:bg-slate-800 text-white p-6 rounded-xl shadow-card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="md:col-span-2 space-y-1">
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block">
              Program Status
            </span>
            <p className="text-sm sm:text-base font-medium text-slate-100">
              {stats?.streak > 2 
                ? `${stats.streak}-day consistent training streak. Progressive overload is well-calibrated.`
                : 'Logging daily metrics adapts workout load and macro distribution in real time.'}
            </p>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-6">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">7-Day Avg</span>
            <span className="text-xl font-bold">{stats?.avgCalories || 0} kcal</span>
            <span className="text-xs text-slate-400 ml-2">• {stats?.avgWater || 0}L fluids</span>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-6 text-left md:text-right">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Plan Compliance</span>
            <span className="text-2xl font-bold text-emerald-400">{stats?.completionRate || 0}%</span>
          </div>
        </div>
      </div>

      {/* 2. Daily Entry Form & Real-time Insights */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Daily Performance Log</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Record biometrics to calibrate recovery and next-session volume</p>
          </div>

          {adaptiveInsights.length > 0 && (
            <div className="flex flex-col gap-2 max-w-md">
              {adaptiveInsights.map((insight, idx) => (
                <div key={idx} className={`p-3 rounded-lg border ${insight.border} ${insight.bg} text-xs flex items-start gap-2.5`}>
                  <span className="mt-0.5 shrink-0">{insight.icon}</span>
                  <div>
                    <span className="font-semibold block">{insight.title}</span>
                    <span className="opacity-90">{insight.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Body Mass (kg)
            </label>
            <input 
              type="number" 
              step="0.1" 
              value={logData.weight} 
              onChange={e => setLogData({...logData, weight: e.target.value})} 
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-white rounded-lg outline-none focus:border-slate-900 dark:focus:border-slate-400 text-sm font-medium" 
              placeholder="e.g. 72.5" 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Hydration (Liters)
            </label>
            <input 
              type="number" 
              step="0.1" 
              value={logData.waterIntake} 
              onChange={e => setLogData({...logData, waterIntake: e.target.value})} 
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-white rounded-lg outline-none focus:border-slate-900 dark:focus:border-slate-400 text-sm font-medium" 
              placeholder="e.g. 3.0" 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Calories Consumed
            </label>
            <input 
              type="number" 
              value={logData.caloriesConsumed} 
              onChange={e => setLogData({...logData, caloriesConsumed: e.target.value})} 
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-white rounded-lg outline-none focus:border-slate-900 dark:focus:border-slate-400 text-sm font-medium" 
              placeholder="e.g. 2100" 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Sleep Duration (Hours)
            </label>
            <input 
              type="number" 
              step="0.5" 
              value={logData.sleepHours} 
              onChange={e => setLogData({...logData, sleepHours: e.target.value})} 
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-white rounded-lg outline-none focus:border-slate-900 dark:focus:border-slate-400 text-sm font-medium" 
              placeholder="e.g. 7.5" 
              required 
            />
          </div>

          {/* Energy Level Selector */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Energy & Readiness State
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Low', 'Mid', 'High'].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setLogData({...logData, energyLevel: level})}
                  className={`py-2 rounded-lg text-xs font-semibold transition-colors border ${
                    logData.energyLevel === level 
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm' 
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {level} Energy
                </button>
              ))}
            </div>
          </div>

          {/* Workout Completed Toggle */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Workout Session Executed?
            </label>
            <button
              type="button"
              onClick={() => setLogData({...logData, workoutCompleted: !logData.workoutCompleted})}
              className={`w-full py-2 px-4 rounded-lg text-xs font-semibold transition-colors border flex items-center justify-center gap-2 ${
                logData.workoutCompleted 
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-400' 
                  : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <CheckCircle size={16} className={logData.workoutCompleted ? 'text-emerald-600' : 'text-slate-400'} />
              <span>{logData.workoutCompleted ? 'Workout Completed (Logged)' : 'Rest Day or Skipped Session'}</span>
            </button>
          </div>

          <div className="md:col-span-4 pt-2">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? 'Logging...' : 'Save Today\'s Entry'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* 3. Activity Archive - Clean High-Density Table */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-card">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <History size={18} className="text-slate-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Training History</h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {stats?.totalLogs || 0} Total Entries
          </span>
        </div>

        {user?.progressLogs && user.progressLogs.length > 0 ? (
          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
            {[...user.progressLogs].reverse().slice(0, 10).map((log, i) => (
              <div 
                key={i} 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-800 text-xs gap-3"
              >
                <div className="flex items-center gap-3 min-w-[140px]">
                  <Calendar size={15} className="text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', weekday: 'short' })}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-4 flex-1">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Weight</span>
                    <span className="font-bold text-slate-900 dark:text-white">{log.weight} kg</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Water</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{log.waterIntake} L</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Calories</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">{log.caloriesConsumed} kcal</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Sleep</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{log.sleepHours || '--'} hrs</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:justify-end">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                    log.workoutCompleted 
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' 
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {log.workoutCompleted ? 'Workout Done' : 'Rest Day'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400 text-sm">
            No entries recorded yet. Submit your first daily log above.
          </div>
        )}
      </div>

      {user && <Chatbot user={user} />}
    </div>
  );
}
