import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { siteConfig } from '@/lib/site';
import { pillarGuides } from '@/lib/pillars';

export const metadata: Metadata = {
  title: 'Learn',
  description:
    'Pillar guides and topic clusters on platform engineering, Kubernetes, DevOps, performance, data platforms, and cloud architecture.',
  alternates: {
    canonical: '/learn',
  },
};

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Kube News Learn Hub',
            url: `${siteConfig.url}/learn`,
            description:
              'Topic cluster hub with pillar guides for cloud engineering, DevOps, and platform strategy.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: pillarGuides.map((guide, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `${siteConfig.url}/learn/${guide.slug}`,
              name: guide.title,
            })),
          },
        ]}
      />

      <section className="glass-panel rounded-3xl p-6 md:p-10">
        <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">Topic Clusters</p>
        <h1 className="mt-3 text-4xl leading-tight tracking-tight [font-family:var(--font-display)] md:text-6xl">
          Pillar content built to rank, educate, and convert.
        </h1>
        <p className="text-muted-foreground mt-4 max-w-3xl text-sm leading-relaxed md:text-base">
          Each guide below is a strategic pillar designed around high-intent technical keywords and
          practical implementation paths for engineering leaders and product teams.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {pillarGuides.map((guide) => (
          <article key={guide.slug} className="glass-panel rounded-2xl p-6">
            <p className="text-muted-foreground text-[11px] uppercase tracking-[0.18em]">
              {guide.readTime} · Updated {guide.updatedAt}
            </p>
            <h2 className="mt-2 text-2xl tracking-tight [font-family:var(--font-display)]">
              {guide.title}
            </h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{guide.excerpt}</p>
            <p className="mt-4 text-sm font-medium">Outcome: {guide.businessOutcome}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {guide.clusterKeywords.slice(0, 3).map((keyword) => (
                <span
                  key={keyword}
                  className="bg-background/70 border-border/70 rounded-full border px-3 py-1 text-xs"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <Link
              href={`/learn/${guide.slug}`}
              className="bg-primary text-primary-foreground mt-5 inline-block rounded-full px-4 py-2 text-sm font-medium"
            >
              Read Pillar Guide
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
