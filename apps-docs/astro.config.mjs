// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.pediafy.com',
	integrations: [
		starlight({
			title: 'Dokumentasi',
			defaultLocale: 'id',
			locales: {
				id: {
					label: 'Indonesia', lang: 'id',
				},
			},
			customCss: [
				'./src/styles/custom.css',
			],
			social: {
				discord: 'https://discord.com',
				threads: 'https://threads.com/pediafy',
				"x.com": 'https://x.com/pediafy',
				instagram: 'https://instagram.com/pediafy',
				facebook: 'https://facebook.com/pediafy',
			},
			sidebar: [
				{ label: 'Home', link: '/' },
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
