
import React, { useState, useRef, useEffect } from 'react';
import { chatWithAIFriend } from '../services/geminiService';
import { ChatMessage } from '../types';

const SparkleIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
);

const FullScapeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>
);

const PrintIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
);

interface AIFriendProps {
  onAwardPoints: (amount: number, reason: string) => void;
}

const AIFriend: React.FC<AIFriendProps> = ({ onAwardPoints }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', parts: [{ text: "Hi! I'm your Be Topper AI Friend. Ask me any concept or doubt, and I'll explain it simply. What should we study today?" }] }
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const [isFullScape, setIsFullScape] = useState(false);
  const [interactionsCount, setInteractionsCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fullScapeScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = isFullScape ? fullScapeScrollRef.current : scrollRef.current;
    if (target) {
      target.scrollTop = target.scrollHeight;
    }
  }, [messages, isFullScape]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatWithAIFriend(input, language, messages);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: response || 'Sorry, I missed that.' }] }]);
      
      const newCount = interactionsCount + 1;
      setInteractionsCount(newCount);
      if (newCount % 2 === 0) {
        onAwardPoints(10, 'Academic Consultation');
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: 'Something went wrong. Please try again later.' }] }]);
    } finally {
      setLoading(false);
    }
  };

  const FullScapeView = () => (
    <div className="fixed inset-0 z-50 bg-[#FAF7F2] flex flex-col items-center animate-fadeIn no-scrollbar overflow-hidden text-black">
      {/* Header */}
      <div className="w-full bg-white border-b border-stone-200 px-8 py-6 flex justify-between items-center z-10 no-print shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsFullScape(false)}
            className="bg-stone-100 text-black px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-stone-200 transition-all flex items-center gap-2"
          >
            ← EXIT IMMERSION
          </button>
          <div className="h-8 w-px bg-stone-100 mx-2"></div>
          <div>
            <h2 className="text-sm font-black text-black uppercase tracking-tighter leading-none">AI MENTOR ARCHIVE</h2>
            <p className="text-[8px] text-black font-black uppercase tracking-[0.3em] mt-1.5 opacity-30">Active Consultation Session</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-stone-50 border border-stone-100 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer text-black"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Hinglish">Hinglish</option>
           </select>
           <button 
             onClick={() => window.print()}
             className="bg-black text-white px-8 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2"
           >
              {PrintIcon} EXPORT TRANSCRIPT
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full flex flex-col items-center relative overflow-hidden">
        {/* Paper Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 print:hidden" style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px)',
          backgroundSize: '100% 3rem',
        }}></div>

        <div 
          ref={fullScapeScrollRef}
          className="flex-1 w-full max-w-4xl overflow-y-auto px-6 py-20 space-y-16 z-10 no-scrollbar relative print:overflow-visible print:max-w-none print:px-0"
        >
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp print:block print:mb-12`}>
              <div className={`max-w-[85%] p-10 rounded-[3rem] shadow-sm border print:max-w-none print:border-none print:shadow-none print:p-0 ${
                m.role === 'user' 
                  ? 'bg-stone-100 text-black border-stone-200 rounded-tr-none print:bg-transparent' 
                  : 'bg-white text-black border-stone-100 rounded-tl-none print:bg-transparent'
              }`}>
                <div className="flex justify-between items-center mb-6 border-b border-black/5 pb-4 print:border-black/20">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30">
                    {m.role === 'user' ? 'STUDENT INQUIRY' : 'MENTOR RESPONSE'}
                  </span>
                  <span className="text-[8px] font-black text-black/10 uppercase tracking-widest print:hidden">LOG_0{i+1}</span>
                </div>
                <div className="text-xl font-bold leading-relaxed text-black print:text-lg">
                  {m.parts[0].text}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start print:hidden">
              <div className="bg-white p-8 rounded-[2.5rem] rounded-tl-none border border-stone-100 flex gap-3 shadow-sm items-center">
                <div className="w-2.5 h-2.5 bg-black opacity-20 rounded-full animate-bounce"></div>
                <div className="w-2.5 h-2.5 bg-black opacity-40 rounded-full animate-bounce delay-75"></div>
                <div className="w-2.5 h-2.5 bg-black opacity-60 rounded-full animate-bounce delay-150"></div>
                <span className="text-[10px] font-black text-black opacity-40 uppercase tracking-[0.2em] ml-2">Mentor is synthesizing response...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input area for Full Scape */}
        <div className="w-full bg-white/80 backdrop-blur-md border-t border-stone-100 p-8 z-20 no-print">
           <div className="max-w-4xl mx-auto flex gap-4 bg-white p-3 rounded-[2.5rem] shadow-2xl border border-stone-200">
             <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Continue the scholarly deep-dive..."
                className="flex-1 bg-transparent px-8 py-4 text-lg font-black focus:outline-none text-black placeholder:text-black/10"
              />
              <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-black text-white px-12 py-5 rounded-[1.8rem] font-black uppercase text-xs tracking-widest hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {loading ? 'Consulting...' : 'SEND MESSAGE'}
              </button>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] bg-white rounded-[3rem] border border-stone-200 shadow-2xl overflow-hidden animate-fadeIn relative text-black">
      {isFullScape && <FullScapeView />}
      
      <div className="bg-stone-50 p-8 border-b border-stone-200 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="bg-black text-white p-3 rounded-2xl shadow-xl">
            {SparkleIcon}
          </div>
          <div>
            <h2 className="text-xl font-black text-black uppercase tracking-tighter leading-none">AI Mentor Consultation</h2>
            <p className="text-[10px] text-black font-black uppercase tracking-[0.3em] mt-2 opacity-40">Precision Study Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button 
            onClick={() => setIsFullScape(true)}
            className="flex items-center gap-2 bg-white border border-stone-200 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm text-black"
           >
             {FullScapeIcon} Full Scape
           </button>
           <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-stone-100 shadow-sm">
              <span className="text-[10px] font-black text-black uppercase tracking-widest opacity-40">Lang:</span>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-xs font-black outline-none cursor-pointer text-black"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="Hinglish">Hinglish</option>
              </select>
           </div>
        </div>
      </div>

      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto px-10 md:px-20 py-12 space-y-12 no-scrollbar scroll-smooth"
        style={{
          backgroundImage: 'linear-gradient(#f9fafb 1px, transparent 1px)',
          backgroundSize: '100% 3.5rem'
        }}
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}>
            <div className={`max-w-[80%] md:max-w-[70%] p-8 rounded-[2.5rem] text-lg leading-relaxed font-black shadow-sm border ${
              m.role === 'user' 
                ? 'bg-stone-100 text-black rounded-tr-none border-stone-200' 
                : 'bg-white text-black rounded-tl-none border-stone-100'
            }`}>
              {m.role === 'model' && (
                <div className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-20 border-b border-stone-50 pb-2">
                  Be Topper AI Response
                </div>
              )}
              {m.parts[0].text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-8 rounded-[2.5rem] rounded-tl-none border border-stone-100 flex gap-3 shadow-sm items-center">
              <div className="w-2.5 h-2.5 bg-black opacity-20 rounded-full animate-bounce"></div>
              <div className="w-2.5 h-2.5 bg-black opacity-40 rounded-full animate-bounce delay-75"></div>
              <div className="w-2.5 h-2.5 bg-black opacity-60 rounded-full animate-bounce delay-150"></div>
              <span className="text-xs font-black text-black opacity-40 uppercase tracking-widest ml-2">Mentor is thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-8 bg-gradient-to-t from-white via-white to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-4 rounded-[3rem] shadow-2xl border border-stone-200 flex gap-4 items-center ring-8 ring-black/5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything academic... Clarify your doubts."
              className="flex-1 bg-transparent px-8 py-4 text-lg font-black focus:outline-none text-black placeholder:text-black/20"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="bg-black text-white px-12 py-5 rounded-full font-black uppercase text-sm tracking-widest hover:scale-105 transition-all disabled:opacity-50 shadow-xl"
            >
              {loading ? 'Consulting...' : 'Consult AI'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFriend;
