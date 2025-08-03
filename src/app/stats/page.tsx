'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, AlignHorizontalJustifyCenter, Gamepad2 } from 'lucide-react';
import useLocalStorage from '@/hooks/use-local-storage';
import type { GameStats } from '@/lib/types';
import { Button } from '@/components/ui/button';

const StatCard = ({ icon: Icon, title, value }: { icon: React.ElementType, title: string, value: string | number }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

export default function StatsPage() {
    const [stats, setStats] = useLocalStorage<GameStats>('game-stats', {
        puzzlesPlayed: 0,
        totalWordsFound: 0,
        longestWord: '',
    });

    const resetStats = () => {
        setStats({
            puzzlesPlayed: 0,
            totalWordsFound: 0,
            longestWord: '',
        });
    }

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Statistics</h1>
        <Button variant="destructive" size="sm" onClick={resetStats}>Reset</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={Gamepad2} title="Puzzles Played" value={stats.puzzlesPlayed} />
        <StatCard icon={Trophy} title="Total Words Found" value={stats.totalWordsFound} />
        <StatCard icon={AlignHorizontalJustifyCenter} title="Longest Word" value={stats.longestWord || '-'} />
      </div>
       <Card className="mt-6">
        <CardHeader>
            <CardTitle>Your Rank Journey</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Rank history and progress charts will be displayed here in a future update.</p>
        </CardContent>
       </Card>
    </div>
  );
}
