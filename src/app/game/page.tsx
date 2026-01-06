"use client";

import { useState, useEffect, useCallback } from "react";
import { Hexagon } from "@/components/game/hexagon";
import { Button } from "@/components/ui/button";
import { RotateCw, Delete } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { kiswahiliWords } from "@/lib/kiswahili-words";

const centerLetter = "A";
const initialOuterLetters = ["M", "C", "E", "K", "B", "H"];
const allGameLetters = [centerLetter, ...initialOuterLetters];

// Function to shuffle an array
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
    
    // 1. Length check
    if (word.length < 4) {
      toast({ variant: "destructive", title: "✗ Neno liwe na herufi 4 au zaidi!" });
      return;
    }
    
    // 2. Center letter check
    if (!word.includes(centerLetter)) {
      toast({ variant: "destructive", title: `✗ Lazima utumie herufi '${centerLetter}'!` });
      return;
    }
    
    // 3. Invalid letters check
    for (const letter of word) {
      if (!allGameLetters.includes(letter)) {
        toast({ variant: "destructive", title: "✗ Tumia herufi zilizopo tu!" });
        return;
      }
    }

    // 4. Already found check
    if (foundWords.includes(word)) {
        toast({ variant: "destructive", title: "✗ Tayari umeandika neno hili!" });
        return;
    }

    // 5. Word list check
    if (!kiswahiliWords.includes(word.toLowerCase())) {
        toast({ variant: "destructive", title: "✗ Neno si sahihi!" });
        return;
    }

    // Success!
    const points = word.length;
    setScore((prev) => prev + points);
    setFoundWords((prev) => [...prev, word]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allGameLetters, currentWord]); 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="w-full max-w-md mx-auto text-center">
        
        <div className="mb-4">
            <h2 className="text-xl font-bold">Umejumlisha: {score}</h2>
            <div className="h-24 overflow-y-auto p-2 border rounded-md mt-2 bg-muted/50">
                {foundWords.length > 0 ? (
                    <div className="flex flex-wrap gap-2 justify-center">
                        {foundWords.map(word => <span key={word} className="bg-background px-2 py-1 rounded-md text-sm">{word}</span>)}
                    </div>
                ) : (
                    <p className="text-muted-foreground italic mt-6">Maneno yaliyopatikana yataonekana hapa.</p>
                )}
            </div>
        </div>

        <div className="text-center mb-4 h-10">
          <p className="text-3xl font-bold tracking-wider">{currentWord || "..."}</p>
        </div>

        <div className="flex flex-col items-center mb-6">
            <div className="flex justify-center" style={{ marginBottom: "-28.87px" }}>
                <Hexagon className="bg-[#e5e5e5] mx-1 cursor-pointer" onClick={() => handleLetterClick(outerLetters[0])}>
                    <span className="text-4xl font-bold">{outerLetters[0]}</span>
                </Hexagon>
                <Hexagon className="bg-[#e5e5e5] mx-1 cursor-pointer" onClick={() => handleLetterClick(outerLetters[1])}>
                    <span className="text-4xl font-bold">{outerLetters[1]}</span>
                </Hexagon>
            </div>
            <div className="flex justify-center items-center" style={{ marginBottom: "-28.87px" }}>
                <Hexagon className="bg-[#e5e5e5] mx-1 cursor-pointer" onClick={() => handleLetterClick(outerLetters[2])}>
                    <span className="text-4xl font-bold">{outerLetters[2]}</span>
                </Hexagon>
                <Hexagon className="bg-[#fbbf24] mx-1 cursor-pointer" onClick={() => handleLetterClick(centerLetter)}>
                    <span className="text-4xl font-bold">{centerLetter}</span>
                </Hexagon>
                <Hexagon className="bg-[#e5e5e5] mx-1 cursor-pointer" onClick={() => handleLetterClick(outerLetters[3])}>
                    <span className="text-4xl font-bold">{outerLetters[3]}</span>
                </Hexagon>
            </div>
            <div className="flex justify-center">
                <Hexagon className="bg-[#e5e5e5] mx-1 cursor-pointer" onClick={() => handleLetterClick(outerLetters[4])}>
                    <span className="text-4xl font-bold">{outerLetters[4]}</span>
                </Hexagon>
                <Hexagon className="bg-[#e5e5e5] mx-1 cursor-pointer" onClick={() => handleLetterClick(outerLetters[5])}>
                    <span className="text-4xl font-bold">{outerLetters[5]}</span>
                </Hexagon>
            </div>
        </div>

        <div className="flex justify-center space-x-4">
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
    </div>
  );
}
