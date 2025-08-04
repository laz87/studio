'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface HexagonProps extends React.ComponentProps<'button'> {
  isCenter?: boolean;
}

const HexagonPolygon = ({ isCenter = false }) => (
  <svg
    viewBox="0 0 100 100"
    className="absolute w-full h-full drop-shadow-md"
  >
    <polygon
      points="50,1 95,25 95,75 50,99 5,75 5,25"
      className={cn(
        'transition-colors duration-200',
        isCenter ? 'fill-primary' : 'fill-muted-foreground'
      )}
    />
  </svg>
);

const Hexagon = ({ isCenter = false, className, children, ...props }: HexagonProps) => (
  <button
    className={cn(
      "absolute flex items-center justify-center font-bold text-3xl w-[80px] h-[80px] transition-transform duration-200 ease-in-out active:scale-90",
      isCenter ? "text-primary-foreground" : "text-background",
      className
    )}
    {...props}
  >
    <HexagonPolygon isCenter={isCenter} />
    <span className="z-10">{children}</span>
  </button>
);

interface HexGridProps {
  centerLetter: string;
  outerLetters: string[];
  onKeyPress: (letter: string) => void;
}

const HexGrid: React.FC<HexGridProps> = ({ centerLetter, outerLetters, onKeyPress }) => {
  const positions = [
    { transform: 'translate(0px, -80px)' }, // Top
    { transform: 'translate(70px, -40px)' }, // Top-right
    { transform: 'translate(70px, 40px)' },  // Bottom-right
    { transform: 'translate(0px, 80px)' },   // Bottom
    { transform: 'translate(-70px, 40px)' }, // Bottom-left
    { transform: 'translate(-70px, -40px)' },// Top-left
  ];

  return (
    <div className="relative w-[220px] h-[240px] flex items-center justify-center">
        {/* Center Hexagon */}
        <Hexagon
            isCenter
            onClick={() => onKeyPress(centerLetter)}
            style={{ zIndex: 10 }}
        >
            {centerLetter}
        </Hexagon>

        {/* Outer Hexagons */}
        {outerLetters.map((letter, index) => (
            <Hexagon
            key={letter + index}
            onClick={() => onKeyPress(letter)}
            style={positions[index]}
            >
            {letter}
            </Hexagon>
        ))}
    </div>
  );
};

export default HexGrid;
