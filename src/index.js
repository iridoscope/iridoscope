// `core-js` and `regenerator-runtime` would've been imported here
// in case of using `useBuiltIns: 'entry'` option of `@babel/preset-env`
// https://stackoverflow.com/questions/52625979/confused-about-usebuiltins-option-of-babel-preset-env-using-browserslist-integ
// https://babeljs.io/docs/en/babel-preset-env
//
// When using `useBuiltIns: 'auto'`, importing `core-js` and `regenerator-runtime`
// explicitly is not required, and Babel adds those automatically.
//
// SWC mimicks this feature of Babel's `preset-env`:
// https://swc.rs/docs/configuration/supported-browsers
//
// This project uses `mode: 'usage'` flag of SWC.
// * In this repo's `.swcrc`
// * In `frontend-lib` repo's `.swcrc`
// * In `social-components-react` repo's `.swcrc`
//
// // ES6 polyfill.
// import 'core-js/stable'
// // `async/await` support.
// import 'regenerator-runtime/runtime'

// CSS styles.
// Should be loaded before any `*.js` imports
// because `*.js` files import `*.css` files too,
// and those should be applied over the default styles
// that're defined in `./styles/style.css`.
import './styles/style.css'

import renderApp from './render.js'
import initializeApp from './initialize.js'

// Run the application.
try {
	initializeApp()
	await renderApp()
} catch (error) {
	console.error(error.stack || error)
	alert(error.message)
}