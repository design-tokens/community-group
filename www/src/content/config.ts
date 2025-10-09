// Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';
// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        date: z
          .string()
          .or(z.date())
          .transform((val) => new Date(val)),
        // description: z.string(),
        author: z.string(),
        // tags: z.array(z.string()),
      })
      .strict(),
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
};
