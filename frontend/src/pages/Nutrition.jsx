import React, { useState, useMemo } from 'react';
import { 
  Utensils, Droplets, Flame, Search, Plus, Minus, 
  Sparkles, ShieldCheck, Heart, PieChart, Info
} from 'lucide-react';

const INDIAN_FOODS = [
  { name: 'Low-Fat Paneer', portion: '100g', calories: 265, protein: 18.3, carbs: 4.2, fats: 19.5, veg: true },
  { name: 'Soya Chunks (Boiled)', portion: '100g (cooked)', calories: 125, protein: 17.0, carbs: 9.0, fats: 0.5, veg: true },
  { name: 'Yellow Moong Dal', portion: '1 Katori (150g cooked)', calories: 140, protein: 9.0, carbs: 22.0, fats: 1.5, veg: true },
  { name: 'Chicken Breast (Grilled)', portion: '100g', calories: 165, protein: 31.0, carbs: 0.0, fats: 3.6, veg: false },
  { name: 'Whole Eggs (Boiled)', portion: '2 Large Eggs', calories: 155, protein: 13.0, carbs: 1.1, fats: 10.6, veg: false },
  { name: 'Sprouts Salad (Moong/Chana)', portion: '1 Cup (150g)', calories: 135, protein: 10.5, carbs: 24.0, fats: 0.8, veg: true },
  { name: 'Multigrain Roti', portion: '1 Roti (35g)', calories: 85, protein: 3.2, carbs: 17.5, fats: 0.6, veg: true },
  { name: 'Brown Rice (Cooked)', portion: '1 Katori (120g)', calories: 130, protein: 2.8, carbs: 28.0, fats: 1.0, veg: true },
  { name: 'Greek Yogurt / Curd', portion: '1 Cup (200g)', calories: 120, protein: 12.0, carbs: 7.0, fats: 3.5, veg: true },
  { name: 'Oats with Almond Milk', portion: '50g oats + 200ml milk', calories: 230, protein: 8.5, carbs: 38.0, fats: 5.0, veg: true },
];

export default function Nutrition() {
  // Calculator State
  const [calcState, setCalcState] = useState({
    weight: 70,
    height: 175,
    age: 24,
    gender: 'male',
    activity: 'moderate',
    goal: 'cut' // cut, maintain, bulk
  });

  // Food Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVegOnly, setFilterVegOnly] = useState(false);

  // Water Intake state
  const [waterGlasses, setWaterGlasses] = useState(5);
  const targetGlasses = 10;

  // Mifflin-St Jeor TDEE Computation
  const calculatedMacros = useMemo(() => {
    const { weight, height, age, gender, activity, goal } = calcState;
    let bmr = (gender === 'male')
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

    const actMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      high: 1.725
    };

    let tdee = bmr * (actMultipliers[activity] || 1.375);
    if (goal === 'cut') tdee -= 500;
    if (goal === 'bulk') tdee += 400;

    const targetCalories = Math.round(tdee);
    const targetProteinGrams = Math.round(weight * 2.0); // 2g per kg
    const targetFatGrams = Math.round((targetCalories * 0.25) / 9); // 25% fats
    const targetCarbGrams = Math.round((targetCalories - (targetProteinGrams * 4 + targetFatGrams * 9)) / 4);

    return {
      targetCalories,
      protein: targetProteinGrams,
      carbs: targetCarbGrams,
      fats: targetFatGrams
    };
  }, [calcState]);

  const filteredFoods = INDIAN_FOODS.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = filterVegOnly ? food.veg : true;
    return matchesSearch && matchesVeg;
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-3">
          <Sparkles size={14} /> Clinical Sports Nutrition & Indian Food Hub
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Precision <span className="text-emerald-500">Nutrition Science</span>
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
          Energy expenditure models, macro ratios, and an authentic Indian culinary database.
        </p>
      </div>

      {/* Top Grid: Interactive Calorie Calculator & Water Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Interactive BMR/TDEE Calculator Card */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/20 dark:shadow-none">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black">
                <Flame size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Mifflin-St Jeor Energy Engine</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Calibrated against clinical metabolic expenditure standards</p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Auto-Calculated
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Body Weight (kg)</label>
              <input
                type="number"
                value={calcState.weight}
                onChange={e => setCalcState({...calcState, weight: Number(e.target.value)})}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold dark:text-white outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Height (cm)</label>
              <input
                type="number"
                value={calcState.height}
                onChange={e => setCalcState({...calcState, height: Number(e.target.value)})}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold dark:text-white outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Age (Years)</label>
              <input
                type="number"
                value={calcState.age}
                onChange={e => setCalcState({...calcState, age: Number(e.target.value)})}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold dark:text-white outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Gender</label>
              <select
                value={calcState.gender}
                onChange={e => setCalcState({...calcState, gender: e.target.value})}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold dark:text-white outline-none focus:border-emerald-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Activity Tier</label>
              <select
                value={calcState.activity}
                onChange={e => setCalcState({...calcState, activity: e.target.value})}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold dark:text-white outline-none focus:border-emerald-500"
              >
                <option value="sedentary">Sedentary (1.2x)</option>
                <option value="light">Lightly Active (1.375x)</option>
                <option value="moderate">Moderately Active (1.55x)</option>
                <option value="high">Very Active (1.725x)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Goal Protocol</label>
              <select
                value={calcState.goal}
                onChange={e => setCalcState({...calcState, goal: e.target.value})}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold dark:text-white outline-none focus:border-emerald-500"
              >
                <option value="cut">Fat Loss (-500 kcal)</option>
                <option value="maintain">Maintenance (TDEE)</option>
                <option value="bulk">Lean Bulk (+400 kcal)</option>
              </select>
            </div>
          </div>

          {/* Calorie Output Bar */}
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Target Daily Intake</span>
              <div className="text-4xl font-black text-slate-900 dark:text-white mt-1">
                {calculatedMacros.targetCalories} <span className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">kcal / day</span>
              </div>
            </div>

            <div className="flex gap-4 sm:gap-6 text-center">
              <div className="px-3 py-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="block text-[10px] font-black uppercase text-indigo-500">Protein</span>
                <span className="text-base font-extrabold text-slate-800 dark:text-slate-100">{calculatedMacros.protein}g</span>
              </div>
              <div className="px-3 py-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="block text-[10px] font-black uppercase text-amber-500">Carbs</span>
                <span className="text-base font-extrabold text-slate-800 dark:text-slate-100">{calculatedMacros.carbs}g</span>
              </div>
              <div className="px-3 py-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="block text-[10px] font-black uppercase text-rose-500">Fats</span>
                <span className="text-base font-extrabold text-slate-800 dark:text-slate-100">{calculatedMacros.fats}g</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Hydration Tracker */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/20 dark:shadow-none flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black">
                <Droplets size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Hydration Tracker</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Cellular volume & metabolic rate</p>
              </div>
            </div>

            <div className="text-center py-6">
              <div className="text-5xl font-black text-blue-600 dark:text-blue-400">
                {(waterGlasses * 0.25).toFixed(1)} <span className="text-xl font-semibold text-slate-400">/ 2.5 L</span>
              </div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-2">
                {waterGlasses} of {targetGlasses} Standard Glasses (250ml)
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 mt-4 overflow-hidden border border-slate-200 dark:border-slate-700">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (waterGlasses / targetGlasses) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setWaterGlasses(Math.max(0, waterGlasses - 1))}
              className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-2xl transition-all"
            >
              <Minus size={18} />
            </button>
            <span className="font-bold text-sm text-slate-700 dark:text-slate-300">Add 250ml Glass</span>
            <button
              onClick={() => setWaterGlasses(waterGlasses + 1)}
              className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-all shadow-md shadow-blue-500/20"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Indian Food Macro Explorer Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/20 dark:shadow-none">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Authentic Indian Nutrition Database</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Standardized Indian dietary protein and carb sources with metric portion sizing.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setFilterVegOnly(!filterVegOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                filterVegOnly
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              🌱 Pure Vegetarian Only
            </button>
            <div className="relative flex-1 sm:w-64">
              <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search food item..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:border-emerald-500 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Foods Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[11px] font-black">
                <th className="py-3 px-4">Item Name</th>
                <th className="py-3 px-4">Standard Metric Portion</th>
                <th className="py-3 px-4">Calories</th>
                <th className="py-3 px-4 text-indigo-500">Protein</th>
                <th className="py-3 px-4 text-amber-500">Carbs</th>
                <th className="py-3 px-4 text-rose-500">Fats</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold">
              {filteredFoods.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.veg ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    {item.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">{item.portion}</td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-800 dark:text-slate-200">{item.calories} kcal</td>
                  <td className="py-3.5 px-4 font-bold text-indigo-600 dark:text-indigo-400">{item.protein}g</td>
                  <td className="py-3.5 px-4 font-bold text-amber-600 dark:text-amber-400">{item.carbs}g</td>
                  <td className="py-3.5 px-4 font-bold text-rose-600 dark:text-rose-400">{item.fats}g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
