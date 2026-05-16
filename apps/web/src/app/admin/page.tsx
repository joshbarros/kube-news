'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ProtectedRoute } from '@/components/protected-route';
import { clearAuthSession, getAuthUser } from '@/lib/auth';

export default function AdminDashboardPage() {
  const router = useRouter();
  const user = typeof window !== 'undefined' ? getAuthUser() : null;

  const onLogout = () => {
    clearAuthSession();
    router.replace('/login');
  };

  return (
    <ProtectedRoute>
      <section className="glass-panel mx-auto max-w-4xl rounded-3xl p-6 md:p-10">
        <p className="text-muted-foreground mb-2 text-xs uppercase tracking-[0.2em]">
          Admin Dashboard
        </p>
        <h1 className="text-4xl tracking-tight [font-family:var(--font-display)] md:text-5xl">
          Welcome{user?.name ? `, ${user.name}` : ''}
        </h1>
        <p className="text-muted-foreground mt-3 max-w-2xl text-sm md:text-base">
          This is the protected editorial area. Only authenticated users can publish and manage
          content.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild className="rounded-full px-5">
            <Link href="/admin/posts/new">Create new post</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/">View public site</Link>
          </Button>
          <Button variant="ghost" className="rounded-full" onClick={onLogout}>
            Log out
          </Button>
        </div>
      </section>
    </ProtectedRoute>
  );
}
