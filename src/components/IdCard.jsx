import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Share2, ArrowLeft } from 'lucide-react';
import './IdCard.css';

const IdCard = ({ userData, onBack }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const shareRef = useRef(null);
  const [sharing, setSharing] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleShare = async () => {
    setSharing(true);
    try {
      if (shareRef.current) {
        const canvas = await html2canvas(shareRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#0a5f38',
        });
        const image = canvas.toDataURL('image/png');
        
        // Trigger download for sharing
        const link = document.createElement('a');
        link.href = image;
        link.download = 'HHGoa_ID_Card.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // In a real app with Web Share API
        if (navigator.share) {
          try {
            const blob = await (await fetch(image)).blob();
            const file = new File([blob], 'id_card.png', { type: 'image/png' });
            await navigator.share({
              title: 'My HHGoa 2026 ID Card',
              text: 'Participating in Hacker House Goa 2026! 🌴💻',
              files: [file]
            });
          } catch (e) {
            console.log("Web Share failed, fallback to download.");
          }
        } else {
            alert('Image downloaded! You can now post it on LinkedIn.');
        }
      }
    } catch (err) {
      console.error('Error generating image', err);
    } finally {
      setSharing(false);
    }
  };

  const randomId = "HHG-" + Math.floor(1000 + Math.random() * 9000);

  return (
    <div className="card-container">
      <button className="back-btn brutal-box" onClick={onBack}>
        <ArrowLeft size={24} /> BACK
      </button>

      {/* The Interactive 3D Card */}
      <div className={`scene ${isFlipped ? 'is-flipped' : ''}`} onClick={handleFlip}>
        <div className="card">
          {/* FRONT OF CARD */}
          <div className="card-face card-front">
            <div className="card-border">
              <div className="header">
                <h2>Hacker House Goa // 2026 <span className="hindi">गोवा</span></h2>
              </div>
              <div className="body">
                <div className="avatar-placeholder">
                  {/* Generic Avatar SVG */}
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="40" r="20" fill="#ff007f"/>
                    <path d="M20 90C20 70 35 65 50 65C65 65 80 70 80 90" fill="#ff007f"/>
                  </svg>
                </div>
                <div className="details">
                  <div className="field">
                    <label>NAME:</label>
                    <p>{userData.name.toUpperCase()}</p>
                  </div>
                  <div className="field">
                    <label>ROLE:</label>
                    <p className="highlight">{userData.role.toUpperCase()}</p>
                  </div>
                  <div className="field">
                    <label>ORGANIZATION:</label>
                    <p>{userData.organization.toUpperCase()}</p>
                  </div>
                  <div className="field">
                    <label>TEAM NAME:</label>
                    <p>{userData.team.toUpperCase()}</p>
                  </div>
                  <div className="field">
                    <label>ID NO:</label>
                    <p>{randomId}</p>
                  </div>
                </div>
              </div>
              <div className="footer">
                <div className="qr-code">QR</div>
                <div className="barcode">|| | ||| | |||</div>
              </div>
            </div>
          </div>

          {/* BACK OF CARD */}
          <div className="card-face card-back">
            <div className="card-border">
              <div className="back-details">
                <p><strong>VENUE:</strong><br/>VAGATOR BEACH FRONT, GOA</p>
                <p><strong>TEAM:</strong><br/>{userData.team.toUpperCase()}</p>
                <p><strong>RULES:</strong><br/>1. SHIP CODE, NO SLIDES.<br/>2. WEAR FLIP-FLOPS ALWAYS.</p>
                <div className="large-barcode">|||| | |||| || ||| | ||</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="flip-hint">&uarr; CLICK TO FLIP &uarr;</p>

      <button className="share-btn brutal-box" onClick={handleShare} disabled={sharing}>
        <Share2 size={24} /> {sharing ? 'GENERATING...' : 'LINKEDIN SHARE [POST PREVIEW]'}
      </button>

      {/* Hidden Shareable Container for html2canvas */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <div ref={shareRef} className="shareable-preview">
          <div className="shareable-border">
             <div className="shareable-front">
                <h2>Hacker House Goa // 2026</h2>
                <div className="details">
                  <p>NAME: {userData.name.toUpperCase()}</p>
                  <p className="highlight">ROLE: {userData.role.toUpperCase()}</p>
                  <p>ORG: {userData.organization.toUpperCase()}</p>
                  <p>TEAM: {userData.team.toUpperCase()}</p>
                </div>
                <div className="qr-code blurred">QR (BLURRED)</div>
             </div>
             <div className="shareable-back">
                <p><strong>VENUE:</strong> VAGATOR BEACH FRONT, GOA</p>
                <p><strong>TEAM:</strong> {userData.team.toUpperCase()}</p>
                <p><strong>RULES:</strong><br/>1. SHIP CODE, NO SLIDES.<br/>2. WEAR FLIP-FLOPS ALWAYS.</p>
             </div>
             <div className="shareable-banner">
                PARTICIPATING AT HACKER HOUSE GOA // SHIPPING AT VAGATOR! 🌴
             </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default IdCard;
