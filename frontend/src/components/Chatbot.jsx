import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { chatWithAI } from '../api/client'; // Adjust path if needed

export default function Chatbot({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: `Hi ${user?.username || 'there'}! I'm your FitAI coach. Ask me anything about your diet, workouts, or profile.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !user?._id) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const res = await chatWithAI(user._id, userMessage);
      setMessages(prev => [...prev, { sender: 'ai', text: res.data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: "Sorry, I'm having trouble connecting to the server right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-40 ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl flex flex-col z-50 transition-all origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        {/* Chat Header */}
        <div className="flex items-center justify-between bg-blue-600 p-4 rounded-t-2xl text-white">
          <div className="flex items-center gap-2">
            <Bot size={24} />
            <h3 className="font-bold text-lg">FitAI Coach</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 shrink-0">
                  <Bot size={16} />
                </div>
              )}
              
              <div className={`px-4 py-2.5 rounded-2xl max-w-[75%] text-sm leading-relaxed ${
                msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none shadow-sm' 
                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-bl-none shadow-sm'
              }`}>
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                  <User size={16} />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-2 justify-start items-center text-slate-400">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 shrink-0">
                  <Bot size={16} />
              </div>
              <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 rounded-b-2xl flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your plan..." 
            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-2 outline-none focus:border-blue-500 transition-colors text-sm"
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ml-1" />}
          </button>
        </form>
      </div>
    </>
  );
}