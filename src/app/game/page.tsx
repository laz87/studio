"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Hexagon } from "@/components/game/hexagon";
import { Button } from "@/components/ui/button";
import { RotateCw, Delete } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { kiswahiliWords } from "@/lib/kiswahili-words";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const centerLetter = "A";
const initialOuterLetters = ["M", "C", "E", "K", "B", "H"];
const allGameLetters = [centerLetter, ...initialOuterLetters];

// Ranks and their required score percentages
const ranks = [
  { name: "Mwanzo", threshold: 0 },
  { name: "Mwanzo Mzuri", threshold: 8 },
  { name: "Mbaya si", threshold: 15 },
  { name: "Vizuri", threshold: 25 },
  { name: "Mzuri", threshold: 40 },
  { name: "Hodari", threshold: 50 },
  { name: "Bingwa", threshold: 70 },
  { name: "Bingwa Mkuu", threshold: 100 },
];

const shuffleArray = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function GamePage() {
  const [currentWord, setCurrentWord] = useState("");
  const [outerLetters, setOuterLetters] = useState(initialOuterLetters);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const possibleWords = useMemo(() => {
    return kiswahiliWords.filter(word => {
        const uppercaseWord = word.toUpperCase();
        if (uppercaseWord.length < 4) return false;
        if (!uppercaseWord.includes(centerLetter)) return false;
        for (const letter of uppercaseWord) {
            if (!allGameLetters.includes(letter)) return false;
        }
        return true;
    }).map(word => word.toUpperCase());
  }, []);

  const totalPossiblePoints = useMemo(() => {
      return possibleWords.reduce((sum, word) => sum + word.length, 0);
  }, [possibleWords]);

  const scorePercentage = totalPossiblePoints > 0 ? (score / totalPossiblePoints) * 100 : 0;
  
  const currentRank = useMemo(() => {
      let activeRank = ranks[0];
      for (const rank of ranks) {
          if (scorePercentage >= rank.threshold) {
              activeRank = rank;
          } else {
              break;
          }
      }
      return activeRank;
  }, [scorePercentage]);

  const nextRank = useMemo(() => {
    const currentRankIndex = ranks.findIndex(r => r.name === currentRank.name);
    return ranks[currentRankIndex + 1] || null;
  }, [currentRank.name]);

  const progressToNextRank = useMemo(() => {
    if (!nextRank) return 100;
    const currentThreshold = currentRank.threshold;
    const nextThreshold = nextRank.threshold;
    const range = nextThreshold - currentThreshold;
    const progressInRange = scorePercentage - currentThreshold;
    return (progressInRange / range) * 100;
  }, [scorePercentage, currentRank, nextRank]);

  const handleLetterClick = (letter: string) => {
    setCurrentWord((prev) => prev + letter);
  };

  const handleDelete = () => {
    setCurrentWord((prev) => prev.slice(0, -1));
  };

  const handleShuffle = useCallback(() => {
    setOuterLetters((prev) => shuffleArray(prev));
  }, []);

  const handleSubmit = () => {
    const word = currentWord.toUpperCase();
    
    if (word.length < 4) {
      toast({ variant: "destructive", title: "✗ Neno liwe na herufi 4 au zaidi!" });
      return;
    }
    
    if (!word.includes(centerLetter)) {
      toast({ variant: "destructive", title: `✗ Lazima utumie herufi '${centerLetter}'!` });
      return;
    }
    
    for (const letter of word) {
      if (!allGameLetters.includes(letter)) {
        toast({ variant: "destructive", title: "✗ Tumia herufi zilizopo tu!" });
        return;
      }
    }

    if (foundWords.includes(word)) {
        toast({ variant: "destructive", title: "✗ Tayari umeandika neno hili!" });
        return;
    }

    if (!possibleWords.includes(word)) {
        toast({ variant: "destructive", title: "✗ Neno si sahihi!" });
        return;
    }

    const points = word.length;
    setScore((prev) => prev + points);
    setFoundWords((prev) => [word, ...prev]);
    setCurrentWord("");
    toast({ title: `✓ Vizuri! +${points} alama` });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) return;
      
      const key = event.key.toUpperCase();
      if (key === "BACKSPACE") {
        event.preventDefault();
        handleDelete();
      } else if (key === "ENTER") {
        event.preventDefault();
        handleSubmit();
      } else if (allGameLetters.includes(key) && currentWord.length < 20) {
        event.preventDefault();
        handleLetterClick(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentWord]); 

  return (
    <div className="flex flex-col md:flex-row items-start justify-center min-h-screen bg-background text-foreground p-4 gap-8">
      {/* Game Area */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center order-2 md:order-1">
        <div className="relative w-full text-center mb-4">
            <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-400 text-lg px-4 py-1 mb-2">
                {currentRank.name}
            </Badge>
            <Progress value={progressToNextRank} className="w-full h-2 bg-muted" />
             <div className="flex justify-between w-full mt-1 text-xs text-muted-foreground">
                <span>{currentRank.name}</span>
                {nextRank && <span>{nextRank.name}</span>}
            </div>
        </div>

        <div className="text-center mb-4 h-10 flex items-center justify-center">
          <p className="text-3xl font-bold tracking-wider text-muted-foreground">{currentWord || "Andika neno..."}</p>
        </div>

        <div className="flex flex-col items-center mb-6">
            <div className="flex justify-center" style={{ marginBottom: "-28.87px" }}>
                <Hexagon className="bg-[#e5e5e5] mx-1 cursor-pointer" onClick={() => handleLetterClick(outerLetters[0])}>
                    <span className="text-4xl font-bold text-black">{outerLetters[0]}</span>
                </Hexagon>
                <Hexagon className="bg-[#e5e5e5] mx-1 cursor-pointer" onClick={() => handleLetterClick(outerLetters[1])}>
                    <span className="text-4xl font-bold text-black">{outerLetters[1]}</span>
                </Hexagon>
            </div>
            <div className="flex justify-center items-center" style={{ marginBottom: "-28.87px" }}>
                <Hexagon className="bg-[#e5e5e5] mx-1 cursor-pointer" onClick={() => handleLetterClick(outerLetters[2])}>
                    <span className="text-4xl font-bold text-black">{outerLetters[2]}</span>
                </Hexagon>
                <Hexagon className="bg-[#fbbf24] mx-1 cursor-pointer" onClick={() => handleLetterClick(centerLetter)}>
                    <span className="text-4xl font-bold text-black">{centerLetter}</span>
                </Hexagon>
                <Hexagon className="bg-[#e5e5e5] mx-1 cursor-pointer" onClick={() => handleLetterClick(outerLetters[3])}>
                    <span className="text-4xl font-bold text-black">{outerLetters[3]}</span>
                </Hexagon>
            </div>
            <div className="flex justify-center">
                <Hexagon className="bg-[#e5e5e5] mx-1 cursor-pointer" onClick={() => handleLetterClick(outerLetters[4])}>
                    <span className="text-4xl font-bold text-black">{outerLetters[4]}</span>
                </Hexagon>
                <Hexagon className="bg-[#e5e5e5] mx-1 cursor-pointer" onClick={() => handleLetterClick(outerLetters[5])}>
                    <span className="text-4xl font-bold text-black">{outerLetters[5]}</span>
                </Hexagon>
            </div>
        </div>

        <div className="flex justify-center space-x-2 sm:space-x-4">
          <Button variant="outline" size="lg" onClick={handleDelete}>
            Futa
            <Delete className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" onClick={handleShuffle}>
            <RotateCw className="h-5 w-5" />
          </Button>
          <Button size="lg" onClick={handleSubmit}>
            Wasilisha
          </Button>
        </div>
      </div>

       {/* Sidebar */}
       <div className="w-full md:w-64 lg:w-72 p-4 border rounded-lg bg-muted/30 order-1 md:order-2">
            <h2 className="text-lg font-bold mb-2">Matokeo</h2>
            <div className="grid grid-cols-3 gap-2 text-center mb-4">
                <div>
                    <div className="font-bold text-xl">{foundWords.length}</div>
                    <div className="text-xs text-muted-foreground">Maneno</div>
                </div>
                 <div>
                    <div className="font-bold text-xl">{score}</div>
                    <div className="text-xs text-muted-foreground">Alama</div>
                </div>
                 <div>
                    <div className="font-bold text-xl">{possibleWords.length}</div>
                    <div className="text-xs text-muted-foreground">Zinazowezekana</div>
                </div>
            </div>
            
            <h3 className="font-bold mb-2">Maneno Yaliyopatikana ({foundWords.length})</h3>
            <div className="h-64 md:h-96 overflow-y-auto p-2 border rounded-md bg-background">
                {foundWords.length > 0 ? (
                    <div className="flex flex-col gap-1">
                        {foundWords.map(word => <span key={word} className="text-md capitalize">{word.toLowerCase()}</span>)}
                    </div>
                ) : (
                    <p className="text-muted-foreground italic text-center mt-4">Bado hujapata neno.</p>
                )}
            </div>
        </div>
    </div>
  );
}

    