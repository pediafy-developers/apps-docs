import { getCollection } from 'astro:content';
import { isIndonesiaEntry, isEnglishEntry, isRecipeEntry, isTutorialEntry } from './content.config';

export const allPages = await getCollection('docs', (entry) => {
	if (import.meta.env.PUBLIC_TWO_LANG) {
		// Build for two languages only to speed up Astro's smoke tests
		return isIndonesiaEntry(entry) || isEnglishEntry(entry);
	} else {
		return true;
	}
});
export const tutorialPages = allPages.filter(isTutorialEntry);
export const recipePages = allPages.filter(isRecipeEntry);
export const indonesiaPages = allPages.filter(isIndonesiaEntry);
