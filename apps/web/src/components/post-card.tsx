import Link from 'next/link';
import type { Post } from '@kube-news/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card className="flex flex-col">
      <CardHeader>
        <p className="text-xs text-muted-foreground">{date}</p>
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        <CardDescription className="line-clamp-3">{post.summary}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1" />
      <CardFooter>
        <Button asChild variant="outline" size="sm">
          <Link href={`/posts/${post.id}`}>Read more</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
