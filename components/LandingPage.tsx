
import React from 'react';

interface LandingPageProps {
  onEnterPortal: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterPortal }) => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-black overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-[#FAF7F2]/80 backdrop-blur-md">
        <h1 className="text-3xl font-bold cursive-logo">be.topper</h1>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-widest opacity-40">
          <a href="#features" className="hover:opacity-100 transition-opacity">Features</a>
          <a href="#results" className="hover:opacity-100 transition-opacity">Results</a>
          <a href="#boards" className="hover:opacity-100 transition-opacity">Boards</a>
        </div>
        <button 
          onClick={onEnterPortal}
          className="bg-black text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
        >
          Enter Portal
        </button>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-6 flex flex-col items-center text-center max-w-5xl mx-auto">
        <div className="bg-black/5 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-10 animate-fadeIn">
          India's #1 Infinite Study Portal
        </div>
        <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.9] gradient-text mb-12 animate-slideUp">
          YOUR PATH TO <br/> <span className="underline decoration-stone-200 decoration-[12px] underline-offset-[20px]">99% STARTS</span> HERE.
        </h2>
        <p className="text-xl font-bold text-black/40 max-w-2xl leading-relaxed mb-16 animate-fadeIn delay-300">
          The ultimate academic ecosystem for Class 9-12 students. Infinite chapter-wise questions, AI doubt-solving, and predicted board papers tailored for all Indian boards.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 animate-fadeIn delay-500">
          <button 
            onClick={onEnterPortal}
            className="bg-black text-white px-12 py-6 rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-105 transition-all flex items-center gap-4"
          >
            START FREE ENROLLMENT
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
          <div className="flex items-center gap-4 px-8 opacity-40 grayscale">
             <div className="flex -space-x-3">
                {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-[#FAF7F2] bg-stone-300"></div>)}
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest">50k+ Toppers Joined</p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: "Infinite Questions", desc: "Never run out of practice. Access millions of chapter-wise questions generated for your board.", icon: "📚" },
            { title: "AI Doubt Solving", desc: "Stuck on a problem? Our 24/7 AI Mentor explains concepts in your native language instantly.", icon: "✨" },
            { title: "Board Predictions", desc: "Our prediction engine creates high-yield papers with 85%+ syllabus overlap probability.", icon: "🎯" }
          ].map((f, i) => (
            <div key={i} className="bg-white p-12 rounded-[3.5rem] border border-stone-100 shadow-sm group hover:shadow-2xl transition-all duration-500">
               <div className="text-5xl mb-10 group-hover:scale-110 transition-transform duration-500 inline-block">{f.icon}</div>
               <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{f.title}</h3>
               <p className="text-sm font-bold text-black/40 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section id="results" className="py-32 bg-black text-white px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
           {[
             { val: "1.2M+", label: "Questions Answered" },
             { val: "4.9/5", label: "Student Rating" },
             { val: "85%", label: "Expected Accuracy" },
             { val: "12+", label: "Educational Boards" }
           ].map((s, i) => (
             <div key={i}>
                <p className="text-5xl font-black tracking-tighter mb-2">{s.val}</p>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{s.label}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-48 px-6 text-center">
         <h2 className="text-6xl font-black tracking-tighter uppercase mb-12">Ready to secure your <br/> future rank?</h2>
         <button 
           onClick={onEnterPortal}
           className="bg-black text-white px-16 py-8 rounded-[3rem] text-sm font-black uppercase tracking-[0.4em] shadow-3xl hover:scale-105 transition-all"
         >
           GET STARTED NOW
         </button>
      </section>

      <footer className="py-20 border-t border-stone-100 flex flex-col items-center opacity-30 gap-8 grayscale">
         <h1 className="text-4xl font-bold cursive-logo">be.topper</h1>
         <p className="text-[9px] font-black uppercase tracking-[0.5em]">The National Portal for Academic Excellence • 2025 Edition</p>
      </footer>
    </div>
  );
};

export default LandingPage;
