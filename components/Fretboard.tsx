import React from 'react';
import { Fret } from './Fret';
import { StringLine } from './StringLine';
import { GUITAR_STRINGS, AttemptState, Note } from '../types';
import { getNoteAtFret } from '../utils/music';

interface FretboardProps {
  attempts: Record<number, AttemptState>; // Key is String Index (0-5)
  onFretClick: (stringIndex: number, fretIndex: number, note: Note) => void;
  isPlaying: boolean;
  targetNote: Note | null;
}

export const Fretboard: React.FC<FretboardProps> = ({ 
  attempts, 
  onFretClick, 
  isPlaying, 
  targetNote 
}) => {
  const fretCount = 12; // Standard octave
  const frets = Array.from({ length: fretCount + 1 }, (_, i) => i); // 0 to 12

  // Reverse strings for visual rendering (Top = String 1/High E, Bottom = String 6/Low E)
  // But our data model uses index 0 as High E anyway, so standard map works if CSS flex-col is used.
  // Visual layout: Top of screen is High E (thin), Bottom is Low E (thick).
  
  return (
    <div className="w-full relative select-none">
      {/* Wood Texture Background */}
      <div className="w-full overflow-x-auto fretboard-scroll pb-12 pt-4 bg-[#2c241b] border-y-4 border-[#4a3b2a] shadow-2xl">
        <div className="inline-flex min-w-max px-4">
          
          {frets.map((fretNum) => (
            <Fret 
              key={fretNum} 
              fretNumber={fretNum} 
              isNut={fretNum === 0}
              width={fretNum === 0 ? 'w-16 sm:w-20' : 'w-16 sm:w-24'} // Nut is narrower
            >
              <div className="flex flex-col w-full h-full justify-evenly py-2">
                {GUITAR_STRINGS.map((str, idx) => {
                  const currentNote = getNoteAtFret(str.baseNote, fretNum);
                  
                  // Check if this string has an attempt on *any* fret.
                  // Since we only allow one attempt per string, if attempts[str.id] exists, 
                  // we disable interaction for this string entirely unless it's the specific attempt marker we need to render.
                  const stringAttempt = attempts[str.id];
                  const hasAttemptOnThisString = !!stringAttempt;
                  
                  // Is this specific fret the one that was clicked?
                  const isAttemptedHere = stringAttempt?.fretIndex === fretNum;

                  // Can the user click here?
                  // Yes if playing, target is set, and this string hasn't been attempted yet.
                  const isInteractive = isPlaying && !!targetNote && !hasAttemptOnThisString;

                  return (
                    <StringLine
                      key={`${str.id}-${fretNum}`}
                      stringConfig={str}
                      fretIndex={fretNum}
                      attempt={isAttemptedHere ? stringAttempt : undefined}
                      isActive={isInteractive}
                      noteName={currentNote}
                      showNoteHint={fretNum === 0}
                      onClick={() => {
                        if (isInteractive) {
                          onFretClick(str.id, fretNum, currentNote);
                        }
                      }}
                    />
                  );
                })}
              </div>
            </Fret>
          ))}

        </div>
      </div>
      
      {/* String Labels (Left side overlay for desktop context, optional) */}
      <div className="hidden lg:flex flex-col absolute left-2 top-4 bottom-12 justify-evenly pointer-events-none opacity-20">
        {GUITAR_STRINGS.map(s => <span key={s.id} className="text-white font-mono text-xs">{s.id + 1}</span>)}
      </div>
    </div>
  );
};