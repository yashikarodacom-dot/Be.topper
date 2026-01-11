
import React, { useState } from 'react';
import { getAnswerKey } from '../services/geminiService';

const VerifiedIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 12 14 15 9"/></svg>
);

const KeyIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
);

interface AnswerPortalProps {
  classLevel: string;
  board: string;
  onAwardPoints: (amount: number, reason: string) => void;
}

const AnswerPortal: React.FC<AnswerPortalProps> = ({ classLevel, board, onAwardPoints }) => {
  const [type, setType] = useState<'paper' | 'expected' | 'dpp'>('paper');
  const [subject, setSubject] = useState(classLevel === '9' || classLevel === '10' ? 'Science' : 'Physics');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [answerKey, setAnswerKey] = useState('');
  const [isFullScape, setIsFullScape] = useState(false);

  const fetchAnswers = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const data = await getAnswerKey(type, classLevel, subject, topic, board);
      setAnswerKey(data || '');
      onAwardPoints(5, 'Reviewing Solutions');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const FullScapeView = () => (
    <div className="fixed inset-0 z-[100] bg-emerald-950/20 backdrop-blur-xl flex flex-col items-center p-4 md:p-10 animate-fadeIn no-scrollbar text-black overflow-y-auto">
       <div className="w-full max-w-5xl flex justify-between items-center mb-8 no-print">
        <button 
          onClick={() => setIsFullScape(false)}
          className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] border border-white/10 backdrop-blur-md"
        >
          ← EXIT SOLUTION KEY
        </button>
        <button onClick={() => window.print()} className="bg-emerald-500 text-white px-10 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
           🖨️ PRINT MARKING SCHEME
        </button>
      </div>

      <div className="w-full max-w-5xl bg-white min-h-[140vh] shadow-[0_50px_100px_rgba(0,0,0,0.3)] p-16 md:p-24 relative border-t-[80px] border-emerald-600 rounded-b-[4rem]">
        <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 text-white font-black uppercase tracking-[0.8em] text-xs">
           Official Marking Scheme • be.topper academy
        </div>
        
        <div className="relative z-10">
          <div className="mb-20 border-b-2 border-emerald-50 pb-12 flex justify-between items-end">
             <div>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-600 mb-3">Model Solution Key</p>
                <h1 className="text-5xl font-black text-black uppercase tracking-tight leading-none">{topic}</h1>
             </div>
             <div className="text-right">
                <p className="text-xs font-black text-black opacity-30 uppercase tracking-[0.2em]">Verified Evaluation Standard</p>
                <div className="flex gap-4 mt-4 justify-end">
                   <span className="text-[9px] font-black bg-stone-100 px-3 py-1 rounded-full uppercase">{board} Board</span>
                   <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full uppercase">Class {classLevel}</span>
                </div>
             </div>
          </div>

          <div className="prose prose-emerald max-w-none text-black leading-[2.6] whitespace-pre-wrap font-serif text-xl pl-12 border-l-[3px] border-emerald-100">
             {answerKey}
          </div>

          <div className="mt-40 pt-10 border-t border-emerald-50 flex flex-col items-center">
             <div className="mb-10 opacity-20">{VerifiedIcon}</div>
             <p className="text-[10px] font-black text-black/20 uppercase tracking-[0.5em]">Academic Authenticity Verified • Topper Evaluation Criteria Apply</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 animate-fadeIn w-full text-black">
      {isFullScape && <FullScapeView />}

      <div className="bg-white p-12 rounded-[3.5rem] border border-stone-100 shadow-sm flex flex-col gap-10">
        <div className="flex flex-col md:flex-row gap-8">
           <div className="flex-1 space-y-3">
              <label className="text-[10px] font-black text-black opacity-30 uppercase tracking-[0.3em] px-1">Answer Category</label>
              <div className="grid grid-cols-3 gap-3">
                 {[
                   { id: 'paper', label: 'Paper Solutions' },
                   { id: 'expected', label: 'Expected Q Key' },
                   { id: 'dpp', label: 'DPP Mastery' }
                 ].map(cat => (
                   <button
                    key={cat.id}
                    onClick={() => setType(cat.id as any)}
                    className={`py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                      type === cat.id ? 'bg-emerald-500 text-white border-emerald-500 shadow-xl scale-105' : 'bg-stone-50 text-black border-stone-100 opacity-60'
                    }`}
                   >
                     {cat.label}
                   </button>
                 ))}
              </div>
           </div>

           <div className="flex-1 space-y-3">
              <label className="text-[10px] font-black text-black opacity-30 uppercase tracking-[0.3em] px-1">Target Subject</label>
              <select 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-stone-50 border-2 border-stone-100 rounded-[2rem] px-8 py-5 text-sm font-black focus:outline-none focus:ring-4 focus:ring-emerald-500/10 text-black appearance-none cursor-pointer"
              >
                {classLevel === '9' || classLevel === '10' ? (
                  <>
                    <option value="Science">Science (Combined)</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Social Science">Social Science</option>
                    <option value="English">English</option>
                  </>
                ) : (
                  <>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Biology">Biology</option>
                    <option value="English">English</option>
                    <option value="Computer Science">Computer Science</option>
                  </>
                )}
              </select>
           </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-end border-t border-stone-50 pt-10">
           <div className="flex-[2] space-y-3 w-full">
              <label className="text-[10px] font-black text-black opacity-30 uppercase tracking-[0.3em] px-1">Specific Topic or Chapter</label>
              <input 
                type="text" 
                placeholder="e.g., Magnetic Effects of Current"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-stone-50 border-2 border-stone-100 rounded-[2rem] px-8 py-5 text-sm font-black focus:outline-none focus:ring-4 focus:ring-emerald-500/10 text-black"
              />
           </div>
           <button 
            onClick={fetchAnswers}
            disabled={loading || !topic}
            className="flex-1 bg-black text-white px-12 py-5 rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] hover:opacity-90 transition-all disabled:opacity-50 h-[68px] shadow-2xl flex items-center justify-center gap-4"
           >
             {loading ? 'GENERATING KEY...' : <>{KeyIcon} UNLOCK SOLUTIONS</>}
           </button>
        </div>
      </div>

      {!answerKey && !loading && (
        <div className="bg-white p-32 rounded-[4rem] border border-stone-100 border-dashed flex flex-col items-center justify-center text-black/10">
           <div className="mb-10 scale-[2]">{KeyIcon}</div>
           <p className="text-xs font-black uppercase tracking-[0.5em]">The Solution Vault is currently locked.</p>
        </div>
      )}

      {loading && (
        <div className="bg-white p-32 rounded-[4rem] border border-stone-100 shadow-sm flex flex-col items-center justify-center space-y-12">
           <div className="w-20 h-20 border-[6px] border-stone-100 border-t-emerald-500 rounded-full animate-spin"></div>
           <div className="text-center">
             <p className="text-[11px] text-emerald-600 font-black uppercase tracking-[0.5em] mb-4">Official Verification in Progress...</p>
             <p className="text-base text-black opacity-30 uppercase font-black tracking-widest leading-relaxed">Cross-referencing {board} marking standards <br/> and constructing perfect model answers</p>
           </div>
        </div>
      )}

      {answerKey && !loading && (
        <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-stone-100 shadow-2xl animate-slideUp relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity scale-[3] pointer-events-none">
              {VerifiedIcon}
           </div>
           
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8 border-b border-stone-50 pb-10">
              <div>
                 <div className="flex items-center gap-4 mb-3">
                    <span className="bg-emerald-500 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/20">Answer Key Ready</span>
                    <span className="text-[10px] font-black text-black opacity-20 uppercase tracking-widest">Type: {type.toUpperCase()}</span>
                 </div>
                 <h2 className="text-4xl font-black text-black leading-none">{topic}</h2>
              </div>
              <button 
                onClick={() => setIsFullScape(true)}
                className="bg-black text-white px-12 py-5 rounded-[2rem] text-xs font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all"
              >
                📜 ENTER FULL SCAPE VIEW
              </button>
           </div>

           <div className="max-w-4xl prose prose-stone font-bold text-lg leading-relaxed text-black whitespace-pre-wrap">
              {answerKey}
           </div>

           <div className="mt-16 pt-10 border-t border-dashed border-stone-100 flex items-center justify-between opacity-30">
              <p className="text-[9px] font-black uppercase tracking-[0.5em]">DOCUMENT ID: BT-SKEY-{Math.floor(Math.random()*90000)+10000}</p>
              <p className="text-[9px] font-black uppercase tracking-[0.5em]">© BE TOPPER ACADEMY</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default AnswerPortal;
