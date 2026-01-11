
import React from 'react';
import { Section } from '../types';

interface SidebarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  userName?: string;
  userClass?: string;
}

const Icons = {
  dashboard: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  aiFriend: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
  ),
  questionBank: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M9 7h6"/><path d="M9 11h6"/><path d="M9 15h4"/></svg>
  ),
  community: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  notes: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
  ),
  expected: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  ),
  papers: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
  ),
  scienceHub: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>
  ),
  answerPortal: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
  ),
  profile: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  )
};

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, userName, userClass }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Home Portal', icon: Icons.dashboard },
    { id: 'community', label: 'Topper Hub', icon: Icons.community },
    { id: 'ai-friend', label: 'AI Mentor', icon: Icons.aiFriend },
    { id: 'question-bank', label: 'Question Bank', icon: Icons.questionBank },
    { id: 'notes', label: 'Smart Notes', icon: Icons.notes },
    { id: 'expected-questions', label: 'Exam Predict', icon: Icons.expected },
    { id: 'science-hub', label: 'Science Hub', icon: Icons.scienceHub },
    { id: 'papers', label: 'Archives', icon: Icons.papers },
    { id: 'answer-portal', label: 'Solutions', icon: Icons.answerPortal },
  ];

  return (
    <aside className="w-20 md:w-64 bg-white border-r border-stone-100 flex flex-col items-center md:items-start py-8 h-screen sticky top-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-40">
      <div className="px-6 mb-10 hidden md:block">
        <span className="text-2xl font-black text-black tracking-tighter uppercase cursive-logo">be.topper</span>
      </div>
      
      <div className="w-full space-y-1.5 px-2 md:px-4 flex-1 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id as Section)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
              activeSection === item.id 
                ? 'bg-black text-white font-black shadow-lg shadow-black/5' 
                : 'text-black opacity-60 hover:bg-stone-50 hover:opacity-100'
            }`}
          >
            <span className={activeSection === item.id ? 'text-white' : 'text-black'}>
              {item.icon}
            </span>
            <span className="hidden md:block text-[10px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="w-full px-2 md:px-4 pt-6 border-t border-stone-50">
        <button
          onClick={() => setActiveSection('profile')}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 group border ${
            activeSection === 'profile' 
              ? 'bg-stone-100 border-black/5' 
              : 'bg-stone-50 text-black border-transparent hover:border-stone-200'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
             {userName?.charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block text-left overflow-hidden">
            <p className="text-[10px] font-black uppercase tracking-widest truncate">{userName}</p>
            <p className="text-[8px] font-bold opacity-40 uppercase">Grade {userClass}</p>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
