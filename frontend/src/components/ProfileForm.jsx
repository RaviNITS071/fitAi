import React, { useState } from 'react';
import { saveUserProfile } from '../api/client';

export default function ProfileForm({ user, onProfileSaved }) {
  const [formData, setFormData] = useState({
    age: user.age || '', weight: user.weight || '', goal: user.goal || 'Weight loss', 
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
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm mb-8 transition-colors">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Complete your Profile</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input type="number" placeholder="Age" className="p-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded outline-none focus:ring-2 focus:ring-blue-500" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} required/>
        <input type="number" placeholder="Weight (kg)" className="p-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded outline-none focus:ring-2 focus:ring-blue-500" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} required/>
        
        <select className="p-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded outline-none focus:ring-2 focus:ring-blue-500" value={formData.goal} onChange={e => setFormData({...formData, goal: e.target.value})}>
          <option>Weight loss</option><option>Muscle gain</option><option>Fat loss</option>
        </select>
        
        <select className="p-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded outline-none focus:ring-2 focus:ring-blue-500" value={formData.dietaryPreference} onChange={e => setFormData({...formData, dietaryPreference: e.target.value})}>
          <option>Vegetarian</option><option>Non-veg</option><option>Vegan</option>
        </select>

        <button type="submit" className="col-span-2 bg-green-600 hover:bg-green-700 text-white p-3 rounded font-bold">Save Profile</button>
      </form>
    </div>
  );
}
