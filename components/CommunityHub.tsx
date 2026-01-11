
import React, { useState, useEffect } from 'react';
import { CommunityUpdate } from '../types';

const CommunityHub: React.FC = () => {
  const [updates, setUpdates] = useState<CommunityUpdate[]>([
    { id: '1', user: 'Rohan (Delhi)', action: 'solved 15 Physics MCQs', subject: 'Physics', timestamp: '2m ago' },
    { id: '2', user: 'Sanya (Mumbai)', action: 'generated predicted paper', subject: 'Biology', timestamp: '5m ago' },
    { id: '3', user: 'Aniket (Patna)', action: 'accessed Science Hub', subject: 'Chemistry', timestamp: '10m ago' },
    { id: '4', user: 'Meera (Bengaluru)', action: 'consulted AI Mentor', subject: 'Math', timestamp: '12m ago' },
    { id: '5', user: 'Rahul (Jaipur)', action: 'achieved Scholar Status', subject: 'General', timestamp: '15m ago' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const names = ['Aryan', 'Sneha', 'Kabir', 'Zoya', 'Tanya', 'Ishaan'];
      const cities = ['Kolkata', 'Chennai', 'Lucknow', 'Pune', 'Bhopal'];
      const actions = ['solved 20 Math problems', 'read Chemistry notes', 'unlocked Solution Key', 'practiced Biology diagrams'];
      const subjects = ['Mathematics', 'Chemistry', 'Biology', 'Social Science', 'English'];
      
      const newUpdate: CommunityUpdate = {
        id: Date.now().toString(),
        user: `${names[Math.floor(Math.random()*names.length)]} (${cities[Math.floor(Math.random()*cities.length)]})`,
        action: actions[Math.floor(Math.random()*actions.length)],
        subject: subjects[Math.floor(Math.random()*subjects.length)],
        timestamp: 'Just now'
      };

      setUpdates(prev => [newUpdate, ...prev.slice(0, 9)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-10 animate-fadeIn text-black pb-20">
      <div className="bg-black text-white p-12 rounded-[4rem] shadow-3xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
         </div>
         <div className="relative z-10">
            <h2 className="text-5xl font-black tracking-tighter uppercase mb-4">Topper's Pulse</h2>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em]">Live National Study Network</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white p-10 rounded-[3rem] border border-stone-100 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-black/30 border-b border-stone-50 pb-6 mb-8">Live Activity Feed</h3>
              <div className="space-y-8">
                 {updates.map((update) => (
                   <div key={update.id} className="flex items-center justify-between group animate-slideUp">
                      <div className="flex items-center gap-6">
                         <div className="w-12 h-12 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center font-black text-xs text-black shadow-sm group-hover:bg-black group-hover:text-white transition-all">
                            {update.user.charAt(0)}
                         </div>
                         <div>
                            <p className="text-sm font-bold text-black">{update.user} <span className="font-normal opacity-50">{update.action}</span></p>
                            <span className="text-[9px] font-black uppercase tracking-widest text-black/20">{update.subject}</span>
                         </div>
                      </div>
                      <span className="text-[10px] font-black uppercase text-black/10">{update.timestamp}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="space-y-10">
           <div className="bg-white p-10 rounded-[3rem] border border-stone-100 shadow-sm space-y-8">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-black/30 border-b border-stone-50 pb-6">Global Study Rooms</h3>
              <div className="space-y-4">
                 {[
                   { name: 'Physics Numericals', active: 124, tag: 'HIGH ENERGY' },
                   { name: 'Organic Chemistry', active: 89, tag: 'FOCUS' },
                   { name: 'Calculus Deep Dive', active: 256, tag: 'BOARD PREP' },
                 ].map((room, i) => (
                   <div key={i} className="p-6 bg-stone-50 rounded-[2rem] border border-stone-100 hover:border-black/10 transition-all cursor-pointer group">
                      <div className="flex justify-between items-start mb-2">
                         <p className="text-sm font-black uppercase tracking-tight text-black">{room.name}</p>
                         <span className="text-[8px] font-black bg-black text-white px-2 py-0.5 rounded tracking-widest">{room.tag}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                         <p className="text-[10px] font-bold text-black/40 uppercase">{room.active} Students Active</p>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 bg-black text-white rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] transition-all">Create Study Room</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHub;
