import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Post } from '@kube-news/types';
import { JsonLd } from '@/components/seo/json-ld';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/site';

async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/${id}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return {
      title: 'Post not found',
      description: siteConfig.description,
    };
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `/posts/${post.id}`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.summary,
      url: `${siteConfig.url}/posts/${post.id}`,
      publishedTime: post.publishDate,
      modifiedTime: post.updatedAt,
      authors: [siteConfig.author.fullName],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    },
  };
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
    <article className="glass-panel mx-auto max-w-3xl rounded-3xl p-6 md:p-10">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.summary,
          datePublished: post.publishDate,
          dateModified: post.updatedAt,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${siteConfig.url}/posts/${post.id}`,
          },
          author: {
            '@type': 'Person',
            name: siteConfig.author.fullName,
            url: `${siteConfig.url}/about`,
          },
          publisher: {
            '@type': 'Organization',
            name: siteConfig.name,
            url: siteConfig.url,
          },
        }}
      />
      <Button asChild variant="ghost" size="sm" className="mb-6 rounded-full">
        <Link href="/">← Back</Link>
      </Button>

      <p className="text-muted-foreground mb-2 text-xs uppercase tracking-[0.2em]">{date}</p>
      <h1 className="mb-4 text-4xl tracking-tight [font-family:var(--font-display)] md:text-6xl">
        {post.title}
      </h1>
      <p className="text-muted-foreground mb-8 max-w-2xl text-base leading-relaxed md:text-lg">
        {post.summary}
      </p>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {post.content.split('\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
