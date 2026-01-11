
import React, { useState, useMemo, useEffect } from 'react';
import { getShortNotes } from '../services/geminiService';

interface NotesSectionProps {
  classLevel: string;
  onAwardPoints: (amount: number, reason: string) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({ classLevel, onAwardPoints }) => {
  const isJunior = classLevel === '9' || classLevel === '10';
  const [subject, setSubject] = useState(isJunior ? 'Science' : 'Physics');
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFullScape, setIsFullScape] = useState(false);

  useEffect(() => {
    setSubject(isJunior ? 'Science' : 'Physics');
  }, [classLevel, isJunior]);

  const suggestedTopics: Record<string, string[]> = {
    'Science': ['Tissues', 'Atoms and Molecules', 'Life Processes', 'Light - Reflection and Refraction', 'Chemical Reactions and Equations', 'Gravitation'],
    'Social Science': ['Rise of Nationalism in Europe', 'Resources and Development', 'Power Sharing', 'Sectors of Indian Economy', 'Federalism'],
    'Physics': ['Motion in a Straight Line', 'Thermodynamics', 'Ray Optics', 'Electric Charges & Fields', 'Work, Energy & Power'],
    'Chemistry': ['Chemical Bonding', 'Structure of Atom', 'Organic Chemistry Basics', 'Solutions', 'Electrochemistry'],
    'Mathematics': ['Calculus', 'Trigonometry', 'Probability', 'Matrices', 'Complex Numbers', 'Real Numbers', 'Polynomials'],
    'Biology': ['Cell Structure', 'Genetics', 'Human Physiology', 'Plant Kingdom', 'Biotechnology', 'Reproduction'],
    'Economics': ['Money and Credit', 'Globalisation', 'Development', 'Consumer Rights'],
    'Political Science': ['Gender, Religion and Caste', 'Political Parties', 'Outcomes of Democracy']
  };

  const currentSuggestions = useMemo(() => suggestedTopics[subject] || [], [subject]);

  const fetchNotes = async (selectedTopic?: string) => {
    const targetTopic = selectedTopic || topic;
    if (!targetTopic) return;
    
    setTopic(targetTopic);
    setLoading(true);
    try {
      const data = await getShortNotes(classLevel, subject, targetTopic);
      setNotes(data || '');
      onAwardPoints(15, 'Academic Research');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(notes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onAwardPoints(5, 'Material Archiving');
  };

  const FullScapeView = () => (
    <div className="fixed inset-0 z-50 bg-[#FAF7F2] overflow-y-auto flex flex-col items-center p-4 md:p-10 animate-fadeIn text-black">
      <div className="w-full max-w-6xl flex justify-between items-center mb-8 no-print">
        <button 
          onClick={() => setIsFullScape(false)}
          className="bg-stone-200 text-black px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-stone-300 transition-all shadow-sm"
        >
          ← EXIT FULL SCAPE
        </button>
        <div className="flex gap-3">
          <button onClick={handleCopy} className="bg-white border border-stone-200 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm text-black">
             {copied ? '✅ COPIED' : '📋 COPY NOTES'}
          </button>
          <button onClick={() => window.print()} className="bg-black text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg">
             🖨️ PRINT PDF
          </button>
        </div>
      </div>

      <div className="w-full max-w-6xl bg-white min-h-[140vh] shadow-2xl p-16 md:p-24 relative border-l-[40px] border-stone-100 border-r border-stone-100">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(#f3f4f6 1px, transparent 1px)',
          backgroundSize: '100% 2.8rem',
          opacity: 0.8
        }}></div>
        
        <div className="relative z-10">
          <div className="mb-14 border-b-4 border-black pb-6">
            <h1 className="text-5xl font-black text-black uppercase tracking-tight leading-none mb-4">{topic}</h1>
            <div className="flex items-center gap-4 text-black opacity-30 font-black uppercase text-xs tracking-[0.2em]">
               <span>CLASS {classLevel}</span>
               <span className="w-2 h-2 rounded-full bg-stone-200"></span>
               <span>{subject} REVISION</span>
            </div>
          </div>
          
          <div className="prose prose-stone max-w-none text-black leading-[2.8rem] space-y-0 whitespace-pre-wrap font-black text-xl">
            {notes}
          </div>

          <div className="mt-32 pt-10 border-t-2 border-dashed border-stone-100 flex justify-between text-[10px] text-black opacity-20 font-black uppercase tracking-[0.3em]">
            <span>BE TOPPER ACADEMY • OFFICIAL RESOURCE</span>
            <span>CONFIDENTIAL STUDY MATERIAL</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 animate-fadeIn w-full text-black">
      {isFullScape && <FullScapeView />}

      <div className="bg-white p-10 rounded-[2.5rem] border border-stone-100 shadow-sm transition-all duration-300">
        <h2 className="text-2xl font-black text-black mb-8 uppercase tracking-tight">Topic-wise Revision Notes</h2>
        
        <div className="flex flex-col md:flex-row gap-8 items-end">
          <div className="flex-1 space-y-2 w-full">
            <label className="text-[10px] font-black text-black opacity-40 uppercase tracking-widest px-1">Select Subject</label>
            <select 
              value={subject} 
              onChange={(e) => {
                setSubject(e.target.value);
                setTopic('');
              }}
              className="w-full bg-stone-50 border border-stone-100 rounded-3xl px-6 py-4 text-sm font-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all text-black cursor-pointer appearance-none"
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
                  <option value="Computer Science">Computer Science</option>
                  <option value="Economics">Economics</option>
                </>
              )}
            </select>
          </div>
          
          <div className="flex-[2] space-y-2 w-full">
            <label className="text-[10px] font-black text-black opacity-40 uppercase tracking-widest px-1">Specific Topic Name</label>
            <div className="relative">
               <input 
                type="text" 
                placeholder="Search or enter any topic..." 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-stone-50 border border-stone-100 rounded-3xl px-6 py-4 text-sm font-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all text-black"
              />
            </div>
          </div>
          
          <button 
            onClick={() => fetchNotes()}
            disabled={loading || !topic}
            className="bg-black text-white px-12 py-4 rounded-3xl font-black uppercase text-xs tracking-widest hover:opacity-90 transition-all disabled:opacity-50 w-full md:w-auto shadow-xl"
          >
            {loading ? 'SYNCING...' : 'PREPARE NOTES'}
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
            {currentSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => fetchNotes(suggestion)}
                className="px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-wider bg-stone-50 text-black border border-stone-200 hover:bg-stone-100 hover:border-black/20 transition-all"
              >
                + {suggestion}
              </button>
            ))}
        </div>
      </div>

      {loading && (
        <div className="bg-white p-24 rounded-[3rem] border border-stone-50 shadow-sm flex flex-col items-center justify-center space-y-6">
          <div className="w-12 h-12 border-4 border-stone-100 border-t-black rounded-full animate-spin"></div>
          <p className="text-xs text-black font-black uppercase tracking-[0.2em] opacity-40">Be Topper AI is generating high-quality notes...</p>
        </div>
      )}

      {notes && !loading && (
        <div className="bg-white p-12 rounded-[3rem] border border-stone-100 shadow-2xl shadow-stone-200/50 animate-slideUp w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b border-stone-50 pb-8">
            <div className="space-y-2">
              <span className="bg-black text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Document Generated</span>
              <h2 className="text-4xl font-black text-black leading-none">{topic}</h2>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setIsFullScape(true)}
                className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-3xl text-xs font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all"
              >
                📜 ENTER FULL SCAPE
              </button>
            </div>
          </div>
          
          <div className="prose max-w-none text-black leading-relaxed whitespace-pre-wrap font-black text-lg mb-12">
            {notes}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesSection;
