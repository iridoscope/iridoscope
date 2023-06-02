import routes  from './routes.js'
import * as reducers from './redux/reducers.with-hot-reload.js'

import ApplicationWrapper from './components/ApplicationWrapper.js'
import PageLoading from './components/PageLoading.js'

// Uncomment for "server-side-rendering" build.
// // "Favicon" must be imported on the client side too
// // since no assets are emitted on the server side
// export { default as icon } from '../assets/images/icon/icon-192.png'

export default function getReactPagesConfig() {
	return {
		rootComponent: ApplicationWrapper,
		routes,
		reducers,

		// When the website is open in a web browser,
		// hide website content under a "preloading" screen
		// until the application has finished loading.
		// It still "blinks" a bit in development mode
		// because CSS styles in development mode are included
		// not as `*.css` files but dynamically via javascript
		// by adding a `<style/>` DOM element, and that's why
		// in development mode styles are not applied immediately
		// in a web browser. In production mode CSS styles are
		// included as `*.css` files so they are applied immediately.
		initialLoadHideAnimationDuration: 160,
		initialLoadShowDelay: 0,
		InitialLoadComponent: PageLoading,

		// (optional)
		// "Basename" is the URL path prefix for the "root" URL of the website.
		// Example:
		// * Website URL is "iridoscope.github.io", basename is empty.
		// * Website URL is "hosting.domain.com/iridoscope", basename is "iridoscope".
		// basename: '/example',

		// (optional)
		// onLoadError: createOnLoadError({
		// 	'404': '/not-found',
		// 	'500': '/error'
		// })
	}
}

// This error handler catches any errors originating from `.load()` functions
// when those functions are defined on page components.
// See `react-pages` docs for more details.
//
// function createOnLoadError(errorPages) {
// 	return function onLoadError(error, { path, url, redirect, dispatch, useSelector, server }) {
// 	  console.error('--------------------------------');
// 	  console.error(`Error while loading "${url}"`);
// 	  console.error('--------------------------------');
// 		console.error(error.stack)
// 		const redirectToErrorPage = (errorPagePath) => {
// 			// Prevents infinite redirection loop or double redirection.
// 			// For example, a double redirection in case of `/unauthenticated`.
// 			// (e.g. when two parallel `Promise`s load inside `load()`
// 			//  and both get Status 401 HTTP Response).
// 			// Or, for example, an infinite redirection loop in case of `/error`
// 			// when there're overall page rendering bugs, etc.
// 			if (path !== errorPagePath) {
// 				redirect(`${errorPagePath}?url=${encodeURIComponent(url)}`)
// 			}
// 		}
// 		console.log(errorPages[String(error.status)] || errorPages['500'])
// 		redirectToErrorPage(errorPages[String(error.status)] || errorPages['500'])
// 	}
// }