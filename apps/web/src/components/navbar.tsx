import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Newspaper } from 'lucide-react';

export function Navbar() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Newspaper className="h-5 w-5" />
          <span>Kube News</span>
        </Link>
        <Button asChild size="sm">
          <Link href="/posts/new">+ New Post</Link>
        </Button>
      </div>
    </header>
  );
}
