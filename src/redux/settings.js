import { ReduxModule } from 'react-pages'

import getDefaultSettings from '../utility/getDefaultSettings.js'

const redux = new ReduxModule()

export const getSettings = redux.simpleAction(
	(state) => {
		return {
			...state,
			settings: getSettings_()
		}
	}
)

export const saveLocale = redux.simpleAction(
	(state, { locale, userSettings }) => {
		return {
			...state,
			settings: saveSetting('locale', locale, { userSettings })
		}
	}
)

export const saveFontSize = redux.simpleAction(
	(state, { fontSize, userSettings }) => {
		return {
			...state,
			settings: saveSetting('fontSize', fontSize, { userSettings })
		}
	}
)

export default redux.reducer()

/**
 * Applies a setting and saves it to `localStorage`.
 * @param  {string} name
 * @param  {(string|number|boolean)} [value] — Will reset the setting if `value` is `undefined`.
 * @return {object} The updated settings
 */
function saveSetting(name, value, { userSettings }) {
	userSettings.set(name, value)
	return getSettings_()
}

function getSettings_() {
	return {
		...getDefaultSettings()
	}
}