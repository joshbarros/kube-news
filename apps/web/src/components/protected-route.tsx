'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      const next = encodeURIComponent(pathname || '/admin');
      router.replace(`/login?next=${next}`);
      return;
    }

    setReady(true);
  }, [pathname, router]);

  if (!ready) {
    return (
      <div className="glass-panel text-muted-foreground mx-auto max-w-3xl rounded-3xl p-10 text-center">
        Checking your session...
      </div>
    );
  }

  return <>{children}</>;
}
