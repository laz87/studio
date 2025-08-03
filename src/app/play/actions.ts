'use server';

import { validateSwahiliWord } from '@/ai/flows/validate-swahili-word';

interface ValidationResult {
  isValid: boolean;
  message: string;
  isPangram: boolean;
  score: number;
}

export async function checkWord(
    word: string,
    centerLetter: string,
    allLetters: string[],
    pangrams: string[]
): Promise<ValidationResult> {
  const upperWord = word.toUpperCase();
  
  if (upperWord.length < 4) {
    return { isValid: false, message: 'Too short', isPangram: false, score: 0 };
  }

  if (!upperWord.includes(centerLetter.toUpperCase())) {
    return { isValid: false, message: `Missing center letter`, isPangram: false, score: 0 };
  }
  
  for (const letter of upperWord) {
    if (!allLetters.map(l => l.toUpperCase()).includes(letter)) {
        return { isValid: false, message: 'Uses invalid letters', isPangram: false, score: 0 };
    }
  }

  try {
    const validationResponse = await validateSwahiliWord({ word: upperWord });
    
    if (validationResponse.isValid) {
      const isPangram = new Set(upperWord.split('')).size === 7;
      let score = 0;
      if (isPangram) {
        score = upperWord.length + 7;
      } else if (upperWord.length === 4) {
        score = 1;
      } else {
        score = upperWord.length;
      }

      return { isValid: true, message: isPangram ? 'Pangram!' : 'Good!', isPangram, score };
    } else {
      return { isValid: false, message: 'Not a valid Swahili word', isPangram: false, score: 0 };
    }
  } catch (error) {
    console.error('Error validating word:', error);
    return { isValid: false, message: 'Error validating word', isPangram: false, score: 0 };
  }
}
