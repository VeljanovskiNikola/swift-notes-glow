import { ComponentType } from "react";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  tags: string[];
  excerpt: string;
  Content: ComponentType;
}

interface MdxModule {
  default: ComponentType;
  frontmatter: {
    slug: string;
    title: string;
    date: string;
    readingTime: string;
    tags: string[];
    excerpt: string;
  };
}

const modules = import.meta.glob<MdxModule>("../content/posts/*.mdx", {
  eager: true,
});

export const posts: BlogPost[] = Object.values(modules)
  .map((mod) => ({
    ...mod.frontmatter,
    Content: mod.default,
  }))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
