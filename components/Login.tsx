
import React, { useState } from 'react';
import { User, ClassLevel } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [userClass, setUserClass] = useState<ClassLevel>('10');
  const [board, setBoard] = useState('CBSE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    const newUser: User = {
      name,
      class: userClass,
      board,
      avatarId: Math.floor(Math.random() * 5) + 1,
      points: 0,
      streak: 1,
      lastActive: new Date().toDateString()
    };
    onLogin(newUser);
  };

  const boards = [
    'CBSE', 'ICSE', 'Maharashtra State Board', 'UP Board', 'Bihar Board', 
    'Karnataka Board', 'Tamil Nadu Board', 'West Bengal Board', 'Others'
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6 text-black selection:bg-black selection:text-white">
      <div className="w-full max-w-5xl bg-white rounded-[4rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-stone-100 animate-fadeIn">
        <div className="md:w-[45%] bg-black p-16 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
             <h1 className="text-7xl font-bold cursive-logo mb-6">be.topper</h1>
             <p className="text-white/60 text-sm font-black uppercase tracking-[0.3em] leading-relaxed">
               India's First Infinite Study Portal for Classes 9-12.
             </p>
          </div>
          
          <div className="space-y-10 relative z-10">
            <div className="flex items-start gap-6">
               <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl shrink-0">✨</div>
               <div>
                  <p className="text-[11px] font-black uppercase tracking-widest mb-1">AI Personal Mentor</p>
                  <p className="text-[10px] font-bold text-white/40 leading-relaxed uppercase tracking-widest">Tailored support for every concept.</p>
               </div>
            </div>
            <div className="flex items-start gap-6">
               <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl shrink-0">📚</div>
               <div>
                  <p className="text-[11px] font-black uppercase tracking-widest mb-1">Infinite Question Bank</p>
                  <p className="text-[10px] font-bold text-white/40 leading-relaxed uppercase tracking-widest">Access chapter-wise questions anytime.</p>
               </div>
            </div>
          </div>

          <div className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 relative z-10">
            Official National Educational Onboarding
          </div>
        </div>

        <div className="md:w-[55%] p-16 md:p-24 flex flex-col justify-center">
          <div className="mb-14">
            <h2 className="text-4xl font-black text-black uppercase tracking-tighter leading-tight">Create your Student Portal</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/20 mt-4">One-time setup for your academic journey</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-black uppercase tracking-[0.3em] px-1 opacity-30">Full Student Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aryan Sharma"
                className="w-full bg-stone-50 border-2 border-stone-100 rounded-3xl px-8 py-5 text-sm font-black focus:outline-none focus:ring-4 focus:ring-black/5 transition-all text-black"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-black uppercase tracking-[0.3em] px-1 opacity-30">Target Class</label>
                <select 
                  value={userClass}
                  onChange={(e) => setUserClass(e.target.value as ClassLevel)}
                  className="w-full bg-stone-50 border-2 border-stone-100 rounded-3xl px-8 py-5 text-sm font-black focus:outline-none cursor-pointer text-black appearance-none"
                >
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-black uppercase tracking-[0.3em] px-1 opacity-30">Academic Board</label>
                <select 
                  value={board}
                  onChange={(e) => setBoard(e.target.value)}
                  className="w-full bg-stone-50 border-2 border-stone-100 rounded-3xl px-8 py-5 text-sm font-black focus:outline-none cursor-pointer text-black appearance-none"
                >
                  {boards.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-black text-white py-6 rounded-[2rem] font-black uppercase text-[11px] tracking-[0.3em] shadow-2xl hover:bg-stone-900 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Enroll & Access Portal
            </button>
          </form>
          
          <div className="mt-12 flex items-center gap-4 grayscale opacity-20">
             <div className="h-px flex-1 bg-black"></div>
             <p className="text-[8px] font-black uppercase tracking-widest text-center">Verified Educational Standard</p>
             <div className="h-px flex-1 bg-black"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
