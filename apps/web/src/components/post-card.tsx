import Link from 'next/link';
import type { Post } from '@kube-news/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const date = new Date(post.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className="glass-panel border-border/70 group flex h-full flex-col overflow-hidden rounded-2xl border transition-transform duration-300 hover:-translate-y-1">
      <CardHeader>
        <p className="text-muted-foreground text-[11px] uppercase tracking-[0.18em]">{date}</p>
        <CardTitle className="line-clamp-2 text-xl leading-tight [font-family:var(--font-display)]">
          {post.title}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-sm leading-relaxed">
          {post.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1" />
      <CardFooter>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="border-border/80 bg-background/70 rounded-full"
        >
          <Link href={`/posts/${post.id}`}>Read article</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
