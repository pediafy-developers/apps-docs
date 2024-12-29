import type starlight from '@astrojs/starlight';
import { normalizeLangTag } from '../src/utils/normalizeLangTag';
import languages from '../src/lang';

type StarlightLocalesConfig = NonNullable<Parameters<typeof starlight>[0]['locales']>;

export function LocalesConfig(): StarlightLocalesConfig {
	return Object.fromEntries(
		Object.entries(languages).map(([locale, label]) => [
			locale,
			{ label, lang: normalizeLangTag(locale) },
		])
	);
}
