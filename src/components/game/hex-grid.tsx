'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface HexagonProps extends React.ComponentProps<'button'> {
  isCenter?: boolean;
}

// Hexagon component using SVG for crisp shapes
const Hexagon = ({ isCenter = false, className, children, ...props }: HexagonProps) => (
  <button
    className={cn(
      "absolute flex items-center justify-center font-bold text-3xl transition-transform duration-200 ease-in-out active:scale-90",
       isCenter ? 'text-primary-foreground' : 'text-foreground',
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
        className={cn(
          isCenter ? 'fill-primary' : 'fill-muted'
        )}
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
  // Define hexagon dimensions and gap
  const hexWidth = 80;
  const hexHeight = 92; // height is approx width * sqrt(3) / 2 * 2 -> width * sqrt(3)
  const gap = 8;

  const hexHorizDist = hexWidth + gap;
  const hexVertDist = (hexHeight * 3) / 4 + gap;

  // Positions for the outer hexagons relative to the container's center
  const hexPositions = [
    { top: `calc(50% - ${hexVertDist}px - ${hexHeight / 2}px)`, left: `50%` }, // top-center
    { top: `calc(50% - ${hexVertDist / 2}px - ${hexHeight / 2}px)`, left: `calc(50% + ${hexHorizDist / 2}px)` }, // top-right
    { top: `calc(50% + ${hexVertDist / 2}px - ${hexHeight / 2}px)`, left: `calc(50% + ${hexHorizDist / 2}px)` }, // bottom-right
    { top: `calc(50% + ${hexVertDist}px - ${hexHeight / 2}px)`, left: '50%' }, // bottom-center
    { top: `calc(50% + ${hexVertDist / 2}px - ${hexHeight / 2}px)`, left: `calc(50% - ${hexHorizDist / 2}px)` }, // bottom-left
    { top: `calc(50% - ${hexVertDist / 2}px - ${hexHeight / 2}px)`, left: `calc(50% - ${hexHorizDist / 2}px)` }, // top-left
  ];

  const containerSize = hexHeight * 2 + hexVertDist;

  return (
    <div 
      className="relative mx-auto"
      style={{
        width: `${containerSize}px`,
        height: `${containerSize}px`,
      }}
    >
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
            top: hexPositions[index].top,
            left: hexPositions[index].left,
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
