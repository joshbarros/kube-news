import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Kube News for consulting, partnerships, performance audits, platform architecture, and engineering advisory.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Kube News',
          url: `${siteConfig.url}/contact`,
          description:
            'Contact page for consulting and partnership inquiries related to cloud engineering and software performance.',
        }}
      />

      <section className="glass-panel rounded-3xl p-6 md:p-10">
        <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">Contact</p>
        <h1 className="mt-3 text-4xl leading-tight tracking-tight [font-family:var(--font-display)] md:text-6xl">
          Let us turn engineering strategy into measurable growth.
        </h1>
        <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-relaxed md:text-lg">
          Reach out for consulting, architecture reviews, performance optimization, and platform
          modernization initiatives.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="glass-panel rounded-2xl p-6">
          <h2 className="text-2xl tracking-tight [font-family:var(--font-display)]">Email</h2>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            For project inquiries, send details about your current stack, timeline, and expected
            outcomes.
          </p>
          <Link
            href={`mailto:${siteConfig.author.email}`}
            className="text-primary mt-3 inline-block"
          >
            {siteConfig.author.email}
          </Link>
        </article>

        <article className="glass-panel rounded-2xl p-6">
          <h2 className="text-2xl tracking-tight [font-family:var(--font-display)]">
            Professional profiles
          </h2>
          <div className="mt-3 grid gap-2 text-sm">
            <Link href={siteConfig.author.linkedin} className="hover:text-primary" target="_blank">
              LinkedIn
            </Link>
            <Link href={siteConfig.author.github} className="hover:text-primary" target="_blank">
              GitHub
            </Link>
            <Link href={siteConfig.author.company} className="hover:text-primary" target="_blank">
              Company site
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
