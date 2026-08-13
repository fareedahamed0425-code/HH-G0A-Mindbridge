import { useState } from 'react';
import { motion } from 'framer-motion';

export default function IDCardForm({ onComplete, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Developer',
    organization: '',
    team: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-hhg-green/90 p-4">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-hhg-pink border-4 border-hhg-black shadow-brutal-lg p-6 relative"
      >
        <button onClick={onCancel} className="absolute -top-4 -right-4 bg-hhg-yellow border-4 border-hhg-black shadow-brutal w-10 h-10 flex items-center justify-center font-bold text-xl hover:bg-white active:translate-y-1 active:shadow-sm">
          X
        </button>
        
        <h2 className="text-3xl font-display text-hhg-yellow drop-shadow-brutal mb-6 uppercase">Initialize Protocol</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-hhg-beige font-mono mb-1">NAME</label>
            <input required type="text" name="name" onChange={handleChange} className="brutal-input" placeholder="e.g. Satoshi Nakamoto" />
          </div>
          <div>
            <label className="block text-hhg-beige font-mono mb-1">ROLE</label>
            <select name="role" onChange={handleChange} className="brutal-input">
              <option value="Developer">Developer</option>
              <option value="Organisation">Organisation</option>
              <option value="Startup">Startup</option>
              <option value="Student">Student</option>
            </select>
          </div>
          <div>
            <label className="block text-hhg-beige font-mono mb-1">ORGANISATION</label>
            <input required type="text" name="organization" onChange={handleChange} className="brutal-input" placeholder="e.g. Cyberdyne Systems" />
          </div>
          <div>
            <label className="block text-hhg-beige font-mono mb-1">TEAM NAME</label>
            <input required type="text" name="team" onChange={handleChange} className="brutal-input" placeholder="e.g. Net Surfers" />
          </div>
          
          <button type="submit" className="w-full bg-hhg-yellow text-hhg-black font-mono font-bold text-xl py-3 border-4 border-hhg-black shadow-brutal hover:bg-white active:translate-y-1 active:shadow-none transition-all mt-4">
            MINT ID_CARD.EXE
          </button>
        </form>
      </motion.div>
    </div>
  );
}
