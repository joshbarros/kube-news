'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthShell } from '@/components/auth/auth-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { setAuthSession } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [nextPath, setNextPath] = useState('/admin');
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = params.get('next');
    if (next) setNextPath(next);
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error('Invalid credentials');

      const data = await res.json();
      setAuthSession(data.token, data.user);
      router.replace(nextPath);
      router.refresh();
    } catch {
      setError('Invalid credentials. Please check your email and password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Login"
      subtitle="Access the admin dashboard to publish and manage stories."
      altLabel="New here?"
      altHref="/register"
      altText="Create an account"
    >
      <form onSubmit={onSubmit} className="space-y-5">
        {error && (
          <p className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">{error}</p>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <Link
            href="/forgot-password"
            className="text-primary text-sm underline-offset-4 hover:underline"
          >
            Forgot password?
          </Link>
          <Button type="submit" className="rounded-full px-5" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </div>
      </form>
    </AuthShell>
  );
}
