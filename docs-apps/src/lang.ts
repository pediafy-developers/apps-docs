const allLanguages = {
	en: 'English',
	id: 'Bahasa Indonesia',
} as const;

// Build for two languages only to speed up Astro's smoke tests
const twoLanguages = {
	en: 'English',
	id: 'Bahasa Indonesia',
} as const;

/**
 * Map of language codes to a written out language name.
 * Used to populate the language switcher in the navbar.
 */
export default import.meta.env?.PUBLIC_TWO_LANG ? twoLanguages : allLanguages;