import configuration from '../configuration.js'

import { defaultLanguage, getLanguageNames } from '../messages/index.js'

export function getDefaultLanguage() {
	if (typeof window !== 'undefined') {
		if (isSupportedLanguage(navigator.language)) {
			return navigator.language
		}
	}
	return defaultLanguage
}

const SUPPORTED_LANGUAGES = Object.keys(getLanguageNames())

function isSupportedLanguage(language) {
	return SUPPORTED_LANGUAGES.includes(language)
}

export default function getDefaultSettings() {
	return {
		fontSize: 'm',
		locale: getDefaultLanguage(),
		...configuration.defaultSettings
	}
}