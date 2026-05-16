'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type { CreatePostInput } from '@kube-news/types';
import { useCreatePostMutation } from '@/lib/api/posts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function PostForm() {
  const router = useRouter();
  const [createPost, { isLoading, error }] = useCreatePostMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostInput>();

  const onSubmit = async (data: CreatePostInput) => {
    await createPost(data).unwrap();
    router.push('/');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          Something went wrong. Please try again.
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Article title"
          {...register('title', { required: 'Title is required', minLength: 3, maxLength: 80 })}
        />
        {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Input
          id="summary"
          placeholder="One-line description"
          {...register('summary', { required: 'Summary is required', minLength: 10, maxLength: 160 })}
        />
        {errors.summary && <p className="text-xs text-destructive">{errors.summary.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Write your article here..."
          rows={12}
          {...register('content', { required: 'Content is required', minLength: 20, maxLength: 5000 })}
        />
        {errors.content && <p className="text-xs text-destructive">{errors.content.message}</p>}
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Publishing…' : 'Publish'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
