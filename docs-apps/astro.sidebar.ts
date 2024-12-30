import type { StarlightUserConfig } from '@astrojs/starlight/types';
import { group } from './konfigurasi/sidebar';

/**
 * Starlight sidebar configuration object for the global site sidebar.
 *
 * - Top-level groups become tabs.
 * - Use the `group()` utility function to define groups. This uses labels from our
 *   `src/content/nav/*.ts` files instead of defining labels and translations inline.
 *
 */
export const sidebar = [
	// Start tab
	group('memulai', {
		items: [
			'memulai',
			group('memulai.selamat', {
				items: ['concepts/why-astro', 'concepts/islands', 'tutorial/0-introduction'],
			}),
			group('memulai.panduan', {
				items: ['install-and-setup', 'basics/project-structure', 'develop-and-build'],
			}),
		],
	}),

	// Guides tab
	group('medsos', {
		items: [
			'mediasosial',
			group('medsos.ig', {
				items: [
					'basics/astro-pages',
				],
			}),
			group('medsos.fb', {
				items: [
					'basics/astro-components',
				],
			}),
			group('medsos.xcom', {
				items: [
					'guides/markdown-content',
				],
			}),
			group('medsos.bluesky', {
				items: ['guides/on-demand-rendering', 'guides/server-islands', 'guides/actions'],
			}),
		],
	}),

	// Reference tab
	group('webdev', {
		items: [
			'webdeveloper',
			group('webdev.astro', {
				items: ['reference/astro-syntax', 'reference/directives-reference'],
			}),
			group('webdev.nextjs', {
				items: [
					'reference/api-reference',
				],
			}),
			group('webdev.react', {
				items: [
					'reference/integrations-reference',
				],
			}),
		],
	}),

	// Integrations tab
	group('gamedev', {
		items: [
			'gamedeveloper',
			group('gamedev.esx', {
				items: [
					'guides/integrations-guide/alpinejs',
				],
			}),
			group('gamedev.qbcore', {
				items: [
					'guides/integrations-guide/cloudflare',
				],
			}),
		],
	}),

	// Third-party services tab
	group('blogger', {
		items: [
			'blogmu',
			group('blogger.medium', {
				collapsed: true,
				autogenerate: { directory: 'guides/deploy' },
			}),
			group('blogger.tumblr', {
				collapsed: true,
				autogenerate: { directory: 'guides/cms' },
			}),
			group('blogger.vocalmedia', {
				collapsed: true,
				autogenerate: { directory: 'guides/backend' },
			}),
		],
	}),
] satisfies StarlightUserConfig['sidebar'];