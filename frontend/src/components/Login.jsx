import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { loginUser, registerUser } from '../api/client';

export default function Login({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      let res;
      if (isLogin) {
        res = await loginUser(formData.email, formData.password);
      } else {
        res = await registerUser(formData.username, formData.email, formData.password);
      }
      onLoginSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl shadow-2xl shadow-blue-500/10 border border-slate-100 dark:border-slate-800 w-full max-w-md transition-all duration-300"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
            <Activity size={40} className="text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        
        <h1 className="text-3xl font-extrabold text-center text-slate-900 dark:text-white mb-2">
          {isLogin ? 'Welcome Back' : 'Get Started'}
        </h1>
        <p className="text-center text-slate-500 dark:text-slate-400 mb-8">
          {isLogin ? 'Login to continue your fitness journey' : 'Join FitAI Pro today'}
        </p>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-sm font-semibold border border-red-100 dark:border-red-800">
            {error}
          </div>
        )}

        <div className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Username</label>
              <input 
                type="text" 
                name="username" 
                required={!isLogin} 
                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all dark:text-white" 
                placeholder="Enter your username"
                value={formData.username} 
                onChange={handleChange} 
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Email Address</label>
            <input 
              type="email" 
              name="email" 
              required 
              className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all dark:text-white" 
              placeholder="name@example.com"
              value={formData.email} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all dark:text-white" 
              placeholder="••••••••"
              value={formData.password} 
              onChange={handleChange} 
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold mt-8 transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20"
        >
          {isLogin ? 'Login' : 'Create Account'}
        </button>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-8">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  );
}