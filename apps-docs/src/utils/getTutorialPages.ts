import type { TutorialEntry } from '~/content.config';
import { stripLangFromSlug } from '~/utils/path-utils';
import { groupPagesByLang } from './groupPagesByLang';

/** Get a full list of pages for the tutorial in the current language, falling back to English if not available. */
export function getTutorialPages(allPages: TutorialEntry[], lang: string) {
	const pagesByLang = groupPagesByLang(allPages);
	/** Pages */
	const pages = pagesByLang['id']
		.map((indonesiaPage) => {
			const idSlug = stripLangFromSlug(indonesiaPage.id);
			const langPage = pagesByLang[lang]?.find((page) => stripLangFromSlug(page.id) === idSlug);
			return {
				...((langPage as TutorialEntry) || (indonesiaPage as TutorialEntry)),
				isFallback: !langPage,
			};
		})
		.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
	return pages;
}

/** Turn a flat list of tutorial pages into a hierarchical array of units and lessons. */
export function getTutorialUnits(tutorialPages: TutorialEntry[]) {
	return tutorialPages.reduce(
		(units, page) => {
			if (page.data.unitTitle) {
				units.push({
					title: page.data.unitTitle,
					lessons: [page],
				});
			} else {
				units.at(-1)?.lessons.push(page);
			}
			return units;
		},
		[] as { title: string; lessons: typeof tutorialPages }[]
	);
}
