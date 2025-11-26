import React from 'react';

interface FretProps {
  fretNumber: number;
  isNut?: boolean;
  children?: React.ReactNode;
  width?: string;
}

export const Fret: React.FC<FretProps> = ({ fretNumber, isNut = false, children, width = 'w-16' }) => {
  const isMarker = [3, 5, 7, 9, 12].includes(fretNumber);
  const isDoubleMarker = fretNumber === 12;

  return (
    <div 
      className={`relative flex flex-col justify-between select-none shrink-0 ${width} ${isNut ? 'bg-stone-900 border-r-4 border-stone-600' : 'bg-transparent border-r-2 border-stone-500'}`}
    >
      {/* Fret Number Label (only for non-nut) */}
      {!isNut && (
        <div className="absolute -bottom-8 w-full text-center text-xs text-stone-500 font-mono">
          {fretNumber}
        </div>
      )}

      {/* Fretboard Inlays (Dots) */}
      {!isNut && isMarker && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          {isDoubleMarker ? (
            <div className="flex gap-4">
               <div className="w-3 h-3 rounded-full bg-stone-500/50 shadow-inner"></div>
               <div className="w-3 h-3 rounded-full bg-stone-500/50 shadow-inner"></div>
            </div>
          ) : (
            <div className="w-3 h-3 rounded-full bg-stone-500/50 shadow-inner"></div>
          )}
        </div>
      )}

      {children}
    </div>
  );
};