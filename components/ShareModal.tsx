
import React from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  const shareUrl = "https://be-topper.academy";
  const text = `Hey! I'm using Be Topper to prep for my Board Exams. It has infinite questions and an AI mentor. Check it out: `;

  const shareLinks = [
    { name: 'WhatsApp', url: `https://wa.me/?text=${encodeURIComponent(text + shareUrl)}`, color: 'bg-[#25D366]' },
    { name: 'Twitter', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, color: 'bg-black' },
    { name: 'LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, color: 'bg-[#0077B5]' }
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-[3rem] p-12 shadow-3xl text-black">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-black uppercase tracking-tighter">{title}</h2>
          <button onClick={onClose} className="opacity-20 hover:opacity-100 transition-opacity">✕</button>
        </div>
        
        <p className="text-sm font-bold opacity-40 mb-8 leading-relaxed uppercase tracking-widest">Help your friends top the boards too! Share your progress with the community.</p>
        
        <div className="space-y-4">
          {shareLinks.map(link => (
            <a 
              key={link.name} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${link.color} text-white w-full py-5 rounded-2xl flex items-center justify-center font-black uppercase text-[10px] tracking-[0.3em] shadow-xl hover:scale-[1.02] transition-all`}
            >
              Share on {link.name}
            </a>
          ))}
          <button 
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              alert("Link copied to clipboard!");
            }}
            className="w-full py-5 border-2 border-stone-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-stone-50 transition-all text-black"
          >
            📋 Copy Portal Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
