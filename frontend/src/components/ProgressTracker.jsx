import React, { useState } from 'react';
import { logUserProgress } from '../api/client';
import { TrendingUp, Droplet, Flame, CheckCircle } from 'lucide-react';

export default function ProgressTracker({ user, onProgressUpdated }) {
  const [logData, setLogData] = useState({
    weight: user.weight || '', waterIntake: '', caloriesConsumed: '', workoutCompleted: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await logUserProgress(user._id, logData);
      alert("Progress logged successfully!");
      onProgressUpdated(res.data);
      setLogData({...logData, waterIntake: '', caloriesConsumed: '', workoutCompleted: false });
    } catch (err) {
      alert("Failed to log progress");
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border-t-4 border-purple-500 transition-colors">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-white"><TrendingUp /> Log Today's Progress</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col"><label className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-1">Weight (kg)</label><input type="number" step="0.1" value={logData.weight} onChange={e => setLogData({...logData, weight: e.target.value})} className="p-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-purple-500 rounded" required /></div>
          <div className="flex flex-col"><label className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-1">Water (L)</label><input type="number" step="0.1" value={logData.waterIntake} onChange={e => setLogData({...logData, waterIntake: e.target.value})} className="p-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-purple-500 rounded" required /></div>
          <div className="flex flex-col"><label className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-1">Calories</label><input type="number" value={logData.caloriesConsumed} onChange={e => setLogData({...logData, caloriesConsumed: e.target.value})} className="p-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-purple-500 rounded" required /></div>
          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 p-2 border dark:border-slate-600 rounded bg-slate-50 dark:bg-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
              <input type="checkbox" checked={logData.workoutCompleted} onChange={e => setLogData({...logData, workoutCompleted: e.target.checked})} className="w-5 h-5 accent-purple-600" />
              <span className="text-sm font-bold text-slate-600 dark:text-slate-200">Workout Done?</span>
            </label>
          </div>
          <button type="submit" className="col-span-2 md:col-span-4 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded font-bold mt-2">Save Today's Log</button>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm transition-colors">
        <h3 className="text-lg font-bold mb-4 dark:text-white">Recent Progress History</h3>
        {user.progressLogs && user.progressLogs.length > 0 ? (
          <div className="space-y-3">
            {[...user.progressLogs].reverse().map((log, i) => (
              <div key={i} className="p-4 border dark:border-slate-600 rounded flex flex-wrap gap-4 justify-between items-center bg-slate-50 dark:bg-slate-700 transition-colors">
                <span className="font-bold text-slate-700 dark:text-white w-full md:w-auto">{new Date(log.date).toLocaleDateString()}</span>
                <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300"><TrendingUp size={16}/> {log.weight} kg</span>
                <span className="flex items-center gap-1 text-blue-500 dark:text-blue-400"><Droplet size={16}/> {log.waterIntake}L</span>
                <span className="flex items-center gap-1 text-orange-500 dark:text-orange-400"><Flame size={16}/> {log.caloriesConsumed} kcal</span>
                <span>{log.workoutCompleted ? <span className="text-green-600 dark:text-green-400 flex items-center gap-1 text-sm font-bold"><CheckCircle size={16}/> Workout Done</span> : <span className="text-slate-400 dark:text-slate-500 text-sm">Rest Day</span>}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 dark:text-slate-400 italic">No progress logged yet. Start tracking today!</p>
        )}
      </div>
    </div>
  );
}
