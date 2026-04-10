declare module '*.mdx' {
  import type { ComponentType } from 'react';
  const component: ComponentType;
  export default component;
  export const slug: string;
  export const title: string;
  export const date: string;
  export const readingTime: string;
  export const tags: string[];
  export const excerpt: string;
}
