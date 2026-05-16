import Link from 'next/link';

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  altLabel?: string;
  altHref?: string;
  altText?: string;
}

export function AuthShell({
  title,
  subtitle,
  children,
  altLabel,
  altHref,
  altText,
}: AuthShellProps) {
  return (
    <div className="grid min-h-[calc(100vh-11rem)] gap-6 lg:grid-cols-2">
      <section className="glass-panel hero-reveal relative overflow-hidden rounded-3xl p-8 md:p-12">
        <div
          className="bg-primary/25 absolute -left-10 -top-10 h-48 w-48 rounded-full blur-2xl"
          aria-hidden
        />
        <p className="text-muted-foreground mb-3 text-xs uppercase tracking-[0.2em]">
          Admin Access
        </p>
        <h1 className="text-4xl leading-tight tracking-tight [font-family:var(--font-display)] md:text-5xl">
          Secure editorial controls for your newsroom.
        </h1>
        <p className="text-muted-foreground mt-4 max-w-md text-sm md:text-base">
          Manage publishing access in a dedicated authenticated area. Only logged-in users can
          create, edit, and delete stories.
        </p>
      </section>

      <section className="glass-panel rounded-3xl p-6 md:p-10">
        <h2 className="text-3xl tracking-tight [font-family:var(--font-display)]">{title}</h2>
        <p className="text-muted-foreground mt-2 text-sm">{subtitle}</p>
        <div className="mt-8">{children}</div>
        {altLabel && altHref && altText && (
          <p className="text-muted-foreground mt-6 text-sm">
            {altLabel}{' '}
            <Link href={altHref} className="text-primary underline-offset-4 hover:underline">
              {altText}
            </Link>
          </p>
        )}
      </section>
    </div>
  );
}
