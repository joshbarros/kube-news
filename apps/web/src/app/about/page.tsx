import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Kube News and Josue Barros: production-focused engineering leadership across performance, cloud platforms, and event-driven systems.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          mainEntity: {
            '@type': 'Person',
            name: siteConfig.author.fullName,
            alternateName: 'Josh Barros',
            description:
              'Senior Software Engineer focused on performance engineering, data platforms, and event-driven systems.',
            url: `${siteConfig.url}/about`,
            sameAs: [
              siteConfig.author.github,
              siteConfig.author.linkedin,
              siteConfig.author.website,
            ],
            worksFor: {
              '@type': 'Organization',
              name: 'GoldenGlow IT Solutions LTDA',
              url: siteConfig.author.company,
            },
            homeLocation: {
              '@type': 'Place',
              name: siteConfig.author.location,
            },
          },
        }}
      />

      <section className="glass-panel rounded-3xl p-6 md:p-10">
        <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
          About the Publication
        </p>
        <h1 className="mt-3 text-4xl leading-tight tracking-tight [font-family:var(--font-display)] md:text-6xl">
          Engineering content built for real production outcomes.
        </h1>
        <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-relaxed md:text-lg">
          Kube News exists to help teams design, ship, and operate software with better speed,
          reliability, and cost efficiency. Every article is grounded in practical implementation
          and measurable impact.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="glass-panel rounded-2xl p-6">
          <h2 className="text-2xl tracking-tight [font-family:var(--font-display)]">
            Who writes here
          </h2>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            Content is authored by {siteConfig.author.fullName}, Senior Software Engineer based in
            Rio de Janeiro, with hands-on experience in Core Web Vitals optimization, platform
            engineering, Azure and GCP architectures, and event-driven delivery systems.
          </p>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            Proven outcomes include render-time reduction, cloud-cost optimization, MTTR reduction,
            and API latency improvements in high-traffic and regulated environments.
          </p>
        </article>

        <article className="glass-panel rounded-2xl p-6">
          <h2 className="text-2xl tracking-tight [font-family:var(--font-display)]">
            Editorial promise
          </h2>
          <ul className="text-muted-foreground mt-3 space-y-2 text-sm leading-relaxed">
            <li>People-first writing with clear technical context and implementation logic.</li>
            <li>Transparent authorship and verifiable real-world engineering experience.</li>
            <li>Actionable guidance that connects technical patterns to business ROI.</li>
          </ul>
        </article>
      </section>

      <section className="glass-panel rounded-2xl p-6">
        <h2 className="text-2xl tracking-tight [font-family:var(--font-display)]">Connect</h2>
        <div className="mt-4 grid gap-2 text-sm">
          <Link href={siteConfig.author.github} className="hover:text-primary" target="_blank">
            GitHub profile
          </Link>
          <Link href={siteConfig.author.linkedin} className="hover:text-primary" target="_blank">
            LinkedIn profile
          </Link>
          <Link href={siteConfig.author.website} className="hover:text-primary" target="_blank">
            Personal website
          </Link>
        </div>
      </section>
    </div>
  );
}
