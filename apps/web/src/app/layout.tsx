import type { Metadata } from 'next';
import { Fraunces, Space_Grotesk } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { Providers } from '@/providers';
import './globals.css';

const displayFont = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
});

const bodyFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Kube News',
  description: 'A news portal demo running on Kubernetes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${displayFont.variable} ${bodyFont.variable} font-[family-name:var(--font-body)]`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(() => { try { const t = localStorage.getItem('theme'); const root = document.documentElement; if (t === 'light') { root.classList.remove('dark'); } else { root.classList.add('dark'); } } catch (_) {} })();",
          }}
        />
        <Providers>
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
            <div className="orb bg-primary/20 absolute -left-16 top-10 h-56 w-56 rounded-full" />
            <div className="orb bg-accent/20 absolute right-0 top-20 h-64 w-64 rounded-full [animation-delay:2s]" />
            <div className="orb bg-secondary/30 absolute bottom-0 left-1/3 h-72 w-72 rounded-full [animation-delay:4s]" />
          </div>
          <Navbar />
          <main className="container mx-auto px-4 py-8 md:py-12">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
