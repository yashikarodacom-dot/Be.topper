
import React, { useState, useEffect } from 'react';
import { getDPP } from '../services/geminiService';
import { Difficulty, DPPItem } from '../types';

interface DPPSectionProps {
  classLevel: string;
  onAwardPoints: (amount: number, reason: string) => void;
}

const DPPSection: React.FC<DPPSectionProps> = ({ classLevel, onAwardPoints }) => {
  const isJunior = classLevel === '9' || classLevel === '10';
  const [subject, setSubject] = useState(isJunior ? 'Science' : 'Physics');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');
  const [questions, setQuestions] = useState<DPPItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});
  const [isFullScape, setIsFullScape] = useState(false);

  useEffect(() => {
    setSubject(isJunior ? 'Science' : 'Physics');
  }, [classLevel, isJunior]);

  const fetchDPP = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const data = await getDPP(classLevel, subject, topic, difficulty);
      setQuestions(data);
      setShowAnswers({});
      onAwardPoints(20, 'Resource Preparation');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markAsSolved = (idx: number) => {
    if (!showAnswers[idx]) {
       setShowAnswers(prev => ({ ...prev, [idx]: true }));
       onAwardPoints(10, 'Problem Mastery');
    }
  };

  const FullScapeView = () => (
    <div className="fixed inset-0 z-50 bg-[#FAF7F2] overflow-y-auto flex flex-col items-center p-4 md:p-10 animate-fadeIn no-scrollbar text-black">
      <div className="w-full max-w-6xl flex justify-between items-center mb-8 no-print">
        <button 
          onClick={() => setIsFullScape(false)}
          className="bg-stone-200 text-black px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-stone-300 transition-all shadow-sm"
        >
          ← EXIT WORKSHEET
        </button>
        <button onClick={() => window.print()} className="bg-black text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl">
           🖨️ PRINT WORKSHEET
        </button>
      </div>

      <div className="w-full max-w-6xl bg-white min-h-[140vh] shadow-2xl p-16 md:p-24 relative border-l-[40px] border-stone-100 border-r border-stone-50">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(#f3f4f6 1px, transparent 1px)',
          backgroundSize: '100% 3rem',
          opacity: 0.6
        }}></div>
        
        <div className="relative z-10">
          <div className="mb-14 border-b-4 border-black pb-8 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black mb-2 opacity-40">Daily Practice Problems</p>
              <h1 className="text-5xl font-black text-black uppercase tracking-tight leading-none">{topic}</h1>
            </div>
            <div className="text-right">
              <p className="text-xs font-black text-black uppercase tracking-widest opacity-50">Class {classLevel} • {subject}</p>
              <p className="text-[10px] font-black text-white bg-black px-3 py-1 rounded-full mt-2 uppercase">{difficulty} Level</p>
            </div>
          </div>
          
          <div className="space-y-16">
            {questions.map((q, idx) => (
              <div key={q.id || idx} className="space-y-6">
                <div className="flex gap-6 items-start">
                  <span className="font-black text-2xl text-black opacity-10">0{idx + 1}.</span>
                  <div className="space-y-6 flex-1">
                    <p className="text-xl font-black text-black leading-tight border-b border-stone-100 pb-2">{q.question}</p>
                    {q.options && (
                      <div className="grid grid-cols-2 gap-y-4 gap-x-12">
                        {q.options.map((opt, i) => (
                          <div key={i} className="text-sm font-black text-black flex gap-3">
                            <span className="text-black opacity-20 uppercase tracking-tighter">({String.fromCharCode(65 + i)})</span>
                            <span>{opt}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="h-24 border border-dashed border-stone-100 rounded-lg flex items-center justify-center no-print">
                       <span className="text-[10px] font-black uppercase tracking-widest text-black opacity-10">Space for Rough Work / Steps</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-40 pt-10 border-t-2 border-stone-100 flex justify-between text-[10px] text-black font-black uppercase tracking-[0.3em] opacity-30">
            <span>be.topper academy • Worksheet #{Math.floor(Math.random() * 1000)}</span>
            <span>Date: ________________</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fadeIn w-full text-black">
      {isFullScape && <FullScapeView />}
      
      <div className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm flex flex-col md:flex-row gap-6 items-end">
        <div className="flex-1 space-y-2 w-full">
          <label className="text-[10px] font-black text-black uppercase tracking-widest px-1 opacity-40">Subject</label>
          <select 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-3 text-sm font-black focus:outline-none focus:ring-2 focus:ring-black/10 text-black appearance-none cursor-pointer"
          >
            {isJunior ? (
              <>
                <option value="Science">Science (Phy/Chem/Bio)</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Social Science">Social Science</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </>
            ) : (
              <>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Economics">Economics</option>
              </>
            )}
          </select>
        </div>
        <div className="flex-[1.5] space-y-2 w-full">
          <label className="text-[10px] font-black text-black uppercase tracking-widest px-1 opacity-40">Topic</label>
          <input 
            type="text" 
            placeholder="e.g., Electric Charges" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-3 text-sm font-black focus:outline-none focus:ring-2 focus:ring-black/10 text-black"
          />
        </div>
        <div className="flex-1 space-y-2 w-full">
          <label className="text-[10px] font-black text-black uppercase tracking-widest px-1 opacity-40">Difficulty Level</label>
          <div className="flex gap-2">
            {(['Low', 'Medium', 'High'] as Difficulty[]).map(level => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  difficulty === level ? 'bg-black text-white shadow-md' : 'bg-stone-100 text-black opacity-50 hover:opacity-100'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
        <button 
          onClick={fetchDPP}
          disabled={loading || !topic}
          className="bg-black text-white px-10 py-3.5 rounded-2xl font-black uppercase text-xs tracking-widest hover:opacity-90 transition-all disabled:opacity-50 w-full md:w-auto shadow-lg shadow-stone-200"
        >
          {loading ? 'SYNCING...' : 'PREPARE DPP'}
        </button>
      </div>

      {questions.length > 0 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-2xl font-black text-black uppercase tracking-tight">Practice Session: {topic}</h3>
            <button 
                onClick={() => setIsFullScape(true)}
                className="bg-black text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
              >
                📜 VIEW FULL SCAPE
              </button>
          </div>
          {questions.map((q, idx) => (
            <div key={q.id || idx} className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm space-y-6 hover:shadow-md transition-shadow">
              <div className="flex gap-4 items-start">
                <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-black flex-shrink-0 text-xs">0{idx + 1}</span>
                <p className="font-black text-black text-lg leading-snug pt-0.5">{q.question}</p>
              </div>
              
              {q.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-12">
                  {q.options.map((opt, i) => (
                    <div key={i} className="p-4 bg-stone-50 rounded-2xl border border-stone-100 text-sm text-black font-black hover:bg-white hover:border-black/20 transition-all cursor-default">
                      <span className="text-black opacity-30 font-black mr-2 uppercase tracking-tighter">{String.fromCharCode(65 + i)}.</span> {opt}
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-6 border-t border-stone-50 flex flex-col gap-4 ml-12">
                <button 
                  onClick={() => markAsSolved(idx)}
                  className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl w-fit transition-all ${
                    showAnswers[idx] ? 'bg-emerald-500 text-white' : 'bg-stone-50 text-black hover:bg-stone-100'
                  }`}
                >
                  {showAnswers[idx] ? 'SOLUTION UNLOCKED' : 'SHOW SOLUTION'}
                </button>
                {showAnswers[idx] && (
                  <div className="bg-stone-50 p-6 rounded-3xl border border-stone-200 animate-slideDown shadow-inner">
                    <p className="text-xs font-black text-black mb-2 uppercase tracking-widest underline underline-offset-4 decoration-black/20">Correct Answer: {q.answer}</p>
                    <div className="text-sm text-black leading-relaxed font-black whitespace-pre-wrap">
                      {q.explanation}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DPPSection;
