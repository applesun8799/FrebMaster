import React, { useState, useEffect } from 'react';
import { Fretboard } from './components/Fretboard';
import { Controls } from './components/Controls';
import { Note, AttemptState } from './types';

const TOTAL_STRINGS = 6;

function App() {
  const [targetNote, setTargetNote] = useState<Note | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // Map of StringIndex -> Attempt
  const [attempts, setAttempts] = useState<Record<number, AttemptState>>({});
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');

  const correctCount = Object.values(attempts).filter((a: AttemptState) => a.isCorrect).length;

  const handleStart = () => {
    if (!targetNote) return;
    setAttempts({});
    setIsPlaying(true);
    setGameStatus('playing');
  };

  const handleFretClick = (stringIndex: number, fretIndex: number, clickedNote: Note) => {
    if (!isPlaying || !targetNote) return;

    // Check correctness
    const isCorrect = clickedNote === targetNote;

    const newAttempt: AttemptState = {
      stringIndex,
      fretIndex,
      isCorrect,
      actualNote: clickedNote
    };

    setAttempts(prev => {
      const next = { ...prev, [stringIndex]: newAttempt };
      
      // Check Win Condition
      const totalAttempts = Object.keys(next).length;
      if (totalAttempts === TOTAL_STRINGS) {
        setIsPlaying(false);
        // Need 6 correct to win strictly, or just finish round?
        // Let's say round finishes.
        const allCorrect = Object.values(next).every((a: AttemptState) => a.isCorrect);
        setGameStatus(allCorrect ? 'won' : 'idle'); // 'idle' allows restart, 'won' shows celebration
      }
      
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-0 sm:px-4 bg-[#1c1917] font-sans selection:bg-amber-500/30">
      
      {/* Header */}
      <header className="mb-8 text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-stone-100 to-stone-500 tracking-tight mb-2">
          FretMaster
        </h1>
        <p className="text-stone-400 text-sm max-w-md mx-auto leading-relaxed">
          Master the fingerboard. Select a note, press Start, and find it on every string.
        </p>
      </header>

      {/* Controls */}
      <Controls 
        selectedNote={targetNote}
        onSelectNote={setTargetNote}
        onStart={handleStart}
        isPlaying={isPlaying}
        progress={correctCount}
        total={TOTAL_STRINGS}
        gameStatus={gameStatus}
      />

      {/* Main Fretboard Area */}
      <main className="w-full max-w-[1400px]">
        <Fretboard 
          attempts={attempts}
          onFretClick={handleFretClick}
          isPlaying={isPlaying}
          targetNote={targetNote}
        />
        
        <div className="mt-6 text-center text-stone-600 text-xs font-mono">
          create by S7362
        </div>
      </main>

    </div>
  );
}

export default App;