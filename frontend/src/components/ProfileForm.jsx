import React, { useState } from 'react';
import { saveUserProfile } from '../api/client';
import { 
  User, CheckCircle, Loader2, Save, ChevronDown
} from 'lucide-react';

export default function ProfileForm({ user, onProfileSaved }) {
  const [formData, setFormData] = useState({
    age: user?.profile?.age || '', 
    gender: user?.profile?.gender || 'Male',
    height: user?.profile?.height || '', 
    weight: user?.profile?.weight || '', 
    goal: user?.profile?.goal || 'Weight loss', 
    activityLevel: user?.profile?.activityLevel || 'Sedentary',
    dietaryPreference: user?.profile?.dietaryPreference || 'Non-veg',
    experienceLevel: user?.profile?.experienceLevel || 'Beginner',
    equipment: user?.profile?.equipment || 'Full Gym',
    schedule: user?.profile?.schedule || '6 days a week',
    allergies: user?.profile?.allergies || '',
    medicalConditions: user?.profile?.medicalConditions || '',
    workoutLocation: user?.profile?.workoutLocation || 'Gym'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const payload = {
        profile: {
          ...formData,
          age: Number(formData.age),
          height: Number(formData.height),
          weight: Number(formData.weight)
        }
      };
      
      const res = await saveUserProfile(user._id, payload);
      setIsSaving(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        onProfileSaved(res.data);
      }, 1500);

    } catch (err) {
      console.error(err);
      setIsSaving(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-card mb-6 flex flex-col items-center justify-center py-16 text-center">
        <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={28} />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Profile Updated</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-sm">
          Your biometric profile has been updated. Generating your customized program...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-card mb-6 transition-colors">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-300">
          <User size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Athlete Profile & Biometrics</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Parameters for your 6-day split and calorie calculations</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Core Physical Stats */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Age</label>
          <input 
            type="number" 
            placeholder="e.g. 25" 
            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-white rounded-lg outline-none focus:border-slate-900 dark:focus:border-slate-400 text-sm font-medium" 
            value={formData.age} 
            onChange={e => setFormData({...formData, age: e.target.value})} 
            required 
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Gender</label>
          <div className="relative">
            <select 
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-white rounded-lg outline-none focus:border-slate-900 dark:focus:border-slate-400 text-sm font-medium appearance-none cursor-pointer" 
              value={formData.gender} 
              onChange={e => setFormData({...formData, gender: e.target.value})} 
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Height (cm)</label>
          <input 
            type="number" 
            placeholder="e.g. 175" 
            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-white rounded-lg outline-none focus:border-slate-900 dark:focus:border-slate-400 text-sm font-medium" 
            value={formData.height} 
            onChange={e => setFormData({...formData, height: e.target.value})} 
            required 
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Weight (kg)</label>
          <input 
            type="number" 
            placeholder="e.g. 72" 
            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-white rounded-lg outline-none focus:border-slate-900 dark:focus:border-slate-400 text-sm font-medium" 
            value={formData.weight} 
            onChange={e => setFormData({...formData, weight: e.target.value})} 
            required 
          />
        </div>

        {/* Goals & Diet */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Primary Objective</label>
          <div className="relative">
            <select 
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-white rounded-lg outline-none focus:border-slate-900 dark:focus:border-slate-400 text-sm font-medium appearance-none cursor-pointer" 
              value={formData.goal} 
              onChange={e => setFormData({...formData, goal: e.target.value})} 
              required
            >
              <option value="Muscle gain">Muscle gain & Hypertrophy</option>
              <option value="Weight loss">Weight loss & Deficit</option>
              <option value="Fat loss">Fat loss & Conditioning</option>
              <option value="Maintenance">Maintenance & Strength</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Dietary Preference</label>
          <div className="relative">
            <select 
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-white rounded-lg outline-none focus:border-slate-900 dark:focus:border-slate-400 text-sm font-medium appearance-none cursor-pointer" 
              value={formData.dietaryPreference} 
              onChange={e => setFormData({...formData, dietaryPreference: e.target.value})} 
              required
            >
              <option value="Vegetarian">Vegetarian (High Protein)</option>
              <option value="Non-veg">Non-Vegetarian</option>
              <option value="Vegan">Vegan (Plant-Based)</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Experience Level</label>
          <div className="relative">
            <select 
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-white rounded-lg outline-none focus:border-slate-900 dark:focus:border-slate-400 text-sm font-medium appearance-none cursor-pointer" 
              value={formData.experienceLevel} 
              onChange={e => setFormData({...formData, experienceLevel: e.target.value})} 
              required
            >
              <option value="Beginner">Beginner (&lt; 1 year)</option>
              <option value="Intermediate">Intermediate (1 - 3 years)</option>
              <option value="Advanced">Advanced (3+ years)</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Equipment Access</label>
          <div className="relative">
            <select 
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-white rounded-lg outline-none focus:border-slate-900 dark:focus:border-slate-400 text-sm font-medium appearance-none cursor-pointer" 
              value={formData.equipment} 
              onChange={e => setFormData({...formData, equipment: e.target.value})} 
              required
            >
              <option value="Full Gym">Full Commercial Gym</option>
              <option value="Basic Home Gym">Home Gym (Dumbbells & Bench)</option>
              <option value="Dumbbells Only">Dumbbells Only</option>
              <option value="None (Bodyweight)">Bodyweight / Calisthenics</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Weekly Training Frequency</label>
          <div className="relative">
            <select 
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-white rounded-lg outline-none focus:border-slate-900 dark:focus:border-slate-400 text-sm font-medium appearance-none cursor-pointer" 
              value={formData.schedule} 
              onChange={e => setFormData({...formData, schedule: e.target.value})} 
              required
            >
              <option value="6 days a week">6 days a week (Optimal Split)</option>
              <option value="4-5 days a week">4 - 5 days a week</option>
              <option value="2-3 days a week">2 - 3 days a week</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Daily Activity Level</label>
          <div className="relative">
            <select 
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-white rounded-lg outline-none focus:border-slate-900 dark:focus:border-slate-400 text-sm font-medium appearance-none cursor-pointer" 
              value={formData.activityLevel} 
              onChange={e => setFormData({...formData, activityLevel: e.target.value})} 
              required
            >
              <option value="Moderately active">Moderately active (Moderate exercise 3-5 days/wk)</option>
              <option value="Lightly active">Lightly active (Light exercise 1-3 days/wk)</option>
              <option value="Sedentary">Sedentary (Desk job, minimal activity)</option>
              <option value="Very active">Very active (Hard exercise 6-7 days/wk)</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Safety & Precaution Safeguards */}
        <div className="md:col-span-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Safety & Medical Safeguards</span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Allergies (Optional)</label>
          <input 
            type="text" 
            placeholder="e.g. Peanuts, Lactose, Shellfish (or None)" 
            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-white rounded-lg outline-none focus:border-slate-900 dark:focus:border-slate-400 text-sm font-medium" 
            value={formData.allergies} 
            onChange={e => setFormData({...formData, allergies: e.target.value})} 
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Medical Conditions or Joint Sensitivities</label>
          <input 
            type="text" 
            placeholder="e.g. Lower back strain, Knee tendonitis (or None)" 
            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-white rounded-lg outline-none focus:border-slate-900 dark:focus:border-slate-400 text-sm font-medium" 
            value={formData.medicalConditions} 
            onChange={e => setFormData({...formData, medicalConditions: e.target.value})} 
          />
        </div>

        <div className="md:col-span-2 pt-2">
          <button 
            type="submit" 
            disabled={isSaving}
            className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-medium py-2.5 rounded-lg text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <><Loader2 size={16} className="animate-spin" /> Saving Profile...</>
            ) : (
              <><Save size={16} /> Save Biometrics & Update Plan</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
