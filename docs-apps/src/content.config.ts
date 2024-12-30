import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { defineCollection, z, type CollectionEntry } from 'astro:content';
import { AstroDocsI18nScema } from './content/i18n-scema';

export const baseSchema = z.object({
	type: z.literal('base').optional().default('base'),
	i18nReady: z.boolean().default(false),
	githubURL: z.string().url().optional(),
	hasREADME: z.boolean().optional(),
	// Extends Starlight’s default `hero` schema with custom fields.
	hero: z
		.object({
			facepile: z.object({
				tagline: z.string(),
				linkText: z.string(),
				link: z.string(),
			}),
		})
		.optional(),
});

export const deploySchema = baseSchema.extend({
	type: z.literal('deploy'),
});

export const backendSchema = baseSchema.extend({
	type: z.literal('backend'),
	stub: z.boolean().default(false),
	service: z.string(),
});

export const cmsSchema = baseSchema.extend({
	type: z.literal('cms'),
	stub: z.boolean().default(false),
	service: z.string(),
});

export const gamedevScema = baseSchema.extend({
	type: z.literal('gamedev'),
	title: z
		.string()
		.refine(
			(title) => title.startsWith('@astrojs/'),
			'"title" must start with "@astrojs/" for integration docs.'
		),
	category: z.enum(['renderer', 'adapter', 'other']),
	githubIntegrationURL: z.string().url(),
});

export const blogmuScema = baseSchema.extend({
	type: z.literal('blogmu'),
	stub: z.boolean().default(false),
	service: z.string(),
});

export const webdevScema = baseSchema.extend({
	type: z.literal('webdev'),
	framework: z.string(),
	stub: z.boolean().default(false),
});

export const medsosScema = baseSchema.extend({
	type: z.literal('medsos'),
	unitTitle: z.string().optional(),
});

export const memulaiScema = baseSchema.extend({
	type: z.literal('memulai'),
	description: z.string(),
	altTitle: z.string().optional(),
});

export const docsCollectionSchema = z.union([
	baseSchema,
	deploySchema,
	backendSchema,
	cmsSchema,
	gamedevScema,
	blogmuScema,
	webdevScema,
	medsosScema,
	memulaiScema,
]);

export type DocsEntryData = z.infer<typeof docsCollectionSchema>;

export type DocsEntryType = DocsEntryData['type'];

export type DocsEntry<T extends DocsEntryType> = CollectionEntry<'docs'> & {
	data: Extract<DocsEntryData, { type: T }>;
};

export function createIsDocsEntry<T extends DocsEntryType>(type: T) {
	return (entry: CollectionEntry<'docs'>): entry is DocsEntry<T> => entry.data.type === type;
}

export type DeployEntry = DocsEntry<'deploy'>;

export type BackendEntry = DocsEntry<'backend'>;

export type CmsEntry = DocsEntry<'cms'>;

export type blogmuEntry = DocsEntry<'blogmu'>;

export type WebdebEntry = DocsEntry<'webdev'>;

export type MedsosEntry = DocsEntry<'medsos'>;

export type MemulaiEntry = DocsEntry<'memulai'>;

export type GamedevCategory = z.infer<typeof gamedevScema>['category'];

export const isBackendEntry = createIsDocsEntry('backend');

export const isCmsEntry = createIsDocsEntry('cms');

export const isGamedevEntry = createIsDocsEntry('gamedev');

export const isBloggerEntry = createIsDocsEntry('blogmu');

export const isWebdevEntry = createIsDocsEntry('webdev');

export const isMedsosEntry = createIsDocsEntry('medsos');

export const isMemulaiEntry = createIsDocsEntry('memulai');

export function createIsLangEntry(lang: string) {
	return (entry: CollectionEntry<'docs'>): boolean => entry.id.startsWith(lang + '/');
}

export const isEnglishEntry = createIsLangEntry('en');
export const isIndoEntry = createIsLangEntry('id');

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({ extend: docsCollectionSchema }),
	}),
	i18n: defineCollection({
		loader: i18nLoader(),
		schema: i18nSchema({ extend: AstroDocsI18nScema }),
	}),
};