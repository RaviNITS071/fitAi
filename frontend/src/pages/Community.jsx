import React, { useState } from 'react';
import { 
  Users, ThumbsUp, CheckCircle2, TrendingUp, Calendar
} from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Aarav Sharma',
    role: 'Software Engineer',
    achievement: 'Lost 11.5 kg & Bench Pressed 100 kg',
    duration: '16 Weeks',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    story: "FitAI completely replaced my generic fitness coach. It customized my Indian vegetarian diet with high-protein soya and paneer while taking my knee strain precautions into account.",
    metric: '-11.5 kg Body Mass',
    likes: 42
  },
  {
    id: 2,
    name: 'Pooja Iyer',
    role: 'Data Analyst & Distance Runner',
    achievement: 'Sub-2hr Half Marathon',
    duration: '12 Weeks',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    story: "The Zone 2 cardiovascular protocols and hydration guidelines kept my energy consistent throughout my marathon training without recurring shin splints.",
    metric: '21.1 km in 1h 54m',
    likes: 56
  },
  {
    id: 3,
    name: 'Rohan Mehta',
    role: 'Product Designer',
    achievement: 'Gained 5.2 kg Lean Muscle',
    duration: '20 Weeks',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    story: "Managing chronic lower back sensitivity had stalled my progression. FitAI substituted chest-supported rows and Romanian deadlifts. 100% pain-free now.",
    metric: '+5.2 kg Lean Mass',
    likes: 38
  }
];

const COMMUNITY_FEED = [
  {
    user: 'Vikram Singh',
    time: '2 hours ago',
    tag: '6-Day Split',
    content: 'Completed 4×10 Goblet squats with 28kg. Using the interval rest timer kept cadence tight throughout the session.',
    cheers: 14
  },
  {
    user: 'Ananya Deshmukh',
    time: '4 hours ago',
    tag: 'Vegetarian Macro Target',
    content: 'Hit 110g protein target today with low-fat paneer, Greek yogurt, and moong sprouts salad. Hydration reached 2.5L.',
    cheers: 21
  },
  {
    user: 'Karthik Raja',
    time: 'Yesterday',
    tag: 'Progression Milestone',
    content: 'Completed week 8 of hypertrophy cycle. Incline dumbbell chest press increased from 20kg to 28kg with clean 3-second eccentrics.',
    cheers: 35
  }
];

export default function Community() {
  const [likes, setLikes] = useState({});

  const handleLike = (id) => {
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Athlete Stories & Community
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Real training logs, body composition milestones, and member training notes.
        </p>
      </div>

      {/* Featured Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-card flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-white">{item.name}</h3>
                  <span className="text-xs text-slate-400">{item.role}</span>
                </div>
              </div>

              <div className="inline-block px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-xs font-semibold mb-3">
                {item.metric}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                "{item.story}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
              <span className="font-mono text-[11px]">{item.duration} Protocol</span>
              <button 
                onClick={() => handleLike(item.id)}
                className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <ThumbsUp size={13} />
                <span>{item.likes + (likes[item.id] || 0)}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Community Activity Feed */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-card">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          Recent Training Logs
        </h2>

        <div className="space-y-3">
          {COMMUNITY_FEED.map((entry, idx) => (
            <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-800 text-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900 dark:text-white">{entry.user}</span>
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] text-slate-500 font-medium">{entry.tag}</span>
                </div>
                <span className="text-[11px] text-slate-400">{entry.time}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {entry.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
