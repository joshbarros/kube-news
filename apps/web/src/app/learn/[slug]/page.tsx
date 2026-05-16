import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/json-ld';
import { siteConfig } from '@/lib/site';
import { pillarGuides } from '@/lib/pillars';

function getGuide(slug: string) {
  return pillarGuides.find((guide) => guide.slug === slug);
}

export function generateStaticParams() {
  return pillarGuides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    return {
      title: 'Guide not found',
      description: siteConfig.description,
    };
  }

  return {
    title: guide.title,
    description: guide.excerpt,
    keywords: [guide.primaryKeyword, ...guide.clusterKeywords],
    alternates: {
      canonical: `/learn/${guide.slug}`,
    },
    openGraph: {
      type: 'article',
      title: guide.title,
      description: guide.excerpt,
      url: `${siteConfig.url}/learn/${guide.slug}`,
      publishedTime: `${guide.updatedAt}T00:00:00.000Z`,
      modifiedTime: `${guide.updatedAt}T00:00:00.000Z`,
      authors: [siteConfig.author.fullName],
    },
  };
}

export default async function PillarGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) notFound();

  const relatedGuides = pillarGuides.filter((item) => item.slug !== guide.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-4xl space-y-8">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: guide.title,
            description: guide.excerpt,
            datePublished: `${guide.updatedAt}T00:00:00.000Z`,
            dateModified: `${guide.updatedAt}T00:00:00.000Z`,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${siteConfig.url}/learn/${guide.slug}`,
            },
            keywords: [guide.primaryKeyword, ...guide.clusterKeywords].join(', '),
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
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: guide.faq.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          },
        ]}
      />

      <section className="glass-panel rounded-3xl p-6 md:p-10">
        <Link href="/learn" className="text-muted-foreground hover:text-foreground text-sm">
          ← Back to Learn Hub
        </Link>
        <p className="text-muted-foreground mt-4 text-xs uppercase tracking-[0.2em]">
          {guide.readTime} · Updated {guide.updatedAt}
        </p>
        <h1 className="mt-3 text-4xl leading-tight tracking-tight [font-family:var(--font-display)] md:text-6xl">
          {guide.title}
        </h1>
        <p className="text-muted-foreground mt-4 text-base leading-relaxed md:text-lg">
          {guide.excerpt}
        </p>
        <p className="bg-primary/10 mt-4 rounded-2xl p-4 text-sm">
          Business Outcome: {guide.businessOutcome}
        </p>
      </section>

      <section className="space-y-5">
        {guide.sections.map((section) => (
          <div key={section.heading} className="glass-panel rounded-2xl p-6">
            <h2 className="text-2xl tracking-tight [font-family:var(--font-display)]">
              {section.heading}
            </h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed md:text-base">
              {section.body}
            </p>
            <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-5 text-sm">
              {section.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="glass-panel rounded-2xl p-6">
        <h2 className="text-2xl tracking-tight [font-family:var(--font-display)]">
          Frequently Asked Questions
        </h2>
        <div className="mt-5 space-y-4">
          {guide.faq.map((item) => (
            <div key={item.question} className="bg-background/70 rounded-xl p-4">
              <h3 className="text-base font-semibold">{item.question}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-2xl p-6">
        <h2 className="text-2xl tracking-tight [font-family:var(--font-display)]">
          Related Pillar Guides
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {relatedGuides.map((item) => (
            <Link
              key={item.slug}
              href={`/learn/${item.slug}`}
              className="bg-background/70 rounded-2xl p-4"
            >
              <p className="text-sm font-medium leading-snug">{item.title}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
