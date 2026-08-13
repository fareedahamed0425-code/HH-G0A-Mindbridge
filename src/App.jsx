import { useState } from 'react';
import HeroStage from './components/HeroStage';
import FrameGenerator from './components/FrameGenerator';
import './index.css';

export default function App() {
  const [stage, setStage] = useState('hero'); // 'hero' | 'generator'

  return (
    <main className="w-screen min-h-screen bg-hhg-green flex items-center justify-center relative overflow-hidden">
      {stage === 'hero' && (
        <HeroStage onComplete={() => setStage('generator')} />
      )}

      {stage === 'generator' && (
        <FrameGenerator onBack={() => setStage('hero')} />
      )}
    </main>
  );
}
