
import React, { useState, useEffect } from 'react';
import { getExpectedQuestions } from '../services/geminiService';

const TrendingIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);

interface ExpectedQuestionsProps {
  classLevel: string;
}

const ExpectedQuestions: React.FC<ExpectedQuestionsProps> = ({ classLevel }) => {
  const isJunior = classLevel === '9' || classLevel === '10';
  const [subject, setSubject] = useState(isJunior ? 'Science' : 'Physics');
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFullScape, setIsFullScape] = useState(false);

  useEffect(() => {
    setSubject(isJunior ? 'Science' : 'Physics');
  }, [classLevel, isJunior]);

  const fetchQuestions = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const data = await getExpectedQuestions(classLevel, subject, topic);
      setQuestions(data || '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const FullScapeView = () => (
    <div className="fixed inset-0 z-50 bg-[#F4F1ED] overflow-y-auto flex flex-col items-center p-4 md:p-10 animate-fadeIn no-scrollbar text-black">
      <div className="w-full max-w-6xl flex justify-between items-center mb-10 no-print">
        <button 
          onClick={() => setIsFullScape(false)}
          className="bg-stone-200 text-black px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-stone-300 transition-all shadow-sm"
        >
          ← EXIT BLUEPRINT
        </button>
        <button onClick={() => window.print()} className="bg-red-600 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl">
           🖨️ PRINT PREDICTIONS
        </button>
      </div>

      <div className="w-full max-w-6xl bg-white min-h-[140vh] shadow-2xl p-20 md:p-32 relative border-t-[60px] border-black">
        <div className="relative z-10">
          <div className="text-center mb-24 space-y-6">
            <span className="text-xs font-black uppercase tracking-[0.6em] text-red-600">Confidential Prediction Blueprint</span>
            <h1 className="text-6xl font-black uppercase text-black tracking-tighter leading-none">HIGHLY EXPECTED QUESTIONS</h1>
            <div className="flex flex-wrap justify-center gap-10 border-y border-stone-200 py-8 text-sm font-black uppercase tracking-widest text-black">
               <span>SUBJECT: {subject}</span>
               <span>TOPIC: {topic}</span>
               <span>CLASS: {classLevel}</span>
            </div>
            <p className="text-xs font-black text-black opacity-30 italic">Analyzed by Be Topper AI Engine for Board Exams</p>
          </div>

          <div className="prose prose-stone max-w-none text-black leading-loose whitespace-pre-wrap font-black text-xl border-l-4 border-stone-100 pl-12">
            {questions}
          </div>

          <div className="mt-40 text-center border-t-2 border-dashed border-stone-100 pt-10">
             <p className="text-[10px] font-black uppercase tracking-[1em] text-black opacity-10">END OF BLUEPRINT</p>
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
          <label className="text-[10px] font-black text-black opacity-40 uppercase tracking-widest px-1">Subject</label>
          <select 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-3 text-sm font-black focus:outline-none focus:ring-2 focus:ring-black/10 text-black cursor-pointer appearance-none"
          >
            {isJunior ? (
              <>
                <option value="Science">Science</option>
                <option value="Social Science">Social Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
              </>
            ) : (
              <>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
                <option value="Psychology">Psychology</option>
              </>
            )}
          </select>
        </div>
        <div className="flex-1 space-y-2 w-full">
          <label className="text-[10px] font-black text-black opacity-40 uppercase tracking-widest px-1">Topic</label>
          <input 
            type="text" 
            placeholder="e.g., Trigonometry" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-3 text-sm font-black focus:outline-none focus:ring-2 focus:ring-black/10 text-black"
          />
        </div>
        <button 
          onClick={fetchQuestions}
          disabled={loading || !topic}
          className="bg-black text-white px-10 py-3.5 rounded-2xl font-black uppercase text-xs tracking-widest hover:opacity-80 transition-all disabled:opacity-50 w-full md:w-auto shadow-xl"
        >
          {loading ? 'ANALYZING...' : 'PREDICT QUESTIONS'}
        </button>
      </div>

      {questions && (
        <div className="bg-white p-12 rounded-[3rem] border border-stone-100 shadow-2xl shadow-stone-200/50 animate-fadeIn text-black leading-relaxed w-full">
          <div className="flex justify-between items-center mb-10 border-b border-stone-50 pb-8">
            <div className="flex items-center gap-4">
              <div className="bg-red-50 p-3 rounded-2xl text-red-500 shadow-inner">
                {TrendingIcon}
              </div>
              <h2 className="text-3xl font-black text-black uppercase tracking-tighter">Predicted for: {topic}</h2>
            </div>
            <button 
              onClick={() => setIsFullScape(true)}
              className="bg-black text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
            >
              📜 VIEW FULL SCAPE
            </button>
          </div>
          <div className="whitespace-pre-wrap text-lg font-black text-black space-y-6">
            {questions}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpectedQuestions;
