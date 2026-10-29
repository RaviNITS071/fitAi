import React, { useState } from 'react';
import { 
  Users, Award, ThumbsUp, MessageSquare, TrendingUp, 
  Sparkles, Heart, CheckCircle2, Star, Flame, Dumbbell
} from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Aarav Sharma',
    role: 'Software Engineer',
    achievement: 'Lost 11.5 kg & Bench Pressed 100 kg',
    duration: '16 Weeks',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    story: "FitAI completely replaced my generic fitness coach. The RAG engine customized my Indian vegetarian diet with high-protein soya and paneer while respecting my knee strain precautions.",
    metric: '-11.5 kg Fat',
    likes: 42
  },
  {
    name: 'Pooja Iyer',
    role: 'Data Analyst & Marathon Runner',
    achievement: 'Sub-2hr Half Marathon',
    duration: '12 Weeks',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    story: "The Zone 2 cardiovascular protocols and hydration guidelines kept my energy consistent throughout my marathon training without any shin splints.",
    metric: '21.1 km in 1h 54m',
    likes: 56
  },
  {
    name: 'Rohan Mehta',
    role: 'Product Designer',
    achievement: 'Gained 5.2 kg Lean Muscle',
    duration: '20 Weeks',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    story: "I had lower back issues from deadlifting wrong. FitAI's orthopedic precautions switched me to chest-supported dumbbell rows and Romanian deadlifts. 100% pain free now!",
    metric: '+5.2 kg Muscle',
    likes: 38
  }
];

const COMMUNITY_FEED = [
  {
    user: 'Vikram Singh',
    time: '2 hours ago',
    badge: '6-Day Streak 🔥',
    content: 'Just logged 4x10 Goblet squats with 28kg dumbbell. The rest timer on the workout page kept my pace on point!',
    cheers: 14
  },
  {
    user: 'Ananya Deshmukh',
    time: '4 hours ago',
    badge: 'Hydration Champion 💧',
    content: 'Hit my 2.5L water target today before 6 PM. The meal tracker made hitting 110g protein as a vegetarian super easy with low-fat paneer and chana sprouts.',
    cheers: 21
  },
  {
    user: 'Karthik Raja',
    time: 'Yesterday',
    badge: 'PR Unlocked ⚡',
    content: 'Completed the AI Coach progressive overload split. Incline dumbbell press went from 20kg to 28kg in 8 weeks.',
    cheers: 35
  }
];

export default function Community() {
  const [likes, setLikes] = useState({});

  const handleLike = (id) => {
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-14">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-wider mb-3">
          <Sparkles size={14} /> Inspiring Transformations & Peer Support
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Real People. <span className="gradient-text">Verifiable Results.</span>
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
          Explore authentic athlete milestones grounded by FitAI's sports science engine.
        </p>
      </div>

      {/* Featured Transformation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-200/20 dark:shadow-none flex flex-col justify-between hover:border-purple-500/40 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500" />
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-tight">{item.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.role}</p>
                  </div>
                </div>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  {item.duration}
                </span>
              </div>

              {/* Verified Metric Badge */}
              <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-3 mb-4 text-center">
                <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">Milestone Reached</span>
                <div className="text-lg font-black text-slate-900 dark:text-white">{item.metric}</div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                "{item.story}"
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6 flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>

              <button
                onClick={() => handleLike(idx)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
              >
                <ThumbsUp size={14} className={likes[idx] ? 'text-indigo-600' : ''} />
                <span>{item.likes + (likes[idx] || 0)}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Live Community Feed */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/20 dark:shadow-none space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Users size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Athlete Live Activity Feed</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Share your daily workout logs and hydration streaks</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {COMMUNITY_FEED.map((post, i) => (
            <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-slate-900 dark:text-white">{post.user}</span>
                  <span className="text-[10px] text-slate-400">• {post.time}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    {post.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{post.content}</p>
              </div>

              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors self-start sm:self-center shadow-sm">
                <Flame size={14} className="text-orange-500" />
                <span>{post.cheers} Cheers</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
