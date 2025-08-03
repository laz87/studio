'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface HexagonProps extends React.ComponentProps<'button'> {
  isCenter?: boolean;
}

const Hexagon = ({ isCenter = false, className, children, ...props }: HexagonProps) => (
  <button
    className={cn(
      "absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-in-out active:scale-90",
      className
    )}
    style={{ width: '30%', height: '30%' }}
    {...props}
  >
    <svg viewBox="0 0 100 115.47" className="w-full h-full">
      <polygon
        points="50,0 100,28.87 100,86.6 50,115.47 0,86.6 0,28.87"
        className={cn(
          isCenter ? 'fill-primary stroke-primary-foreground' : 'fill-muted stroke-border',
          'stroke-2'
        )}
      />
      <text
        x="50"
        y="65"
        textAnchor="middle"
        className={cn(
          'text-4xl font-bold',
          isCenter ? 'fill-primary-foreground' : 'fill-foreground'
        )}
      >
        {children}
      </text>
    </svg>
  </button>
);


interface HexGridProps {
  centerLetter: string;
  outerLetters: string[];
  onKeyPress: (letter: string) => void;
}

const HexGrid: React.FC<HexGridProps> = ({ centerLetter, outerLetters, onKeyPress }) => {
  const hexPositions = [
    { top: '25%', left: '50%' }, // top
    { top: '37.5%', left: '75%' }, // top-right
    { top: '62.5%', left: '75%' }, // bottom-right
    { top: '75%', left: '50%' }, // bottom
    { top: '62.5%', left: '25%' }, // bottom-left
    { top: '37.5%', left: '25%' }, // top-left
  ];

  return (
    <div className="relative w-64 h-64 md:w-72 md:h-72 mx-auto">
      <Hexagon isCenter style={{ top: '50%', left: '50%' }} onClick={() => onKeyPress(centerLetter)}>
        {centerLetter}
      </Hexagon>
      {outerLetters.map((letter, index) => (
        <Hexagon
          key={letter + index}
          style={hexPositions[index]}
          onClick={() => onKeyPress(letter)}
        >
          {letter}
        </Hexagon>
      ))}
    </div>
  );
};

export default HexGrid;
