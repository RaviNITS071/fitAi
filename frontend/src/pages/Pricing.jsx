import React, { useState } from 'react';
import { Check, Sparkles, Zap, Shield, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  const tiers = [
    {
      name: 'Free Starter',
      description: 'Foundational fitness tools and basic movement libraries.',
      monthlyPrice: 0,
      annualPrice: 0,
      popular: false,
      features: [
        'Interactive Movement & Exercise Studio',
        'Mifflin-St Jeor TDEE & Macro Calculator',
        'Hydration Tracker with Glass Counter',
        'Access to Verified Knowledge Corpus',
        'Community Stories & Testimonials'
      ],
      ctaText: 'Start for Free',
      ctaLink: '/login'
    },
    {
      name: 'Pro Athlete',
      description: 'Complete GenAI RAG engine with personalized splits & Indian nutrition.',
      monthlyPrice: 19,
      annualPrice: 14,
      popular: true,
      badge: 'Most Popular',
      features: [
        'Everything in Free Starter',
        'RAG-Grounded 6-Day Workout Splits',
        'Custom Indian Nutrition & Macro Meal Plans',
        'Strict Medical & Allergen Safety Filters',
        'Unlimited AI Coach Studio Conversations',
        'Verifiable Citations with Source Provenance',
        'Dynamic Progress & Biometric Tracking'
      ],
      ctaText: 'Claim 14-Day Free Trial',
      ctaLink: '/login'
    },
    {
      name: 'Elite Coach & Voice',
      description: 'Advanced multi-modal intelligence with conversational voice guidance.',
      monthlyPrice: 49,
      annualPrice: 39,
      popular: false,
      features: [
        'Everything in Pro Athlete',
        'Web Speech & Telephonic Voice Guidance',
        'Multi-Query Vector Retrieval & MMR Diversity',
        'Biomechanical Form Correction Logs',
        'Priority GPU Inference Latency (<800ms)',
        'Exportable Sports Science Audit Reports',
        'Direct 1-on-1 Engineering Support'
      ],
      ctaText: 'Unlock Elite Performance',
      ctaLink: '/login'
    }
  ];

  const faqs = [
    {
      q: "How does FitAI's RAG system differ from basic ChatGPT fitness advice?",
      a: "Generic LLMs frequently hallucinate unsafe exercise loads or recommend allergens. FitAI uses Retrieval-Augmented Generation (RAG) over a vetted clinical and sports science knowledge base. Every precaution and workout guideline is grounded in retrieved source documents with explicit citation provenance."
    },
    {
      q: "Can I use Google Sign-In to access my account?",
      a: "Yes! FitAI has integrated Google OAuth 2.0. You can authenticate seamlessly with your Google email or use standard credentials."
    },
    {
      q: "Are the nutrition recommendations suitable for Indian dietary patterns?",
      a: "Absolutely. FitAI specializes in authentic Indian nutrition: dal, whole wheat rotis, paneer, soya chunks, Greek yogurt, sprouts, and lean poultry, with metric portion sizes in grams and katoris."
    },
    {
      q: "Can I cancel or switch my plan at any time?",
      a: "Yes, you can upgrade, downgrade, or cancel anytime directly from your dashboard with zero lock-in."
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-3">
          <Sparkles size={14} /> Transparent & Flexible Plans
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Invest in Your <span className="gradient-text">Physical Potential</span>
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
          Select the optimal plan to accelerate your strength, body composition, and endurance.
        </p>

        {/* Annual / Monthly Toggle */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className={`text-sm font-bold ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-8 bg-indigo-600 rounded-full p-1 relative transition-colors focus:outline-none"
          >
            <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
              Annual Billing
            </span>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Save 25%
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
              tier.popular
                ? 'bg-gradient-to-b from-indigo-900/10 to-purple-900/10 dark:from-indigo-950/40 dark:to-purple-950/40 border-2 border-indigo-600 shadow-2xl shadow-indigo-500/10 scale-105'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none'
            }`}
          >
            {tier.badge && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-indigo-600/30">
                {tier.badge}
              </span>
            )}

            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{tier.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 min-h-[36px]">{tier.description}</p>

              <div className="my-6">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
                  ${isAnnual ? tier.annualPrice : tier.monthlyPrice}
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold ml-2">/ month</span>
                {isAnnual && tier.annualPrice > 0 && (
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">Billed annually (${tier.annualPrice * 12}/yr)</p>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">Included Features:</span>
                {tier.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-semibold">
                    <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <Link
                to={tier.ctaLink}
                className={`w-full py-3.5 rounded-2xl font-black text-sm text-center block transition-all shadow-md active:scale-98 ${
                  tier.popular
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white'
                }`}
              >
                {tier.ctaText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/20 dark:shadow-none space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Everything you need to know about our GenAI RAG engine and subscriptions</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} className="shrink-0" /> : <ChevronDown size={18} className="shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
