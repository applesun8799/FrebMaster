export type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';

export interface StringConfig {
  id: number; // 0 (High E) to 5 (Low E)
  baseNote: Note;
  gauge: number; // For visual thickness
}

export interface AttemptState {
  stringIndex: number;
  fretIndex: number;
  isCorrect: boolean;
  actualNote: string;
}

export const NATURAL_NOTES: Note[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

// Standard Tuning: High E (1) to Low E (6)
// Array index 0 is Top string (High E)
// Array index 5 is Bottom string (Low E)
export const GUITAR_STRINGS: StringConfig[] = [
  { id: 0, baseNote: 'E', gauge: 1 },
  { id: 1, baseNote: 'B', gauge: 1.5 },
  { id: 2, baseNote: 'G', gauge: 2 },
  { id: 3, baseNote: 'D', gauge: 3 },
  { id: 4, baseNote: 'A', gauge: 4 },
  { id: 5, baseNote: 'E', gauge: 5 },
];

export const CHROMATIC_SCALE: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const MARKER_FRETS = [3, 5, 7, 9, 12];