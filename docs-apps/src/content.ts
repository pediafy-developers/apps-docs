import { getCollection } from 'astro:content';
import { isEnglishEntry, isIndoEntry, isMemulaiEntry, isMedsosEntry } from './content.config';

export const allPages = await getCollection('docs', (entry) => {
	if (import.meta.env.PUBLIC_TWO_LANG) {
		// Build for two languages only to speed up Astro's smoke tests
		return isIndoEntry(entry) || isEnglishEntry(entry);
	} else {
		return true;
	}
});
export const medsosPages = allPages.filter(isMedsosEntry);
export const memulaiPages = allPages.filter(isMemulaiEntry);
export const indoPages = allPages.filter(isIndoEntry);