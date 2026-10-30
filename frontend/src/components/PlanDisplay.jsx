import React from 'react';
import { Dumbbell, Utensils, Flame, Info, AlertTriangle, ShieldCheck } from 'lucide-react';
import Chatbot from './Chatbot';

export default function PlanDisplay({ aiPlan, user }) {
  if (!aiPlan || !aiPlan.workoutPlan || !aiPlan.dietPlan) return null;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* Evidence-Backed Plan Status Banner */}
      <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-600 text-white shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Calibrated Athlete Protocol
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personalized 6-day split and macro-balanced nutrition based on sports science principles.
            </p>
          </div>
        </div>
      </div>

      {/* Precautions Section */}
      {aiPlan.precautions && aiPlan.precautions.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-amber-600 dark:text-amber-400" />
            <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-300">
              Health & Safety Precautions
            </h3>
          </div>
          <ul className="space-y-2">
            {aiPlan.precautions.map((precaution, idx) => (
              <li key={idx} className="text-amber-800 dark:text-amber-300/90 text-xs sm:text-sm font-normal flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                <span className="leading-relaxed">{precaution}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Grid for Diet and Workout */}
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        
        {/* Diet Plan Section */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-card border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Utensils size={18} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Daily Nutrition Protocol
              </h3>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold">
              <Flame size={14} className="text-amber-500" />
              <span>{aiPlan.dietPlan.targetCalories} kcal/day</span>
            </div>
          </div>

          {/* Macro Breakdown */}
          {aiPlan.dietPlan.macros && (
            <div className="grid grid-cols-3 gap-3 py-3 px-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg mb-5 text-center text-xs border border-slate-200/80 dark:border-slate-700/60">
              <div>
                <span className="block text-[11px] text-slate-500 uppercase font-medium">Protein</span>
                <span className="text-slate-900 dark:text-white font-bold">{aiPlan.dietPlan.macros.protein}</span>
              </div>
              <div>
                <span className="block text-[11px] text-slate-500 uppercase font-medium">Carbohydrates</span>
                <span className="text-slate-900 dark:text-white font-bold">{aiPlan.dietPlan.macros.carbs}</span>
              </div>
              <div>
                <span className="block text-[11px] text-slate-500 uppercase font-medium">Fats</span>
                <span className="text-slate-900 dark:text-white font-bold">{aiPlan.dietPlan.macros.fats}</span>
              </div>
            </div>
          )}

          {/* Meals List */}
          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1 custom-scrollbar">
            {aiPlan.dietPlan.meals.map((meal, i) => (
              <div 
                key={i} 
                className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-800 transition-colors hover:border-slate-300 dark:hover:border-slate-700"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                    {meal.mealName}
                  </h4>
                  <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                    {meal.calories} kcal
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {meal.suggestion}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Workout Plan Section */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-card border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center">
                <Dumbbell size={18} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Workout Split
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {aiPlan.workoutPlan.weeklySplit || "6-Day Split"}
            </span>
          </div>
          
          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1 custom-scrollbar">
            {aiPlan.workoutPlan.routine.map((day, i) => (
              <div 
                key={i} 
                className={`p-4 rounded-lg border transition-colors ${
                  day.focus.toLowerCase().includes('rest') 
                  ? 'bg-slate-50/60 dark:bg-slate-800/20 border-slate-200/60 dark:border-slate-800' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                      {day.day}
                    </span>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">{day.focus}</span>
                  </div>
                </div>
                
                <ul className="space-y-1.5 mt-2">
                  {day.exercises.map((ex, j) => (
                    <li key={j} className="flex justify-between items-center text-xs py-1">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        {ex.name}
                      </span> 
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {ex.sets !== "0" && ex.reps !== "0" ? `${ex.sets} × ${ex.reps}` : "Rest & Recover"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {user && <Chatbot user={user} />}
    </div>
  );
}
