import en from './en.json'
import ru from './ru.json'

export default function getMessages(language) {
	switch (language) {
		case 'ru':
			return ru;
		case 'en':
			return en;
		default:
			return ru;
	}
}

export const getLanguageNames = () => ['en', 'ru']

export const defaultLanguage = 'ru'