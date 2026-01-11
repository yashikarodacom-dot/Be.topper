
import React, { useState, useEffect, useMemo } from 'react';
import { generateSamplePaper } from '../services/geminiService';

const TargetIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);

const PredictionIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 19.07-1.41-1.41"/><path d="M12 22v-2"/><path d="m6.34 17.66-1.41 1.41"/><path d="M2 12h2"/><path d="m7.76 7.76-1.41-1.41"/><circle cx="12" cy="12" r="4"/></svg>
);

const CheckIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);

const TurnIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/><path d="m7 21 1.6-1.4"/><path d="m17 21-1.6-1.4"/></svg>
);

const ReviewIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
);

const FlipArrowIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18"/><path d="m15 18 6-6-6-6"/></svg>
);

const DownloadIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);

interface QuestionPapersProps {
  classLevel: string;
  board: string;
}

const QuestionPapers: React.FC<QuestionPapersProps> = ({ classLevel, board }) => {
  const isJunior = classLevel === '9' || classLevel === '10';
  const [subject, setSubject] = useState(isJunior ? 'Science' : 'Physics');
  const [year, setYear] = useState('2025 Predicted');
  const [source, setSource] = useState<'ai' | 'highyield'>('highyield');
  const [paper, setPaper] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFullScape, setIsFullScape] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);
  const [reviewedSections, setReviewedSections] = useState<Set<number>>(new Set());

  useEffect(() => {
    setSubject(isJunior ? 'Science' : 'Physics');
  }, [classLevel, isJunior]);

  const paperCode = useMemo(() => `BT-${board.substring(0,2).toUpperCase()}-${subject.substring(0,2).toUpperCase()}-${Math.floor(Math.random()*900)+100}`, [board, subject]);
  const serialNo = useMemo(() => `${Math.floor(Math.random()*900000)+100000}`, []);

  const paperPages = useMemo(() => {
    if (!paper) return [];
    const sections = paper.split(/(?=SECTION [A-D]:)/i).filter(s => s.trim().length > 0);
    return sections;
  }, [paper]);

  const fetchPaper = async () => {
    setLoading(true);
    try {
      const modeDescription = source === 'highyield' 
        ? 'High-Yield "Must-Know" questions curated from historical board archives and repetition patterns.' 
        : 'Predictive 2025 Board Examination simulation.';
      
      const configStr = `${year} cycle. Mode: ${modeDescription}`;
      const data = await generateSamplePaper(board, classLevel, subject, configStr);
      setPaper(data || '');
      setCurrentPage(0);
      setReviewedSections(new Set());
      setIsFullScape(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFlip = (targetPage: number) => {
    if (isFlipping || targetPage === currentPage) return;
    const direction = targetPage > currentPage ? 'next' : 'prev';
    setFlipDirection(direction);
    setIsFlipping(true);
    
    setTimeout(() => {
      setCurrentPage(targetPage);
    }, 300);

    setTimeout(() => {
      setIsFlipping(false);
      setFlipDirection(null);
    }, 600);
  };

  const toggleReview = (idx: number) => {
    const newReviewed = new Set(reviewedSections);
    if (newReviewed.has(idx)) newReviewed.delete(idx);
    else newReviewed.add(idx);
    setReviewedSections(newReviewed);
  };

  const FullScapeView = () => (
    <div className="fixed inset-0 z-50 bg-[#080808] overflow-hidden flex flex-col items-center p-4 md:p-8 animate-fadeIn text-black font-sans print:p-0 print:bg-white">
      <style>{`
        .book-viewport {
          perspective: 3000px;
          width: 100%;
          max-width: 920px;
          height: 78vh;
          position: relative;
          transform-style: preserve-3d;
        }
        .book-page {
          position: absolute;
          width: 100%;
          height: 100%;
          background: #ffffff;
          transform-origin: center left;
          transition: transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
          box-shadow: 25px 25px 60px rgba(0,0,0,0.5);
          border-radius: 8px;
          overflow-y: auto;
          backface-visibility: hidden;
          z-index: 5;
          border: 1px solid rgba(0,0,0,0.08);
        }
        .flipping-next {
          transform: rotateY(-180deg);
          opacity: 0.05;
        }
        .paper-grain {
          background-image: url('https://www.transparenttextures.com/patterns/pinstriped-suit.png');
          opacity: 0.02;
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .spine-shadow {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 50px;
          background: linear-gradient(to right, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.06) 10%, transparent 100%);
          z-index: 10;
          pointer-events: none;
        }
        .mastery-tag {
          position: absolute;
          top: 0;
          right: 35px;
          width: 45px;
          height: 65px;
          background: #10B981;
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 88%, 0% 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          z-index: 30;
          animation: slideDown 0.4s ease-out;
        }
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }

        /* Print Engine Styles */
        @media print {
          .no-print { display: none !important; }
          .book-viewport { perspective: none; width: 100%; max-width: none; height: auto; position: static; transform-style: flat; }
          .book-page { position: static; width: 100%; height: auto; box-shadow: none; border: none; border-radius: 0; page-break-after: always; opacity: 1 !important; transform: none !important; }
          .print-full-content { display: block !important; }
          .spine-shadow, .paper-grain { display: none; }
          body { background: white !important; }
        }
      `}</style>

      {/* Screen Controls */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-10 no-print">
        <button 
          onClick={() => setIsFullScape(false)}
          className="bg-white/5 hover:bg-white/15 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/10 flex items-center gap-3"
        >
          <span>✕</span> DISMISS PORTAL
        </button>
        
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2.5">
            {paperPages.map((_, i) => (
              <button
                key={i}
                onClick={() => handleFlip(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === currentPage ? 'bg-white w-12' : reviewedSections.has(i) ? 'bg-emerald-400 w-3.5' : 'bg-white/10 w-3.5'
                }`}
              />
            ))}
          </div>
          <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] flex items-center gap-2">
            {TurnIcon} PORTFOLIO SECTION {currentPage + 1}
          </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-5 py-2.5 flex items-center gap-3 text-emerald-400">
              {source === 'highyield' ? TargetIcon : PredictionIcon}
              <span className="text-[9px] font-black uppercase tracking-widest">{source === 'highyield' ? 'High-Yield Mastery' : 'Predictive Analysis'}</span>
           </div>
           <button 
             onClick={() => window.print()} 
             className="bg-white text-black px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-stone-100 transition-all flex items-center gap-2"
           >
              {DownloadIcon} DOWNLOAD AS PDF
           </button>
        </div>
      </div>

      {/* Interactive 3D Booklet (Hidden on Print) */}
      <div className="book-viewport no-print">
        <div className="absolute inset-0 bg-white/5 rounded-xl transform translate-x-2 translate-y-2"></div>
        <div className="absolute inset-0 bg-white/10 rounded-xl transform translate-x-1 translate-y-1"></div>
        
        <div className={`book-page no-scrollbar ${isFlipping && flipDirection === 'next' ? 'flipping-next' : ''}`}>
          <div className="paper-grain"></div>
          <div className="spine-shadow"></div>
          
          {reviewedSections.has(currentPage) && (
            <div className="mastery-tag">
               {CheckIcon}
            </div>
          )}

          <div className="relative z-10 p-12 md:p-24">
            <div className="flex justify-between items-center mb-16 text-[9px] font-black uppercase opacity-30 border-b border-black/5 pb-8">
               <div className="flex flex-col gap-1">
                  <span>SERIAL NO: {serialNo}</span>
                  <span>BOOKLET ID: {paperCode}</span>
               </div>
               <span className="tracking-[0.5em] flex items-center gap-2">{ReviewIcon} Academic Verification Protocol</span>
               <div className="text-right">
                  <span>Official Examinee Copy</span>
                  <div className="mt-1">Page {currentPage + 1} / {paperPages.length}</div>
               </div>
            </div>

            {currentPage === 0 && (
              <div className="text-center mb-24 space-y-8">
                <div className="inline-block bg-black text-white px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-6">High-Yield Topper Resource</div>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none text-black">ALL INDIA BOARD EXAM {year}</h1>
                <h2 className="text-6xl md:text-7xl font-black uppercase underline underline-offset-[16px] decoration-[6px] text-black">{subject}</h2>
                
                <div className="flex justify-center gap-16 pt-16 text-[14px] font-black uppercase tracking-[0.2em] border-y border-black/5 py-8 mt-16">
                   <div className="flex flex-col items-center">
                      <span className="opacity-20 text-[10px] mb-2 font-black">Examination Duration</span>
                      <span>180 MINUTES</span>
                   </div>
                   <div className="w-[1.5px] bg-black/10"></div>
                   <div className="flex flex-col items-center">
                      <span className="opacity-20 text-[10px] mb-2 font-black">Max Evaluation Marks</span>
                      <span>80 MARKS</span>
                   </div>
                </div>
                <p className="text-[10px] font-black text-black/20 uppercase tracking-[0.8em] mt-10">Board: {board} Standardized Questionnaire</p>
              </div>
            )}

            <div className="whitespace-pre-wrap font-serif text-[21px] leading-[2.6] text-black text-justify mb-32 px-6" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              {paperPages[currentPage]}
            </div>

            <div className="mt-40 pt-20 border-t-2 border-black/5 flex flex-col items-center gap-10">
               <div className="flex items-center gap-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Concept Mastery Evaluation</span>
                  <div className="flex gap-2.5">
                     {[1,2,3,4,5].map(tick => (
                       <div key={tick} className={`w-3.5 h-3.5 rounded-full transition-all duration-700 ${tick <= (reviewedSections.has(currentPage) ? 5 : 0) ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-black/5'}`}></div>
                     ))}
                  </div>
               </div>
               <button 
                onClick={() => toggleReview(currentPage)}
                className={`group flex items-center gap-5 px-16 py-6 rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.25em] transition-all duration-300 ${
                  reviewedSections.has(currentPage) 
                  ? 'bg-emerald-600 text-white shadow-3xl transform scale-105' 
                  : 'bg-stone-50 text-black hover:bg-stone-100 border border-stone-200'
                }`}
               >
                 {reviewedSections.has(currentPage) ? (
                   <>{CheckIcon} SECTION VERIFIED</>
                 ) : (
                   <>{ReviewIcon} MARK FOR REVIEW</>
                 )}
               </button>
            </div>
          </div>
        </div>

        {/* Flipping UI */}
        <div className="absolute inset-y-0 -left-36 flex items-center">
          <button 
            disabled={currentPage === 0 || isFlipping}
            onClick={() => handleFlip(currentPage - 1)}
            className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 text-white disabled:opacity-0 hover:bg-white/15 transition-all group flex flex-col items-center gap-2"
          >
            <div className="rotate-180 transition-transform group-hover:-translate-x-2">{FlipArrowIcon}</div>
          </button>
        </div>
        <div className="absolute inset-y-0 -right-36 flex items-center">
          <button 
            disabled={currentPage === paperPages.length - 1 || isFlipping}
            onClick={() => handleFlip(currentPage + 1)}
            className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 text-white disabled:opacity-0 hover:bg-white/15 transition-all group flex flex-col items-center gap-2"
          >
            <div className="transition-transform group-hover:translate-x-2">{FlipArrowIcon}</div>
          </button>
        </div>
      </div>

      {/* Print-Only Sequential Layout (Invisible on Screen) */}
      <div className="hidden print-full-content w-full">
        {paperPages.map((pageContent, idx) => (
          <div key={idx} className="book-page p-12 md:p-24 relative overflow-hidden">
            <div className="flex justify-between items-center mb-16 text-[9px] font-black uppercase opacity-30 border-b border-black/5 pb-8">
               <div className="flex flex-col gap-1">
                  <span>SERIAL NO: {serialNo}</span>
                  <span>BOOKLET ID: {paperCode}</span>
               </div>
               <span className="tracking-[0.5em]">Academic Integrity Protocol • Page {idx + 1}</span>
               <div className="text-right">
                  <span>Class {classLevel} Copy</span>
                  <div className="mt-1">{subject}</div>
               </div>
            </div>

            {idx === 0 && (
              <div className="text-center mb-24 space-y-8">
                <div className="inline-block bg-black text-white px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-6">High-Yield Topper Resource</div>
                <h1 className="text-4xl font-black uppercase tracking-tight leading-none text-black">ALL INDIA BOARD EXAM {year}</h1>
                <h2 className="text-6xl font-black uppercase underline underline-offset-[16px] decoration-[6px] text-black">{subject}</h2>
                <div className="flex justify-center gap-16 pt-16 text-[14px] font-black uppercase tracking-[0.2em] border-y border-black/5 py-8 mt-16">
                   <div className="flex flex-col items-center">
                      <span className="opacity-20 text-[10px] font-black">Duration: 3 Hours</span>
                   </div>
                   <div className="flex flex-col items-center">
                      <span className="opacity-20 text-[10px] font-black">Max Marks: 80</span>
                   </div>
                </div>
              </div>
            )}

            <div className="whitespace-pre-wrap font-serif text-[21px] leading-[2.6] text-black text-justify px-6" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              {pageContent}
            </div>
            
            <div className="mt-20 pt-10 border-t border-black/5 text-center text-[8px] font-black uppercase tracking-[0.5em] opacity-20">
               be.topper academy • official examination questionnaire • secure export
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto w-full max-w-5xl bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex justify-between items-center no-print">
         <div className="flex gap-6 px-4">
            {paperPages.map((_, i) => (
              <button
                key={i}
                onClick={() => handleFlip(i)}
                className={`w-14 h-22 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-500 ${
                  i === currentPage 
                  ? 'bg-white border-white text-black -translate-y-5 shadow-3xl scale-110' 
                  : reviewedSections.has(i) 
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-500' 
                    : 'border-white/10 text-white/30 hover:border-white/20'
                }`}
              >
                <span className="text-[20px] font-black">{reviewedSections.has(i) ? CheckIcon : i + 1}</span>
                <span className="text-[7px] font-black uppercase tracking-tighter mt-1.5">{i === 0 ? 'START' : `SECTION ${String.fromCharCode(64+i)}`}</span>
              </button>
            ))}
         </div>
         
         <div className="flex flex-col items-end gap-4 px-10">
            <div className="flex items-center gap-4">
               <span className="text-white/20 animate-pulse">{ReviewIcon}</span>
               <div className="text-right">
                 <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-0.5">Mastery Achievement:</p>
                 <span className="text-3xl font-black text-white">{Math.round((reviewedSections.size / paperPages.length) * 100)}%</span>
               </div>
            </div>
            <div className="w-80 h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
               <div 
                  className="h-full bg-emerald-500 transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(16,185,129,0.6)] rounded-full" 
                  style={{ width: `${(reviewedSections.size / paperPages.length) * 100}%` }}
               />
            </div>
         </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 animate-fadeIn w-full text-black">
      {isFullScape && <FullScapeView />}

      <div className="bg-white p-12 rounded-[3.5rem] border border-stone-100 shadow-sm flex flex-col gap-12">
        <div className="flex flex-col md:flex-row gap-10 items-end">
          <div className="flex-1 space-y-3 w-full">
            <label className="text-[10px] font-black text-black opacity-40 uppercase tracking-widest mb-2 px-1">Curated Knowledge Engine</label>
            <div className="flex gap-4">
               <button 
                onClick={() => setSource('highyield')}
                className={`flex-1 py-6 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 border-2 ${
                  source === 'highyield' ? 'bg-black text-white border-black shadow-2xl scale-105' : 'bg-stone-50 text-black border-stone-100 opacity-60 hover:opacity-100'
                }`}
               >
                 {TargetIcon} High-Yield (Must Know)
               </button>
               <button 
                onClick={() => setSource('ai')}
                className={`flex-1 py-6 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 border-2 ${
                  source === 'ai' ? 'bg-black text-white border-black shadow-2xl scale-105' : 'bg-stone-50 text-black border-stone-100 opacity-60 hover:opacity-100'
                }`}
               >
                 {PredictionIcon} AI Predictions
               </button>
            </div>
          </div>
          <div className="flex-1 space-y-3 w-full">
            <label className="text-[10px] font-black text-black opacity-40 uppercase tracking-widest mb-2 px-1">Exam Cycle Year</label>
            <div className="relative">
              <select 
                value={year} 
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-stone-50 border-2 border-stone-100 rounded-3xl px-8 py-6 text-sm font-black focus:outline-none focus:ring-2 focus:ring-black/10 text-black appearance-none cursor-pointer shadow-inner transition-all hover:bg-white"
              >
                <option>2025 Predicted</option>
                <option>2024 Actual</option>
                <option>2023 Actual</option>
                <option>Board Archive (2020-22)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-end border-t border-stone-50 pt-10">
          <div className="flex-1 space-y-3 w-full">
            <label className="text-[10px] font-black text-black opacity-40 uppercase tracking-widest mb-2 px-1">Core Subject Mastery</label>
            <div className="relative">
              <select 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-stone-50 border-2 border-stone-100 rounded-3xl px-8 py-6 text-sm font-black focus:outline-none focus:ring-2 focus:ring-black/10 text-black appearance-none cursor-pointer shadow-inner transition-all hover:bg-white"
              >
                {isJunior ? (
                  <>
                    <option value="Science">Science (PCB Combined)</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Social Science">Social Science</option>
                    <option value="English Core">English Core</option>
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
          </div>
          <button 
            onClick={fetchPaper}
            disabled={loading}
            className="bg-black text-white px-20 py-6 rounded-3xl font-black uppercase text-xs tracking-[0.3em] hover:opacity-90 transition-all duration-500 disabled:opacity-50 w-full md:w-auto shadow-3xl h-[76px] transform active:scale-95"
          >
            {loading ? 'OPENING PORTAL...' : 'GENERATE EXAM BOOKLET'}
          </button>
        </div>
      </div>

      {!paper && !loading && (
        <div className="flex flex-col items-center justify-center py-40 text-black opacity-10 bg-white rounded-[4rem] border border-dashed border-stone-200">
           <div className="mb-12 scale-[2.5]">{source === 'highyield' ? TargetIcon : PredictionIcon}</div>
           <p className="text-xs font-black uppercase tracking-[0.6em]">Configure parameters to access the examination scapes</p>
        </div>
      )}

      {loading && (
        <div className="bg-white p-32 rounded-[4rem] border border-stone-50 shadow-sm flex flex-col items-center justify-center space-y-12">
          <div className="relative">
             <div className="w-24 h-24 border-[8px] border-stone-100 border-t-black rounded-full animate-spin"></div>
             <div className="absolute inset-0 flex items-center justify-center animate-pulse text-black opacity-40">{source === 'highyield' ? TargetIcon : PredictionIcon}</div>
          </div>
          <div className="text-center">
            <p className="text-[11px] text-black font-black uppercase tracking-[0.5em] opacity-40 mb-5">Syncing with Knowledge Archives...</p>
            <p className="text-base text-black opacity-25 uppercase font-black tracking-widest leading-relaxed">Assembling high-probability board questions <br/> and topper evaluation criteria</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionPapers;
