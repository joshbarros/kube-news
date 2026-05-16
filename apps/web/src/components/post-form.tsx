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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass-panel space-y-6 rounded-3xl p-6 md:p-8"
    >
      {error && (
        <p className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
          Something went wrong. Please try again.
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Article title"
          className="bg-background/75"
          {...register('title', { required: 'Title is required', minLength: 3, maxLength: 80 })}
        />
        {errors.title && <p className="text-destructive text-xs">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Input
          id="summary"
          placeholder="One-line description"
          className="bg-background/75"
          {...register('summary', {
            required: 'Summary is required',
            minLength: 10,
            maxLength: 160,
          })}
        />
        {errors.summary && <p className="text-destructive text-xs">{errors.summary.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Write your article here..."
          className="bg-background/75"
          rows={12}
          {...register('content', {
            required: 'Content is required',
            minLength: 20,
            maxLength: 5000,
          })}
        />
        {errors.content && <p className="text-destructive text-xs">{errors.content.message}</p>}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isLoading} className="rounded-full px-5">
          {isLoading ? 'Publishing…' : 'Publish'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="rounded-full"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
