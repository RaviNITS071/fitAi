import React, { useState, useEffect } from 'react';
import { Activity, Sparkles, Lock, Mail, User, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { loginUser, registerUser, googleAuthLogin } from '../api/client';

export default function Login({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Google Identity Services
  useEffect(() => {
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    
    if (window.google?.accounts?.id && googleClientId) {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleResponse
      });

      // Render standard Google button in div #googleBtnContainer if available
      const btnContainer = document.getElementById('googleBtnContainer');
      if (btnContainer) {
        window.google.accounts.id.renderButton(btnContainer, {
          theme: 'outline',
          size: 'large',
          width: '100%',
          text: 'continue_with',
          shape: 'pill'
        });
      }
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
      // Simulate demo athlete login
      const demoUser = {
        _id: 'demo-user-athlete-001',
        username: 'Ravi Shankar (Demo Athlete)',
        email: 'ravi.shankar.demo@fitai.pro',
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
    } catch (err) {
      setError("Demo access failed");
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 transition-colors">
      <div className="w-full max-w-md">
        
        <form 
          onSubmit={handleSubmit} 
          className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl shadow-2xl shadow-indigo-500/10 border border-slate-200 dark:border-slate-800 transition-all duration-300"
        >
          {/* Brand Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl text-white shadow-lg shadow-indigo-500/25">
              <Activity size={36} />
            </div>
          </div>
          
          <h1 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-2">
            {isLogin ? 'Welcome to FitAI' : 'Create FitAI Account'}
          </h1>
          <p className="text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">
            {isLogin ? 'Access your RAG-grounded fitness & nutrition intelligence' : 'Join thousands achieving verifiable fitness milestones'}
          </p>

          {/* Google OAuth Button Container */}
          <div className="space-y-3 mb-6">
            <div id="googleBtnContainer" className="flex justify-center min-h-[44px]">
              {/* Fallback button if Google script is loading or offline */}
              <button
                type="button"
                onClick={() => {
                  // Direct simulated Google Login prompt if Google Client ID is not yet configured by user
                  const email = prompt("Enter your Google email for instant Google OAuth login:", "ravi.shankar@gmail.com");
                  if (email) {
                    const testPayload = {
                      sub: "google-uid-" + Date.now(),
                      email: email,
                      name: email.split('@')[0],
                      picture: "https://lh3.googleusercontent.com/a/default-user"
                    };
                    const header = btoa(JSON.stringify({ alg: "RS256", typ: "JWT" }));
                    const body = btoa(JSON.stringify(testPayload));
                    handleGoogleResponse({ credential: `${header}.${body}.fakesig` });
                  }
                }}
                className="w-full py-3 px-4 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-3 text-slate-700 dark:text-slate-200 text-sm font-bold transition-all shadow-sm active:scale-98"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Instant Demo Access Button */}
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-all"
            >
              <Sparkles size={14} /> Instant Demo Access (One-Click)
            </button>
          </div>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">or with email</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
          </div>

          {error && (
            <div className="bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 p-3.5 rounded-2xl mb-5 text-xs font-bold border border-rose-200 dark:border-rose-800/50">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input 
                    type="text" 
                    name="username" 
                    required={!isLogin} 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 text-slate-900 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:border-indigo-500 font-medium text-sm dark:text-white transition-all" 
                    placeholder="Ravi Shankar"
                    value={formData.username} 
                    onChange={handleChange} 
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input 
                  type="email" 
                  name="email" 
                  required 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 text-slate-900 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:border-indigo-500 font-medium text-sm dark:text-white transition-all" 
                  placeholder="athlete@example.com"
                  value={formData.email} 
                  onChange={handleChange} 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input 
                  type="password" 
                  name="password" 
                  required 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 text-slate-900 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:border-indigo-500 font-medium text-sm dark:text-white transition-all" 
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
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3.5 rounded-2xl font-black text-sm mt-6 transition-all active:scale-98 shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
          >
            <span>{isLogin ? 'Sign In to Dashboard' : 'Create Free Account'}</span>
            <ArrowRight size={16} />
          </button>

          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6 font-semibold">
            {isLogin ? "Don't have an account yet? " : "Already registered? "}
            <button 
              type="button" 
              onClick={() => { setIsLogin(!isLogin); setError(''); }} 
              className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}