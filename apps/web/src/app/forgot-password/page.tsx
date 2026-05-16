'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AuthShell } from '@/components/auth/auth-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message ?? 'If this email exists, a reset link has been generated.');
      if (data.resetToken) setResetToken(data.resetToken);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Forgot Password"
      subtitle="Request a password reset token."
      altLabel="Remember your password?"
      altHref="/login"
      altText="Back to login"
    >
      <form onSubmit={onSubmit} className="space-y-5">
        {message && <p className="bg-accent/30 rounded-md p-3 text-sm">{message}</p>}

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

        <div className="flex justify-end">
          <Button type="submit" className="rounded-full px-5" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send reset link'}
          </Button>
        </div>

        {resetToken && (
          <div className="border-border/70 rounded-md border p-3 text-sm">
            <p className="mb-1 font-semibold">Development token</p>
            <p className="text-muted-foreground break-all">{resetToken}</p>
            <Link
              className="text-primary mt-2 inline-block underline-offset-4 hover:underline"
              href={`/reset-password?token=${encodeURIComponent(resetToken)}`}
            >
              Continue to reset page
            </Link>
          </div>
        )}
      </form>
    </AuthShell>
  );
}
