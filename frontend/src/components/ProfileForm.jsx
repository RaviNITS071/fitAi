import React, { useState } from 'react';
import { saveUserProfile } from '../api/client';
import { User, Scale, Target, Leaf, Save, ChevronDown } from 'lucide-react';

export default function ProfileForm({ user, onProfileSaved }) {
  const [formData, setFormData] = useState({
    age: user.age || '', 
    weight: user.weight || '', 
    goal: user.goal || 'Weight loss', 
    dietaryPreference: user.dietaryPreference || 'Non-veg'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await saveUserProfile(user._id, formData);
      alert("Profile Saved! Now you can generate your plan.");
      onProfileSaved(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none mb-10 transition-all">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
          <User size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-none">Complete Profile</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">Personalize your AI fitness recommendations</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Age Input */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Your Age</label>
          <div className="relative">
            <input 
              type="number" 
              placeholder="e.g. 25" 
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold" 
              value={formData.age} 
              onChange={e => setFormData({...formData, age: e.target.value})} 
              required
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><User size={18} /></span>
          </div>
        </div>

        {/* Weight Input */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Weight (kg)</label>
          <div className="relative">
            <input 
              type="number" 
              placeholder="e.g. 75" 
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold" 
              value={formData.weight} 
              onChange={e => setFormData({...formData, weight: e.target.value})} 
              required
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Scale size={18} /></span>
          </div>
        </div>
        
        {/* Goal Selection */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Fitness Goal</label>
          <div className="relative">
            <select 
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold appearance-none cursor-pointer" 
              value={formData.goal} 
              onChange={e => setFormData({...formData, goal: e.target.value})}
            >
              <option>Weight loss</option>
              <option>Muscle gain</option>
              <option>Fat loss</option>
            </select>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Target size={18} /></span>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><ChevronDown size={18} /></span>
          </div>
        </div>
        
        {/* Diet Selection */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Dietary Preference</label>
          <div className="relative">
            <select 
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold appearance-none cursor-pointer" 
              value={formData.dietaryPreference} 
              onChange={e => setFormData({...formData, dietaryPreference: e.target.value})}
            >
              <option>Vegetarian</option>
              <option>Non-veg</option>
              <option>Vegan</option>
            </select>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Leaf size={18} /></span>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><ChevronDown size={18} /></span>
          </div>
        </div>

        <button 
          type="submit" 
          className="md:col-span-2 group flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98] mt-2"
        >
          <Save size={20} className="group-hover:rotate-12 transition-transform" />
          Save & Sync Profile
        </button>
      </form>
    </div>
  );
}