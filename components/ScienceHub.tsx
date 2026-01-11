
import React, { useState } from 'react';
import { getScienceDiagram, getScienceActivity, generateScienceDiagramImage } from '../services/geminiService';

const AtlasIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path d="M3.6 9h16.8"/><path d="M3.6 15h16.8"/><path d="M11.5 3a17 17 0 0 0 0 18"/><path d="M12.5 3a17 17 0 0 1 0 18"/></svg>
);

const BeakerIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/></svg>
);

const DrawIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19 7-7 3 3-7 7-3-3Z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5Z"/><path d="m2 2 5 5"/><path d="m11 8 2 2"/></svg>
);

const DownloadIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);

interface ScienceHubProps {
  classLevel: string;
}

const ScienceHub: React.FC<ScienceHubProps> = ({ classLevel }) => {
  const [tab, setTab] = useState<'diagrams' | 'activities'>('diagrams');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [diagramData, setDiagramData] = useState<any>(null);
  const [diagramImageUrl, setDiagramImageUrl] = useState<string | null>(null);
  const [activityContent, setActivityContent] = useState('');

  const handleFetch = async () => {
    if (!topic) return;
    setLoading(true);
    setDiagramImageUrl(null);
    try {
      if (tab === 'diagrams') {
        const [data, imageUrl] = await Promise.all([
          getScienceDiagram(classLevel, topic),
          generateScienceDiagramImage(classLevel, topic)
        ]);
        setDiagramData(data);
        setDiagramImageUrl(imageUrl);
      } else {
        const content = await getScienceActivity(classLevel, topic);
        setActivityContent(content || '');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!diagramImageUrl) return;
    const link = document.createElement('a');
    link.href = diagramImageUrl;
    link.download = `BeTopper_Diagram_${topic.replace(/\s+/g, '_')}.png`;
    link.click();
  };

  const suggestedDiagrams = classLevel === '9' || classLevel === '10' 
    ? ['Human Heart', 'Neuron', 'Electric Motor', 'Plant Cell', 'Digestive System']
    : ['DNA Structure', 'Human Eye', 'Galvanic Cell', 'Cyclotron', 'P-N Junction'];

  const suggestedActivities = classLevel === '9' || classLevel === '10' 
    ? ['Reaction of Zinc with Acid', 'Refraction through Prism', 'Saponification', 'Photosynthesis (CO2 test)']
    : ['Youngs Double Slit', 'Titration of Oxalic Acid', 'Verify Ohms Law', 'DNA Isolation'];

  return (
    <div className="space-y-10 animate-fadeIn w-full text-black pb-20">
      {/* Selection Control */}
      <div className="bg-white p-10 rounded-[3rem] border border-stone-100 shadow-sm flex flex-col gap-10">
        <div className="flex gap-4">
           <button 
            onClick={() => { setTab('diagrams'); setDiagramData(null); setDiagramImageUrl(null); setActivityContent(''); }}
            className={`flex-1 py-6 rounded-3xl text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 border-2 ${
              tab === 'diagrams' ? 'bg-black text-white border-black shadow-2xl scale-105' : 'bg-stone-50 text-black border-stone-100 opacity-60'
            }`}
           >
             {AtlasIcon} Visual Atlas (Diagrams)
           </button>
           <button 
            onClick={() => { setTab('activities'); setDiagramData(null); setDiagramImageUrl(null); setActivityContent(''); }}
            className={`flex-1 py-6 rounded-3xl text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 border-2 ${
              tab === 'activities' ? 'bg-black text-white border-black shadow-2xl scale-105' : 'bg-stone-50 text-black border-stone-100 opacity-60'
            }`}
           >
             {BeakerIcon} Lab Manual (Activities)
           </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-end border-t border-stone-50 pt-8">
           <div className="flex-1 space-y-2 w-full">
              <label className="text-[10px] font-black opacity-30 uppercase tracking-[0.3em] px-1">Specific Concept / Unit</label>
              <input 
                type="text" 
                placeholder={tab === 'diagrams' ? "e.g., Human Respiratory System" : "e.g., To observe Tyndall effect"}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 text-sm font-black text-black focus:outline-none"
              />
           </div>
           <button 
            onClick={handleFetch}
            disabled={loading || !topic}
            className="bg-black text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest h-[60px] shadow-xl disabled:opacity-50 transition-all active:scale-95"
           >
             {loading ? 'ANALYZING...' : 'EXPLORE SCIENCE'}
           </button>
        </div>

        <div className="flex flex-wrap gap-3">
           <span className="text-[9px] font-black text-black opacity-20 uppercase tracking-widest self-center mr-2">Quick Access:</span>
           {(tab === 'diagrams' ? suggestedDiagrams : suggestedActivities).map(item => (
             <button 
              key={item} 
              onClick={() => { setTopic(item); }}
              className="px-4 py-2 rounded-xl bg-stone-50 border border-stone-100 text-[10px] font-black text-black/50 hover:text-black hover:border-black/20 transition-all"
             >
               {item}
             </button>
           ))}
        </div>
      </div>

      {loading && (
        <div className="bg-white p-32 rounded-[4rem] border border-stone-100 shadow-sm flex flex-col items-center justify-center space-y-12">
           <div className="w-16 h-16 border-[6px] border-stone-100 border-t-black rounded-full animate-spin"></div>
           <div className="text-center">
             <p className="text-[10px] text-black font-black uppercase tracking-[0.4em] opacity-30">Retrieving High-Resolution Schematic Data...</p>
             <p className="text-[9px] text-black font-bold uppercase tracking-[0.2em] opacity-20 mt-2 italic">Be Topper AI is rendering scientific visual structures</p>
           </div>
        </div>
      )}

      {/* Result Rendering */}
      {tab === 'diagrams' && diagramData && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-slideUp">
           {/* Visual Diagram Image Section */}
           <div className="space-y-10">
              <div className="bg-white p-8 rounded-[3.5rem] border border-stone-100 shadow-2xl relative overflow-hidden group">
                 <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black bg-black text-white px-4 py-1.5 rounded-full uppercase tracking-widest">AI Generated Visual</span>
                    {diagramImageUrl && (
                      <button 
                        onClick={handleDownload}
                        className="p-3 bg-stone-50 hover:bg-black hover:text-white rounded-2xl transition-all shadow-sm flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                      >
                        {DownloadIcon} Save Diagram
                      </button>
                    )}
                 </div>
                 
                 <div className="aspect-square w-full bg-stone-50 rounded-[2.5rem] overflow-hidden border border-stone-100 relative shadow-inner">
                    {diagramImageUrl ? (
                      <img 
                        src={diagramImageUrl} 
                        alt={topic} 
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700" 
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center opacity-20 space-y-4">
                         {AtlasIcon}
                         <p className="text-[10px] font-black uppercase tracking-widest">Image unavailable for this query</p>
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest text-black/40 border border-stone-100">
                      Scientific Schematic 1.0
                    </div>
                 </div>

                 <div className="mt-8 bg-stone-50 border border-dashed border-stone-200 rounded-3xl p-8">
                    <p className="text-[10px] font-black text-black opacity-30 uppercase tracking-widest mb-4">Visual Breakdown & Perspective</p>
                    <p className="text-sm font-bold text-black leading-relaxed">{diagramData.description}</p>
                 </div>
              </div>

              {/* Tips & Checklist */}
              <div className="bg-black text-white p-12 rounded-[3.5rem] shadow-3xl">
                 <h3 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                    Drawing Perfection Protocol
                 </h3>
                 <div className="space-y-8">
                    {diagramData.tips.map((tip: string, idx: number) => (
                      <div key={idx} className="flex gap-6 items-start">
                         <div className="w-1 h-12 bg-white/20 rounded-full flex-shrink-0"></div>
                         <p className="text-base font-bold text-white/80 leading-relaxed italic">{tip}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Labels Section */}
           <div className="space-y-10">
              <div className="bg-white p-12 rounded-[3.5rem] border border-stone-100 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">{DrawIcon}</div>
                <h2 className="text-3xl font-black text-black uppercase tracking-tighter mb-8">{topic} Labels</h2>
                
                <div className="space-y-6">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-black opacity-30 border-b border-stone-50 pb-4">Standard Topper Identification</h3>
                   <div className="grid grid-cols-1 gap-4">
                      {diagramData.labels.map((label: any, idx: number) => (
                        <div key={idx} className="flex gap-4 items-start bg-stone-50 p-5 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-stone-100">
                           <span className="text-[10px] font-black bg-black text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{idx + 1}</span>
                           <div>
                              <p className="text-[11px] font-black uppercase text-black tracking-widest">{label.name}</p>
                              <p className="text-[10px] text-black opacity-40 font-bold mt-1 leading-relaxed">{label.function}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="mt-12 bg-stone-50 p-10 rounded-[3rem] border border-stone-100">
                   <p className="text-[10px] font-black uppercase tracking-widest text-black opacity-30 mb-6">Board Exam Checklist</p>
                   <ul className="space-y-4">
                      {["Used a sharp HB pencil", "Arrow heads are pointing to part", "Labels are on right side", "Title is written in block letters"].map(c => (
                        <li key={c} className="flex items-center gap-4 text-xs font-black uppercase text-black">
                           <div className="w-5 h-5 rounded-md border-2 border-stone-200"></div>
                           {c}
                        </li>
                      ))}
                   </ul>
                </div>
              </div>
           </div>
        </div>
      )}

      {tab === 'activities' && activityContent && !loading && (
        <div className="bg-white p-12 md:p-20 rounded-[4rem] border border-stone-100 shadow-2xl animate-slideUp relative">
           <div className="absolute top-0 right-0 p-12 opacity-5 scale-150">{BeakerIcon}</div>
           <div className="max-w-4xl mx-auto">
              <div className="mb-16 border-b-2 border-stone-50 pb-10">
                 <span className="text-[10px] font-black bg-emerald-500 text-white px-4 py-1.5 rounded-full uppercase tracking-widest">Verified Practical Session</span>
                 <h2 className="text-5xl font-black text-black uppercase tracking-tighter mt-4 leading-none">{topic}</h2>
                 <p className="text-xs font-bold text-black opacity-30 uppercase tracking-[0.4em] mt-4">Standard Activity Documentation • Class {classLevel}</p>
              </div>
              
              <div className="prose prose-stone max-w-none text-black whitespace-pre-wrap font-bold text-lg leading-relaxed space-y-8">
                 {activityContent}
              </div>

              <div className="mt-20 pt-10 border-t border-dashed border-stone-200 flex flex-col items-center opacity-30">
                 <p className="text-[9px] font-black uppercase tracking-[1em]">END OF LABORATORY DOCUMENT</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ScienceHub;
