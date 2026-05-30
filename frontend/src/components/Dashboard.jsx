import React, { useState } from 'react';
import { Target, TrendingUp, Dumbbell, Utensils } from 'lucide-react';

// Mock function for the Canvas preview environment
const logUserProgress = async (userId, data) => {
  return { data: { ...data, status: 'logged' } };
};

export default function Dashboard({ user, setUser }) {
  const [logData, setLogData] = useState({ weight: '', waterIntake: '', caloriesConsumed: '', workoutCompleted: false });
  const [msg, setMsg] = useState({ text: '', type: '' });

  const handleLogSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await logUserProgress(user._id, logData);
      setUser(prev => ({ ...prev, ...res.data }));
      setLogData({ weight: '', waterIntake: '', caloriesConsumed: '', workoutCompleted: false });
      setMsg({ text: 'Progress successfully logged!', type: 'success' });
      setTimeout(() => setMsg({text:'', type:''}), 3000);
    } catch (err) {
      setMsg({ text: 'Failed to log progress.', type: 'error' });
    }
  };

  const plan = user?.aiPlan;

  return (
    <div className="space-y-8 p-6">
      {/* Daily Tracker Section */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
        <h2 className="text-2xl font-black flex items-center gap-3 mb-6 dark:text-white"><TrendingUp className="text-indigo-500"/> Daily Tracker</h2>
        {msg.text && <div className={`p-4 mb-6 rounded-xl font-bold ${msg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{msg.text}</div>}
        
        <form onSubmit={handleLogSubmit} className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
          <div className="flex flex-col"><label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Weight (kg)</label><input type="number" step="0.1" value={logData.weight} onChange={e => setLogData({...logData, weight: e.target.value})} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none dark:text-white" required /></div>
          <div className="flex flex-col"><label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Water (L)</label><input type="number" step="0.1" value={logData.waterIntake} onChange={e => setLogData({...logData, waterIntake: e.target.value})} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none dark:text-white" required /></div>
          <div className="flex flex-col"><label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Calories</label><input type="number" value={logData.caloriesConsumed} onChange={e => setLogData({...logData, caloriesConsumed: e.target.value})} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none dark:text-white" required /></div>
          <div className="flex flex-col">
            <label className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 cursor-pointer h-[48px]">
              <input type="checkbox" checked={logData.workoutCompleted} onChange={e => setLogData({...logData, workoutCompleted: e.target.checked})} className="w-5 h-5 accent-indigo-600" />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Workout Done</span>
            </label>
          </div>
          <button type="submit" className="col-span-2 md:col-span-1 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl font-bold h-[48px]">Log It</button>
        </form>
      </div>

      {/* AI Plans Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Diet Plan */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
          <div className="bg-emerald-500 p-6 text-white flex justify-between items-center rounded-t-3xl">
            <h3 className="text-2xl font-black flex items-center gap-2"><Utensils/> Diet Plan</h3>
            <span className="bg-emerald-600 px-4 py-1 rounded-full font-bold text-sm">{plan?.dietPlan?.targetCalories || 0} kcal</span>
          </div>
          <div className="p-6 space-y-4 flex-1 overflow-y-auto">
            {plan?.dietPlan?.meals?.map((meal, i) => (
              <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-800 dark:text-white text-lg">{meal.mealName}</span>
                  <span className="text-sm font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/50 px-3 py-1 rounded-full">{meal.calories} cal</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{meal.suggestion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Workout Plan */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
          <div className="bg-blue-600 p-6 text-white flex flex-col justify-center rounded-t-3xl">
            <h3 className="text-2xl font-black flex items-center gap-2"><Dumbbell/> Workout Split</h3>
            <p className="opacity-90 font-medium">{plan?.workoutPlan?.weeklySplit || "N/A"}</p>
          </div>
          <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
            {plan?.workoutPlan?.routine?.map((day, i) => (
              <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <h4 className="font-black text-blue-600 mb-3 uppercase text-sm">{day.day} • {day.focus}</h4>
                <div className="space-y-2">
                  {day.exercises?.map((ex, j) => (
                    <div key={j} className="flex justify-between items-center text-sm border-b dark:border-slate-700 pb-2 last:border-0 last:pb-0">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{ex.name}</span>
                      <span className="text-slate-500 font-mono bg-white dark:bg-slate-900 px-2 py-1 rounded-md">{ex.sets} × {ex.reps}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}