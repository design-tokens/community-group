import { z, defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';

const DATE = z
  .string()
  .or(z.date())
  .transform((val) => new Date(val));

const w3c = defineCollection({
  loader: file('src/content/w3c.json'),
  schema: () =>
    z.object({
      title: z.string(),
      date: DATE,
      author: z.string(),
      url: z.string(),
    }),
});

const posts = defineCollection({
  loader: glob({ pattern: ['*.md'], base: 'src/content/posts' }),
  schema: () =>
    z.object({
      title: z.string(),
      date: DATE,
      description: z.optional(z.string()),
      author: z.string(),
      tags: z.optional(z.array(z.string())),
    }),
});

export const collections = {
  posts,
  w3c,
};
