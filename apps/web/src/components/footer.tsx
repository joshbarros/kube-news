import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/70 mt-16 border-t py-10">
      <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-lg tracking-tight [font-family:var(--font-display)]">Kube News</h3>
          <p className="text-muted-foreground mt-2 text-sm">
            A premium engineering publication about cloud delivery, platform architecture, and
            software performance.
          </p>
          <p className="text-muted-foreground mt-3 text-xs">
            Practical systems thinking for teams shipping products under real-world constraints.
          </p>
        </div>

        <div>
          <h4 className="text-muted-foreground text-sm font-semibold uppercase tracking-[0.14em]">
            Pages
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link href="/learn" className="hover:text-primary">
                Learn
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-primary">
                Admin
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-muted-foreground text-sm font-semibold uppercase tracking-[0.14em]">
            Editorial Focus
          </h4>
          <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
            <li>Platform Engineering</li>
            <li>Cloud Architecture</li>
            <li>Performance Optimization</li>
            <li>DevOps and Reliability</li>
          </ul>
        </div>

        <div>
          <h4 className="text-muted-foreground text-sm font-semibold uppercase tracking-[0.14em]">
            Trust Signals
          </h4>
          <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
            <li>People-first, practical content</li>
            <li>Transparent authorship and expertise</li>
            <li>Outcome-focused technical guidance</li>
          </ul>
        </div>
      </div>

      <div className="border-border/70 mt-8 border-t">
        <div className="text-muted-foreground container mx-auto flex flex-col items-start justify-between gap-2 px-4 pt-4 text-xs md:flex-row md:items-center">
          <p>{year} Kube News. All rights reserved.</p>
          <p>Built with Next.js, NestJS, PostgreSQL, and Kubernetes.</p>
        </div>
      </div>
    </footer>
  );
}
