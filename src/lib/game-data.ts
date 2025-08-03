import type { Puzzle, Rank } from './types';

export const puzzles: Puzzle[] = [
  {
    id: 'puzzle1',
    centerLetter: 'A',
    outerLetters: ['B', 'I', 'K', 'L', 'N', 'U'],
    pangrams: ['KABULINI'],
    answers: [
      'BABA', 'BANA', 'BANKA', 'BILA', 'BINA', 'BUKA', 'BULA', 'BUNI',
      'IKABU', 'KABA', 'KABILA', 'KABUNI', 'KALI', 'KANI', 'KANUNI', 'KILA',
      'KINA', 'KUBA', 'KULA', 'KULIA', 'KUNA', 'LABA', 'LABU', 'LAKI',
      'LIKA', 'LILA', 'LULU', 'NAIBU', 'NAKU', 'NUNA', 'NUNUA', 'UKALI',
      'UKILA', 'UKUNI', 'ULAINI', 'ULILI', 'UNABII'
    ],
  },
];

export const ranks: Rank[] = [
  { name: 'Beginner', threshold: 0 },
  { name: 'Good Start', threshold: 5 },
  { name: 'Moving Up', threshold: 10 },
  { name: 'Good', threshold: 25 },
  { name: 'Solid', threshold: 40 },
  { name: 'Nice', threshold: 50 },
  { name: 'Great', threshold: 70 },
  { name: 'Amazing', threshold: 90 },
  { name: 'Genius', threshold: 120 },
];

export function getRank(score: number): string {
    let currentRank = ranks[0].name;
    for (const rank of ranks) {
        if (score >= rank.threshold) {
            currentRank = rank.name;
        } else {
            break;
        }
    }
    return currentRank;
}
