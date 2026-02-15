import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Content is managed by TinaCMS and loaded via fs in pages.
// These definitions suppress Astro's auto-generation warnings.
const about = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/about' }),
  schema: z.any(),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/blog' }),
  schema: z.any(),
});

const cv = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/cv' }),
  schema: z.any(),
});

const education = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/education' }),
  schema: z.any(),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/portfolio' }),
  schema: z.any(),
});

const settings = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/settings' }),
  schema: z.any(),
});

const socialLinks = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/social-links' }),
  schema: z.any(),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/testimonials' }),
  schema: z.any(),
});

export const collections = {
  about,
  blog,
  cv,
  education,
  portfolio,
  settings,
  'social-links': socialLinks,
  testimonials,
};
