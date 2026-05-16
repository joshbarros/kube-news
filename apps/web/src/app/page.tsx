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
    <div className="space-y-10">
      <section className="hero-reveal glass-panel relative overflow-hidden rounded-3xl p-6 md:p-10">
        <div
          className="bg-primary/20 absolute -right-10 -top-10 h-36 w-36 rounded-full blur-2xl"
          aria-hidden
        />
        <p className="text-muted-foreground mb-3 text-xs uppercase tracking-[0.2em]">
          Independent Tech Desk
        </p>
        <h1 className="max-w-3xl text-4xl leading-tight tracking-tight [font-family:var(--font-display)] md:text-6xl">
          Daily stories for teams shipping in the cloud.
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl text-sm md:text-base">
          Kube News blends engineering updates, platform strategy, and practical delivery notes for
          modern product teams.
        </p>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl tracking-tight [font-family:var(--font-display)] md:text-3xl">
            Latest Stories
          </h2>
          <p className="text-muted-foreground text-xs uppercase tracking-[0.16em]">
            {posts.length} published
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="glass-panel rounded-2xl p-8 text-center">
            <p className="text-muted-foreground">No posts yet. Be the first to publish a story.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
