import React from 'react';
import { Note, NATURAL_NOTES } from '../types';

interface ControlsProps {
  selectedNote: Note | null;
  onSelectNote: (note: Note) => void;
  onStart: () => void;
  isPlaying: boolean;
  progress: number;
  total: number;
  gameStatus: 'idle' | 'playing' | 'won' | 'lost';
}

export const Controls: React.FC<ControlsProps> = ({ 
  selectedNote, 
  onSelectNote, 
  onStart, 
  isPlaying, 
  progress,
  total,
  gameStatus
}) => {
  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto px-4 mb-8">
      
      {/* Progress Bar */}
      <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden relative">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-500 ease-out"
          style={{ width: `${(progress / total) * 100}%` }}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center w-full justify-between bg-stone-900/50 p-6 rounded-2xl border border-stone-800 backdrop-blur-sm">
        
        {/* Note Selector */}
        <div className="flex flex-col gap-3 items-center md:items-start">
          <span className="text-stone-400 text-xs uppercase tracking-widest font-bold">Select Target Note</span>
          <div className="flex flex-wrap justify-center gap-2">
            {NATURAL_NOTES.map((note) => (
              <button
                key={note}
                onClick={() => !isPlaying && onSelectNote(note)}
                disabled={isPlaying}
                className={`
                  w-10 h-10 sm:w-12 sm:h-12 rounded-lg font-bold text-lg transition-all duration-200
                  ${selectedNote === note 
                    ? 'bg-amber-500 text-stone-900 shadow-lg shadow-amber-500/20 scale-110' 
                    : 'bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-stone-200'}
                  ${isPlaying ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {note}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col gap-2 items-center min-w-[150px]">
           <button
            onClick={onStart}
            disabled={!selectedNote || isPlaying}
            className={`
              w-full py-3 px-8 rounded-full font-bold text-lg tracking-wide shadow-lg transition-all transform duration-200
              ${!selectedNote 
                ? 'bg-stone-800 text-stone-600 cursor-not-allowed' 
                : isPlaying 
                  ? 'bg-stone-700 text-stone-500 cursor-not-allowed border border-stone-600'
                  : 'bg-white text-stone-900 hover:bg-stone-200 hover:scale-105 active:scale-95 shadow-white/10'}
            `}
          >
            {isPlaying ? 'PLAYING...' : gameStatus === 'idle' ? 'START' : 'RESTART'}
          </button>
          
          {/* Status Text */}
          <div className="h-6">
            {gameStatus === 'won' && <span className="text-green-400 font-bold text-sm animate-pulse">COMPLETED!</span>}
            {gameStatus === 'playing' && <span className="text-amber-400 text-xs">Find all 6 {selectedNote}s</span>}
          </div>
        </div>

      </div>
    </div>
  );
};