import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './BaseButton.css'

/**
 * An unstyled `<button/>`.
 */
let BaseButton = ({
	type,
	style,
	className,
	children,
	...rest
}, ref) => {
	return (
		<button
			{...rest}
			ref={ref}
			type={type}
			style={typeof style === 'string' ? undefined : style}
			className={classNames(
				'BaseButton',
				className,
				typeof style === 'string' && getClassName(style)
			)}>
			{children}
		</button>
	)
}

BaseButton = React.forwardRef(BaseButton)

BaseButton.propTypes = {
	type: PropTypes.oneOf(['button', 'submit']).isRequired,
	style: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
	className: PropTypes.string,
	// Sometimes there can be empty buttons:
	// for example, round buttons styled via CSS.
	children: PropTypes.node //.isRequired
}

BaseButton.defaultProps = {
	type: 'button'
}

export default BaseButton

function getClassName(style) {
	switch (style) {
		case 'text-multiline':
			return 'BaseButton--text BaseButton--multiline'
		default:
			return `BaseButton--${style}`
	}
}