import React from 'react'
import classNames from 'classnames'

import BaseButtonAsync from './BaseButtonAsync.js'

import './Button.css'

const Button = React.forwardRef((props, ref) => (
	<BaseButtonAsync
		ref={ref}
		{...props}
		className={classNames('Button')}
	/>
))

export default Button