import fs from 'fs'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

// Could also use `npm_package_version` environment variable.
import Package from '../package.json' assert { type: 'json' }

import DEFAULT_CONFIGURATION from '../configuration/default.json' assert { type: 'json' }

let defaultConfiguration = DEFAULT_CONFIGURATION

if (process.env.CONFIG_PATH) {
	let customConfigPath = process.env.CONFIG_PATH
	if (customConfigPath[0] === '.') {
		customConfigPath = path.resolve(customConfigPath)
	}
	// if (fs.existsSync(CUSTOM_CONFIG_PATH)) {}
	const customConfiguration = JSON.parse(fs.readFileSync(customConfigPath, 'utf8'))
	defaultConfiguration = {
		...defaultConfiguration,
		...customConfiguration
	}
}

const CUSTOM_DEV_CONFIG_PATH = path.join('configuration', 'custom.json')
let CUSTOM_DEV_CONFIG
if (fs.existsSync(CUSTOM_DEV_CONFIG_PATH)) {
	CUSTOM_DEV_CONFIG = JSON.parse(fs.readFileSync(CUSTOM_DEV_CONFIG_PATH, 'utf8'))
}

// Injects `js` and `css` bundles into `index.html`.
export default function({ dev }) {
	return new HtmlWebpackPlugin({
		template: 'src/index.html',
		minify: false,
		inject: dev ? true : false,
		// favicon: 'assets/images/icon/icon-192.png',
		// Seems to use "lodash" templates.
		templateParameters: {
			defaultConfiguration: JSON.stringify({
				...(dev ? CUSTOM_DEV_CONFIG : undefined),
				...defaultConfiguration
			}, null, '\t'),
			googleAnalytics: dev ? false : true,
			productionBuild: dev ? false : true,
			version: Package.version
		}
	})
}