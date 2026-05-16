import type { MetadataRoute } from 'next';
import type { Post } from '@kube-news/types';
import { pillarGuides } from '@/lib/pillars';
import { siteConfig } from '@/lib/site';

async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.url}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/learn`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/posts/${post.id}`,
    lastModified: new Date(post.updatedAt || post.publishDate),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const learnRoutes: MetadataRoute.Sitemap = pillarGuides.map((guide) => ({
    url: `${siteConfig.url}/learn/${guide.slug}`,
    lastModified: new Date(`${guide.updatedAt}T00:00:00.000Z`),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...postRoutes, ...learnRoutes];
}
