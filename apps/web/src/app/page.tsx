import type { Metadata } from 'next';
import Link from 'next/link';
import type { Post } from '@kube-news/types';
import { JsonLd } from '@/components/seo/json-ld';
import { PostCard } from '@/components/post-card';
import { pillarGuides } from '@/lib/pillars';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Homepage',
  description:
    'Premium engineering insights on Kubernetes, DevOps, cloud architecture, data platforms, and high-performance web delivery.',
  alternates: {
    canonical: '/',
  },
};

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
  const topPosts = posts.slice(0, 8);
  const featuredGuides = pillarGuides.slice(0, 6);
  const faqEntries = [
    {
      question: 'Who is Kube News for?',
      answer:
        'Kube News is for engineering teams, tech leads, and founders who need practical guidance to ship reliable cloud software faster.',
    },
    {
      question: 'What topics does Kube News cover?',
      answer:
        'We cover platform engineering, Kubernetes operations, software performance, data systems, event-driven architectures, and DevOps delivery practices.',
    },
    {
      question: 'Why does this content focus on ROI?',
      answer:
        'Each article connects technical decisions to measurable outcomes like latency reduction, cloud-cost efficiency, deployment confidence, and incident reduction.',
    },
  ];

  return (
    <div className="space-y-10">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Kube News Homepage',
            url: `${siteConfig.url}/`,
            description: 'A premium editorial homepage focused on cloud engineering and DevOps.',
            isPartOf: {
              '@type': 'WebSite',
              name: siteConfig.name,
              url: siteConfig.url,
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqEntries.map((entry) => ({
              '@type': 'Question',
              name: entry.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: entry.answer,
              },
            })),
          },
        ]}
      />

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
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/about"
            className="bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-medium"
          >
            Meet the Author
          </Link>
          <Link
            href="/contact"
            className="border-border/80 bg-background/70 rounded-full border px-4 py-2 text-sm"
          >
            Talk About a Project
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl tracking-tight [font-family:var(--font-display)] md:text-3xl">
            Latest Stories
          </h2>
          <p className="text-muted-foreground text-xs uppercase tracking-[0.16em]">
            {topPosts.length} published
          </p>
        </div>

        {topPosts.length === 0 ? (
          <div className="glass-panel rounded-2xl p-8 text-center">
            <p className="text-muted-foreground">No posts yet. Be the first to publish a story.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {topPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      <section className="glass-panel rounded-3xl p-6 md:p-8">
        <h2 className="text-2xl tracking-tight [font-family:var(--font-display)] md:text-3xl">
          Quick Answers
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {faqEntries.map((entry) => (
            <article key={entry.question} className="bg-background/60 rounded-2xl p-4">
              <h3 className="text-base font-semibold">{entry.question}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{entry.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-3xl p-6 md:p-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-2xl tracking-tight [font-family:var(--font-display)] md:text-3xl">
            Pillar Guides
          </h2>
          <Link href="/learn" className="hover:text-primary text-sm font-medium">
            View all guides
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {featuredGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/learn/${guide.slug}`}
              className="bg-background/65 border-border/70 rounded-2xl border p-4"
            >
              <p className="text-muted-foreground text-[11px] uppercase tracking-[0.18em]">
                {guide.readTime}
              </p>
              <h3 className="mt-2 text-lg tracking-tight [font-family:var(--font-display)]">
                {guide.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{guide.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
