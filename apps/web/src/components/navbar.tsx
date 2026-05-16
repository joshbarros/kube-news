import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Newspaper } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export function Navbar() {
  return (
    <header className="border-border/70 bg-background/65 supports-[backdrop-filter]:bg-background/50 sticky top-0 z-40 border-b backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="bg-primary/15 text-primary group-hover:bg-primary/25 rounded-lg p-2 transition-colors">
            <Newspaper className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight [font-family:var(--font-display)]">
            Kube News
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="rounded-full px-4">
            <Link href="/admin">Publish Story</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
