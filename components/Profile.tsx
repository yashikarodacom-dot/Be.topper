
import React, { useState } from 'react';
import { User, ClassLevel } from '../types';

interface ProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.name);
  const [userClass, setUserClass] = useState<ClassLevel>(user.class);
  const [board, setBoard] = useState(user.board);
  const [goal, setGoal] = useState(user.goal || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onUpdate({ ...user, name, class: userClass, board, goal });
    setIsEditing(false);
  };

  const level = Math.floor(user.points / 500) + 1;
  const levelProgress = (user.points % 500) / 5;
  const levelName = level === 1 ? 'Beginner' : level === 2 ? 'Learner' : level === 3 ? 'Achiever' : level === 4 ? 'Scholar' : 'Topper';

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fadeIn pb-10 text-black">
      <div className="bg-white rounded-[3rem] p-12 border border-stone-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-200">ID: BT-2025-{Math.floor(Math.random()*9000)+1000}</span>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-32 h-32 rounded-full bg-stone-100 flex items-center justify-center text-4xl font-black text-black border-4 border-white shadow-xl relative">
            {user.name.charAt(0).toUpperCase()}
            <div className="absolute -bottom-2 -right-2 bg-black text-white w-10 h-10 rounded-full flex items-center justify-center text-xs font-black">
               {level}
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-black text-black tracking-tighter uppercase">{user.name}</h2>
            <p className="text-black opacity-40 font-bold uppercase tracking-widest text-xs mt-1">Class {user.class} • {user.board} Enrolled</p>
            <div className="mt-4 flex gap-3">
               <span className="bg-black text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">{levelName} Status</span>
               <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">{user.points} TP</span>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-stone-50">
          <div className="space-y-4">
             <h3 className="text-[10px] font-black text-black opacity-30 uppercase tracking-widest">Academic Goal</h3>
             {isEditing ? (
               <textarea 
                 value={goal}
                 onChange={(e) => setGoal(e.target.value)}
                 className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-4 text-sm font-bold focus:outline-none text-black"
                 placeholder="What are you aiming for? (e.g. 95% in Boards)"
               />
             ) : (
               <p className="text-lg font-bold text-black leading-relaxed italic">
                 {user.goal || "Set a goal to stay motivated..."}
               </p>
             )}
          </div>

          <div className="space-y-6">
             <div className="flex justify-between items-center bg-stone-50 p-6 rounded-3xl">
                <div>
                   <p className="text-[10px] font-black text-black opacity-30 uppercase tracking-widest">Board</p>
                   <p className="font-bold text-black">{user.board}</p>
                </div>
                {isEditing && (
                  <select 
                    value={board} 
                    onChange={(e) => setBoard(e.target.value)}
                    className="bg-white border border-stone-200 rounded-xl px-2 py-1 text-xs font-bold text-black"
                  >
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State Board">State Board</option>
                  </select>
                )}
             </div>
             
             <div className="flex justify-between items-center bg-stone-50 p-6 rounded-3xl">
                <div>
                   <p className="text-[10px] font-black text-black opacity-30 uppercase tracking-widest">Class Level</p>
                   <p className="font-bold text-black">Grade {user.class}</p>
                </div>
                {isEditing && (
                   <select 
                    value={userClass} 
                    onChange={(e) => setUserClass(e.target.value as ClassLevel)}
                    className="bg-white border border-stone-200 rounded-xl px-2 py-1 text-xs font-bold text-black"
                  >
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                )}
             </div>
          </div>
        </div>

        <div className="mt-12 flex gap-4">
          {isEditing ? (
            <button 
              onClick={handleSave}
              className="bg-black text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl"
            >
              Update Profile
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-white border border-stone-200 text-black px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm hover:bg-stone-50 transition-all text-black"
            >
              Modify Enrollment Details
            </button>
          )}
        </div>
      </div>

      <div className="bg-black rounded-[3rem] p-12 text-white shadow-2xl">
         <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Mastery Trajectory</h3>
              <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Next Rank: {level === 5 ? 'Topper Supreme' : level === 4 ? 'Topper' : level === 3 ? 'Scholar' : 'Achiever'}</p>
            </div>
            <div className="text-right">
               <span className="text-4xl font-black">{Math.floor(levelProgress)}%</span>
            </div>
         </div>
         <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden mb-6">
            <div className="h-full bg-white transition-all duration-1000" style={{ width: `${levelProgress}%` }}></div>
         </div>
         <div className="grid grid-cols-4 gap-4 text-center">
            {[1,2,3,4].map(l => (
              <div key={l} className={`p-4 rounded-2xl border ${level >= l ? 'border-white text-white' : 'border-white/10 text-white/10'}`}>
                <p className="text-[10px] font-black uppercase tracking-widest">Lvl {l}</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Profile;
