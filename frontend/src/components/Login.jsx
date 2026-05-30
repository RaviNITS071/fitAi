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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 transition-colors">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md w-full max-w-md transition-colors">
        <Activity size={48} className="text-blue-600 dark:text-blue-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-center text-slate-800 dark:text-white">
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </h1>
        <p className="text-center text-slate-500 dark:text-slate-400 mb-6">
          {isLogin ? 'Login to continue your fitness journey' : 'Join FitAI Pro today'}
        </p>

        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm font-medium">{error}</div>}

        <div className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Username</label>
              <input type="text" name="username" required={!isLogin} className="w-full p-3 border dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none" value={formData.username} onChange={handleChange} />
            </div>
          )}
          <div>
            <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Email Address</label>
            <input type="email" name="email" required className="w-full p-3 border dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Password</label>
            <input type="password" name="password" required className="w-full p-3 border dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none" value={formData.password} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-bold mt-6 transition-colors">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  );
}
