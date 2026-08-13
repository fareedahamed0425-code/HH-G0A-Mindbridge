import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HeroStage({ onComplete }) {
  const [isStickerMode, setIsStickerMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsStickerMode(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const landmarkStamps = [
    { src: '/taj_mahal.png', title: 'AGRA', price: '₹5.00', id: 'taj' },
    { src: '/gateway_of_india.png', title: 'MUMBAI', price: '₹10.00', id: 'gateway' },
    { src: '/charminar.png', title: 'HYDERABAD', price: '₹7.50', id: 'charminar' },
    { src: '/hawa_mahal.png', title: 'JAIPUR', price: '₹12.00', id: 'hawa' },
  ];

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/goa_theme_bg.png')" }}
    >

      {/* Ocean Waves Layer */}
      <div className="absolute bottom-0 w-full h-1/3 bg-hhg-yellow border-t-8 border-hhg-black z-0 pointer-events-none">
        <svg className="absolute -top-16 w-full h-20 text-hhg-pink fill-current" viewBox="0 0 1440 48" preserveAspectRatio="none">
          <path d="M0,24 C288,72 576,0 864,24 C1152,48 1440,0 1440,0 L1440,48 L0,48 Z" stroke="#111111" strokeWidth="6"></path>
        </svg>
      </div>

      {/* HIGH-DETAIL LEFT COCONUT PALM TREE */}
      <div className="absolute -left-10 bottom-0 w-80 h-[500px] z-10 pointer-events-none">
        <svg viewBox="0 0 200 350" className="w-full h-full drop-shadow-brutal">
          {/* Curved Trunk */}
          <path d="M70,350 C70,250 140,150 110,60" fill="none" stroke="#111111" strokeWidth="18" strokeLinecap="round" />
          <path d="M70,350 C70,250 140,150 110,60" fill="none" stroke="#F6F0DD" strokeWidth="10" strokeLinecap="round" />
          {/* Trunk Texture Lines */}
          <path d="M80,300 L95,295 M88,260 L103,255 M98,220 L113,215 M106,180 L121,175 M112,140 L125,135" stroke="#111111" strokeWidth="4" />
          
          {/* Coconuts */}
          <circle cx="102" cy="65" r="10" fill="#FFDE00" stroke="#111111" strokeWidth="3" />
          <circle cx="118" cy="68" r="9" fill="#FFDE00" stroke="#111111" strokeWidth="3" />
          <circle cx="110" cy="78" r="10" fill="#FFDE00" stroke="#111111" strokeWidth="3" />

          {/* Palm Fronds / Leaves */}
          <path d="M110,60 C70,30 20,40 0,60 C30,70 70,75 110,60 Z" fill="#0F5234" stroke="#111111" strokeWidth="4" />
          <path d="M110,60 C90,10 40,-10 15,0 C40,25 75,45 110,60 Z" fill="#FF007F" stroke="#111111" strokeWidth="4" />
          <path d="M110,60 C130,10 180,-10 200,10 C175,30 140,48 110,60 Z" fill="#FFDE00" stroke="#111111" strokeWidth="4" />
          <path d="M110,60 C150,30 190,50 200,80 C175,78 140,70 110,60 Z" fill="#0F5234" stroke="#111111" strokeWidth="4" />
          <path d="M110,60 C130,80 160,110 150,140 C130,120 120,95 110,60 Z" fill="#FF007F" stroke="#111111" strokeWidth="4" />
        </svg>
      </div>

      {/* HIGH-DETAIL RIGHT COCONUT PALM TREE */}
      <div className="absolute -right-10 bottom-0 w-80 h-[500px] z-10 pointer-events-none transform -scale-x-100">
        <svg viewBox="0 0 200 350" className="w-full h-full drop-shadow-brutal">
          <path d="M70,350 C70,250 140,150 110,60" fill="none" stroke="#111111" strokeWidth="18" strokeLinecap="round" />
          <path d="M70,350 C70,250 140,150 110,60" fill="none" stroke="#F6F0DD" strokeWidth="10" strokeLinecap="round" />
          <path d="M80,300 L95,295 M88,260 L103,255 M98,220 L113,215 M106,180 L121,175 M112,140 L125,135" stroke="#111111" strokeWidth="4" />
          
          <circle cx="102" cy="65" r="10" fill="#FF007F" stroke="#111111" strokeWidth="3" />
          <circle cx="118" cy="68" r="9" fill="#FF007F" stroke="#111111" strokeWidth="3" />
          <circle cx="110" cy="78" r="10" fill="#FF007F" stroke="#111111" strokeWidth="3" />

          <path d="M110,60 C70,30 20,40 0,60 C30,70 70,75 110,60 Z" fill="#FFDE00" stroke="#111111" strokeWidth="4" />
          <path d="M110,60 C90,10 40,-10 15,0 C40,25 75,45 110,60 Z" fill="#0F5234" stroke="#111111" strokeWidth="4" />
          <path d="M110,60 C130,10 180,-10 200,10 C175,30 140,48 110,60 Z" fill="#FF007F" stroke="#111111" strokeWidth="4" />
          <path d="M110,60 C150,30 190,50 200,80 C175,78 140,70 110,60 Z" fill="#FFDE00" stroke="#111111" strokeWidth="4" />
        </svg>
      </div>

      {/* Floating Stamp Cards Collage */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
        {landmarkStamps.map((stamp, i) => (
          <motion.div
            key={stamp.id}
            className="absolute transition-all duration-1000"
            style={{
              top: `${8 + (i * 18)}%`,
              left: `${6 + (i % 2 === 0 ? 8 : 62)}%`,
              zIndex: 20 + i,
            }}
            initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
            animate={{ 
              opacity: 1, 
              scale: isStickerMode ? 1 : 0.8, 
              rotate: isStickerMode ? (i % 2 === 0 ? -12 : 12) : 0,
              y: isStickerMode ? [0, -15, 0] : 0,
            }}
            transition={{ 
              duration: isStickerMode ? 3.5 : 1, 
              delay: isStickerMode ? 0 : i * 0.15,
              repeat: isStickerMode ? Infinity : 0,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          >
            {/* Postal Stamp Frame Container */}
            <div className="w-[260px] bg-hhg-beige border-4 border-hhg-black shadow-brutal p-3 flex flex-col relative group">
              
              <div className="border-2 border-dashed border-hhg-black p-2 bg-white flex flex-col items-center">
                <div className="w-full flex justify-between items-center font-mono font-bold text-xs text-hhg-black border-b-2 border-hhg-black pb-1 mb-2">
                  <span>HH GOA 2026</span>
                  <span className="bg-hhg-pink text-white px-1">{stamp.price}</span>
                </div>

                <div className="w-full h-44 bg-hhg-pink/10 border-2 border-hhg-black flex items-center justify-center p-1">
                  <img src={stamp.src} alt={stamp.title} className="w-full h-full object-contain filter contrast-125" />
                </div>

                <div className="w-full font-display font-black text-center text-hhg-black text-xl tracking-wider mt-2 border-t-2 border-hhg-black pt-1 uppercase">
                  {stamp.title}
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-hhg-yellow text-hhg-black font-mono font-bold text-[10px] p-2 rounded-full border-2 border-hhg-black transform rotate-12 shadow-brutal-sm">
                GOA POST
              </div>
            </div>

          </motion.div>
        ))}
      </div>

      {/* Main Title & CTA */}
      <motion.div 
        className="relative z-40 flex flex-col items-center justify-center text-center mt-12 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="relative mb-6">
          <h1 className="text-6xl md:text-9xl font-display text-hhg-beige font-black drop-shadow-brutal-lg tracking-tighter uppercase leading-none">
            HACKER<br/>HOUSE
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-hhg-pink text-white font-mono text-5xl md:text-7xl px-8 py-2 border-4 border-hhg-black shadow-brutal transform -rotate-6">
            गोवा
          </div>
        </div>
        
        <p className="font-mono text-hhg-black text-lg md:text-xl font-bold bg-hhg-yellow px-6 py-2 border-4 border-hhg-black mb-8 shadow-brutal transform rotate-1">
          #FrameInGoa Photo Generator
        </p>

        <button
          onClick={onComplete}
          className="brutal-btn bg-hhg-pink text-white text-2xl md:text-3xl px-12 py-6 uppercase hover:bg-hhg-yellow hover:text-hhg-black"
        >
          Build Your Frame 🌴
        </button>
      </motion.div>

    </div>
  );
}
