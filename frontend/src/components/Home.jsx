import React from 'react';
import { 
  Dumbbell, Utensils, Bot, ArrowRight, 
  CheckCircle2, Star, TrendingUp, ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function Home({ onNavigate, isDarkMode, toggleTheme, user, onLogout }) {
  const features = [
    {
      title: "6-Day Workout Splits",
      description: "Progressive overload programming with structured sets, reps, and built-in interval rest timers.",
      icon: <Dumbbell size={22} className="text-slate-900 dark:text-slate-100" />,
      tag: "Training",
      link: "/workouts"
    },
    {
      title: "Macro-Calibrated Nutrition",
      description: "Indian and global high-protein meal plans aligned with Mifflin-St Jeor TDEE calorie calculations.",
      icon: <Utensils size={22} className="text-slate-900 dark:text-slate-100" />,
      tag: "Nutrition",
      link: "/nutrition"
    },
    {
      title: "24/7 AI Coach",
      description: "Immediate guidance on exercise modifications, form checks, recovery protocols, and meal swaps.",
      icon: <Bot size={22} className="text-slate-900 dark:text-slate-100" />,
      tag: "Coaching",
      link: "/coach"
    },
    {
      title: "Daily Habit & Metric Tracking",
      description: "Track body weight trends, log completed sessions, and monitor daily hydration targets consistently.",
      icon: <TrendingUp size={22} className="text-slate-900 dark:text-slate-100" />,
      tag: "Analytics",
      link: user ? "/dashboard" : "/login"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Profile & Biometrics",
      desc: "Input your weight, height, age, activity level, fitness objectives, and dietary preferences."
    },
    {
      step: "02",
      title: "Personalized Protocol",
      desc: "Receive an evidence-based 6-day split, custom calorie targets, and orthopedic injury precautions."
    },
    {
      step: "03",
      title: "Log & Track Progress",
      desc: "Execute workouts with interval timers, record body metrics, and adjust protocols with your AI coach."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Navigation */}
      <Navbar 
        user={user} 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        onLogout={onLogout} 
      />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Professional Athlete Platform</span>
        </div>

        {/* Main Hero Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight sm:leading-tight mb-6">
          Evidence-based training and nutrition, engineered for results.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Structured 6-day workout splits, calculated Indian nutrition plans, and intelligent daily progress tracking built for sustainable athletic performance.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to={user ? "/dashboard" : "/login"}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-base rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <span>{user ? "Open Dashboard" : "Get Started Free"}</span>
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/workouts"
            className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-medium text-base rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <Dumbbell size={18} className="text-slate-500" />
            <span>Exercise Library</span>
          </Link>
        </div>

        {/* Trust & Metric Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-left sm:text-center">
          <div>
            <span className="block text-2xl font-bold text-slate-900 dark:text-white">5,000+</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Athletes</span>
          </div>
          <div>
            <span className="block text-2xl font-bold text-slate-900 dark:text-white">6-Day</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Split Architecture</span>
          </div>
          <div>
            <span className="block text-2xl font-bold text-slate-900 dark:text-white">100%</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Macro-Calibrated</span>
          </div>
          <div>
            <span className="block text-2xl font-bold text-slate-900 dark:text-white">24/7</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Coaching Intelligence</span>
          </div>
        </div>
      </main>

      {/* Core Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-500">Core Capabilities</span>
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mt-1">
            Built for serious training routines
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            A comprehensive suite of sports science tools designed without unnecessary clutter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-500 uppercase tracking-wide block mb-1">
                  {item.tag}
                </span>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-semibold text-slate-900 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                <span>View details</span>
                <ArrowRight size={14} className="ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Step by Step Workflow */}
      <section className="bg-white dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-500">Methodology</span>
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mt-1">
              How FitAI structures your progression
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
              Clear, systematic execution from assessment to weekly adaptation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl">
                <span className="text-xs font-mono font-bold text-slate-400 block mb-3">
                  {s.step}
                </span>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner - Minimal & High Contrast */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-slate-900 dark:bg-slate-800 rounded-xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Ready to optimize your training?</h2>
            <p className="text-sm sm:text-base text-slate-400">
              Generate your 6-day split and nutritional framework in less than two minutes.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              to={user ? "/dashboard" : "/login"}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors"
            >
              <span>{user ? "Go to Dashboard" : "Start Free Plan"}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Clean Minimalist Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white">FitAI</span>
            <span>•</span>
            <span>Sports science and athletic performance</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/workouts" className="hover:text-slate-900 dark:hover:text-white">Workouts</Link>
            <Link to="/nutrition" className="hover:text-slate-900 dark:hover:text-white">Nutrition</Link>
            <Link to="/coach" className="hover:text-slate-900 dark:hover:text-white">AI Coach</Link>
            <Link to="/pricing" className="hover:text-slate-900 dark:hover:text-white">Pricing</Link>
            <Link to="/community" className="hover:text-slate-900 dark:hover:text-white">Community</Link>
          </div>

          <p>© 2026 FitAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
