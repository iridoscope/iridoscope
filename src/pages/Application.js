import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'

import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import PageLoadingIndicator from '../components/PageLoadingIndicator.js'
import Snackbar from '../components/Snackbar.js'

import { getSettings } from '../redux/settings.js'

import useDeviceInfo from '../hooks/useDeviceInfo.js'
import useOnWindowResize from '../hooks/useOnWindowResize.js'
// import OkCancelModal from 'frontend-lib/components/OkCancelModal.js'

import useMessages from '../hooks/useMessages.js'

import configuration from '../configuration.js'

import './Application.css'

// Not importing `react-time-ago/Tooltip.css` because
// it's already loaded as part of `react-responsive-ui/style.css`.
// import 'react-time-ago/Tooltip.css'

export default function Application({ children }) {
	return (
		<App>
			{children}
		</App>
	)
}

Application.propTypes = {
	children: PropTypes.node
}

Application.load = {
	load: async ({ dispatch, useSelector, location }) => {
		dispatch(getSettings())
		// Tests initial loading indicator.
		// await new Promise(resolve => setTimeout(resolve, 5000))
	},
	blocking: true
}

Application.meta = () => {
	return {
		site_name: 'Иридоскоп',
		title: 'Иридоскоп',
		description: 'Приложение для проведения простейшего иридоанализа',
		image: 'https://iridoscope.github.io/images/icon/icon-512.png'
	}
}

function App({
	children
}) {
	const dispatch = useDispatch()
	const messages = useMessages()

	const [initialized, setInitialized] = useState()

	// Detects touch capability and screen size.
	useDeviceInfo()

	// useOnWindowResize(measure, { alsoAfterMount: true })

	useEffect(() => {
		setInitialized(true)
	}, [])

	return (
		<div>
			{/* Page loading indicator */}
			<PageLoadingIndicator/>

			{/* Pop-up messages */}
			<Snackbar placement="bottom"/>

			<div className={classNames('Webpage')}>
				<Header/>

				{/* `<main/>` is focusable for keyboard navigation: page up, page down. */}
				<main
					tabIndex={-1}
					className="Webpage-content">
					{children}
				</main>

				<Footer/>
			</div>
		</div>
	)
}

App.propTypes = {
	children: PropTypes.node
}

function setBodyBackground(route) {
	// Set or reset "document--background" class
	// which changes `<body/>` background color
	// in order to show correct color when scrolling
	// past top/bottom of the page on touch devices.
	// if (isContentSectionsPage(route) && !isThreadPage(route)) {
	if (isContentSectionsPage(route)) {
		document.body.classList.add('document--background')
	} else {
		document.body.classList.remove('document--background')
	}
}

// This is hot-reloadable.
window._onBeforeNavigate = ({ dispatch }) => {
	onBeforeNavigate({ dispatch })
}

// This is hot-reloadable.
window._onNavigate = ({ dispatch }) => {
	onNavigate({ dispatch })
}