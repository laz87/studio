"use client";

import { useState, useEffect, useCallback } from "react";
import { Hexagon } from "@/components/game/hexagon";
import { Button } from "@/components/ui/button";
import { RotateCw, Delete } from "lucide-react";

const centerLetter = "A";
const initialOuterLetters = ["M", "C", "E", "K", "B", "H"];

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
  const allLetters = [centerLetter, ...outerLetters];

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
    if (currentWord.length > 0) {
      alert(`Neno lililowasilishwa: ${currentWord}`);
      // We can add word validation and scoring logic here later
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (key === "BACKSPACE") {
        handleDelete();
      } else if (key === "ENTER") {
        handleSubmit();
      } else if (allLetters.includes(key)) {
        handleLetterClick(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allLetters]); // Dependency array ensures the handler has the latest letters

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-4 h-10">
          <p className="text-3xl font-bold tracking-wider">{currentWord || "..."}</p>
        </div>

        {/* Honeycomb Grid */}
        <div className="flex flex-col items-center mb-6">
            {/* Top Row */}
            <div className="flex justify-center" style={{ marginBottom: "-28.87px" }}>
                <Hexagon className="bg-[#e5e5e5] mx-1 cursor-pointer" onClick={() => handleLetterClick(outerLetters[0])}>
                    <span className="text-4xl font-bold">{outerLetters[0]}</span>
                </Hexagon>
                <Hexagon className="bg-[#e5e5e5] mx-1 cursor-pointer" onClick={() => handleLetterClick(outerLetters[1])}>
                    <span className="text-4xl font-bold">{outerLetters[1]}</span>
                </Hexagon>
            </div>
            {/* Middle Row */}
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
            {/* Bottom Row */}
            <div className="flex justify-center">
                <Hexagon className="bg-[#e5e5e5] mx-1 cursor-pointer" onClick={() => handleLetterClick(outerLetters[4])}>
                    <span className="text-4xl font-bold">{outerLetters[4]}</span>
                </Hexagon>
                <Hexagon className="bg-[#e5e5e5] mx-1 cursor-pointer" onClick={() => handleLetterClick(outerLetters[5])}>
                    <span className="text-4xl font-bold">{outerLetters[5]}</span>
                </Hexagon>
            </div>
        </div>

        {/* Action Buttons */}
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
