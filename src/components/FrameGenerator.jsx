import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { QRCodeSVG } from 'qrcode.react';

export default function FrameGenerator({ onBack }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [formData, setFormData] = useState({
    name: 'K. YUGAVARDHAN',
    role: 'Developer',
    organization: 'Apollo Univ.',
    teamName: 'AlgoSurfers',
    uniqueId: '#HHG-2026-8092'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const compositeRef = useRef(null);

  const generateNewId = () => {
    const randomCode = '#HHG-2026-' + Math.floor(1000 + Math.random() * 9000);
    setFormData(prev => ({ ...prev, uniqueId: randomCode }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // Base64 data URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!compositeRef.current) return;
    setIsGenerating(true);
    
    try {
      const dataUrl = await toPng(compositeRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `HHGOA26-${formData.name}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export image: " + (err.message || err));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    try {
      const shareUrl = encodeURIComponent('https://hhgoa.com');
      const shareText = encodeURIComponent(
        `Excited to announce I'm attending Hacker House Goa 2026! 🌴⚡\n\nName: ${formData.name}\nRole: ${formData.role}\nUnique ID: ${formData.uniqueId}\n\nCheck out my official badge! #FrameInGoa #HackerHouseGoa`
      );
      
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&text=${shareText}`, '_blank');
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  const qrPayload = `HACKER HOUSE GOA 2026\nName: ${formData.name}\nID: ${formData.uniqueId}\nRole: ${formData.role}\nOrg: ${formData.organization}\nTeam: ${formData.teamName}`;

  const renderCardFront = () => (
    <>
      <div className="w-10 h-10 rounded-full border-4 border-gray-400 bg-gray-300 shadow-inner mx-auto mb-1 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-[#F6F0DD] border-2 border-gray-500" />
      </div>

      <div className="flex justify-between items-start border-b-4 border-hhg-green pb-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-hhg-green tracking-tight uppercase leading-none">
            HACKER HOUSE GOA
          </h1>
          <p className="font-mono text-xs sm:text-sm font-bold text-hhg-black mt-1">
            // 28-31 OCT 2026
          </p>
        </div>
        <div className="bg-hhg-pink text-white font-mono font-bold text-lg px-2 py-0.5 sm:text-xl sm:px-3 sm:py-1 border-2 border-hhg-black shadow-brutal-sm transform -rotate-3">
          गोवा
        </div>
      </div>

      <div className="flex gap-5 my-2 flex-grow items-center z-10">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] bg-gray-200 border-4 border-gray-400 shadow-brutal-sm p-1 rounded flex items-center justify-center overflow-hidden">
            {photo ? (
              <img src={photo} alt="Attendee" className="w-full h-full object-cover filter contrast-105 saturate-105" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-white font-mono text-[10px] text-center p-2">
                <span>UPLOAD</span>
                <span>PHOTO</span>
              </div>
            )}
          </div>

          <div className="w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] bg-white border-4 border-gray-400 shadow-brutal-sm p-1 sm:p-2 rounded flex items-center justify-center">
            <QRCodeSVG 
              value={qrPayload} 
              style={{ width: '100%', height: '100%' }}
              bgColor="#ffffff"
              fgColor="#111111"
              level="M"
            />
          </div>
        </div>

        <div className="flex-1 space-y-2 sm:space-y-3 font-mono text-xs sm:text-sm border-l-2 sm:border-l-4 border-hhg-green/30 pl-3 sm:pl-4 py-1">
          <div>
            <span className="text-gray-600 font-bold block text-[9px] sm:text-[11px] uppercase">Name:</span>
            <span className="font-bold text-hhg-black text-base sm:text-lg block leading-tight">{formData.name}</span>
          </div>
          <div className="border-t-2 border-gray-300 pt-1.5">
            <span className="text-gray-600 font-bold block text-[9px] sm:text-[11px] uppercase">Role:</span>
            <span className="font-bold text-hhg-pink text-sm sm:text-base block">{formData.role}</span>
          </div>
          <div className="border-t-2 border-gray-300 pt-1.5">
            <span className="text-gray-600 font-bold block text-[9px] sm:text-[11px] uppercase">Organisation:</span>
            <span className="font-bold text-hhg-black block">{formData.organization}</span>
          </div>
          <div className="border-t-2 border-gray-300 pt-1.5">
            <span className="text-gray-600 font-bold block text-[9px] sm:text-[11px] uppercase">Team Name:</span>
            <span className="font-bold text-hhg-black block">{formData.teamName}</span>
          </div>
          <div className="border-t-2 border-gray-300 pt-1.5 relative">
            <span className="text-gray-600 font-bold block text-[9px] sm:text-[11px] uppercase">Unique ID:</span>
            <span className="font-bold text-hhg-black block">{formData.uniqueId}</span>

            <div className="absolute -right-2 -bottom-2 border-4 border-emerald-700 text-emerald-800 font-mono font-black text-xs px-2 py-0.5 transform -rotate-12 rounded opacity-90 tracking-wider bg-emerald-100/80 shadow-brutal-sm">
              APPROVED
            </div>
          </div>
        </div>
      </div>

      <div className="w-full pt-1 border-t-4 border-hhg-green overflow-hidden rounded-b-xl relative z-10">
        <div className="w-full h-14 sm:h-20 relative overflow-hidden border-b-2 border-hhg-black rounded-b-xl">
          <img src="/goa_beach_shack.jpg" alt="Goa Beach Shack" className="absolute bottom-0 w-full h-[140px] sm:h-[200px] object-cover object-bottom" />
        </div>
      </div>

      <div className="text-center font-mono font-black text-sm sm:text-base text-hhg-black tracking-widest uppercase mt-1 z-10">
        HHGOA.COM
      </div>
    </>
  );

  const renderCardBack = () => (
    <>
      <div className="w-10 h-10 rounded-full border-4 border-gray-400 bg-gray-300 shadow-inner mx-auto mb-1 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-[#F6F0DD] border-2 border-gray-500" />
      </div>

      <div className="border-4 border-hhg-green border-dashed h-full p-6 flex flex-col justify-between bg-white/80 rounded-2xl relative overflow-hidden">
        <img src="/hackers_desk.jpg" alt="Watermark" className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none" />

        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-hhg-green border-b-4 border-hhg-green pb-2 mb-4 sm:mb-6 uppercase">
            BUILDER ACCESS CREED
          </h2>
          
          <div className="space-y-3 sm:space-y-4 font-mono text-[10px] sm:text-xs font-bold text-hhg-black">
            <div>
              <p className="text-hhg-pink uppercase text-[9px] sm:text-[10px]">EVENT DATES:</p>
              <p className="text-sm sm:text-base font-black">28 - 31 OCTOBER 2026</p>
            </div>
            <div>
              <p className="text-hhg-pink uppercase text-[9px] sm:text-[10px]">VENUE LOCATION:</p>
              <p className="text-sm sm:text-base font-black">VAGATOR BEACH FRONT, GOA</p>
            </div>
            <div>
              <p className="text-hhg-pink uppercase text-[9px] sm:text-[10px]">BUILDER RULES:</p>
              <ul className="list-disc list-inside space-y-0.5 sm:space-y-1 mt-1">
                <li>1. SHIP CODE, NO SLIDES.</li>
                <li>2. WEAR FLIP-FLOPS TO ALL SESSIONS.</li>
                <li>3. RESPECT GOA PALMS & BEACH NATURE.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center font-mono font-bold text-[10px] sm:text-xs pt-4 border-t-2 border-hhg-green relative z-10">
          <p className="font-mono text-xl sm:text-2xl font-black tracking-tighter opacity-80 mb-2">
            |||| || ||| || ||| || ||
          </p>
          <p className="text-hhg-green font-black">OFFICIAL PARTICIPANT PASS // HHGOA.COM</p>
        </div>
      </div>
    </>
  );

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center py-10 px-4 relative z-20 bg-cover bg-center"
      style={{ backgroundImage: "url('/signpost_beach.jpg')" }}
    >
      <div className="absolute inset-0 bg-hhg-green/85 pointer-events-none z-0" />

      <button onClick={onBack} className="absolute top-6 left-6 brutal-btn bg-white text-hhg-black text-sm px-4 py-2 z-30">
        &larr; BACK
      </button>

      {/* Hidden Composite View for Exporting Both Sides */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <div 
          ref={compositeRef}
          className="flex gap-8 p-12 bg-hhg-green items-center justify-center w-max h-max border-8 border-hhg-pink"
        >
          <div className="w-[460px] h-[680px] bg-[#F6F0DD] p-7 flex flex-col justify-between border-4 border-hhg-black rounded-3xl relative text-hhg-black overflow-hidden shadow-none">
            {renderCardFront()}
          </div>
          <div className="w-[460px] h-[680px] bg-[#F6F0DD] p-7 flex flex-col justify-between border-4 border-hhg-black rounded-3xl text-hhg-black relative overflow-hidden shadow-none">
            {renderCardBack()}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl items-center lg:items-start justify-center relative z-20">
        
        {/* Controls Panel */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-full lg:w-1/3 bg-hhg-pink border-4 border-hhg-black shadow-brutal-lg p-6 flex flex-col gap-4 z-30"
        >
          <h2 className="text-3xl font-display font-black text-hhg-yellow uppercase">Lanyard ID Studio</h2>
          
          <div className="space-y-3">
            <div>
              <label className="block text-hhg-black font-mono font-bold text-xs mb-1">NAME</label>
              <input type="text" className="brutal-input text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-hhg-black font-mono font-bold text-xs mb-1">ROLE</label>
              <input type="text" className="brutal-input text-sm" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
            </div>
            <div>
              <label className="block text-hhg-black font-mono font-bold text-xs mb-1">ORGANISATION</label>
              <input type="text" className="brutal-input text-sm" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} />
            </div>
            <div>
              <label className="block text-hhg-black font-mono font-bold text-xs mb-1">TEAM NAME</label>
              <input type="text" className="brutal-input text-sm" value={formData.teamName} onChange={e => setFormData({...formData, teamName: e.target.value})} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-hhg-black font-mono font-bold text-xs">UNIQUE ID</label>
                <button onClick={generateNewId} className="text-[10px] font-mono text-hhg-yellow underline font-bold">
                  🎲 RANDOMIZE
                </button>
              </div>
              <input type="text" className="brutal-input text-sm" value={formData.uniqueId} onChange={e => setFormData({...formData, uniqueId: e.target.value})} />
            </div>
            
            <div>
              <label className="block text-hhg-black font-mono font-bold text-xs mb-1 mt-2">UPLOAD YOUR PHOTO</label>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="brutal-input p-1 cursor-pointer bg-hhg-yellow text-xs" />
            </div>
          </div>

          {/* Flip Hint */}
          <button 
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full bg-white text-hhg-black font-mono font-bold text-sm py-2 border-2 border-hhg-black shadow-brutal-sm hover:bg-gray-100"
          >
            🔄 FLIP CARD ({isFlipped ? 'BACK SIDE' : 'FRONT SIDE'})
          </button>

          <button 
            onClick={handleDownload}
            disabled={isGenerating}
            className="brutal-btn bg-hhg-green text-white text-lg py-4 mt-1"
          >
            {isGenerating ? '[ DOWNLOADING... ]' : '[ 💾 DOWNLOAD BADGE ]'}
          </button>

          <button 
            onClick={handleShare}
            className="brutal-btn bg-hhg-yellow text-hhg-black text-lg py-4 mt-1"
          >
            [ 🚀 SHARE TO LINKEDIN ]
          </button>
        </motion.div>

        {/* Live Card Render Stage */}
        <div className="w-full lg:w-2/3 flex flex-col items-center justify-center">
          
          <p className="font-mono text-hhg-yellow text-xs font-bold tracking-widest mb-3 uppercase animate-pulse">
            👆 CLICK CARD TO FLIP (FRONT / BACK)
          </p>

          <div 
            className="cursor-pointer"
            style={{ perspective: 1000 }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div
              className="relative flex flex-col items-center"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              
              {/* Lanyard Strap & Clip */}
              <div className="relative z-30 flex flex-col items-center -mb-4">
                <div className="w-10 h-16 bg-[#D8CEB8] border-2 border-[#A89E88] shadow-sm flex flex-col items-center justify-center">
                  <div className="w-full h-1 bg-[#C0B49C] my-1" />
                  <div className="w-full h-1 bg-[#C0B49C] my-1" />
                </div>
                <div className="w-5 h-7 rounded-t-full border-4 border-gray-400 bg-gray-200 -mt-2 shadow-md flex items-center justify-center">
                  <div className="w-2 h-3 border-t-2 border-gray-600" />
                </div>
              </div>

              {/* FRONT SIDE */}
              <div 
                ref={frontRef}
                className="w-[360px] h-[530px] sm:w-[460px] sm:h-[680px] bg-[#F6F0DD] p-5 sm:p-7 flex flex-col justify-between border-4 border-hhg-black rounded-3xl relative text-hhg-black shadow-2xl overflow-hidden"
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              >
                {renderCardFront()}
              </div>

              {/* BACK SIDE */}
              <div 
                ref={backRef}
                className="w-[360px] h-[530px] sm:w-[460px] sm:h-[680px] bg-[#F6F0DD] p-5 sm:p-7 flex flex-col justify-between border-4 border-hhg-black rounded-3xl text-hhg-black absolute inset-0 shadow-2xl overflow-hidden"
                style={{ 
                  backfaceVisibility: 'hidden', 
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)' 
                }}
              >
                {renderCardBack()}
              </div>

            </motion.div>
          </div>

        </div>

      </div>

    </div>
  );
}
