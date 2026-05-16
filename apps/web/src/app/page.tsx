import type { Post } from '@kube-news/types';
import { PostCard } from '@/components/post-card';

// Server Component — fetched at request time, no client JS needed
async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts`, {
    next: { revalidate: 30 }, // ISR: revalidate every 30 seconds
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Latest News</h1>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet. Be the first to publish!</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
