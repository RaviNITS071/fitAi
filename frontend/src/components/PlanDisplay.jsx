import React from 'react';
import { Dumbbell, Utensils } from 'lucide-react';

export default function PlanDisplay({ aiPlan }) {
  if (!aiPlan || !aiPlan.workoutPlan) return null;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border-t-4 border-green-500 transition-colors">
        <h3 className="text-xl font-bold flex items-center gap-2 mb-4 dark:text-white"><Utensils/> Diet Plan</h3>
        <p className="font-bold text-slate-600 dark:text-slate-300 mb-2">Calories: {aiPlan.dietPlan.targetCalories} kcal</p>
        <div className="space-y-3">
          {aiPlan.dietPlan.meals.map((meal, i) => (
            <div key={i} className="p-3 bg-slate-50 dark:bg-slate-700 dark:border-slate-600 rounded border">
              <p className="font-bold dark:text-white">{meal.mealName} <span className="text-sm text-green-600 dark:text-green-400 font-normal">({meal.calories} kcal)</span></p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{meal.suggestion}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border-t-4 border-blue-500 transition-colors">
        <h3 className="text-xl font-bold flex items-center gap-2 mb-4 dark:text-white"><Dumbbell/> Workout Split</h3>
        <p className="font-bold text-slate-600 dark:text-slate-300 mb-2">{aiPlan.workoutPlan.weeklySplit}</p>
        <div className="space-y-3 h-96 overflow-y-auto pr-2">
          {aiPlan.workoutPlan.routine.map((day, i) => (
            <div key={i} className="p-3 bg-slate-50 dark:bg-slate-700 dark:border-slate-600 rounded border">
              <p className="font-bold text-blue-600 dark:text-blue-400 border-b dark:border-slate-600 pb-1 mb-2">{day.day} - {day.focus}</p>
              <ul className="text-sm space-y-1">
                {day.exercises.map((ex, j) => (
                  <li key={j} className="flex justify-between dark:text-slate-200"><span>{ex.name}</span> <span className="text-slate-500 dark:text-slate-400">{ex.sets}x{ex.reps}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
