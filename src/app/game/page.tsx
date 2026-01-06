"use client";

import { Hexagon } from "@/components/game/hexagon";

const letters = ["A", "B", "C", "D", "E", "F", "G"];

export default function GamePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="flex flex-col items-center">
        {/* Top Row */}
        <div className="flex justify-center" style={{ marginBottom: "-28.87px" }}>
          <Hexagon className="bg-gray-300 mx-1">
            <span className="text-4xl font-bold">{letters[0]}</span>
          </Hexagon>
          <Hexagon className="bg-gray-300 mx-1">
            <span className="text-4xl font-bold">{letters[1]}</span>
          </Hexagon>
        </div>
        {/* Middle Row */}
        <div className="flex justify-center items-center" style={{ marginBottom: "-28.87px" }}>
          <Hexagon className="bg-gray-300 mx-1">
            <span className="text-4xl font-bold">{letters[2]}</span>
          </Hexagon>
          <Hexagon className="bg-yellow-400 mx-1">
            <span className="text-4xl font-bold">{letters[3]}</span>
          </Hexagon>
          <Hexagon className="bg-gray-300 mx-1">
            <span className="text-4xl font-bold">{letters[4]}</span>
          </Hexagon>
        </div>
        {/* Bottom Row */}
        <div className="flex justify-center">
          <Hexagon className="bg-gray-300 mx-1">
            <span className="text-4xl font-bold">{letters[5]}</span>
          </Hexagon>
          <Hexagon className="bg-gray-300 mx-1">
            <span className="text-4xl font-bold">{letters[6]}</span>
          </Hexagon>
        </div>
      </div>
    </div>
  );
}
