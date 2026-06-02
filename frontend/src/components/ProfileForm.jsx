import React, { useState } from 'react';
import { saveUserProfile } from '../api/client';
import { 
  User, Scale, Target, Leaf, Save, ChevronDown, Ruler, Activity, 
  Users, CheckCircle, Loader2, Dumbbell, Calendar, AlertCircle, HeartPulse, MapPin, BarChart
} from 'lucide-react';

export default function ProfileForm({ user, onProfileSaved }) {
  // Schema ke hisaab se state initialize kar rahe hain
  const [formData, setFormData] = useState({
    age: user?.profile?.age || '', 
    gender: user?.profile?.gender || 'Male',
    height: user?.profile?.height || '', 
    weight: user?.profile?.weight || '', 
    goal: user?.profile?.goal || 'Weight loss', 
    activityLevel: user?.profile?.activityLevel || 'Sedentary',
    dietaryPreference: user?.profile?.dietaryPreference || 'Non-veg',
    
    // Nayi fields as per Schema
    experienceLevel: user?.profile?.experienceLevel || 'Beginner',
    equipment: user?.profile?.equipment || 'Full Gym',
    schedule: user?.profile?.schedule || '3 days a week',
    
    // Optional Fields
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
      // DHYAN DEIN: Schema mein yeh sab 'profile' object ke andar hai
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
      }, 2500);

    } catch (err) {
      console.error(err);
      setIsSaving(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none mb-10 flex flex-col items-center justify-center min-h-[500px] transition-all duration-500 animate-in fade-in zoom-in">
        <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20 scale-0 animate-[ping_0.5s_ease-out_forwards,scale_0.3s_ease-out_0.5s_forwards]">
          <CheckCircle size={48} className="text-emerald-500 dark:text-emerald-400" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white text-center">Profile Saved Successfully!</h2>
        <p className="text-slate-500 dark:text-slate-400 text-center mt-3 font-medium text-lg">
          Syncing your data with the AI engine...
        </p>
        <div className="mt-8 flex gap-2">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none mb-10 transition-all duration-300">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
          <User size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-none">Complete Your Profile</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">Please provide accurate details for the best AI plan.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Core Physical Stats */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Age</label>
          <div className="relative">
            <input type="number" placeholder="e.g. 25" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} required />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><User size={18} /></span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Gender</label>
          <div className="relative">
            <select className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold appearance-none cursor-pointer" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Users size={18} /></span>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><ChevronDown size={18} /></span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Height (cm)</label>
          <div className="relative">
            <input type="number" placeholder="e.g. 170" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold" value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} required />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Ruler size={18} /></span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Weight (kg)</label>
          <div className="relative">
            <input type="number" placeholder="e.g. 75" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} required />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Scale size={18} /></span>
          </div>
        </div>

        {/* Goals & Diet */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Fitness Goal</label>
          <div className="relative">
            <select className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold appearance-none cursor-pointer" value={formData.goal} onChange={e => setFormData({...formData, goal: e.target.value})} required>
              <option value="Weight loss">Weight loss</option>
              <option value="Muscle gain">Muscle gain</option>
              <option value="Fat loss">Fat loss</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Target size={18} /></span>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><ChevronDown size={18} /></span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Dietary Preference</label>
          <div className="relative">
            <select className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold appearance-none cursor-pointer" value={formData.dietaryPreference} onChange={e => setFormData({...formData, dietaryPreference: e.target.value})} required>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-veg">Non-veg</option>
              <option value="Vegan">Vegan</option>
            </select>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Leaf size={18} /></span>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><ChevronDown size={18} /></span>
          </div>
        </div>

        {/* Workout Specifics */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Experience Level</label>
          <div className="relative">
            <select className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold appearance-none cursor-pointer" value={formData.experienceLevel} onChange={e => setFormData({...formData, experienceLevel: e.target.value})} required>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><BarChart size={18} /></span>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><ChevronDown size={18} /></span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Available Equipment</label>
          <div className="relative">
            <select className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold appearance-none cursor-pointer" value={formData.equipment} onChange={e => setFormData({...formData, equipment: e.target.value})} required>
              <option value="None (Bodyweight)">None (Bodyweight)</option>
              <option value="Dumbbells Only">Dumbbells Only</option>
              <option value="Basic Home Gym">Basic Home Gym</option>
              <option value="Full Gym">Full Gym</option>
            </select>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Dumbbell size={18} /></span>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><ChevronDown size={18} /></span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Workout Schedule</label>
          <div className="relative">
            <select className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold appearance-none cursor-pointer" value={formData.schedule} onChange={e => setFormData({...formData, schedule: e.target.value})} required>
              <option value="2-3 days a week">2-3 days a week</option>
              <option value="4-5 days a week">4-5 days a week</option>
              <option value="6 days a week">6 days a week</option>
            </select>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Calendar size={18} /></span>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><ChevronDown size={18} /></span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Activity Level</label>
          <div className="relative">
            <select className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold appearance-none cursor-pointer" value={formData.activityLevel} onChange={e => setFormData({...formData, activityLevel: e.target.value})} required>
              <option value="Sedentary">Sedentary</option>
              <option value="Lightly active">Lightly active</option>
              <option value="Moderately active">Moderately active</option>
              <option value="Very active">Very active</option>
            </select>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Activity size={18} /></span>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><ChevronDown size={18} /></span>
          </div>
        </div>

        {/* --- OPTIONAL FIELDS (Highlighted accordingly) --- */}
        <hr className="md:col-span-2 border-slate-200 dark:border-slate-700 my-4" />
        <h3 className="md:col-span-2 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Optional Health & Location Details</h3>

        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Allergies (Optional)</label>
          <div className="relative">
            <input type="text" placeholder="e.g. Peanuts, Lactose (Leave blank if none)" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold" value={formData.allergies} onChange={e => setFormData({...formData, allergies: e.target.value})} />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><AlertCircle size={18} /></span>
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Medical Conditions (Optional)</label>
          <div className="relative">
            <input type="text" placeholder="e.g. Asthma, Knee pain (Leave blank if none)" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold" value={formData.medicalConditions} onChange={e => setFormData({...formData, medicalConditions: e.target.value})} />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><HeartPulse size={18} /></span>
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Workout Location (Optional)</label>
          <div className="relative">
            <select className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold appearance-none cursor-pointer" value={formData.workoutLocation} onChange={e => setFormData({...formData, workoutLocation: e.target.value})}>
              <option value="">Select a location (or leave blank)</option>
              <option value="Gym">Gym</option>
              <option value="Home">Home</option>
              <option value="Outdoors">Outdoors</option>
            </select>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><MapPin size={18} /></span>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><ChevronDown size={18} /></span>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSaving}
          className={`md:col-span-2 group flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-lg transition-all shadow-lg active:scale-[0.98] mt-4
            ${isSaving ? 'bg-emerald-500/70 text-white cursor-not-allowed shadow-none' : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'}`}
        >
          {isSaving ? (
            <><Loader2 size={20} className="animate-spin" /> Saving Profile...</>
          ) : (
            <><Save size={20} className="group-hover:rotate-12 transition-transform" /> Save & Build AI Plan</>
          )}
        </button>
      </form>
    </div>
  );
}