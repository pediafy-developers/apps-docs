// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { sidebar } from './astro.sidebar';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.pediafy.com/',
	integrations: [
		starlight({
			title: 'pediafy',
			logo:{
				light: './src/assets/images/p_light.png',
				dark: './src/assets/images/p_dark.png',
				replacesTitle: true,
			},
			customCss: [
				'./src/styles/styles.css',
				'./src/content/fonts/font-face.css',
			],
			sidebar,
			social: {
				instagram: 'https://instagram.com',
				facebook: 'https://facebook.com',
				"x.com": 'https://x.com',
				discord: 'https://discord.com',
				
			},
		}),
	],
});
