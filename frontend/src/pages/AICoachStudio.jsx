import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, User, Send, Loader2, Volume2, VolumeX, BookOpen, Activity
} from 'lucide-react';
import { chatWithAI } from '../api/client';

export default function AICoachStudio({ user }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${user?.username || 'Athlete'}. I am your dedicated training and nutrition assistant. Ask me anything regarding your active workout routine, progressive overload protocols, macro adjustments, or exercise modifications.`,
      sources: []
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speakText = (text) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (messageText) => {
    const textToSend = messageText || input.trim();
    if (!textToSend) return;

    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
    setIsLoading(true);

    try {
      const res = await chatWithAI(user?._id || 'guest', textToSend);
      const reply = res.data.reply;
      const sources = res.data.sources || [];
      
      setMessages(prev => [...prev, { sender: 'ai', text: reply, sources }]);
      speakText(reply);
    } catch (err) {
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: "Server connection issue. Please verify that your backend service is running and try again.",
        sources: []
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "How to apply progressive overload safely?",
    "High-protein vegetarian dinner with paneer and soya",
    "Exercise substitutions for lower back sensitivity",
    "Post-workout hydration and recovery guidelines"
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col h-[calc(100vh-5rem)]">
      
      {/* Studio Header - Minimal & High Contrast */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-4 shadow-card">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-900 dark:bg-white text-emerald-500 flex items-center justify-center font-bold">
            <Activity size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">FitAI Coach Studio</h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Sports science and biometric guidance</p>
          </div>
        </div>

        {/* Audio Speech Synthesis Toggle */}
        <button
          onClick={() => {
            const next = !voiceEnabled;
            setVoiceEnabled(next);
            if (!next && 'speechSynthesis' in window) window.speechSynthesis.cancel();
          }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
            voiceEnabled
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          }`}
          title="Toggle Voice Readout"
        >
          {voiceEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          <span className="hidden sm:inline">{voiceEnabled ? "Voice Enabled" : "Voice Off"}</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-card custom-scrollbar space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[80%] space-y-2">
              <div className={`p-4 rounded-lg text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-slate-900 text-white font-medium ml-auto'
                  : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700'
              }`}>
                {msg.text}
              </div>

              {msg.sources && msg.sources.length > 0 && (
                <div className="flex flex-wrap gap-1 px-1">
                  {msg.sources.map((s, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      <BookOpen size={10} /> {s.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2 items-center text-slate-400 text-xs py-2">
            <Loader2 size={16} className="animate-spin text-emerald-500" />
            <span>Analyzing sports science guidelines...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="flex gap-2 overflow-x-auto py-2.5 custom-scrollbar">
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium hover:border-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors shrink-0 shadow-sm"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2 mt-1">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your coach anything about programming, sets, or nutrition..."
          className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm outline-none focus:border-slate-900 dark:focus:border-slate-400 text-slate-900 dark:text-white transition-colors"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 disabled:opacity-40 text-white rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors shadow-sm shrink-0"
        >
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <><Send size={14} /> <span>Send</span></>}
        </button>
      </form>
    </div>
  );
}
