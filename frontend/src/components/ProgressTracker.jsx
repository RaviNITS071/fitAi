import React, { useState, useMemo } from 'react';
import { logUserProgress } from '../api/client.js';
import Chatbot from './Chatbot'; // Adjust this path if your Chatbot component is in another folder
import { 
  TrendingUp, Droplet, Flame, CheckCircle, Calendar, 
  PlusCircle, History, Layout, ArrowRight, Zap, 
  Target, BarChart3, ChevronRight, Moon, ShieldCheck,
  AlertCircle, Smile, Info, TrendingDown, Dumbbell,
  Clock, RotateCcw, Utensils, BedDouble, Wind
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

  // Smart Adaptive Logic Engine
  const adaptiveInsights = useMemo(() => {
    const insights = [];
    const calIntake = Number(logData.caloriesConsumed);
    const sleep = Number(logData.sleepHours);
    const water = Number(logData.waterIntake);
    
    // 1. Tiredness Check
    if (logData.energyLevel === 'Low' || (sleep > 0 && sleep < 6)) {
      insights.push({
        type: 'recovery',
        title: 'Active Recovery Protocol',
        desc: 'Fatigue or poor sleep detected. Switch to a 15-min restorative yoga flow or light stretching instead of high-intensity work.',
        icon: <Wind size={18} />,
        color: 'text-amber-600 dark:text-amber-400',
        bg: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200/50 dark:border-amber-500/20'
      });
    }

    // 2. Extra/Low Calories Check
    if (calIntake > 2500) {
      insights.push({
        type: 'diet',
        title: 'Caloric Rebalancing',
        desc: 'Intake is higher than baseline. We recommend a high-protein/low-carb dinner and 10 extra minutes of steady-state cardio.',
        icon: <Utensils size={18} />,
        color: 'text-rose-600 dark:text-rose-400',
        bg: 'bg-rose-50 dark:bg-rose-500/10 border-rose-200/50 dark:border-rose-500/20'
      });
    } else if (calIntake > 0 && calIntake < 1200) {
       insights.push({
        type: 'diet',
        title: 'Fuel Warning',
        desc: 'Caloric intake is very low. Ensure you consume nutrient-dense foods to prevent muscle loss and maintain energy.',
        icon: <AlertCircle size={18} />,
        color: 'text-orange-600 dark:text-orange-400',
        bg: 'bg-orange-50 dark:bg-orange-500/10 border-orange-200/50 dark:border-orange-500/20'
      });
    }

    // 3. Hydration Check
    if (water > 0 && water < 2) {
       insights.push({
        type: 'hydration',
        title: 'Hydration Deficit',
        desc: 'Water intake is below optimal levels. Sip water constantly over the next few hours to improve cellular function.',
        icon: <Droplet size={18} />,
        color: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-blue-50 dark:bg-blue-500/10 border-blue-200/50 dark:border-blue-500/20'
      });
    }

    // 4. Missed Workout Check
    if (!logData.workoutCompleted && logData.energyLevel !== 'Low') {
      insights.push({
        type: 'schedule',
        title: 'Smart Rescheduling',
        desc: 'Missed today? No problem. AI has adjusted tomorrow\'s volume by -15% to prevent burnout while ensuring progress.',
        icon: <RotateCcw size={18} />,
        color: 'text-indigo-600 dark:text-indigo-400',
        bg: 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200/50 dark:border-indigo-500/20'
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

  // Dynamic AI Status based on Diet & Daily Log
  const aiStatusText = useMemo(() => {
    const dietType = user?.profile?.dietaryPreference || 'current diet';
    const currentCalories = Number(logData.caloriesConsumed);
    const currentSleep = Number(logData.sleepHours);
    const currentWater = Number(logData.waterIntake);

    // Priority 1: Severe Deficits (Sleep or Water)
    if (currentSleep > 0 && currentSleep < 6) return `Sleep deprived. Adjusting ${dietType} macros for nervous system recovery.`;
    if (currentWater > 0 && currentWater < 2) return `Dehydration detected. Focus on fluid intake before optimizing ${dietType}.`;
    
    // Priority 2: Real-time Energy Level
    if (logData.energyLevel === 'Low') return `Energy is low. Adjusting your ${dietType} plan for better recovery.`;
    
    // Priority 3: Real-time Calorie Intake anomalies
    if (currentCalories > 2500) return `High energy intake detected. Optimizing output to match your ${dietType} surplus.`;
    if (currentCalories > 0 && currentCalories < 1200) return `Severe calorie deficit. Increase intake to sustain your ${dietType} metabolism.`;
    
    // Priority 4: Historical Streak
    if (stats?.streak > 3) return `Metabolic momentum is high. Your ${dietType} strategy is highly efficient.`;
    
    return `Building foundation. Consistency in training and your ${dietType} is the focus.`;
  }, [logData.energyLevel, logData.caloriesConsumed, logData.sleepHours, logData.waterIntake, stats?.streak, user?.profile?.dietaryPreference]);

  // Dynamic Next Phase based on Diet & Daily Log
  const nextPhaseText = useMemo(() => {
    const hasCurrentCalories = Boolean(logData.caloriesConsumed && Number(logData.caloriesConsumed) > 0);
    const activeCalories = hasCurrentCalories ? Number(logData.caloriesConsumed) : (stats?.avgCalories || 0);
    const currentSleep = Number(logData.sleepHours);
    
    const dietStr = (user?.profile?.dietaryPreference || '').toLowerCase();
    const isLowCarb = dietStr.includes('keto') || dietStr.includes('low carb');

    // Priority 1: Recovery Needs
    if (logData.energyLevel === 'Low' || (currentSleep > 0 && currentSleep < 6)) {
      return { bold: 'Active Recovery', rest: 'protocol to restore your nervous system and manage cortisol.' };
    }
    
    // Priority 2: Diet Specific
    if (isLowCarb) return { bold: 'Fat-Oxidation', rest: 'focused routine aligned with your diet.' };
    
    // Priority 3: Active Calorie Status
    if (activeCalories > 2200) return { bold: 'Volume', rest: 'focused phase to utilize your energy surplus.' };
    if (activeCalories > 0 && activeCalories < 1500) return { bold: 'Maintenance', rest: 'phase to preserve muscle mass in a deficit.' };
    
    return { bold: 'High Intensity', rest: 'conditioning phase for peak efficiency.' };
  }, [logData.energyLevel, logData.caloriesConsumed, logData.sleepHours, stats?.avgCalories, user?.profile?.dietaryPreference]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await logUserProgress(user._id, logData);
      onProgressUpdated(res.data);
      // Reset the form after submission
      setLogData({ ...logData, waterIntake: '', caloriesConsumed: '', sleepHours: '', workoutCompleted: false, energyLevel: 'High' });
    } catch (err) {
      alert("Failed to sync data with AI engine.");
    }
  };

  return (
    <div className="w-full flex flex-col space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
      
      {/* 1. Pro Insights Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-indigo-950 dark:to-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-black text-[10px] uppercase tracking-widest">
              <ShieldCheck size={14} /> AI Performance Status
            </div>
            <h3 className="text-xl font-bold leading-tight">
              {aiStatusText}
            </h3>
          </div>
          <div className="space-y-2 border-l border-white/10 pl-8">
            <div className="flex items-center gap-2 text-orange-400 font-black text-[10px] uppercase tracking-widest">
              <Zap size={14} /> Next Phase
            </div>
            <p className="text-slate-300 text-sm font-medium">
              Based on daily logs & diet, we recommend a{" "}
              <span className="text-white font-bold">{nextPhaseText.bold}</span> {nextPhaseText.rest}
            </p>
          </div>
          <div className="flex items-center justify-end">
             <div className="text-right">
                <p className="text-4xl font-black">{stats?.completionRate || 0}%</p>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Plan Compliance</p>
             </div>
          </div>
        </div>
      </div>

      {/* 2. High-Precision Logging Form */}
      <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/40 dark:shadow-none">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-slate-900 dark:bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
              <PlusCircle size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Daily Entry</h2>
              <p className="text-slate-500 dark:text-slate-400 font-bold">Inputs drive the AI Adaptation Engine</p>
            </div>
          </div>
          
          {/* Real-time Smart Adaptation UI */}
          <div className="flex flex-col gap-3 min-w-[300px]">
            {adaptiveInsights.length > 0 ? (
              adaptiveInsights.map((insight, idx) => (
                <div key={idx} className={`${insight.bg} p-4 rounded-2xl border animate-in zoom-in-95 duration-300`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={insight.color}>{insight.icon}</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${insight.color}`}>{insight.title}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">{insight.desc}</p>
                </div>
              ))
            ) : (
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 flex items-center gap-3">
                <Smile className="text-slate-400" size={20} />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Awaiting daily data inputs...</p>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Current Mass (kg)</label>
              <input 
                type="number" step="0.1" value={logData.weight} 
                onChange={e => setLogData({...logData, weight: e.target.value})} 
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-black text-xl" 
                placeholder="0.0" required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Hydration (L)</label>
              <input 
                type="number" step="0.1" value={logData.waterIntake} 
                onChange={e => setLogData({...logData, waterIntake: e.target.value})} 
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-black text-xl" 
                placeholder="0.0" required 
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Total Calories</label>
              <input 
                type="number" value={logData.caloriesConsumed} 
                onChange={e => setLogData({...logData, caloriesConsumed: e.target.value})} 
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-black text-xl" 
                placeholder="0" required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Sleep Quality (Hrs)</label>
              <input 
                type="number" value={logData.sleepHours} 
                onChange={e => setLogData({...logData, sleepHours: e.target.value})} 
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-black text-xl" 
                placeholder="0" required 
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Energy State</label>
                <div className="flex flex-col gap-2">
                  {['Low', 'Mid', 'High'].map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setLogData({...logData, energyLevel: level})}
                      className={`w-full py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${logData.energyLevel === level ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Workout Done?</label>
                <button
                  type="button"
                  onClick={() => setLogData({...logData, workoutCompleted: !logData.workoutCompleted})}
                  className={`w-full h-[118px] rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all ${logData.workoutCompleted ? 'bg-emerald-50 border-emerald-500 text-emerald-600 dark:bg-emerald-500/10' : 'bg-slate-50 border-transparent text-slate-300 dark:bg-slate-800'}`}
                >
                  <Dumbbell size={24} className={logData.workoutCompleted ? 'animate-bounce' : ''} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {logData.workoutCompleted ? 'YES' : 'NO'}
                  </span>
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-[72px] rounded-2xl font-black transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-blue-600/20 group">
              Confirm Daily Data
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>

      {/* 3. Activity Archive */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
             <History className="text-slate-400" size={24} />
             <h3 className="text-2xl font-black text-slate-900 dark:text-white">Activity Archive</h3>
          </div>
          <span className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
            {stats?.totalLogs || 0} Entries
          </span>
        </div>

        <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2">
          {user?.progressLogs && user.progressLogs.length > 0 ? (
            [...user.progressLogs].reverse().slice(0, 5).map((log, i) => (
              <div key={i} className="group p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] flex flex-wrap lg:flex-nowrap items-center gap-10 hover:border-blue-500/20 hover:shadow-xl transition-all duration-500">
                <div className="flex items-center gap-4 min-w-[180px]">
                  <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="font-black text-lg dark:text-white leading-tight">
                      {new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', weekday: 'short' })}
                    </p>
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                      <ShieldCheck size={10} /> Verified
                    </p>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 py-2 md:border-l border-slate-100 dark:border-slate-800 md:pl-10">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Weight</p>
                    <p className="font-black text-xl dark:text-slate-100">{log.weight}kg</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Hydration</p>
                    <p className="font-black text-xl text-blue-500">{log.waterIntake}L</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Calories</p>
                    <p className="font-black text-xl text-orange-500">{log.caloriesConsumed}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Rest</p>
                    <p className="font-black text-xl text-purple-500">{log.sleepHours || '--'}h</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-auto pr-4">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase">State</p>
                    <p className="text-sm font-bold dark:text-slate-300">{log.energyLevel || 'Normal'}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${log.workoutCompleted ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-24 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem]">
              <p className="text-slate-500 font-black text-xl">Initiate your first data sync</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating AI Chatbot */}
      {user && <Chatbot user={user} />}
    </div>
  );
}