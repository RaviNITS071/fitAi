import React from 'react';
import { 
  Dumbbell, Utensils, Activity, Bot, ArrowRight, Database, 
  Sparkles, CheckCircle2, ShieldCheck, Cpu, Star, Flame
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function Home({ onNavigate, isDarkMode, toggleTheme, user, onLogout }) {
  const navigate = useNavigate();

  const corePillars = [
    {
      title: "RAG Vector Search Engine",
      description: "1,536-dimensional embeddings with cosine similarity and deterministic goal pre-filters in MongoDB Atlas.",
      icon: <Database size={28} className="text-indigo-600 dark:text-indigo-400" />,
      tag: "GenAI Core",
      link: "/rag-explorer"
    },
    {
      title: "6-Day Adaptive Splits",
      description: "Progressive overload protocols, biomechanical form cues, and mandatory Sunday active recovery.",
      icon: <Dumbbell size={28} className="text-purple-600 dark:text-purple-400" />,
      tag: "Strength & Hypertrophy",
      link: "/workouts"
    },
    {
      title: "Indian Macro Nutrition",
      description: "Mifflin-St Jeor TDEE calculations paired with authentic Indian meals (paneer, dal, soya chunks, chicken).",
      icon: <Utensils size={28} className="text-emerald-600 dark:text-emerald-400" />,
      tag: "Nutrition Science",
      link: "/nutrition"
    },
    {
      title: "Conversational Coach Studio",
      description: "24/7 AI coach with citation provenance, speech synthesis audio read-aloud, and zero hallucinations.",
      icon: <Bot size={28} className="text-amber-600 dark:text-amber-400" />,
      tag: "Voice & Text",
      link: "/coach"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* Top Navbar */}
      <Navbar 
        user={user} 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        onLogout={onLogout} 
      />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 text-center relative overflow-hidden">
        
        {/* Glow Spheres */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[130px] rounded-full -z-10 pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/10 blur-[130px] rounded-full -z-10 pointer-events-none" />

        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-widest mb-8 shadow-sm">
          <Sparkles size={14} className="animate-pulse" />
          <span>Next-Gen MERN + LangChain.js Architecture</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight max-w-5xl mx-auto leading-[1.1] mb-6">
          Your Personal <span className="gradient-text">RAG-Grounded AI Coach</span> For Verifiable Progress.
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
          Say goodbye to fabricated workout routines. FitAI uses LangChain.js, OpenAI embeddings, and MongoDB Atlas Vector Search to retrieve evidence-backed fitness guidance and Indian nutrition protocols with strict citation audits.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            to={user ? "/dashboard" : "/login"}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base rounded-full shadow-xl shadow-indigo-600/30 active:scale-98 transition-all flex items-center justify-center gap-2 group"
          >
            <span>{user ? "Open Your Athlete Dashboard" : "Start Your Free Journey"}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/rag-explorer"
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-slate-800 dark:text-white font-black text-base rounded-full shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Database size={18} className="text-indigo-500" />
            <span>Inspect Live RAG Pipeline</span>
          </Link>
        </div>

        {/* Tech Stack Chips Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 max-w-4xl mx-auto">
          <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block mb-4">
            Production Engineering Stack
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-300">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              MongoDB Atlas Vector Search ($vectorSearch)
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              LangChain.js Orchestration
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              OpenAI text-embedding-3-small (1,536 dims)
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              Google OAuth 2.0
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              Zod Structured Output Schema
            </span>
          </div>
        </div>
      </main>

      {/* Feature Pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Engineered For Scientific Accuracy
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Explore how each layer of FitAI ensures zero hallucinations and maximum athletic performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {corePillars.map((pillar, i) => (
            <Link
              key={i}
              to={pillar.link}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-200/20 dark:shadow-none hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                <span>Explore Feature</span>
                <ArrowRight size={14} className="ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black">Ready to Train Smarter With Evidence?</h2>
            <p className="text-sm sm:text-base text-indigo-200">
              Join FitAI today to generate your 6-day split, custom Indian diet plan, and real-time biometric tracking.
            </p>
            <div className="pt-2">
              <Link
                to={user ? "/dashboard" : "/login"}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 hover:bg-indigo-50 font-black text-sm rounded-full shadow-lg active:scale-98 transition-all"
              >
                <span>Get Started Now</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}