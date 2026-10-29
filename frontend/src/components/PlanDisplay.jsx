import React from 'react';
import { Dumbbell, Utensils, Flame, Info, AlertTriangle, ShieldCheck, BookOpen, Sparkles } from 'lucide-react';
import Chatbot from './Chatbot';

export default function PlanDisplay({ aiPlan, user }) {
  if (!aiPlan || !aiPlan.workoutPlan || !aiPlan.dietPlan) return null;

  return (
    <div className="w-full max-w-7xl mx-auto mt-6 space-y-8">
      
      {/* RAG Grounding & Citation Header Banner */}
      {aiPlan.citations && aiPlan.citations.length > 0 && (
        <div className="bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-indigo-900 dark:text-indigo-300">
                Evidence-Grounded AI Plan
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Synthesized strictly from vetted clinical sports science and Indian nutritional guidelines.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {aiPlan.citations.map((cite, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 shadow-sm">
                <BookOpen size={11} />
                <span>Citation {cite.id}: {cite.sourceId}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Precautions Section */}
      {aiPlan.precautions && aiPlan.precautions.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-6 shadow-sm animate-in fade-in slide-in-from-top-4">
          <h3 className="text-xl font-bold text-amber-900 dark:text-amber-400 flex items-center gap-3 mb-4">
            <span className="p-2 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-lg shrink-0">
              <AlertTriangle size={24} />
            </span>
            Health & Safety Precautions
          </h3>
          <ul className="space-y-3">
            {aiPlan.precautions.map((precaution, idx) => (
              <li key={idx} className="text-amber-800 dark:text-amber-300/90 text-sm font-medium flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-amber-500 shrink-0 shadow-sm shadow-amber-500/50" />
                <span className="leading-relaxed">{precaution}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Grid for Diet and Workout */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        
        {/* Diet Plan Section */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
          
          <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-2xl font-extrabold flex items-center gap-3 text-slate-800 dark:text-white">
              <span className="p-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-lg">
                <Utensils size={24} />
              </span>
              Indian Diet Plan
            </h3>
            <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-full border border-emerald-200 dark:border-emerald-800/50">
               <Flame size={18} className="text-orange-500" />
               <p className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                 {aiPlan.dietPlan.targetCalories} <span className="font-medium">kcal/day</span>
               </p>
            </div>
          </div>

          {/* Macros Bar if available */}
          {aiPlan.dietPlan.macros && (
            <div className="grid grid-cols-3 gap-2 py-3 px-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl mb-6 text-center text-xs font-bold border border-slate-100 dark:border-slate-800">
              <div>
                <span className="block text-[10px] text-slate-400 uppercase">Protein</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{aiPlan.dietPlan.macros.protein}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase">Carbs</span>
                <span className="text-amber-600 dark:text-amber-400 font-extrabold">{aiPlan.dietPlan.macros.carbs}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase">Fats</span>
                <span className="text-rose-600 dark:text-rose-400 font-extrabold">{aiPlan.dietPlan.macros.fats}</span>
              </div>
            </div>
          )}

          {/* Scrollable Diet List */}
          <div className="space-y-4 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {aiPlan.dietPlan.meals.map((meal, i) => (
              <div 
                key={i} 
                className="group/meal flex flex-col sm:flex-row gap-4 p-4 bg-slate-50 hover:bg-emerald-50/50 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-xl border border-transparent hover:border-emerald-100 dark:hover:border-emerald-900/50 transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                     <h4 className="font-bold text-lg text-slate-800 dark:text-white group-meal:text-emerald-600 dark:group-meal:text-emerald-400 transition-colors">
                       {meal.mealName}
                     </h4>
                     <span className="text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md">
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
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
          
          <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-2xl font-extrabold flex items-center gap-3 text-slate-800 dark:text-white">
              <span className="p-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-lg">
                <Dumbbell size={24} />
              </span>
              Workout Split
            </h3>
            <span className="text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-md border border-indigo-100 dark:border-indigo-800/50">
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
                  : 'bg-white dark:bg-slate-800 shadow-sm border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500/50'
                }`}
              >
                <div className="flex items-center justify-between border-b dark:border-slate-700 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold px-2.5 py-1 rounded ${
                      day.focus.toLowerCase().includes('rest')
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      : 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400'
                    }`}>
                      {day.day}
                    </span>
                    <p className="font-bold text-slate-700 dark:text-slate-200">{day.focus}</p>
                  </div>
                </div>
                
                <ul className="space-y-2 mt-3">
                  {day.exercises.map((ex, j) => (
                    <li key={j} className="flex justify-between items-center p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group/ex">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover/ex:text-indigo-600 dark:group-hover/ex:text-indigo-400 transition-colors">
                        {ex.name}
                      </span> 
                      <span className="text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 px-2 py-1 rounded">
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