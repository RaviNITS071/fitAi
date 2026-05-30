import React from 'react';
import { Dumbbell, Utensils, Activity, Bot, ArrowRight, Heart, Target, ChevronRight, Moon, Sun, User, LogOut, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home({ onNavigate, isDarkMode, toggleTheme, user, onLogout }) {
  
  const features = [
    {
      title: "AI Workout Plans",
      description: "Personalized routines adapting to your real-time performance and goals.",
      icon: <Dumbbell size={32} className="text-indigo-600 dark:text-indigo-400" />,
      bg: "bg-indigo-50 dark:bg-indigo-500/10",
      border: "border-indigo-100 dark:border-indigo-500/20",
      hover: "hover:border-indigo-300 dark:hover:border-indigo-500/50",
      action: () => onNavigate('dashboard')
    },
    {
      title: "Smart Nutrition",
      description: "Macro-calculated meal plans that sync with your daily energy expenditure.",
      icon: <Utensils size={32} className="text-emerald-600 dark:text-emerald-400" />,
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-100 dark:border-emerald-500/20",
      hover: "hover:border-emerald-300 dark:hover:border-emerald-500/50",
      action: () => onNavigate('dashboard')
    },
    {
      title: "Progress Tracking",
      description: "Log your weight, hydration, sleep, and workouts with our AI logic engine.",
      icon: <Activity size={32} className="text-purple-600 dark:text-purple-400" />,
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-100 dark:border-purple-500/20",
      hover: "hover:border-purple-300 dark:hover:border-purple-500/50",
      action: () => onNavigate('dashboard') 
    },
    {
      title: "AI Assistant",
      description: "24/7 fitness coach to answer your queries and adjust your plans on the fly.",
      icon: <Bot size={32} className="text-amber-600 dark:text-amber-400" />,
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-100 dark:border-amber-500/20",
      hover: "hover:border-amber-300 dark:hover:border-amber-500/50",
      action: () => onNavigate('dashboard') 
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#0a0f1c] text-white' : 'bg-[#fafbfff] text-slate-900'} flex flex-col font-sans transition-colors duration-500 selection:bg-indigo-500/30`}>
      
      {/* Navbar / Header */}
      <nav className="w-full bg-white/80 dark:bg-[#0a0f1c]/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-600/30 group-hover:shadow-indigo-600/50 group-hover:scale-105 transition-all duration-300">
              F
            </div>
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">FitAI.</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 font-bold text-sm text-slate-500 dark:text-slate-400">
            <button className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-y-0.5 transition-all duration-300">Features</button>
            <button className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-y-0.5 transition-all duration-300">Testimonials</button>
            <button className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-y-0.5 transition-all duration-300">Pricing</button>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
             {/* Dark/Light Mode Toggle */}
             <button 
                onClick={toggleTheme}
                className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-full transition-all duration-300 focus:outline-none hover:scale-110 active:scale-95"
                aria-label="Toggle Dark Mode"
             >
               {isDarkMode ? <Sun size={20} className="hover:text-amber-500 transition-colors" /> : <Moon size={20} className="hover:text-indigo-600 transition-colors" />}
             </button>

             {/* Conditional Rendering based on user auth state */}
             {user ? (
               <>
                 <div className="hidden sm:flex items-center gap-2 font-bold text-slate-700 dark:text-slate-200 px-4 py-2 bg-slate-100 dark:bg-slate-800/50 rounded-full border border-slate-200 dark:border-slate-700/50">
                   <User size={16} className="text-indigo-600 dark:text-indigo-400" />
                   <span>{user.name || 'User'}</span>
                 </div>
                 <button 
                    onClick={onLogout}
                    className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 dark:text-red-400 font-bold py-2 sm:py-2.5 px-4 sm:px-6 rounded-full transition-all duration-300 active:scale-95 text-sm sm:text-base border border-red-200 dark:border-red-500/20 hover:shadow-lg hover:shadow-red-500/10"
                 >
                   <LogOut size={16} /> Logout
                 </button>
               </>
             ) : (
               <>
                 <button 
                    onClick={() => onNavigate('login')}
                    className="hidden sm:block font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-4 py-2"
                 >
                   Log in
                 </button>
                 <button 
                    onClick={() => onNavigate('onboarding')}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-2 sm:py-2.5 px-4 sm:px-6 rounded-full transition-all duration-300 active:scale-95 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 text-sm sm:text-base"
                 >
                   Get Started
                 </button>
               </>
             )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 relative overflow-hidden">
        
        {/* Abstract Background Shapes with enhanced animations */}
        <div className="absolute top-[10%] left-[15%] w-[30rem] h-[30rem] bg-indigo-500/20 dark:bg-indigo-500/10 blur-[120px] rounded-full -z-10 animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[10%] right-[15%] w-[30rem] h-[30rem] bg-emerald-500/20 dark:bg-emerald-500/10 blur-[120px] rounded-full -z-10 animate-[pulse_8s_ease-in-out_infinite]" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-[40%] left-[40%] w-[20rem] h-[20rem] bg-purple-500/20 dark:bg-purple-500/10 blur-[100px] rounded-full -z-10 animate-[pulse_6s_ease-in-out_infinite]" style={{animationDelay: '2s'}}></div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 shadow-sm">
          <Sparkles size={14} className="text-indigo-500 animate-pulse" /> 
          The Future of Fitness is Here
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-slate-900 dark:text-white tracking-tight leading-[1.05] max-w-5xl mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
          Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 animate-gradient-x">AI Coach</span> for Ultimate Results.
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl font-medium mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 leading-relaxed">
          Stop guessing. Start progressing. Our logic engine builds adaptive workout and nutrition plans based on your real-time daily biometrics.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500 w-full sm:w-auto">
           <button 
             onClick={() => onNavigate('dashboard')} 
             className="w-full sm:w-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-50 font-black text-lg py-4 px-10 rounded-full transition-all duration-300 flex items-center justify-center gap-3 group shadow-xl shadow-slate-900/10 dark:shadow-white/10 hover:shadow-indigo-600/30"
           >
             {user ? "Go to Dashboard" : "Start Your Journey"}
             <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
           </button>
           
           {!user && (
             <button 
               onClick={() => onNavigate('login')}
               className="w-full sm:w-auto bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-600/50 dark:hover:border-indigo-400/50 hover:bg-white dark:hover:bg-slate-900 font-black text-lg py-4 px-10 rounded-full transition-all duration-300"
             >
               I already have an account
             </button>
           )}
        </div>
      </main>

      {/* Features Grid */}
      <section className="py-32 bg-white dark:bg-[#0a0f1c] border-t border-slate-200/50 dark:border-slate-800/50 relative z-10 transition-colors duration-500">
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTQ4LCAxNjMsIDE4NCwgMC4xKSIvPjwvc3ZnPg==')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTQ4LCAxNjMsIDE4NCwgMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] -z-10"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Everything you need to succeed</h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">Powered by advanced algorithms that learn and adapt to your body's unique signals.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                onClick={feature.action}
                className={`p-8 rounded-[2.5rem] bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 hover:-translate-y-2 transition-all duration-300 cursor-pointer group shadow-xl shadow-slate-200/20 dark:shadow-none hover:shadow-2xl ${feature.hover}`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${feature.bg} ${feature.border} border group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 dark:group-hover:from-indigo-400 dark:group-hover:to-purple-400 transition-all">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-medium leading-relaxed mb-8">
                  {feature.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all">
                  <span className="relative overflow-hidden">
                    <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Explore</span>
                    <span className="inline-block absolute left-0 top-full transition-transform duration-300 group-hover:-translate-y-full">Explore</span>
                  </span>
                  <ChevronRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#050811] py-16 border-t border-slate-200/50 dark:border-slate-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl">
                F
              </div>
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">FitAI.</span>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-500 dark:text-slate-400 font-bold">
              <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact Support</a>
            </div>
          </div>
          
          <div className="w-full h-px bg-slate-200 dark:bg-slate-800/50 mb-8"></div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} FitAI. All rights reserved.
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/50 px-4 py-2 rounded-full border border-slate-100 dark:border-slate-800/50">
              Made with <Heart size={14} className="text-rose-500 fill-rose-500 animate-pulse" /> for your health.
            </p>
          </div>
        </div>
      </footer>

      {/* Add this CSS for the gradient animation in your index.css or a style tag if not present */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}} />
    </div>
  );
}