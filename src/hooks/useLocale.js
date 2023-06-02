import { useSelector as useSelectorDefault } from 'react-redux'

export default function useLocale({ useSelector = useSelectorDefault } = {}) {
	return useSelector(state => state.settings.settings.locale)
}