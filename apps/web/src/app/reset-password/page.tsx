'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthShell } from '@/components/auth/auth-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialToken = params.get('token') ?? '';
    setToken(initialToken);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!res.ok) throw new Error('Reset token is invalid or expired');

      const data = await res.json();
      setMessage(data.message ?? 'Password reset successfully.');
      setTimeout(() => router.replace('/login'), 1200);
    } catch {
      setError('Reset token is invalid or expired.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Reset Password"
      subtitle="Set your new password to regain access."
      altLabel="Need a new token?"
      altHref="/forgot-password"
      altText="Request reset"
    >
      <form onSubmit={onSubmit} className="space-y-5">
        {message && <p className="bg-accent/30 rounded-md p-3 text-sm">{message}</p>}
        {error && (
          <p className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">{error}</p>
        )}

        <div className="space-y-2">
          <Label htmlFor="token">Reset token</Label>
          <Input id="token" value={token} onChange={(e) => setToken(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">New password</Label>
          <Input
            id="newPassword"
            type="password"
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="rounded-full px-5" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update password'}
          </Button>
        </div>
      </form>
    </AuthShell>
  );
}
