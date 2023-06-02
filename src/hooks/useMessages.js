import getMessages from '../messages/index.js'
import useLocale from './useLocale.js'

export default function useMessages({ useSelector } = {}) {
	const locale = useLocale({ useSelector })
	return getMessages(locale)
}