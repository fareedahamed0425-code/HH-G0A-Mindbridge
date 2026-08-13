import { useState, useEffect } from 'react';
import './Landing.css';

const Landing = ({ onStart }) => {
  const [stage, setStage] = useState('archway'); // archway -> beach

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('beach');
    }, 2500); // Pan through the archway for 2.5s
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing-container">
      {stage === 'archway' && (
        <div className="archway-scene">
          <div className="arch">
            {/* Simple CSS representation of Viceroy's Arch */}
            <div className="arch-top"></div>
            <div className="arch-left"></div>
            <div className="arch-right"></div>
            <div className="arch-inner"></div>
          </div>
          <h2 className="welcome-text">WELCOME TO HHGOA</h2>
        </div>
      )}

      {stage === 'beach' && (
        <div className="beach-scene fade-in">
          <div className="sun"></div>
          <div className="sea"></div>
          <div className="sand"></div>
          
          <div className="content">
            <h1 className="title">
              HACKER <span className="hindi">गोवा</span> HOUSE
            </h1>
            <p className="subtitle">GOA, INDIA &bull; 28 - 31 OCT 2026</p>
            
            <button className="get-id-btn brutal-box float" onClick={onStart}>
              [ GET YOUR ID CARD 🎟️ ]
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
