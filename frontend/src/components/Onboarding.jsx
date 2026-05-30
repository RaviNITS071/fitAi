import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Mail, Lock, User as UserIcon } from 'lucide-react';
import { loginUser, registerUser } from '../api/client';

export default function Login({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = isLogin 
        ? await loginUser(formData.email, formData.password)
        : await registerUser(formData.username, formData.email, formData.password);
      
      setUser(res.data);
      if (res.data.aiPlan && res.data.aiPlan.workoutPlan) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-2xl w-full max-w-md relative z-10 border border-white/50">
        <div className="text-center mb-10">
          <div className="bg-indigo-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200">
            <Activity size={36} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">FitAI Pro</h1>
          <p className="text-slate-500 mt-2 font-medium">Your personalized AI fitness journey</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 border border-red-100 p-4 rounded-xl mb-6 text-sm font-semibold text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input type="text" placeholder="Username" required className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input type="email" placeholder="Email Address" required className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input type="password" placeholder="Password" required className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all mt-2">
            {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <p className="text-center text-slate-600 mt-8 font-medium">
          {isLogin ? "New to FitAI? " : "Already joined us? "}
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-indigo-600 font-bold hover:underline">
            {isLogin ? 'Create an account' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}