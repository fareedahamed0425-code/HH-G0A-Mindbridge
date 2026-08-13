import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

export default function ExportEngine({ userData, onBack }) {
  const [sharing, setSharing] = useState(false);
  const shareRef = useRef(null);

  const handleShare = async () => {
    setSharing(true);
    try {
      if (shareRef.current) {
        const canvas = await html2canvas(shareRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#0F5234',
        });
        const image = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = image;
        link.download = `HHGOA26-${userData.name}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error('Error generating image', err);
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-12 gap-8 z-40 relative">
      <p className="font-mono text-hhg-yellow font-bold tracking-widest">&uarr; CLICK TO FLIP &uarr;</p>

      <div className="flex gap-4">
        <button onClick={onBack} className="bg-white text-hhg-black px-6 py-4 font-mono font-bold text-xl border-4 border-hhg-black shadow-brutal hover:bg-gray-200 active:translate-y-1 active:shadow-none transition-all">
          &larr; BACK
        </button>
        <button
          onClick={handleShare}
          disabled={sharing}
          className="bg-hhg-green text-hhg-yellow px-8 py-4 font-mono font-bold text-2xl border-4 border-hhg-black shadow-brutal hover:bg-hhg-black hover:text-hhg-pink active:translate-y-1 active:shadow-none transition-all"
        >
          {sharing ? '[ PROCESSING... ]' : '[ POST TO LINKEDIN // SHARE ]'}
        </button>
      </div>

      {/* Hidden 1200x630 Canvas Composition Container */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <div ref={shareRef} className="w-[1200px] h-[630px] bg-hhg-green relative flex items-center justify-center overflow-hidden border-8 border-hhg-pink p-8">

          {/* Coral Reef Vector Pattern (Abstract) */}
          <svg className="absolute inset-0 w-full h-full text-hhg-pink opacity-20 pointer-events-none" viewBox="0 0 1200 630">
            <path d="M-100,600 Q 100,300 300,500 T 700,400 T 1300,600" fill="none" stroke="currentColor" strokeWidth="40" />
            <path d="M-100,100 Q 200,400 400,200 T 900,300 T 1300,0" fill="none" stroke="currentColor" strokeWidth="20" />
          </svg>

          {/* Banner */}
          <div className="absolute top-0 left-0 w-full bg-hhg-yellow border-b-8 border-hhg-black text-center py-4 z-10">
            <h1 className="text-5xl font-display font-black text-hhg-black tracking-tighter uppercase">
              PARTICIPATING AT HACKER HOUSE GOA
            </h1>
          </div>

          {/* Cards Container Side-by-Side angled at 12 degrees */}
          <div className="flex gap-16 mt-16 z-20">

            {/* Front Card rendering logic duplicated for image capture */}
            <div className="w-[400px] h-[450px] bg-hhg-beige border-8 border-hhg-black shadow-brutal p-6 flex flex-col transform -rotate-12 translate-y-8">
              <h2 className="text-4xl font-display text-hhg-green font-bold leading-none mb-4">
                Hacker House<br />Goa // 2026
              </h2>
              <div className="flex-grow">
                <p className="text-sm font-mono mt-4">NAME: {userData.name}</p>
                <p className="text-sm font-mono mt-2 bg-hhg-yellow inline-block px-2 border-2 border-hhg-black uppercase">{userData.role}</p>
                <p className="text-sm font-mono mt-2">ORG: {userData.organization}</p>
                <p className="text-sm font-mono mt-2">TEAM: {userData.team}</p>
              </div>
              <div className="border-t-4 border-hhg-black pt-4 flex justify-between">
                <div className="w-20 h-20 bg-hhg-black border-4 border-hhg-black relative">
                  {/* Security Requirement: Gaussian blur over QR */}
                  <div className="absolute inset-0 bg-white" style={{ filter: 'blur(8px)' }}>
                    <div className="w-full h-full" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 10 10%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Crect width=%2210%22 height=%2210%22 fill=%22black%22/%3E%3C/svg%3E')", backgroundRepeat: 'repeat' }} />
                  </div>
                  <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs bg-black/50 z-10">SECURE</span>
                </div>
              </div>
            </div>

            {/* Back Card */}
            <div className="w-[400px] h-[450px] bg-hhg-pink text-hhg-beige border-8 border-hhg-black shadow-brutal p-6 flex flex-col transform rotate-12 translate-y-4">
              <div className="border-4 border-hhg-beige border-dashed h-full p-6 flex flex-col justify-center">
                <h3 className="font-bold text-2xl uppercase mb-2">Venue:</h3>
                <p className="text-xl font-mono mb-6">VAGATOR BEACH FRONT, GOA</p>

                <h3 className="font-bold text-2xl uppercase mb-2">Rules:</h3>
                <ul className="font-mono text-xl space-y-2">
                  <li>1. SHIP CODE, NO SLIDES.</li>
                  <li>2. WEAR FLIP-FLOPS ALWAYS.</li>
                </ul>
                <div className="mt-auto font-mono text-4xl font-bold tracking-tighter opacity-80 text-center">
                  |||| || ||| || |||
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
