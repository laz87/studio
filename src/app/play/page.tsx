import GameClient from '@/components/game/game-client';
import { puzzles } from '@/lib/game-data';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function GameLoadingSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="w-full max-w-md space-y-4">
        <Skeleton className="h-4 w-3/4 mx-auto" />
        <Skeleton className="h-8 w-1/2 mx-auto" />
        <Skeleton className="h-4 w-1/4 mx-auto" />
        <div className="relative w-64 h-64 mx-auto my-8">
            <Skeleton className="w-full h-full rounded-full" />
        </div>
        <div className="flex justify-center gap-4">
            <Skeleton className="h-12 w-24 rounded-full" />
            <Skeleton className="h-12 w-24 rounded-full" />
            <Skeleton className="h-12 w-32 rounded-full" />
        </div>
      </div>
    </div>
  );
}


export default function PlayPage() {
  // For now, we'll just use the first puzzle.
  // In a real app, you might select one based on the date or user progress.
  const puzzle = puzzles[0];

  return (
    <Suspense fallback={<GameLoadingSkeleton />}>
      <GameClient puzzle={puzzle} />
    </Suspense>
  );
}
