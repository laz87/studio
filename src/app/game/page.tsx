import { Hexagon } from "@/components/game/hexagon";

export default function GamePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="relative w-[300px] h-[300px] flex items-center justify-center">
        {/* Center Hexagon */}
        <div className="absolute">
          <Hexagon className="bg-yellow-400" />
        </div>

        {/* Outer Hexagons */}
        <div
          className="absolute w-full h-full"
          style={{ transform: "translateY(-86px)" }}
        >
          <Hexagon className="bg-gray-300" />
        </div>
        <div
          className="absolute w-full h-full"
          style={{ transform: "translate(75px, -43px)" }}
        >
          <Hexagon className="bg-gray-300" />
        </div>
        <div
          className="absolute w-full h-full"
          style={{ transform: "translate(75px, 43px)" }}
        >
          <Hexagon className="bg-gray-300" />
        </div>
        <div
          className="absolute w-full h-full"
          style={{ transform: "translateY(86px)" }}
        >
          <Hexagon className="bg-gray-300" />
        </div>
        <div
          className="absolute w-full h-full"
          style={{ transform: "translate(-75px, 43px)" }}
        >
          <Hexagon className="bg-gray-300" />
        </div>
        <div
          className="absolute w-full h-full"
          style={{ transform: "translate(-75px, -43px)" }}
        >
          <Hexagon className="bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
