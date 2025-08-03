'use client';

import { useState, useMemo, useEffect, useCallback, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Shuffle, Delete, Send } from 'lucide-react';
import { getRank } from '@/lib/game-data';
import useLocalStorage from '@/hooks/use-local-storage';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import type { Puzzle, GameStats } from '@/lib/types';
import { checkWord } from '@/app/play/actions';
import HexGrid from './hex-grid';
import { cn } from '@/lib/utils';


export default function GameClient({ puzzle }: { puzzle: Puzzle }) {
  const { centerLetter, outerLetters, pangrams, answers } = puzzle;
  const allLetters = useMemo(() => [centerLetter, ...outerLetters], [centerLetter, outerLetters]);
  
  const [shuffledLetters, setShuffledLetters] = useState(outerLetters);
  const [currentInput, setCurrentInput] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' }>({ text: ' ', type: 'info' });
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const [stats, setStats] = useLocalStorage<GameStats>('game-stats', {
    puzzlesPlayed: 0,
    totalWordsFound: 0,
    longestWord: '',
  });

  useEffect(() => {
    // Increment puzzles played only once when component mounts for a new puzzle
    const playedPuzzles = JSON.parse(localStorage.getItem('played-puzzles') || '[]');
    if (!playedPuzzles.includes(puzzle.id)) {
        setStats(prev => ({...prev, puzzlesPlayed: prev.puzzlesPlayed + 1}));
        localStorage.setItem('played-puzzles', JSON.stringify([...playedPuzzles, puzzle.id]));
    }
  }, [puzzle.id, setStats]);


  const rank = useMemo(() => getRank(score), [score]);
  const maxScore = useMemo(() => answers.reduce((acc, word) => {
    const isPangram = new Set(word.split('')).size === 7;
    if (isPangram) return acc + word.length + 7;
    if (word.length === 4) return acc + 1;
    return acc + word.length;
  }, 0), [answers]);

  const handleShuffle = useCallback(() => {
    setShuffledLetters(prev => [...prev].sort(() => Math.random() - 0.5));
  }, []);

  const handleKeyPress = (letter: string) => {
    if (isPending) return;
    setCurrentInput(prev => prev + letter);
  };

  const handleDelete = () => {
    if (isPending) return;
    setCurrentInput(prev => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (currentInput.length === 0 || isPending) return;

    const upperInput = currentInput.toUpperCase();

    if (foundWords.includes(upperInput)) {
        toast({ title: 'Already found', description: `You've already found the word "${upperInput}".`, variant: 'default' });
        setCurrentInput('');
        return;
    }
    
    startTransition(async () => {
      const result = await checkWord(currentInput, centerLetter, allLetters, pangrams);
      
      if (result.isValid) {
        setFoundWords(prev => [upperInput, ...prev]);
        setScore(prev => prev + result.score);
        toast({ title: result.message, description: `+${result.score} points for "${upperInput}"`, className: "bg-primary border-primary" });
        
        setStats(prev => ({
            ...prev,
            totalWordsFound: prev.totalWordsFound + 1,
            longestWord: upperInput.length > prev.longestWord.length ? upperInput : prev.longestWord
        }));

      } else {
        toast({ title: result.message, description: `The word "${upperInput}" is not valid.`, variant: 'destructive' });
      }
      setCurrentInput('');
    });
  };
  
   useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isPending) return;
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSubmit();
      } else if (event.key === 'Backspace') {
        handleDelete();
      } else if (event.key === ' ') { // For shuffle
        event.preventDefault();
        handleShuffle();
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        const upperKey = event.key.toUpperCase();
        if(allLetters.includes(upperKey)) {
            handleKeyPress(upperKey);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentInput, isPending, allLetters]);

  return (
    <div className="flex h-full flex-col items-center justify-between p-4 mx-auto max-w-sm">
        <div className="w-full text-center space-y-2">
            <div className='flex items-center gap-4'>
                <p className="text-lg font-bold">{rank}</p>
                <Progress value={(score / maxScore) * 100} className="w-full h-3 bg-muted" />
                <p className="text-lg font-bold">{score}</p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm py-2">
                    You have found {foundWords.length} words
                </AccordionTrigger>
                <AccordionContent>
                    <div className="h-24 overflow-y-auto grid grid-cols-3 gap-x-4 gap-y-1 text-left px-2">
                        {foundWords.sort().map(word => (
                            <p key={word} className={cn("capitalize text-muted-foreground", pangrams.includes(word) && "text-primary font-bold")}>{word.toLowerCase()}</p>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
            </Accordion>
        </div>

        <div className="my-4 min-h-[5rem] flex items-center justify-center">
            <p className="text-4xl font-bold tracking-widest min-h-[3rem] text-center">
                {currentInput.split('').map((letter, i) => (
                    <span key={i} className="inline-block animate-in fade-in zoom-in-50">
                        <span className={cn(letter.toUpperCase() === centerLetter.toUpperCase() && "text-primary")}>{letter.toUpperCase()}</span>
                    </span>
                ))}
                <span className="animate-pulse">_</span>
            </p>
        </div>

      <HexGrid
        centerLetter={centerLetter}
        outerLetters={shuffledLetters}
        onKeyPress={handleKeyPress}
      />

      <div className="mt-6 flex w-full justify-center space-x-2">
        <Button onClick={handleShuffle} variant="outline" className="rounded-full h-12 w-24 font-bold" disabled={isPending}>
          <Shuffle className="mr-2 h-5 w-5" /> Shuffle
        </Button>
        <Button onClick={handleDelete} variant="outline" className="rounded-full h-12 w-24 font-bold" disabled={isPending}>
          <Delete className="mr-2 h-5 w-5" /> Delete
        </Button>
        <Button onClick={handleSubmit} className="rounded-full h-12 flex-grow font-bold" disabled={isPending || currentInput.length === 0}>
           {isPending ? 'Checking...' : 'Submit'} <Send className="ml-2 h-5 w-5"/>
        </Button>
      </div>
    </div>
  );
}
