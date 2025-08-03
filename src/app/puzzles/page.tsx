import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const puzzles = [
  { date: 'Today', day: 'Tuesday', letters: 'A B I K L N U', unlocked: true },
  { date: 'Yesterday', day: 'Monday', letters: 'D E G H I O T', unlocked: true },
  { date: 'June 17, 2024', day: 'Sunday', letters: 'A C E L M N R', unlocked: false },
  { date: 'June 16, 2024', day: 'Saturday', letters: 'F G H I L M O', unlocked: false },
  { date: 'June 15, 2024', day: 'Friday', letters: 'B E I K L R S', unlocked: false },
  { date: 'June 14, 2024', day: 'Thursday', letters: 'A E I O P R T', unlocked: false },
];

export default function PuzzlesPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Past Puzzles</h1>
      <div className="space-y-4">
        {puzzles.map((puzzle) => (
          <Card key={puzzle.date}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex-1">
                <CardTitle className="text-lg">{puzzle.date}</CardTitle>
                <p className="text-sm text-muted-foreground">{puzzle.day}</p>
              </div>
              <Button size="icon" variant={puzzle.unlocked ? 'default' : 'secondary'} disabled={!puzzle.unlocked}>
                {puzzle.unlocked ? <Play className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {puzzle.letters.split(' ').map((letter, index) => (
                  <div key={index} className={`flex h-8 w-8 items-center justify-center rounded-full font-bold ${index === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {letter}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        <Card className="text-center">
            <CardHeader>
                <CardTitle>Unlock More Puzzles</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">Subscribe to get access to the full archive of past puzzles.</p>
                <Button>Subscribe Now</Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
