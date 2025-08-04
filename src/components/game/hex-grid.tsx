'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface HexagonProps extends React.ComponentProps<'button'> {
  isCenter?: boolean;
}

const HexagonPolygon = ({ isCenter = false, ...props }) => (
  <polygon
    points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
    className={cn(isCenter ? 'fill-hex-center' : 'fill-hex-outer')}
    {...props}
  />
);

const Hexagon = ({ isCenter = false, className, children, ...props }: HexagonProps) => (
    <button
        className={cn(
        "absolute flex items-center justify-center font-bold text-3xl transition-transform duration-200 ease-in-out active:scale-90",
        isCenter ? "text-black" : "text-white",
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
  const hexSize = 80;
  const centerPos = (containerSize - hexSize) / 2;

  const positions = [
    { top: 0, left: centerPos },
    { top: centerPos - hexSize / 2 + 2, left: centerPos + hexSize * 0.75 - 2},
    { top: centerPos + hexSize / 2 - 2, left: centerPos + hexSize * 0.75 - 2},
    { top: centerPos + hexSize - 4, left: centerPos },
    { top: centerPos + hexSize / 2 - 2, left: centerPos - hexSize * 0.75 + 2},
    { top: centerPos - hexSize / 2 + 2, left: centerPos - hexSize * 0.75 + 2},
  ];

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
          width: `${hexSize}px`,
          height: `${hexSize}px`,
          top: `${centerPos}px`,
          left: `${centerPos}px`,
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
            width: `${hexSize}px`,
            height: `${hexSize}px`,
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
