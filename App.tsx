
import React, { useState, useEffect, useCallback } from 'react';
import { Section, ClassLevel, User } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AIFriend from './components/AIFriend';
import QuestionBank from './components/QuestionBank';
import NotesSection from './components/NotesSection';
import ExpectedQuestions from './components/ExpectedQuestions';
import QuestionPapers from './components/QuestionPapers';
import ScienceHub from './components/ScienceHub';
import Login from './components/Login';
import Profile from './components/Profile';
import AnswerPortal from './components/AnswerPortal';
import LandingPage from './components/LandingPage';
import CommunityHub from './components/CommunityHub';
import ShareModal from './components/ShareModal';

type ViewState = 'landing' | 'auth' | 'app';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [viewState, setViewState] = useState<ViewState>('landing');
  const [notification, setNotification] = useState<{msg: string, points: number} | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('betopper_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser) as User;
      const today = new Date().toDateString();
      
      if (parsedUser.lastActive !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (parsedUser.lastActive === yesterday.toDateString()) {
          parsedUser.streak += 1;
        } else if (parsedUser.lastActive) {
          parsedUser.streak = 1;
        }
        parsedUser.lastActive = today;
        localStorage.setItem('betopper_user', JSON.stringify(parsedUser));
      }
      setUser(parsedUser);
      setViewState('app');
    }
    setIsLoading(false);
  }, []);

  const awardPoints = useCallback((amount: number, reason: string) => {
    if (!user) return;
    const updatedUser = { ...user, points: user.points + amount };
    setUser(updatedUser);
    localStorage.setItem('betopper_user', JSON.stringify(updatedUser));
    setNotification({ msg: reason, points: amount });
    setTimeout(() => setNotification(null), 3000);
  }, [user]);

  const handleLogin = (newUser: User) => {
    const userWithDefaults = {
      ...newUser,
      points: 0,
      streak: 1,
      lastActive: new Date().toDateString()
    };
    setUser(userWithDefaults);
    setViewState('app');
    localStorage.setItem('betopper_user', JSON.stringify(userWithDefaults));
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('betopper_user', JSON.stringify(updatedUser));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.toLowerCase().includes('question') || searchQuery.toLowerCase().includes('bank')) {
      setActiveSection('question-bank');
    } else if (searchQuery.toLowerCase().includes('ai') || searchQuery.toLowerCase().includes('mentor')) {
      setActiveSection('ai-friend');
    } else if (searchQuery.toLowerCase().includes('science')) {
      setActiveSection('science-hub');
    } else if (searchQuery.toLowerCase().includes('paper')) {
      setActiveSection('papers');
    } else {
      setActiveSection('question-bank');
    }
    setSearchQuery('');
  };

  if (isLoading) return null;

  if (viewState === 'landing' && !user) {
    return <LandingPage onEnterPortal={() => setViewState('auth')} />;
  }

  if (viewState === 'auth' || (!user && viewState === 'app')) {
    return <Login onLogin={handleLogin} />;
  }

  const level = Math.floor((user?.points || 0) / 500) + 1;
  const levelProgress = ((user?.points || 0) % 500) / 5;

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] text-black selection:bg-black selection:text-white overflow-hidden">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        userName={user?.name} 
        userClass={user?.class}
      />

      <main className="flex-1 flex flex-col p-4 md:p-10 overflow-y-auto max-h-screen no-scrollbar relative">
        <ShareModal 
          isOpen={isShareOpen} 
          onClose={() => setIsShareOpen(false)} 
          title="Viral Study Access"
        />

        {notification && (
          <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] bg-black text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4 animate-fadeIn border border-white/10">
            <div className="bg-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-black">+{notification.points}</div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Mastery Points</p>
              <p className="text-sm font-black uppercase tracking-tight">{notification.msg}</p>
            </div>
          </div>
        )}

        <header className="flex flex-col items-center mb-16 w-full max-w-7xl mx-auto space-y-10">
          <div className="w-full flex flex-col md:flex-row justify-between items-center px-2 gap-6 md:gap-0">
            <div className="flex gap-4">
               <div className="bg-white border border-stone-200 px-6 py-3 rounded-2xl shadow-sm flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-black/30">Lvl {level}</span>
                  <div className="w-24 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-black transition-all duration-1000" style={{ width: `${levelProgress}%` }}></div>
                  </div>
               </div>
               <div className="bg-white border border-stone-200 px-6 py-3 rounded-2xl shadow-sm flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black text-black uppercase tracking-widest">Global Live</span>
                  </div>
               </div>
            </div>

            <div className="flex-1 max-w-md w-full px-4">
              <form onSubmit={handleSearch} className="relative group">
                 <input 
                  type="text" 
                  placeholder="Search Portal (e.g., Physics MCQs)..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-stone-200 px-10 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-black/5 transition-all text-black"
                 />
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </form>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setIsShareOpen(true)}
                className="bg-white border border-stone-200 text-black px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm"
              >
                Share Portal
              </button>
              <div className="bg-black text-white px-8 py-3 rounded-2xl shadow-xl flex items-center gap-5">
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Topper Points</span>
                 <span className="text-xl font-black">{(user?.points || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="text-center group">
            <h1 className="text-8xl font-black text-black tracking-tighter cursive-logo cursor-default group-hover:scale-105 transition-transform duration-500">
              be.topper
            </h1>
            <div className="flex items-center justify-center gap-3 mt-4">
               <div className="h-px w-10 bg-black/10"></div>
               <p className="text-black text-[10px] font-black tracking-[0.6em] uppercase opacity-40">
                 National Academic Engine v6.0.PRO
               </p>
               <div className="h-px w-10 bg-black/10"></div>
            </div>
          </div>
        </header>

        <section className="flex-1 w-full max-w-7xl mx-auto">
          {activeSection === 'dashboard' && <Dashboard setActiveSection={setActiveSection} userName={user?.name} points={user?.points || 0} level={level} />}
          {activeSection === 'community' && <CommunityHub />}
          {activeSection === 'ai-friend' && <AIFriend onAwardPoints={awardPoints} />}
          {activeSection === 'question-bank' && <QuestionBank classLevel={user?.class || '10'} onAwardPoints={awardPoints} />}
          {activeSection === 'notes' && <NotesSection classLevel={user?.class || '10'} onAwardPoints={awardPoints} />}
          {activeSection === 'expected-questions' && <ExpectedQuestions classLevel={user?.class || '10'} />}
          {activeSection === 'papers' && <QuestionPapers classLevel={user?.class || '10'} board={user?.board || 'CBSE'} onAwardPoints={awardPoints} />}
          {activeSection === 'science-hub' && <ScienceHub classLevel={user?.class || '10'} />}
          {activeSection === 'answer-portal' && <AnswerPortal classLevel={user?.class || '10'} board={user?.board || 'CBSE'} onAwardPoints={awardPoints} />}
          {activeSection === 'profile' && user && (
            <Profile 
              user={user} 
              onUpdate={handleUpdateUser} 
            />
          )}
        </section>

        <footer className="w-full max-w-7xl mx-auto mt-20 pb-10 border-t border-stone-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 grayscale">
            <p className="text-[10px] font-black uppercase tracking-widest">© 2025 be.topper Academy India • National Education Standard Certified</p>
            <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest">
               <a href="#" className="hover:text-black">Terms of Service</a>
               <a href="#" className="hover:text-black">Privacy Policy</a>
               <a href="#" className="hover:text-black font-black text-black opacity-100 underline">Stable Production v6.0</a>
            </div>
        </footer>
      </main>

      <button className="fixed bottom-10 right-10 bg-black text-white p-5 rounded-full shadow-3xl hover:scale-110 transition-all z-50 group">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
         <span className="absolute right-full mr-4 bg-black text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Live Academic Support</span>
      </button>
    </div>
  );
};

export default App;
