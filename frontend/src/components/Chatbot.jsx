import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon } from 'lucide-react';
import { chatWithAI } from '../api/client';

export default function AIChat({ user }) {
  const [messages, setMessages] = useState([
    { role: 'model', text: `Hi ${user.username}! I'm your FitAI Coach. Ask me anything about diet or workouts.` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    const chatHistory = [...messages, userMsg];
    setMessages(chatHistory);
    setInput('');
    setLoading(true);

    try {
      const res = await chatWithAI(user._id, input, chatHistory.slice(0, -1));
      setMessages([...chatHistory, { role: 'model', text: res.data.reply }]);
    } catch (err) {
      setMessages([...chatHistory, { role: 'model', text: "Sorry, I couldn't connect. Try again." }]);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col h-[calc(100vh-140px)]">
      <div className="p-6 border-b dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-4">
        <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white"><Bot size={24}/></div>
        <div>
          <h2 className="text-xl font-black dark:text-white">FitAI Coach</h2>
          <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-end gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-white'}`}>
                {msg.role === 'user' ? <UserIcon size={16}/> : <Bot size={16}/>}
              </div>
              <div className={`p-4 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-100 dark:bg-slate-800 dark:text-white rounded-bl-none'}`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {loading && <div className="text-slate-400 italic text-sm">AI is typing...</div>}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 border-t dark:border-slate-800 flex gap-3">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything..." className="flex-1 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl outline-none dark:text-white" />
        <button type="submit" disabled={loading} className="bg-indigo-600 text-white p-4 rounded-2xl"><Send size={20} /></button>
      </form>
    </div>
  );
}