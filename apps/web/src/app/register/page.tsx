'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthShell } from '@/components/auth/auth-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { setAuthSession } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) throw new Error('Registration failed');

      const data = await res.json();
      setAuthSession(data.token, data.user);
      router.replace('/admin');
      router.refresh();
    } catch {
      setError('Could not create your account. Try a different email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Register"
      subtitle="Create your account to access the protected publishing area."
      altLabel="Already have an account?"
      altHref="/login"
      altText="Sign in"
    >
      <form onSubmit={onSubmit} className="space-y-5">
        {error && (
          <p className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">{error}</p>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

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
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="rounded-full px-5" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </div>
      </form>
    </AuthShell>
  );
}
