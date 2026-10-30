import React, { useState, useEffect } from 'react';
import { Activity, Lock, Mail, User, ArrowRight, Sparkles } from 'lucide-react';
import { loginUser, registerUser, googleAuthLogin } from '../api/client';

export default function Login({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  // Initialize Google Identity Services
  useEffect(() => {
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!googleClientId) return;

    const renderGoogleBtn = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleGoogleResponse
        });

        const btnContainer = document.getElementById('googleBtnContainer');
        if (btnContainer) {
          btnContainer.innerHTML = '';
          window.google.accounts.id.renderButton(btnContainer, {
            theme: 'outline',
            size: 'large',
            width: btnContainer.offsetWidth ? Math.min(btnContainer.offsetWidth, 360) : 340,
            text: 'continue_with',
            shape: 'rectangular'
          });
          setGoogleLoaded(true);
        }
      }
    };

    if (window.google?.accounts?.id) {
      renderGoogleBtn();
    } else {
      const interval = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(interval);
          renderGoogleBtn();
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, []);

  const handleGoogleResponse = async (response) => {
    setIsLoading(true);
    setError('');
    try {
      const res = await googleAuthLogin(response.credential);
      if (res.data?.token) {
        localStorage.setItem('fitai_token', res.data.token);
      }
      onLoginSuccess(res.data.user || res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Google authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Connect to backend and persist demo athlete directly in MongoDB Atlas
      const res = await googleAuthLogin(JSON.stringify({
        email: 'ravi.athlete.demo@fitai.pro',
        name: 'Ravi Shankar (Demo Athlete)',
        picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        sub: 'google-demo-ravi-001'
      }));

      if (res.data?.token) {
        localStorage.setItem('fitai_token', res.data.token);
      }
      onLoginSuccess(res.data.user || res.data);
    } catch (err) {
      // Fallback in case server is unreachable
      const demoUser = {
        _id: 'demo-user-athlete-001',
        username: 'Ravi Shankar (Demo Athlete)',
        email: 'ravi.athlete.demo@fitai.pro',
        authProvider: 'google',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        profile: {
          age: 24,
          gender: 'Male',
          height: 175,
          weight: 72,
          goal: 'Muscle gain & strength',
          activityLevel: 'Moderately Active',
          dietaryPreference: 'Vegetarian',
          experienceLevel: 'Intermediate',
          equipment: 'Full Gym',
          schedule: '5 days a week',
          allergies: 'None',
          medicalConditions: 'Mild lower back sensitivity'
        }
      };
      localStorage.setItem('fitai_token', 'demo-token-athlete-access');
      onLoginSuccess(demoUser);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let res;
      if (isLogin) {
        res = await loginUser(formData.email, formData.password);
      } else {
        res = await registerUser(formData.username, formData.email, formData.password);
      }

      if (res.data?.token) {
        localStorage.setItem('fitai_token', res.data.token);
      }
      onLoginSuccess(res.data.user || res.data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred during authentication");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F17] flex items-center justify-center p-4 sm:p-6 transition-colors">
      <div className="w-full max-w-md">
        
        <form 
          onSubmit={handleSubmit} 
          className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-card border border-slate-200 dark:border-slate-800 transition-colors"
        >
          {/* Brand Mark */}
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-slate-900 font-bold">
              <Activity size={18} className="text-emerald-500" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Fit<span className="text-emerald-600 dark:text-emerald-500">AI</span>
            </span>
          </div>
          
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {isLogin ? 'Log in to your account' : 'Create an athlete account'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">
            {isLogin ? 'Access your customized training split and nutrition plan.' : 'Start your evidence-based fitness progression.'}
          </p>

          {/* Google OAuth Button Container */}
          <div className="space-y-3 mb-6">
            <div id="googleBtnContainer" className="flex justify-center min-h-[44px] w-full" />
            
            {!googleLoaded && (
              <div className="w-full py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 text-xs font-medium">
                <span>Connecting to Google...</span>
              </div>
            )}

            {/* Instant Demo Access Button */}
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2 text-xs font-medium transition-colors"
            >
              <Sparkles size={14} className="text-amber-500" />
              <span>One-Click Demo Access</span>
            </button>
          </div>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            <span className="text-xs uppercase text-slate-400 font-medium tracking-wide">or</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
          </div>

          {error && (
            <div className="bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 p-3 rounded-lg mb-4 text-xs font-medium border border-rose-200 dark:border-rose-900">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input 
                    type="text" 
                    name="username" 
                    required={!isLogin} 
                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:border-slate-900 dark:focus:border-slate-400 text-sm transition-colors" 
                    placeholder="Ravi Shankar"
                    value={formData.username} 
                    onChange={handleChange} 
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
                <input 
                  type="email" 
                  name="email" 
                  required 
                  className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:border-slate-900 dark:focus:border-slate-400 text-sm transition-colors" 
                  placeholder="athlete@example.com"
                  value={formData.email} 
                  onChange={handleChange} 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3 text-slate-400" />
                <input 
                  type="password" 
                  name="password" 
                  required 
                  className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:border-slate-900 dark:focus:border-slate-400 text-sm transition-colors" 
                  placeholder="••••••••"
                  value={formData.password} 
                  onChange={handleChange} 
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 disabled:opacity-50 text-white py-2.5 rounded-lg font-medium text-sm mt-6 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <span>{isLogin ? 'Log in' : 'Create account'}</span>
            <ArrowRight size={16} />
          </button>

          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6 font-normal">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" 
              onClick={() => { setIsLogin(!isLogin); setError(''); }} 
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
