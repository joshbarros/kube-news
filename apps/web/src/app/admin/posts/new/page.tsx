'use client';

import { PostForm } from '@/components/post-form';
import { ProtectedRoute } from '@/components/protected-route';

export default function AdminNewPostPage() {
  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-muted-foreground mb-2 text-xs uppercase tracking-[0.2em]">
            Admin Posting
          </p>
          <h1 className="text-4xl tracking-tight [font-family:var(--font-display)] md:text-5xl">
            Publish a New Story
          </h1>
        </div>
        <PostForm />
      </div>
    </ProtectedRoute>
  );
}
