'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface HexagonProps extends React.ComponentProps<'button'> {
  isCenter?: boolean;
}

const HexagonPolygon = ({ isCenter = false }) => (
  <polygon
    points="50,1 95,25 95,75 50,99 5,75 5,25"
    className={cn(
      'transition-colors duration-200',
      isCenter ? 'fill-primary' : 'fill-muted-foreground'
    )}
  />
);

const Hexagon = ({ isCenter = false, className, children, ...props }: HexagonProps) => (
    <button
        className={cn(
        "absolute flex items-center justify-center font-bold text-3xl transition-transform duration-200 ease-in-out active:scale-90",
        isCenter ? "text-primary-foreground" : "text-background",
        className
        )}
        {...props}
    >
        <svg viewBox="0 0 100 100" className="absolute w-full h-full drop-shadow-md">
            <HexagonPolygon isCenter={isCenter} />
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
  const containerSize = 250;
  const hexSize = 84; 
  const hexWidth = hexSize;
  const hexHeight = hexSize * 0.866; // approx sqrt(3)/2

  const center_x = (containerSize - hexWidth) / 2;
  const center_y = (containerSize - hexHeight) / 2;

  const positions = [
    { top: center_y - hexHeight * 0.75, left: center_x }, // Top
    { top: center_y - hexHeight * 0.375, left: center_x + hexWidth * 0.65 }, // Top-right
    { top: center_y + hexHeight * 0.375, left: center_x + hexWidth * 0.65 }, // Bottom-right
    { top: center_y + hexHeight * 0.75, left: center_x }, // Bottom
    { top: center_y + hexHeight * 0.375, left: center_x - hexWidth * 0.65 }, // Bottom-left
    { top: center_y - hexHeight * 0.375, left: center_x - hexWidth * 0.65 }, // Top-left
  ];

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
          top: `${center_y}px`,
          left: `${center_x}px`,
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
            top: `${positions[index].top}px`,
            left: `${positions[index].left}px`,
          }}
        >
          {letter}
        </Hexagon>
      ))}
    </div>
  );
};

export default HexGrid;