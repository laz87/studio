'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { BeeIcon } from '@/components/icons/bee';

export default function Home() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(format(new Date(), 'MMMM d, yyyy'));
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="mb-4">
        <BeeIcon className="mx-auto h-24 w-24 text-primary" />
      </div>
      <h1 className="font-headline text-5xl font-extrabold tracking-tighter text-foreground sm:text-6xl md:text-7xl">
        Kiswahili Spela
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        Jinsi gani maneno mengi unaweza kutunga na herufi 7?
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{currentDate}</p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button asChild size="lg" className="font-bold">
          <Link href="/play">Play</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="font-bold">
          <Link href="/puzzles">Subscribe</Link>
        </Button>
      </div>
    </div>
  );
}
