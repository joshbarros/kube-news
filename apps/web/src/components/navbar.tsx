import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Newspaper } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/learn', label: 'Learn' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

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
          <nav className="mr-1 hidden items-center gap-2 text-sm lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground rounded-full px-3 py-1.5 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <Button asChild size="sm" className="rounded-full px-4">
            <Link href="/admin">Publish Story</Link>
          </Button>
        </div>
      </div>

      <div className="border-border/70 border-t lg:hidden">
        <nav className="container mx-auto flex items-center gap-2 overflow-x-auto px-4 py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground bg-background/60 border-border/70 hover:text-foreground inline-flex shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
