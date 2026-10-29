import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, User, Send, Loader2, Volume2, VolumeX, Sparkles, 
  HelpCircle, ArrowRight, BookOpen, ShieldCheck
} from 'lucide-react';
import { chatWithAI } from '../api/client';

export default function AICoachStudio({ user }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${user?.username || 'Athlete'}! I'm your FitAI sports coach and nutritionist. Ask me anything about your current workout program, nutrition balance, or safe exercise modifications.`,
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
        text: "I experienced a brief server timeout. Based on verified sports science principles, always prioritize proper form and recovery!",
        sources: []
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "How to apply progressive overload safely?",
    "Suggest a high-protein vegetarian Indian dinner",
    "What exercises should I avoid with lower back strain?",
    "Hydration and recovery protocol after intense workout"
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col h-[calc(100vh-6rem)]">
      
      {/* Studio Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 mb-4 shadow-lg shadow-slate-200/20 dark:shadow-none">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Bot size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">FitAI Coach Studio</h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Context-grounded assistant with citation support</p>
          </div>
        </div>

        {/* Audio Speech Synthesis Toggle */}
        <button
          onClick={() => {
            const next = !voiceEnabled;
            setVoiceEnabled(next);
            if (!next && 'speechSynthesis' in window) window.speechSynthesis.cancel();
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
            voiceEnabled
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
          }`}
          title="Toggle Voice Guidance (Text-to-Speech)"
        >
          {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          <span className="hidden sm:inline">{voiceEnabled ? "Voice On" : "Voice Off"}</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl shadow-slate-200/20 dark:shadow-none custom-scrollbar space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && (
              <div className="w-9 h-9 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-200 dark:border-indigo-800/40">
                <Bot size={18} />
              </div>
            )}

            <div className={`max-w-[82%] space-y-2`}>
              <div className={`p-4 rounded-3xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-600/20 font-medium'
                  : 'bg-slate-50 dark:bg-slate-800/70 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700/60 rounded-bl-none shadow-sm'
              }`}>
                {msg.text}
              </div>

              {/* Source Provenance Tag */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="flex flex-wrap gap-1.5 px-2">
                  {msg.sources.map((s, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                      <BookOpen size={10} /> {s.title}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 font-black text-xs">
                {(user?.username || 'U')[0].toUpperCase()}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start items-center">
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Bot size={18} />
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-3xl rounded-bl-none border border-slate-100 dark:border-slate-700 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="flex gap-2 overflow-x-auto py-3 custom-scrollbar">
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2 mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your coach anything about training, diet, or injuries..."
          className="flex-1 px-5 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm outline-none focus:border-indigo-500 dark:text-white shadow-sm transition-all"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-indigo-600/25 active:scale-95 shrink-0"
        >
          {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
        </button>
      </form>
    </div>
  );
}
