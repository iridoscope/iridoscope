import * as Sentry from '@sentry/browser'

import configuration from './configuration.js'

export default function() {
	// Initialize `sentry.io`.
	if (process.env.NODE_ENV === 'production') {
		if (configuration.sentryUrl) {
			onCookiesAccepted(() => {
				Sentry.init({
					dsn: configuration.sentryUrl
				})
			})
		}
	}
}