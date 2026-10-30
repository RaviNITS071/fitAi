import React, { useState, useMemo } from 'react';
import { 
  Utensils, Droplets, Flame, Search, Plus, Minus
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
  const [calcState, setCalcState] = useState({
    weight: 70,
    height: 175,
    age: 24,
    gender: 'male',
    activity: 'moderate',
    goal: 'cut'
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [waterGlasses, setWaterGlasses] = useState(6);
  const targetGlasses = 10;

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
    const targetProteinGrams = Math.round(weight * 2.0);
    const targetFatGrams = Math.round((targetCalories * 0.25) / 9);
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
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Nutrition & Macro Planning
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Mifflin-St Jeor daily energy expenditure calculations and calibrated Indian food macros.
        </p>
      </div>

      {/* Top Grid: Calculator & Hydration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* TDEE Calculator */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                <Flame size={18} className="text-amber-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Energy Expenditure Calculator</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Mifflin-St Jeor clinical equation</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mb-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Weight (kg)</label>
              <input
                type="number"
                value={calcState.weight}
                onChange={e => setCalcState({...calcState, weight: Number(e.target.value)})}
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-medium dark:text-white outline-none focus:border-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Height (cm)</label>
              <input
                type="number"
                value={calcState.height}
                onChange={e => setCalcState({...calcState, height: Number(e.target.value)})}
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-medium dark:text-white outline-none focus:border-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Age (Years)</label>
              <input
                type="number"
                value={calcState.age}
                onChange={e => setCalcState({...calcState, age: Number(e.target.value)})}
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-medium dark:text-white outline-none focus:border-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Gender</label>
              <select
                value={calcState.gender}
                onChange={e => setCalcState({...calcState, gender: e.target.value})}
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-medium dark:text-white outline-none focus:border-slate-900"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Activity Level</label>
              <select
                value={calcState.activity}
                onChange={e => setCalcState({...calcState, activity: e.target.value})}
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-medium dark:text-white outline-none focus:border-slate-900"
              >
                <option value="sedentary">Sedentary (1.2×)</option>
                <option value="light">Lightly Active (1.375×)</option>
                <option value="moderate">Moderately Active (1.55×)</option>
                <option value="high">Very Active (1.725×)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Goal</label>
              <select
                value={calcState.goal}
                onChange={e => setCalcState({...calcState, goal: e.target.value})}
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-medium dark:text-white outline-none focus:border-slate-900"
              >
                <option value="cut">Fat Loss (-500 kcal)</option>
                <option value="maintain">Maintenance (TDEE)</option>
                <option value="bulk">Lean Bulk (+400 kcal)</option>
              </select>
            </div>
          </div>

          {/* Calorie Output Bar */}
          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">Target Daily Intake</span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                {calculatedMacros.targetCalories} <span className="text-sm font-normal text-slate-500">kcal / day</span>
              </div>
            </div>

            <div className="flex gap-4 text-center">
              <div className="px-3 py-1.5 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-700">
                <span className="block text-[10px] font-medium text-slate-400 uppercase">Protein</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{calculatedMacros.protein}g</span>
              </div>
              <div className="px-3 py-1.5 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-700">
                <span className="block text-[10px] font-medium text-slate-400 uppercase">Carbs</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{calculatedMacros.carbs}g</span>
              </div>
              <div className="px-3 py-1.5 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-700">
                <span className="block text-[10px] font-medium text-slate-400 uppercase">Fats</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{calculatedMacros.fats}g</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hydration Tracker */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Droplets size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Hydration Tracker</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Daily intake counter</p>
              </div>
            </div>

            <div className="text-center py-4">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                {(waterGlasses * 0.25).toFixed(1)} <span className="text-sm font-normal text-slate-500">/ 2.5 Liters</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {waterGlasses} of {targetGlasses} Glasses (250ml)
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mt-4 overflow-hidden border border-slate-200 dark:border-slate-700">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, (waterGlasses / targetGlasses) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setWaterGlasses(Math.max(0, waterGlasses - 1))}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-white rounded-lg transition-colors text-xs font-medium flex items-center gap-1"
            >
              <Minus size={14} /> Remove
            </button>
            <span className="text-xs text-slate-500 font-medium">+250ml</span>
            <button
              onClick={() => setWaterGlasses(waterGlasses + 1)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white rounded-lg transition-colors text-xs font-medium flex items-center gap-1 shadow-sm"
            >
              <Plus size={14} /> Add Glass
            </button>
          </div>
        </div>
      </div>

      {/* Indian Food Macro Explorer Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Indian Food Macro Database</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Calibrated metric portion sizing for Indian protein and carbohydrate sources
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => setFilterVegOnly(!filterVegOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                filterVegOnly
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
              }`}
            >
              Vegetarian Only
            </button>
            <div className="relative flex-1 sm:w-56">
              <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search food item..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs outline-none focus:border-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* High Density Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[11px] font-semibold">
                <th className="py-2.5 px-3">Item Name</th>
                <th className="py-2.5 px-3">Portion Size</th>
                <th className="py-2.5 px-3">Calories</th>
                <th className="py-2.5 px-3">Protein</th>
                <th className="py-2.5 px-3">Carbs</th>
                <th className="py-2.5 px-3">Fats</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredFoods.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.veg ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    {item.name}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400">{item.portion}</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-900 dark:text-slate-100">{item.calories} kcal</td>
                  <td className="py-2.5 px-3 font-mono text-slate-700 dark:text-slate-300">{item.protein}g</td>
                  <td className="py-2.5 px-3 font-mono text-slate-700 dark:text-slate-300">{item.carbs}g</td>
                  <td className="py-2.5 px-3 font-mono text-slate-700 dark:text-slate-300">{item.fats}g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
