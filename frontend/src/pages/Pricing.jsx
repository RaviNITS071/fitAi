import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  const tiers = [
    {
      name: 'Free Starter',
      description: 'Essential fitness tools and full exercise library access.',
      monthlyPrice: 0,
      annualPrice: 0,
      popular: false,
      features: [
        'Complete Exercise & Movement Library',
        'TDEE & Daily Macro Calculator',
        'Interactive Hydration Tracker',
        'Rest Interval Workout Timers',
        'Community Stories & Tips'
      ],
      ctaText: 'Start Free',
      ctaLink: '/login'
    },
    {
      name: 'Pro Member',
      description: 'Fully personalized workout splits & custom Indian meal plans.',
      monthlyPrice: 19,
      annualPrice: 14,
      popular: true,
      badge: 'Recommended',
      features: [
        'Everything in Free Starter',
        'Personalized 6-Day Workout Splits',
        'Custom Indian Nutrition & Macro Meals',
        'Allergy & Medical Condition Safeguards',
        'Unlimited AI Coach Conversations',
        'Detailed Progress & Weight Tracking',
        'Weekly Routine Adjustments'
      ],
      ctaText: 'Start 14-Day Free Trial',
      ctaLink: '/login'
    },
    {
      name: 'Elite Athlete',
      description: 'Comprehensive fitness coaching with voice assistance and priority support.',
      monthlyPrice: 49,
      annualPrice: 39,
      popular: false,
      features: [
        'Everything in Pro Member',
        'Hands-Free Voice Coaching Guidance',
        'Advanced Form & Biomechanical Cues',
        'Priority 24/7 Coach Response Time',
        'Exportable Workout & Nutrition Logs',
        '1-on-1 Plan Optimization Review'
      ],
      ctaText: 'Unlock Elite Access',
      ctaLink: '/login'
    }
  ];

  const faqs = [
    {
      q: "How does FitAI create safer, more accurate plans than generic chatbots?",
      a: "Generic AI often hallucinates impractical routines or unsafe weights. FitAI uses clinical sports science guidelines and verified nutritional databases to ensure every routine, calorie target, and precaution matches your exact biometrics and limitations."
    },
    {
      q: "Can I sign in easily with my Google Account?",
      a: "Yes. FitAI supports Google Sign-In. You can log in securely with your Google email in one click, or use standard credentials."
    },
    {
      q: "Are the meal recommendations suitable for vegetarian and Indian diets?",
      a: "Yes. FitAI includes extensive authentic Indian food options: paneer, dal, whole wheat rotis, soya chunks, Greek yogurt, sprouts, and lean poultry, with metric portion sizes in grams and katoris."
    },
    {
      q: "Can I cancel or change my plan anytime?",
      a: "Yes, there is no lock-in. You can upgrade, downgrade, or cancel your subscription at any time directly from your account settings."
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Transparent, athlete-focused plans
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
          Choose the level of programming and coaching that matches your physical ambitions.
        </p>

        {/* Annual / Monthly Toggle */}
        <div className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg mt-8">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              !isAnnual 
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              isAnnual 
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <span>Annual</span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.2 rounded">Save 25%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto">
        {tiers.map((tier, idx) => (
          <div
            key={idx}
            className={`bg-white dark:bg-slate-900 rounded-xl p-6 shadow-card flex flex-col justify-between transition-colors relative border ${
              tier.popular
                ? 'border-emerald-600 dark:border-emerald-500 ring-1 ring-emerald-600 dark:ring-emerald-500'
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            {tier.badge && (
              <span className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-md bg-emerald-600 text-white font-semibold text-[11px] uppercase tracking-wide">
                {tier.badge}
              </span>
            )}

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{tier.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">{tier.description}</p>

              <div className="my-5 pb-5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                  ${isAnnual ? tier.annualPrice : tier.monthlyPrice}
                </span>
                <span className="text-slate-500 text-xs font-normal ml-1">/ month</span>
                {isAnnual && tier.annualPrice > 0 && (
                  <p className="text-[11px] text-slate-400 mt-1">Billed annually (${tier.annualPrice * 12}/year)</p>
                )}
              </div>

              <div className="space-y-2.5">
                <span className="text-xs font-semibold text-slate-900 dark:text-white block mb-2">Features Included:</span>
                {tier.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
              <Link
                to={tier.ctaLink}
                className={`w-full py-2.5 rounded-lg font-medium text-xs text-center block transition-colors shadow-sm ${
                  tier.popular
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white'
                }`}
              >
                {tier.ctaText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-card space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>

        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-3.5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={15} className="shrink-0 text-slate-400" /> : <ChevronDown size={15} className="shrink-0 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-3.5 pb-3.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
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
