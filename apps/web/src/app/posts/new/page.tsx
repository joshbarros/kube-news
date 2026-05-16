import { PostForm } from '@/components/post-form';

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">New Post</h1>
      <PostForm />
    </div>
  );
}
