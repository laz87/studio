export interface Puzzle {
  id: string;
  centerLetter: string;
  outerLetters: string[];
  pangrams: string[];
  answers: string[];
}

export interface Rank {
  name: string;
  threshold: number;
}

export interface GameStats {
  puzzlesPlayed: number;
  totalWordsFound: number;
  longestWord: string;
}
