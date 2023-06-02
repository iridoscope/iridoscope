import path from 'path'
import webpack from 'webpack'

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

import HtmlPlugin from './html-plugin.js'

export function createConfiguration({ development }) {
	return {
		// Resolve all relative paths from the project root folder
		context: path.resolve('.'),

		// Webpack operation mode.
		mode: development ? 'development' : 'production',

		// Source Maps configuration.
		devtool: development ? 'eval-cheap-source-map' : 'source-map',

		output: {
			// Filesystem path for static files
			path: path.resolve('./build/assets'),

			// Network path for static files
			publicPath: '/',

			// Specifies the name of each output entry file
			filename: '[name].[contenthash].js',

			// Specifies the name of each (non-entry) chunk file
			chunkFilename: '[name].[contenthash].js'
		},

		module: {
			rules: [
				// Load *.js files.
				{
					test: /\.js$/,
					// Compile javascript for the app and some of its packages using SWC compiler:
					// * `react-pages` — Is an `npm` package. Is not compiled when published.
					// * `flexible-json-schema` — Is an `npm` package. Is not compiled when published.
					exclude: /node_modules[\/\\](?!(react-pages|flexible-json-schema)[\/\\])/,
					use: [{
						// https://blog.logrocket.com/migrating-swc-webpack-babel-overview/
						loader: 'swc-loader'
					}]
				},

				// Load CSS stylesheets.
				{
					test: /\.css$/,
					use: [{
						loader: 'style-loader'
					}, {
						loader: 'css-loader',
						options: {
							// The query parameter `importLoaders` allows to configure how many
							// loaders before css-loader should be applied to @imported resources.
							// `1` - `postcss-loader`.
							importLoaders: 1,
							sourceMap: true
						}
					}, {
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					}]
				},

				// Load pictures as file URLs.
				{
					test: /\.(jpg|png|gif)$/,
					use: [{
						loader: 'file-loader',
						options: {}
					}]
				},

				// Load SVG images as inline React elements.
				{
					test: /\.svg$/,
					use: [{
						loader: '@svgr/webpack'
					}]
				}
			]
		},

		experiments: {
			topLevelAwait: true
		},

		snapshot: {
			// Tell Webpack to not cache certain `node_modules` in order to observe
			// the changes in their code, either via hot-reload or by refreshing the page.
			// By default, Webpack caches the whole `node_modules` folder and doesn't hot-reload it.
			// https://webpack.js.org/configuration/other-options/#managedpaths
    	managedPaths: [
				// Don't cache packages:
				// * `example1` — An example of an `npm` package name.
				// * `example2` — An example of an `npm` package name.
				/(node_modules[\/\\](?!(example1|example2|react-pages)[\/\\]))/
    	]
		},

		// Hides "Entrypoint size exeeds the recommened limit (250kB)" warnings.
		// https://github.com/webpack/webpack/issues/3486
		performance: {
			hints: false
		},

		resolve: {
			// Fix Webpack when using symlinked packages with `npm link`/`yarn link`.
			// Prevents Webpack from "expanding" symlinked paths inside `node_modules`
			// to actual filesystem paths, so that `node_modules` from the main application
			// directory are used instead of searching `node_modules` in the symlinked folders.
			symlinks: false
		},

		// Plugins will be added to this array by extending configurations.
		plugins: [
			// Injects `js` and `css` bundles into `index.html`.
			HtmlPlugin({
				dev: development ? false : true
			}),

			// Add `react-refresh-webpack-plugin` in development mode
			// for React Fast Refresh ("hot reload").
			...(development ? [new ReactRefreshWebpackPlugin()] : [])
		]
	}
}

export default createConfiguration({ development: true })