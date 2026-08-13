import { useState } from 'react';
import { motion } from 'framer-motion';

export default function FlipCard({ userData }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const randomId = "HHG-" + Math.floor(1000 + Math.random() * 9000);

  return (
    <div className="w-[350px] h-[550px] cursor-pointer" style={{ perspective: 1000 }} onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full bg-hhg-beige border-4 border-hhg-black shadow-brutal flex flex-col p-4" style={{ backfaceVisibility: 'hidden' }}>
          <div className="border-4 border-hhg-black border-dashed h-full p-4 flex flex-col relative overflow-hidden">
            {/* Coconut tree motif */}
            <svg className="absolute -right-4 -bottom-4 w-32 h-32 text-hhg-pink opacity-50 drop-shadow-brutal" viewBox="0 0 100 100">
               <path d="M45,100 C45,70 55,40 50,10" stroke="#111111" strokeWidth="4" fill="none"/>
               <path d="M50,10 C30,0 10,20 20,40" fill="currentColor" stroke="#111111" strokeWidth="3"/>
               <path d="M50,10 C70,-10 90,10 80,30" fill="currentColor" stroke="#111111" strokeWidth="3"/>
               <path d="M50,10 C80,30 90,60 60,60" fill="currentColor" stroke="#111111" strokeWidth="3"/>
               <path d="M50,10 C20,30 10,50 30,60" fill="currentColor" stroke="#111111" strokeWidth="3"/>
            </svg>
            
            <h2 className="text-3xl font-display text-hhg-green font-bold leading-none mb-4">
              Hacker House<br/>Goa // 2026
            </h2>
            
            <div className="flex-grow flex flex-col gap-4 relative z-10">
              {/* Retro CRT Monitor Frame */}
              <div className="w-24 h-24 bg-hhg-green border-4 border-hhg-black rounded-lg self-center overflow-hidden flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 pointer-events-none" />
                 {/* Avatar placeholder SVG */}
                 <svg viewBox="0 0 100 100" className="w-full h-full fill-hhg-pink">
                    <circle cx="50" cy="40" r="20" />
                    <path d="M20 100 C20 70 35 65 50 65 C65 65 80 70 80 100" />
                 </svg>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-xs text-hhg-black/60 font-mono">NAME</p>
                  <p className="font-bold text-lg leading-tight uppercase">{userData.name}</p>
                </div>
                <div>
                  <p className="text-xs text-hhg-black/60 font-mono">ROLE</p>
                  <span className="bg-hhg-yellow font-bold text-lg px-2 border-2 border-hhg-black uppercase inline-block">
                    {userData.role}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-hhg-black/60 font-mono">ORG</p>
                  <p className="font-bold uppercase leading-tight">{userData.organization}</p>
                </div>
                <div>
                  <p className="text-xs text-hhg-black/60 font-mono">TEAM</p>
                  <p className="font-bold uppercase leading-tight">{userData.team}</p>
                </div>
                <div>
                  <p className="text-xs text-hhg-black/60 font-mono">ID NO</p>
                  <p className="font-bold font-mono">{randomId}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end mt-4 border-t-4 border-hhg-black pt-2 relative z-10">
              <div className="qr-code-box w-16 h-16 bg-white border-4 border-hhg-black flex items-center justify-center font-bold text-xs p-1 text-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                   <rect x="10" y="10" width="30" height="30" fill="none" stroke="#111" strokeWidth="5"/>
                   <rect x="60" y="10" width="30" height="30" fill="none" stroke="#111" strokeWidth="5"/>
                   <rect x="10" y="60" width="30" height="30" fill="none" stroke="#111" strokeWidth="5"/>
                   <rect x="15" y="15" width="20" height="20" fill="#111"/>
                   <rect x="65" y="15" width="20" height="20" fill="#111"/>
                   <rect x="15" y="65" width="20" height="20" fill="#111"/>
                   <rect x="50" y="50" width="40" height="40" fill="#111"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 w-full h-full bg-hhg-pink border-4 border-hhg-black shadow-brutal flex flex-col p-4 text-hhg-beige" 
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="border-4 border-hhg-beige border-dashed h-full p-4 flex flex-col justify-center">
             <div className="space-y-6">
                <div>
                   <h3 className="font-bold text-xl uppercase mb-1">Venue:</h3>
                   <p className="text-lg leading-tight font-mono">VAGATOR BEACH FRONT, GOA</p>
                </div>
                <div>
                   <h3 className="font-bold text-xl uppercase mb-1">Team:</h3>
                   <p className="text-lg leading-tight font-mono">{userData.team.toUpperCase()}</p>
                </div>
                <div>
                   <h3 className="font-bold text-xl uppercase mb-1">Rules:</h3>
                   <ul className="font-mono text-lg space-y-2">
                     <li>1. SHIP CODE, NO SLIDES.</li>
                     <li>2. WEAR FLIP-FLOPS ALWAYS.</li>
                   </ul>
                </div>
                <div className="pt-8 text-center">
                   <div className="font-mono text-3xl font-bold tracking-tighter scale-y-150 origin-top opacity-80">
                     |||| || ||| || ||| || | ||
                   </div>
                </div>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
