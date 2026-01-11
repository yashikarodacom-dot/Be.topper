
import React, { useState, useEffect } from 'react';
import { getQuestionBank } from '../services/geminiService';
import { Difficulty, QuestionBankItem } from '../types';

interface QuestionBankProps {
  classLevel: string;
  onAwardPoints: (amount: number, reason: string) => void;
}

const QuestionBank: React.FC<QuestionBankProps> = ({ classLevel, onAwardPoints }) => {
  const isJunior = classLevel === '9' || classLevel === '10';
  const [subject, setSubject] = useState(isJunior ? 'Science' : 'Physics');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');
  const [questions, setQuestions] = useState<QuestionBankItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});
  const [isFullScape, setIsFullScape] = useState(false);

  const fetchQuestions = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const data = await getQuestionBank(classLevel, subject, topic, difficulty, 15);
      setQuestions(data);
      setShowAnswers({});
      onAwardPoints(25, 'Question Set Generated');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleAnswer = (id: string) => {
    if (!showAnswers[id]) {
      onAwardPoints(5, 'Concept Review');
    }
    setShowAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const FullScapeView = () => (
    <div className="fixed inset-0 z-[100] bg-[#FAF7F2] overflow-y-auto p-4 md:p-12 animate-fadeIn no-scrollbar">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12 no-print">
          <button onClick={() => setIsFullScape(false)} className="bg-black text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">
             ← EXIT WORKSPACE
          </button>
          <div className="flex gap-4">
             <button onClick={() => window.print()} className="bg-white border border-stone-200 px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm">
               🖨️ EXPORT TO PDF
             </button>
          </div>
        </div>

        <div className="bg-white p-12 md:p-24 rounded-[3rem] shadow-2xl relative border-l-[40px] border-stone-100 print:border-none print:shadow-none print:p-0">
          <div className="mb-16 border-b-4 border-black pb-8">
             <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-2">Academic Question Bank</p>
             <h1 className="text-5xl font-black text-black uppercase tracking-tight leading-none mb-4">{topic}</h1>
             <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest text-black/40">
                <span>Class {classLevel}</span>
                <span>•</span>
                <span>{subject}</span>
                <span>•</span>
                <span>{difficulty} Level</span>
             </div>
          </div>

          <div className="space-y-16">
            {questions.map((q, idx) => (
              <div key={q.id || idx} className="space-y-6">
                <div className="flex gap-8 items-start">
                   <span className="text-3xl font-black text-black opacity-10">0{idx + 1}</span>
                   <div className="flex-1 space-y-6">
                      <div className="flex justify-between items-start">
                         <h3 className="text-xl font-bold text-black leading-tight flex-1">{q.question}</h3>
                         <span className="bg-stone-100 text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{q.type}</span>
                      </div>
                      
                      {q.options && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {q.options.map((opt, i) => (
                            <div key={i} className="p-4 border border-stone-100 rounded-2xl text-sm font-bold flex gap-3">
                               <span className="opacity-30">({String.fromCharCode(65+i)})</span>
                               {opt}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="h-32 border border-dashed border-stone-100 rounded-3xl flex items-center justify-center text-[10px] font-black text-black/10 uppercase tracking-widest no-print">
                         Space for rough work
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 animate-fadeIn w-full text-black">
      {isFullScape && <FullScapeView />}

      <div className="bg-white p-10 rounded-[3rem] border border-stone-100 shadow-sm flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row gap-8 items-end">
           <div className="flex-1 space-y-2 w-full">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-30 px-1">Choose Subject</label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full bg-stone-50 border border-stone-100 rounded-3xl px-6 py-4 text-xs font-black focus:outline-none focus:ring-4 focus:ring-black/5 text-black cursor-pointer appearance-none">
                {isJunior ? (
                  <>
                    <option value="Science">Science (Phy/Chem/Bio)</option>
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
                    <option value="English Core">English Core</option>
                    <option value="Computer Science">Computer Science</option>
                  </>
                )}
              </select>
           </div>
           
           <div className="flex-[1.5] space-y-2 w-full">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-30 px-1">Enter Chapter or Topic</label>
              <input type="text" placeholder="e.g., Trigonometric Functions" value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full bg-stone-50 border border-stone-100 rounded-3xl px-6 py-4 text-xs font-black focus:outline-none focus:ring-4 focus:ring-black/5 text-black" />
           </div>

           <div className="flex-1 space-y-2 w-full">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-30 px-1">Mastery Level</label>
              <div className="flex gap-2 p-1 bg-stone-50 rounded-3xl">
                 {(['Low', 'Medium', 'High'] as Difficulty[]).map(d => (
                   <button key={d} onClick={() => setDifficulty(d)} className={`flex-1 py-3 rounded-[1.25rem] text-[9px] font-black uppercase tracking-widest transition-all ${difficulty === d ? 'bg-black text-white shadow-lg' : 'text-black opacity-30 hover:opacity-100'}`}>
                     {d}
                   </button>
                 ))}
              </div>
           </div>

           <button onClick={fetchQuestions} disabled={loading || !topic} className="bg-black text-white px-12 py-4 rounded-3xl font-black uppercase text-[10px] tracking-widest shadow-2xl hover:scale-105 transition-all disabled:opacity-50 h-[58px] min-w-[180px]">
              {loading ? 'SYNCING PORTAL...' : 'GENERATE QUESTIONS'}
           </button>
        </div>
      </div>

      {questions.length > 0 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex justify-between items-center px-6">
             <h2 className="text-3xl font-black text-black tracking-tighter uppercase">Question Set: {topic}</h2>
             <button onClick={() => setIsFullScape(true)} className="bg-black text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
               📜 ENTER IMMERSIVE MODE
             </button>
          </div>

          {questions.map((q, idx) => (
            <div key={q.id || idx} className="bg-white p-10 rounded-[2.5rem] border border-stone-100 shadow-sm space-y-8 hover:shadow-xl transition-all group">
              <div className="flex gap-6 items-start">
                 <span className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-xs shrink-0 shadow-lg group-hover:rotate-12 transition-transform">0{idx + 1}</span>
                 <div className="flex-1 space-y-6">
                    <div className="flex justify-between items-center border-b border-stone-50 pb-4">
                       <h3 className="text-xl font-bold text-black leading-snug">{q.question}</h3>
                       <span className="text-[9px] font-black uppercase bg-stone-50 px-3 py-1 rounded-full text-black/30 tracking-widest">{q.type}</span>
                    </div>

                    {q.options && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {q.options.map((opt, i) => (
                          <div key={i} className="p-5 bg-stone-50 border border-stone-100 rounded-3xl text-sm font-bold flex gap-4 hover:border-black/10 transition-all">
                             <span className="text-black/20 font-black uppercase">{String.fromCharCode(65+i)}</span>
                             {opt}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-6">
                       <button onClick={() => toggleAnswer(q.id || idx.toString())} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${showAnswers[q.id || idx.toString()] ? 'bg-emerald-500 text-white' : 'bg-stone-100 text-black hover:bg-stone-200'}`}>
                          {showAnswers[q.id || idx.toString()] ? 'CLOSE SOLUTION' : 'SHOW SOLUTION'}
                       </button>

                       {showAnswers[q.id || idx.toString()] && (
                         <div className="mt-6 bg-emerald-50 p-8 rounded-[2rem] border border-emerald-100 animate-slideUp">
                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4 underline underline-offset-4">Correct Outcome: {q.answer}</p>
                            <div className="text-sm font-bold text-black leading-relaxed opacity-80 whitespace-pre-wrap">
                               {q.explanation}
                            </div>
                         </div>
                       )}
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div className="bg-white py-32 rounded-[3.5rem] flex flex-col items-center justify-center space-y-8 border border-stone-100 shadow-sm">
           <div className="w-16 h-16 border-[6px] border-stone-100 border-t-black rounded-full animate-spin"></div>
           <p className="text-[11px] font-black uppercase tracking-[0.5em] text-black opacity-30">Generating Infinite Question Stream...</p>
        </div>
      )}
    </div>
  );
};

export default QuestionBank;
