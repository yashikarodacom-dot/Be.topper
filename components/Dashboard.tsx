
import React from 'react';
import { Section } from '../types';

interface DashboardProps {
  setActiveSection: (section: Section) => void;
  userName?: string;
  points: number;
  level: number;
}

const Icons = {
  aiFriend: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
  ),
  questionBank: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M9 7h6"/><path d="M9 11h6"/><path d="M9 15h4"/></svg>
  ),
  notes: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
  ),
  expected: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  ),
  papers: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
  ),
  scienceHub: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>
  )
};

const Dashboard: React.FC<DashboardProps> = ({ setActiveSection, userName, points, level }) => {
  const cards = [
    { 
      title: 'AI Study Mentor', 
      desc: 'Instant doubt resolution in any language', 
      icon: Icons.aiFriend, 
      section: 'ai-friend',
      color: 'bg-white'
    },
    { 
      title: 'Infinite Q Bank', 
      desc: 'Access thousands of chapter-wise questions', 
      icon: Icons.questionBank, 
      section: 'question-bank',
      color: 'bg-black text-white'
    },
    { 
      title: 'Science Hub', 
      desc: 'Interactive Diagrams & Experiments', 
      icon: Icons.scienceHub, 
      section: 'science-hub',
      color: 'bg-white'
    },
    { 
      title: 'Smart Notes', 
      desc: 'High-yield revision summaries', 
      icon: Icons.notes, 
      section: 'notes',
      color: 'bg-white'
    },
    { 
      title: 'Exam Predictor', 
      desc: 'Top 10 most likely questions', 
      icon: Icons.expected, 
      section: 'expected-questions',
      color: 'bg-white'
    },
    { 
      title: 'Official Archives', 
      desc: 'Previous Year & Sample Papers', 
      icon: Icons.papers, 
      section: 'papers',
      color: 'bg-white'
    },
  ];

  const news = [
    { tag: 'CBSE', text: 'Sample Papers for 2025 Board Exams Released.', time: '2h ago' },
    { tag: 'UP BOARD', text: 'Exam Center Allotment List to be out next week.', time: '5h ago' },
    { tag: 'GLOBAL', text: 'Join the National Topper Mock Test this Sunday!', time: '1d ago' },
  ];

  const leaderboard = [
    { name: 'Rohan M.', points: '12,450', rank: 1, avatar: 'RM' },
    { name: 'Sanya K.', points: '11,200', rank: 2, avatar: 'SK' },
    { name: 'Aniket V.', points: '9,800', rank: 3, avatar: 'AV' },
  ];

  const levelName = level === 1 ? 'Beginner' : level === 2 ? 'Learner' : level === 3 ? 'Achiever' : level === 4 ? 'Scholar' : 'Topper';

  return (
    <div className="space-y-10 animate-fadeIn pb-20">
      {/* Welcome Hero */}
      <div className="bg-white p-12 rounded-[3.5rem] border border-stone-200 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none">
           <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div>
            <h2 className="text-5xl font-black text-black leading-none mb-6 tracking-tighter uppercase">Welcome, <span className="underline decoration-stone-200 decoration-[8px] underline-offset-[12px]">{userName?.split(' ')[0]}</span></h2>
            <div className="flex flex-wrap gap-4">
               <span className="bg-black text-white px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest">{levelName} Status</span>
               <span className="bg-stone-100 text-black px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest">Global Rank: #824</span>
               <span className="bg-emerald-500 text-white px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest">{points} Topper Points</span>
            </div>
          </div>
          <div className="text-left md:text-right border-l md:border-l-0 md:border-r border-stone-100 px-8 py-2">
             <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-2">Daily Goal Progress</p>
             <div className="flex items-center gap-4">
                <div className="w-32 h-2.5 bg-stone-100 rounded-full overflow-hidden">
                   <div className="h-full bg-black w-[65%]"></div>
                </div>
                <span className="text-xl font-black tracking-tighter uppercase">65%</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Menu Cards */}
        <div className="lg:col-span-2 space-y-10">
          {/* Weekly Challenge Banner */}
          <div className="bg-emerald-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-white/5 group-hover:scale-110 transition-transform duration-700"></div>
             <div className="relative z-10 flex justify-between items-center">
                <div>
                   <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 mb-2 block">Weekly National Challenge</span>
                   <h3 className="text-3xl font-black uppercase tracking-tight mb-4">The Calculus Sprint 2025</h3>
                   <p className="text-sm font-bold text-white/60 mb-8 max-w-sm">Compete with 50,000+ students across India. Top 100 get Topper Gold status.</p>
                   <button className="bg-white text-emerald-600 px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Start Challenge</button>
                </div>
                <div className="hidden md:block text-8xl font-black opacity-10">∑</div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cards.map((card) => (
              <button
                key={card.section}
                onClick={() => setActiveSection(card.section as Section)}
                className={`${card.color} p-10 rounded-[3rem] border border-stone-200 flex flex-col items-start text-left hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 group relative overflow-hidden h-full`}
              >
                <div className={`mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${card.color.includes('bg-black') ? 'text-white' : 'text-black'}`}>{card.icon}</div>
                <h3 className="text-2xl font-black leading-tight mb-3 tracking-tight uppercase">{card.title}</h3>
                <p className={`text-sm font-bold leading-relaxed opacity-60 ${card.color.includes('bg-black') ? 'text-white/60' : 'text-black/60'}`}>{card.desc}</p>
                
                <div className="mt-8 flex items-center gap-3">
                   <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">Enter Portal</span>
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: News & Leaderboard */}
        <div className="space-y-10">
           {/* Live Board News */}
           <div className="bg-white p-10 rounded-[3rem] border border-stone-200 shadow-sm space-y-8">
              <div className="flex justify-between items-center border-b border-stone-100 pb-6">
                 <h3 className="text-xs font-black uppercase tracking-[0.4em] text-black">Live Board Updates</h3>
                 <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-6">
                 {news.map((item, idx) => (
                   <div key={idx} className="group cursor-default">
                      <div className="flex justify-between items-center mb-1">
                         <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-black text-white rounded-md tracking-widest">{item.tag}</span>
                         <span className="text-[8px] font-black uppercase text-black/20">{item.time}</span>
                      </div>
                      <p className="text-xs font-bold text-black leading-relaxed group-hover:translate-x-1 transition-transform">{item.text}</p>
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 border border-dashed border-stone-200 rounded-2xl text-[9px] font-black uppercase tracking-widest text-black/40 hover:bg-stone-50 transition-all">View All Bulletins</button>
           </div>

           {/* Global Leaderboard */}
           <div className="bg-black text-white p-10 rounded-[3rem] shadow-2xl space-y-8">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/40 border-b border-white/10 pb-6">Top Rankers (This Week)</h3>
              <div className="space-y-6">
                 {leaderboard.map((user) => (
                   <div key={user.rank} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-black text-xs text-white">
                            {user.avatar}
                         </div>
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-widest">{user.name}</p>
                            <p className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest">{user.points} Points</p>
                         </div>
                      </div>
                      <div className="text-xl font-black text-white/10">#{user.rank}</div>
                   </div>
                 ))}
              </div>
              <button 
                onClick={() => setActiveSection('profile')}
                className="w-full py-4 bg-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest text-white hover:bg-white/20 transition-all"
              >
                Join Leaderboard
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
