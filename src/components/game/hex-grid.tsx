'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface HexagonProps extends React.ComponentProps<'button'> {
  isCenter?: boolean;
}

const Hexagon = ({ isCenter = false, className, children, ...props }: HexagonProps) => (
  <button
    className={cn(
      "absolute flex items-center justify-center font-bold text-3xl text-white transition-transform duration-200 ease-in-out active:scale-90",
      className
    )}
    {...props}
  >
    <svg 
      viewBox="0 0 100 115.47" 
      className="absolute w-full h-full drop-shadow-md"
    >
      <polygon
        points="50,0 100,28.87 100,86.6 50,115.47 0,86.6 0,28.87"
        className={cn(isCenter ? 'fill-hex-center' : 'fill-hex-outer')}
        strokeWidth="4"
        stroke={isCenter ? 'hsl(46 93% 50%)' : 'hsl(0 0% 23%)'}
      />
    </svg>
    <span className="z-10">{children}</span>
  </button>
);


interface HexGridProps {
  centerLetter: string;
  outerLetters: string[];
  onKeyPress: (letter: string) => void;
}

const HexGrid: React.FC<HexGridProps> = ({ centerLetter, outerLetters, onKeyPress }) => {
  const hexWidth = 80;
  const hexHeight = 92.38; // Adjusted for perfect hexagon aspect ratio (width * sqrt(3) / 2 * 2 * aspect_ratio_correction)
  const gap = 8;

  // Distances between centers
  const horizDist = hexWidth * 3/4 + gap;
  const vertDist = hexHeight / 2 + gap;

  // Positions for the outer hexagons relative to the container's center
   const hexPositions = [
    { top: `calc(50% - ${vertDist}px)`, left: `calc(50% + ${horizDist}px)` }, // top-right
    { top: `calc(50% + ${vertDist}px)`, left: `calc(50% + ${horizDist}px)` }, // bottom-right
    { top: `50%`, left: `calc(50% + ${hexWidth + gap}px)` }, // right (placeholder, not used in 6-around-1)
    { top: `calc(50% + ${hexHeight/2 + gap}px)`, left: '50%' }, // bottom-center
    { top: `calc(50% + ${vertDist}px)`, left: `calc(50% - ${horizDist}px)` }, // bottom-left
    { top: `calc(50% - ${vertDist}px)`, left: `calc(50% - ${horizDist}px)` }, // top-left
    { top: `calc(50% - ${hexHeight/2 + gap}px)`, left: '50%' }, // top-center
  ];
  
  // A standard 7-hex honeycomb pattern has outer hexes at these specific angular positions
  const honeycombPositions = [
      { top: `calc(50% - ${hexHeight/2 + gap}px)`, left: '50%' }, // 0: Top
      { top: `calc(50% - ${vertDist/2}px)`, left: `calc(50% + ${horizDist}px)` }, // 1: Top-Right
      { top: `calc(50% + ${vertDist/2}px)`, left: `calc(50% + ${horizDist}px)` }, // 2: Bottom-Right
      { top: `calc(50% + ${hexHeight/2 + gap}px)`, left: `50%` }, // 3: Bottom
      { top: `calc(50% + ${vertDist/2}px)`, left: `calc(50% - ${horizDist}px)` }, // 4: Bottom-Left
      { top: `calc(50% - ${vertDist/2}px)`, left: `calc(50% - ${horizDist}px)` }, // 5: Top-Left
  ];


  const containerSize = hexHeight * 2 + vertDist * 2;

  return (
    <div 
      className="relative mx-auto"
      style={{
        width: `${containerSize}px`,
        height: `${containerSize}px`,
      }}
    >
      <style jsx>{`
        .fill-hex-center { fill: hsl(var(--hex-center-bg)); }
        .fill-hex-outer { fill: hsl(var(--hex-outer-bg)); }
      `}</style>
      
      {/* Center Hexagon */}
      <Hexagon 
        isCenter 
        onClick={() => onKeyPress(centerLetter)}
        style={{
          width: `${hexWidth}px`,
          height: `${hexHeight}px`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        {centerLetter}
      </Hexagon>
      
      {/* Outer Hexagons */}
      {outerLetters.map((letter, index) => (
        <Hexagon
          key={letter + index}
          onClick={() => onKeyPress(letter)}
          style={{
            width: `${hexWidth}px`,
            height: `${hexHeight}px`,
            top: honeycombPositions[index].top,
            left: honeycombPositions[index].left,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {letter}
        </Hexagon>
      ))}
    </div>
  );
};

export default HexGrid;