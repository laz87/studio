"use client";

import { Hexagon } from "@/components/game/hexagon";

const letters = ["A", "B", "C", "D", "E", "F", "G"];

export default function GamePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div
        className="grid grid-cols-3 gap-1"
        style={{ width: "fit-content" }}
      >
        <div className="col-start-2">
          <Hexagon className="bg-gray-300">
            <span className="text-4xl font-bold">{letters[0]}</span>
          </Hexagon>
        </div>
        <div>
          <Hexagon className="bg-gray-300">
            <span className="text-4xl font-bold">{letters[1]}</span>
          </Hexagon>
        </div>
        <div className="mt-[-28.87px]">
          <Hexagon className="bg-yellow-400">
            <span className="text-4xl font-bold">{letters[2]}</span>
          </Hexagon>
        </div>
        <div className="mt-[-28.87px]">
          <Hexagon className="bg-gray-300">
            <span className="text-4xl font-bold">{letters[3]}</span>
          </Hexagon>
        </div>
        <div className="col-start-1">
          <Hexagon className="bg-gray-300">
            <span className="text-4xl font-bold">{letters[4]}</span>
          </Hexagon>
        </div>
        <div className="mt-[-28.87px]">
          <Hexagon className="bg-gray-300">
            <span className="text-4xl font-bold">{letters[5]}</span>
          </Hexagon>
        </div>
        <div className="mt-[-28.87px]">
          <Hexagon className="bg-gray-300">
            <span className="text-4xl font-bold">{letters[6]}</span>
          </Hexagon>
        </div>
      </div>
    </div>
  );
}
