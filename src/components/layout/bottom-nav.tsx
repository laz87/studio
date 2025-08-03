'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Puzzle, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BeeIcon } from '@/components/icons/bee';

const navItems = [
  { href: '/play', icon: BeeIcon, label: 'Game' },
  { href: '/puzzles', icon: Puzzle, label: 'Puzzles' },
  { href: '/stats', icon: BarChart3, label: 'Stats' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 h-16 w-full border-t bg-background/95 backdrop-blur-sm">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group inline-flex flex-col items-center justify-center px-5 hover:bg-muted',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
