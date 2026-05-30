import React from 'react';
import { Dumbbell, Utensils, Flame, Info } from 'lucide-react';

export default function PlanDisplay({ aiPlan }) {
  if (!aiPlan || !aiPlan.workoutPlan || !aiPlan.dietPlan) return null;

  return (
    <div className="grid lg:grid-cols-2 gap-8 w-full max-w-7xl mx-auto mt-6 items-start">
      
      {/* Diet Plan Section */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl relative overflow-hidden group">
        
        {/* Subtle background gradient accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 dark:bg-green-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
        
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
          <h3 className="text-2xl font-extrabold flex items-center gap-3 text-slate-800 dark:text-white">
            <span className="p-2 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-lg">
              <Utensils size={24} />
            </span>
            Diet Plan
          </h3>
          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full border border-green-200 dark:border-green-800/50">
             <Flame size={18} className="text-orange-500" />
             <p className="font-bold text-green-700 dark:text-green-400 text-sm">
               {aiPlan.dietPlan.targetCalories} <span className="font-medium">kcal/day</span>
             </p>
          </div>
        </div>

        {/* Scrollable Diet List */}
        <div className="space-y-4 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {aiPlan.dietPlan.meals.map((meal, i) => (
            <div 
              key={i} 
              className="group/meal flex flex-col sm:flex-row gap-4 p-4 bg-slate-50 hover:bg-green-50/50 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-xl border border-transparent hover:border-green-100 dark:hover:border-green-900/50 transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                   <h4 className="font-bold text-lg text-slate-800 dark:text-white group-hover/meal:text-green-600 dark:group-hover/meal:text-green-400 transition-colors">
                     {meal.mealName}
                   </h4>
                   <span className="text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-md">
                     {meal.calories} kcal
                   </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2 flex items-start gap-2">
                   <Info size={16} className="mt-0.5 shrink-0 opacity-50" />
                   {meal.suggestion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workout Plan Section */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl relative overflow-hidden group">
        
        {/* Subtle background gradient accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
        
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
          <h3 className="text-2xl font-extrabold flex items-center gap-3 text-slate-800 dark:text-white">
            <span className="p-2 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg">
              <Dumbbell size={24} />
            </span>
            Workout Split
          </h3>
          <span className="text-xs font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-md border border-blue-100 dark:border-blue-800/50">
             {aiPlan.workoutPlan.weeklySplit || "6-Day Split"}
          </span>
        </div>
        
        {/* Customized scrollbar for workout list */}
        <div className="space-y-4 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {aiPlan.workoutPlan.routine.map((day, i) => (
            <div 
              key={i} 
              className={`p-5 rounded-xl border transition-all ${
                day.focus.toLowerCase().includes('rest') 
                ? 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 opacity-80' 
                : 'bg-white dark:bg-slate-800 shadow-sm border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/50'
              }`}
            >
              <div className="flex items-center justify-between border-b dark:border-slate-700 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold px-2 py-1 rounded ${
                    day.focus.toLowerCase().includes('rest')
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400'
                  }`}>
                    {day.day}
                  </span>
                  <p className="font-bold text-slate-700 dark:text-slate-200">{day.focus}</p>
                </div>
              </div>
              
              <ul className="space-y-2 mt-3">
                {day.exercises.map((ex, j) => (
                  <li key={j} className="flex justify-between items-center p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group/ex">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover/ex:text-blue-600 dark:group-hover/ex:text-blue-400 transition-colors">
                      {ex.name}
                    </span> 
                    <span className="text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 px-2 py-1 rounded">
                      {ex.sets !== "0" && ex.reps !== "0" ? `${ex.sets} × ${ex.reps}` : "—"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* Required CSS for custom scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1; 
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #475569; 
        }
      `}} />
    </div>
  );
}