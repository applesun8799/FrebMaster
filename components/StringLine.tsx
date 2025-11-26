import React from 'react';
import { StringConfig, AttemptState } from '../types';

interface StringLineProps {
  stringConfig: StringConfig;
  fretIndex: number;
  attempt?: AttemptState;
  isActive: boolean;
  onClick: () => void;
  showNoteHint: boolean; // For the Nut (0 fret)
  noteName: string;
}

export const StringLine: React.FC<StringLineProps> = ({ 
  stringConfig, 
  fretIndex, 
  attempt, 
  isActive, 
  onClick,
  showNoteHint,
  noteName
}) => {
  
  // Calculate visual height based on gauge
  const heightClass = `h-[${Math.max(1, stringConfig.gauge)}px]`;
  const thicknessStyle = { height: `${stringConfig.gauge}px` };

  let bgClass = "bg-stone-400 group-hover:bg-stone-200 transition-colors duration-300";
  let markerClass = "";

  if (attempt) {
    if (attempt.isCorrect) {
      markerClass = "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] scale-100 opacity-100";
    } else {
      markerClass = "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] scale-100 opacity-100";
    }
  }

  return (
    <div 
      className={`relative flex items-center justify-center w-full py-3 sm:py-4 cursor-pointer group ${!isActive ? 'pointer-events-none' : ''}`}
      onClick={onClick}
    >
      {/* The String Line */}
      <div 
        className={`w-full absolute z-10 shadow-string ${bgClass}`}
        style={thicknessStyle}
      />

      {/* The Interaction/Marker Dot */}
      <div 
        className={`
          z-20 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all duration-300
          ${markerClass ? markerClass : 'scale-0 opacity-0 group-hover:scale-50 group-hover:bg-white/30 group-hover:opacity-100'}
        `}
      >
        {attempt && !attempt.isCorrect && <span className="text-[10px]">{noteName}</span>}
        {attempt && attempt.isCorrect && <span>{noteName}</span>}
      </div>

      {/* Nut Hint (Always visible for Fret 0 if not playing or just for reference) */}
      {showNoteHint && !attempt && (
        <div className="z-20 text-stone-400 font-mono text-xs sm:text-sm font-bold absolute left-2">
            {noteName}
        </div>
      )}
    </div>
  );
};