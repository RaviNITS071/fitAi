import React, { useState } from 'react';
import { 
  AlertTriangle, RefreshCw, Zap, ShieldAlert, WifiOff, HardDrive, 
  Lock, UserX, Clock, Cpu, UploadCloud, Sparkles, ChevronRight, 
  CheckCircle2, ArrowRight, ExternalLink, Activity, HelpCircle, 
  Terminal, Layers, FileX, Rocket, X, Home, LifeBuoy, CreditCard,
  Database, ShieldCheck, Mail, ArrowUpRight, BarChart3, AlertOctagon
} from 'lucide-react';

export default function ErrorPagesShowcase({ initialError = null, onClose = null, onRetry = null }) {
  const [activeScreen, setActiveScreen] = useState(initialError?.type || 'ai-credits');
  const [retryLoading, setRetryLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleSimulatedRetry = () => {
    setRetryLoading(true);
    setTimeout(() => {
      setRetryLoading(false);
      if (onRetry) onRetry();
    }, 1200);
  };

  const screens = [
    { id: '404', name: '404 Not Found', category: 'Routing', code: '404' },
    { id: '500', name: '500 Server Error', category: 'System', code: '500' },
    { id: 'rate-limit', name: 'Rate Limit Reached', category: 'Quota', code: '429' },
    { id: 'api-rate-limit', name: 'API Rate Limit', category: 'Developer', code: '429' },
    { id: 'subscription-limit', name: 'Subscription Limit', category: 'Billing', code: '402' },
    { id: 'maintenance', name: 'Maintenance Mode', category: 'Ops', code: '503' },
    { id: 'network-error', name: 'Network Connection', category: 'Client', code: 'ERR' },
    { id: 'no-internet', name: 'No Internet Screen', category: 'Offline', code: 'OFFLINE' },
    { id: 'empty-state', name: 'Empty Dashboard', category: 'Product', code: 'EMPTY' },
    { id: '403', name: 'Access Denied (403)', category: 'Security', code: '403' },
    { id: 'suspended', name: 'Account Suspended', category: 'Account', code: 'SUSPENDED' },
    { id: 'auth-failed', name: 'Auth Failed', category: 'Security', code: '401' },
    { id: 'ai-credits', name: 'AI Credits Exhausted', category: 'AI Quota', code: '429 AI' },
    { id: 'file-too-large', name: 'File Too Large', category: 'Storage', code: '413' },
    { id: 'coming-soon', name: 'Coming Soon', category: 'Roadmap', code: 'PREVIEW' },
    { id: 'universal-error', name: 'Universal Error', category: 'Fallback', code: 'OOPS' }
  ];

  const isModalMode = Boolean(onClose);

  return (
    <div className={isModalMode ? "w-full max-w-2xl mx-auto relative" : "min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30"}>
      
      {/* Modal Close Button */}
      {isModalMode && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
          title="Close dialog"
        >
          <X size={16} />
        </button>
      )}

      {/* Top Showcase Toolbar - Only visible in developer showcase route */}
      {!isModalMode && (
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50 px-4 py-3">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full lg:w-auto justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Layers size={18} />
                </div>
                <div>
                  <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                    <span>SaaS Error & Status States Suite</span>
                    <span className="text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full">
                      16 Screens
                    </span>
                  </h1>
                  <p className="text-[11px] text-slate-400">Production-grade, Figma & Linear inspired UX</p>
                </div>
              </div>
            </div>

            {/* Screen Quick Selector Tabs */}
            <div className="w-full lg:w-auto overflow-x-auto flex items-center gap-1.5 pb-1 lg:pb-0 scrollbar-none">
              {screens.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveScreen(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    activeScreen === s.id
                      ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50'
                  }`}
                >
                  <span className="text-[10px] opacity-70 font-mono">{s.code}</span>
                  <span>{s.name}</span>
                </button>
              ))}
            </div>
          </div>
        </header>
      )}

      {/* Main Screen Renderer */}
      <main className={isModalMode ? "w-full" : "flex-1 flex items-center justify-center p-4 sm:p-8"}>
        <div className="w-full max-w-4xl">
          
          {/* 1. 404 Not Found Page */}
          {activeScreen === '404' && (
            <div className="bg-slate-950/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" />
              
              {/* Illustration: Lost Astronaut Floating in Digital Space */}
              <div className="w-36 h-36 mx-auto mb-8 relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl animate-pulse" />
                <svg className="w-32 h-32 text-blue-400 relative z-10" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-30 animate-spin" style={{ animationDuration: '24s' }} />
                  <ellipse cx="60" cy="52" rx="22" ry="24" fill="#0F172A" stroke="currentColor" strokeWidth="2" />
                  <rect x="46" y="42" width="28" height="18" rx="8" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
                  <circle cx="54" cy="50" r="2.5" fill="#38BDF8" className="animate-ping" />
                  <path d="M40 78C40 70 48 68 60 68C72 68 80 70 80 78V92H40V78Z" fill="#0F172A" stroke="currentColor" strokeWidth="2" />
                  <circle cx="95" cy="32" r="4" fill="#38BDF8" className="opacity-80" />
                  <circle cx="25" cy="85" r="2" fill="#818CF8" />
                  <circle cx="85" cy="98" r="3" fill="#A855F7" />
                </svg>
              </div>

              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400 bg-blue-950/50 border border-blue-800/60 px-3 py-1 rounded-full">
                Error 404 • Missing Coordinates
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-4 mb-3">
                Lost in Digital Space
              </h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                The cosmic route you requested doesn't exist or has slipped past the event horizon. Let's guide you back to mission control.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button 
                  onClick={() => window.location.href = '/'}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-white text-slate-900 hover:bg-slate-100 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Home size={16} />
                  <span>Return to Mission Control</span>
                </button>
                <button 
                  onClick={() => alert("Support ticket initiated with navigational logs.")}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 font-medium text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <LifeBuoy size={16} />
                  <span>Contact Orbital Support</span>
                </button>
              </div>
            </div>
          )}

          {/* 2. 500 Internal Server Error */}
          {activeScreen === '500' && (
            <div className="bg-slate-950/60 backdrop-blur-xl border border-rose-900/40 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-b from-rose-500/5 via-transparent to-transparent pointer-events-none" />
              
              {/* Illustration: Server Rack with Glowing Warning Streams */}
              <div className="w-36 h-36 mx-auto mb-8 relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-rose-500/10 blur-xl animate-pulse" />
                <svg className="w-28 h-28 text-rose-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="15" width="60" height="70" rx="6" fill="#0F172A" stroke="currentColor" strokeWidth="2" />
                  <line x1="20" y1="38" x2="80" y2="38" stroke="#334155" strokeWidth="1.5" />
                  <line x1="20" y1="62" x2="80" y2="62" stroke="#334155" strokeWidth="1.5" />
                  <circle cx="30" cy="26" r="3" fill="#EF4444" className="animate-ping" />
                  <circle cx="38" cy="26" r="3" fill="#EF4444" />
                  <line x1="50" y1="26" x2="72" y2="26" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="30" cy="50" r="3" fill="#F59E0B" />
                  <circle cx="38" cy="50" r="3" fill="#10B981" />
                  <line x1="50" y1="50" x2="72" y2="50" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="30" cy="74" r="3" fill="#EF4444" />
                  <circle cx="38" cy="74" r="3" fill="#475569" />
                  <line x1="50" y1="74" x2="72" y2="74" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400 bg-rose-950/60 border border-rose-800/60 px-3 py-1 rounded-full">
                Error 500 • Internal System Anomaly
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-4 mb-3">
                Server Core Interrupted
              </h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                Our infrastructure experienced an unexpected telemetry disruption. Engineering operations have been alerted and data integrity remains protected.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button 
                  onClick={handleSimulatedRetry}
                  disabled={retryLoading}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw size={14} className={retryLoading ? 'animate-spin' : ''} />
                  <span>{retryLoading ? 'Reconnecting Nodes...' : 'Retry Connection'}</span>
                </button>
                <a 
                  href="https://status.fitai.pro"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 font-medium text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Activity size={14} />
                  <span>Live System Telemetry</span>
                </a>
              </div>
            </div>
          )}

          {/* 3. Rate Limit Reached */}
          {activeScreen === 'rate-limit' && (
            <div className="bg-slate-950/60 backdrop-blur-xl border border-amber-900/40 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="max-w-xl mx-auto text-center">
                
                {/* 100% Circular Progress Visual */}
                <div className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="54" stroke="#1E293B" strokeWidth="8" fill="transparent" />
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="54" 
                      stroke="#F59E0B" 
                      strokeWidth="8" 
                      strokeDasharray="339.29" 
                      strokeDashoffset="0" 
                      strokeLinecap="round" 
                      fill="transparent" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-white">100%</span>
                    <span className="text-[10px] text-amber-400 font-medium uppercase">Exhausted</span>
                  </div>
                </div>

                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/50 border border-amber-800/60 px-3 py-1 rounded-full">
                  Status 429 • Daily Limit Reached
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-4 mb-2">
                  Daily Generation Limit Reached
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed">
                  You've utilized all 25 daily AI recommendations on the Free Starter Tier. Your quota resets in <span className="font-semibold text-white">4 hours 18 minutes</span>.
                </p>

                {/* Quota Breakdown Card */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 mb-6 text-left">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-slate-400">Plan Generation Allocation</span>
                    <span className="font-mono font-semibold text-white">25 / 25 Used</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-amber-500 rounded-full" />
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-500 mt-2">
                    <span>Window: 24h Sliding</span>
                    <span>Resets: 00:00 UTC</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button 
                    onClick={() => setActiveScreen('subscription-limit')}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Zap size={14} />
                    <span>Upgrade to Unlimited Pro</span>
                  </button>
                  <button 
                    onClick={handleSimulatedRetry}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                  >
                    Check Cooldown Status
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4. API Rate Limit Error (Developer / Terminal Focused) */}
          {activeScreen === 'api-rate-limit' && (
            <div className="bg-[#090D16] border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl font-mono text-left max-w-2xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-500 ml-2">HTTP/2 429 Too Many Requests</span>
                </div>
                <span className="text-[11px] text-rose-400 bg-rose-950/60 px-2.5 py-0.5 rounded border border-rose-800">
                  RATE_LIMIT_EXCEEDED
                </span>
              </div>

              {/* Terminal Code Mock */}
              <div className="bg-black/50 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1.5 mb-6">
                <div className="text-slate-500">{"// Response Headers"}</div>
                <div><span className="text-purple-400">x-ratelimit-limit:</span> 60 req/min</div>
                <div><span className="text-purple-400">x-ratelimit-remaining:</span> 0</div>
                <div><span className="text-purple-400">retry-after:</span> 34s</div>
                <div><span className="text-purple-400">x-request-id:</span> req_89f3a92c019</div>
                <div className="pt-2 text-rose-400">{"Error: Rate limit of 60 req/min exceeded for client API token."}</div>
              </div>

              <div className="font-sans">
                <h3 className="text-lg font-bold text-white mb-1">Developer API Quota Saturated</h3>
                <p className="text-xs text-slate-400 mb-6">
                  Your team's API token reached its throughput threshold. Upgrade to dedicated cloud throughput or increase rate concurrency.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="https://fitai.pro/developer/keys" 
                    className="px-5 py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2"
                  >
                    <Terminal size={14} />
                    <span>Manage Dedicated API Keys</span>
                  </a>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText("req_89f3a92c019");
                      setIsCopied(true);
                      setTimeout(() => setIsCopied(false), 2000);
                    }}
                    className="px-5 py-2.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-700 flex items-center justify-center gap-2"
                  >
                    <span>{isCopied ? 'Copied Request ID!' : 'Copy Request ID'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 5. Subscription Limit Reached */}
          {activeScreen === 'subscription-limit' && (
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-8 sm:p-10 shadow-2xl max-w-3xl mx-auto">
              <div className="text-center max-w-lg mx-auto mb-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950 border border-emerald-800/80 px-3 py-1 rounded-full">
                  Tier Capacity
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-2">
                  Unlock Pro Athlete Features
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  You've reached the maximum capacity of your current subscription tier. Upgrade to access biometric analysis, unlimited splits, and private coach voice.
                </p>
              </div>

              {/* Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl opacity-75">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase">Starter Tier</span>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Current</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-4">$0 <span className="text-xs font-normal text-slate-400">/mo</span></div>
                  <ul className="text-xs text-slate-400 space-y-2">
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-slate-500" /> Basic 6-Day split</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-slate-500" /> 25 Daily suggestions</li>
                    <li className="flex items-center gap-2 text-rose-400 line-through">❌ Realtime RAG citations</li>
                    <li className="flex items-center gap-2 text-rose-400 line-through">❌ Unlimited biometric tracking</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500/80 p-5 rounded-xl relative shadow-lg">
                  <div className="absolute -top-2.5 right-4 bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full">
                    Recommended
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-emerald-400 uppercase">Pro Athlete</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-4">$19 <span className="text-xs font-normal text-slate-400">/mo</span></div>
                  <ul className="text-xs text-slate-300 space-y-2 mb-6">
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Unlimited AI Plan Generation</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Clinical RAG Research Citations</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> 1-on-1 AI Coach Studio Chat</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> CSV & Health Export</li>
                  </ul>
                  <button 
                    onClick={() => alert("Redirecting to Stripe secure checkout...")}
                    className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <CreditCard size={14} />
                    <span>Upgrade Instantly</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 6. Maintenance Mode */}
          {activeScreen === 'maintenance' && (
            <div className="bg-slate-950/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-2xl">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                <Clock size={36} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/80 px-3 py-1 rounded-full">
                Scheduled Maintenance • Sprint 42.1
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-2">
                Upgrading Knowledge Corpus
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6">
                Our infrastructure is currently undergoing index re-indexing and vector optimizations. Training logs and historical data are fully backed up.
              </p>

              {/* Progress & ETA Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-left mb-6">
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                  <span>Migration Progress</span>
                  <span>78% Complete</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[78%] h-full bg-amber-500 rounded-full transition-all duration-500" />
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-500 mt-2">
                  <span>Estimated Availability:</span>
                  <span className="font-semibold text-slate-300">22:30 UTC (~18 mins)</span>
                </div>
              </div>

              <button 
                onClick={handleSimulatedRetry}
                className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center justify-center gap-2 mx-auto"
              >
                <RefreshCw size={14} className={retryLoading ? 'animate-spin' : ''} />
                <span>Refresh Live Status</span>
              </button>
            </div>
          )}

          {/* 7. Network Connection Error */}
          {activeScreen === 'network-error' && (
            <div className="bg-slate-950/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto shadow-2xl">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6">
                <WifiOff size={36} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 bg-rose-950/50 border border-rose-800 px-3 py-1 rounded-full">
                Network Disconnected
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-2">
                Connection Cable Unplugged
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Your device lost handshake with the FitAI gateway. Please inspect local Wi-Fi, Ethernet cables, or proxy configurations.
              </p>

              {/* Troubleshooting Tips */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-left text-xs text-slate-400 space-y-2 mb-6">
                <p className="font-semibold text-white">Recommended Troubleshooting:</p>
                <p>• Verify your router or local cellular data status.</p>
                <p>• Ensure CORS or enterprise VPN isn't terminating port 5000.</p>
              </div>

              <button 
                onClick={handleSimulatedRetry}
                className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <RefreshCw size={14} className={retryLoading ? 'animate-spin' : ''} />
                <span>Attempt Reconnection</span>
              </button>
            </div>
          )}

          {/* 8. No Internet Screen (Apple-inspired Clean White/Minimal) */}
          {activeScreen === 'no-internet' && (
            <div className="bg-white text-slate-900 border border-slate-200 rounded-2xl p-8 sm:p-12 text-center max-w-md mx-auto shadow-xl">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-6">
                <WifiOff size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">You're Offline</h2>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Connect to the internet to sync training split changes. You can still review cached routines and daily workout checklists.
              </p>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 mb-6 text-left">
                <span className="font-semibold block mb-1">Offline Mode Active:</span>
                Cached data from your last sync remains accessible on this device.
              </div>

              <button 
                onClick={handleSimulatedRetry}
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors"
              >
                Try Reconnecting
              </button>
            </div>
          )}

          {/* 9. Empty State */}
          {activeScreen === 'empty-state' && (
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto shadow-2xl">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <Target size={36} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">No Training Programs Yet</h2>
              <p className="text-xs sm:text-sm text-slate-400 mb-8 max-w-sm mx-auto leading-relaxed">
                Your athlete profile is initialized! Generate your first evidence-grounded split to start tracking performance metrics.
              </p>
              <button 
                onClick={() => alert("Triggering RAG generation pipeline...")}
                className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 mx-auto shadow-md"
              >
                <Sparkles size={16} />
                <span>Build My Custom Plan</span>
              </button>
            </div>
          )}

          {/* 10. Access Denied (403) */}
          {activeScreen === '403' && (
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto shadow-2xl">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
                <Lock size={36} />
              </div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/50 border border-amber-800 px-3 py-1 rounded-full">
                Security Policy 403 • Access Denied
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-2">
                Permission Clearance Required
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Your role credentials lack permission to access internal administration pipelines or administrative corpus documents.
              </p>
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={() => alert("Access elevation request dispatched to workspace administrator.")}
                  className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700"
                >
                  Request Admin Access
                </button>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="px-5 py-2.5 rounded-lg bg-white text-slate-900 text-xs font-semibold"
                >
                  Back to Safe Route
                </button>
              </div>
            </div>
          )}

          {/* 11. Account Suspended */}
          {activeScreen === 'suspended' && (
            <div className="bg-slate-950/60 border border-rose-900/40 rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto shadow-2xl">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6">
                <UserX size={36} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 bg-rose-950/60 border border-rose-800 px-3 py-1 rounded-full">
                Account Status • Suspended
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-2">
                Account Temporarily Suspended
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                This account was flagged for billing non-compliance or terms violation. API endpoints and synchronization are paused.
              </p>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-left text-xs text-slate-400 mb-6 space-y-1">
                <div><span className="text-slate-500">Case ID:</span> SUSP-2026-9918</div>
                <div><span className="text-slate-500">Reason:</span> Outstanding invoice renewal</div>
              </div>
              <button 
                onClick={() => alert("Billing portal redirect...")}
                className="w-full py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs"
              >
                Resolve Billing & Compliance
              </button>
            </div>
          )}

          {/* 12. Authentication Failed */}
          {activeScreen === 'auth-failed' && (
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center max-w-md mx-auto shadow-2xl">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mb-6">
                <ShieldAlert size={28} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Authentication Failed</h2>
              <p className="text-xs text-slate-400 mb-6">
                Your session token expired or Google OAuth signature could not be verified. Please authenticate again.
              </p>
              <button 
                onClick={() => window.location.href = '/login'}
                className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
              >
                Sign In Again
              </button>
            </div>
          )}

          {/* 13. AI Credits Exhausted (The Exact Issue from Screenshot!) */}
          {activeScreen === 'ai-credits' && (
            <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-indigo-500/40 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center max-w-xl mx-auto">
              <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
              
              {/* Neural Network Visual */}
              <div className="w-24 h-24 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 relative">
                <Cpu size={40} />
                <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-rose-500 text-[10px] font-bold text-white">
                  0 Tokens
                </span>
              </div>

              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-800 px-3 py-1 rounded-full">
                HTTP 429 • Model Quota Exhausted
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-2">
                AI Inference Credits Depleted
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
                Your OpenAI organization has exhausted available token credits for <code className="bg-slate-800 text-indigo-300 px-1 py-0.5 rounded">gpt-4o-mini</code>. FitAI can fall back to our verified deterministic synthesizer or you can add credits.
              </p>

              {/* In-app action options */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-left mb-6 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">OpenAI Account Quota</span>
                  <span className="font-mono text-rose-400 font-bold">$0.00 Remaining</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-0 h-full bg-indigo-500" />
                </div>
                <p className="text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-semibold">Active Fallback:</span> Grounded scientific clinical sports nutrition engine is active.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button 
                  onClick={handleSimulatedRetry}
                  disabled={retryLoading}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw size={14} className={retryLoading ? 'animate-spin' : ''} />
                  <span>{retryLoading ? 'Synthesizing...' : 'Generate with Scientific Fallback'}</span>
                </button>
                <a 
                  href="https://platform.openai.com/settings/organization/billing/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center justify-center gap-2"
                >
                  <span>Refill OpenAI Credits</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          )}

          {/* 14. File Upload Too Large */}
          {activeScreen === 'file-too-large' && (
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center max-w-md mx-auto shadow-2xl">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mb-6">
                <UploadCloud size={28} />
              </div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/50 border border-amber-800 px-3 py-1 rounded-full">
                Error 413 • Payload Too Large
              </span>
              <h2 className="text-2xl font-bold text-white mt-4 mb-2">File Size Exceeded</h2>
              <p className="text-xs text-slate-400 mb-6">
                The uploaded document exceeds the 10MB parser limit. Compress the PDF/CSV or upload relevant pages only.
              </p>
              <button 
                onClick={() => alert("Reopening file uploader with compression guidelines...")}
                className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium border border-slate-700"
              >
                Choose Smaller Document
              </button>
            </div>
          )}

          {/* 15. Coming Soon Feature */}
          {activeScreen === 'coming-soon' && (
            <div className="bg-slate-950/60 border border-emerald-500/30 rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto shadow-2xl">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <Rocket size={36} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-full">
                Q3 Roadmap • In Engineering
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-2">
                Live Video Form Tracking
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Real-time barbell bar-path velocity and squat depth analysis powered by on-device computer vision.
              </p>
              <div className="flex gap-2 max-w-sm mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter email for early beta"
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
                />
                <button 
                  onClick={() => alert("Subscribed for beta notifications!")}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg"
                >
                  Notify Me
                </button>
              </div>
            </div>
          )}

          {/* 16. Generic Universal Error Page */}
          {activeScreen === 'universal-error' && (
            <div className="bg-slate-950/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-2xl">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <Activity size={36} />
              </div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
                Universal Recovery State
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-2">
                Something Unexpected Occurred
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6">
                FitAI encountered a state inconsistency. No workouts or profile records were lost. Let's get you back on track.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button 
                  onClick={() => window.location.reload()}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <RefreshCw size={14} />
                  <span>Reload Session</span>
                </button>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer System Specs - Only in standalone route */}
      {!isModalMode && (
        <footer className="border-t border-slate-800/80 bg-slate-950 px-4 py-3 text-center text-xs text-slate-500">
          FitAI SaaS Error Suite • Design System Standards: Inter 400-600, Manrope 700, 8px Grid, Accessible Contrast Ratios
        </footer>
      )}
    </div>
  );
}

