import { CHROMATIC_SCALE, Note } from '../types';

export const getNoteAtFret = (baseNote: Note, fret: number): Note => {
  const baseIndex = CHROMATIC_SCALE.indexOf(baseNote);
  const noteIndex = (baseIndex + fret) % 12;
  return CHROMATIC_SCALE[noteIndex];
};

export const isSameNote = (note1: Note, note2: string): boolean => {
    return note1 === note2;
}