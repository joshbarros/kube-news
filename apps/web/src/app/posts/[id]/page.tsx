import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Post } from '@kube-news/types';
import { Button } from '@/components/ui/button';

async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/${id}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) notFound();

  const date = new Date(post.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="mx-auto max-w-2xl">
      <Button asChild variant="ghost" size="sm" className="mb-6">
        <Link href="/">← Back</Link>
      </Button>

      <p className="mb-2 text-sm text-muted-foreground">{date}</p>
      <h1 className="mb-4 text-4xl font-bold tracking-tight">{post.title}</h1>
      <p className="mb-8 text-lg text-muted-foreground">{post.summary}</p>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {post.content.split('\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
