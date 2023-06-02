import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { DropFileUpload, FileUploadButton } from 'react-responsive-ui'

import Button from '../components/Button.js'

import useMessages from '../hooks/useMessages.js'

import getPreviewImage from '../utility/getPreviewImage.js'

import './ChoosePhoto.css'

export default function ChoosePhoto() {
	const messages = useMessages()

	const [file, setFile] = useState()
	const [previewImage, setPreviewImage] = useState()

	const onFileChosen = async (file) => {
		const [type, subtype] = file.type.split('/')
		if (type !== 'image') {
			return alert(messages.choosePhoto.notAnImage)
		}

		// Create image preview.
		const previewImage = await getPreviewImage(file)
		setPreviewImage(previewImage)
		setFile(file)
	}

	return (
		<section className="ChoosePhoto">
			<DropFileUpload clickable={false} onChange={onFileChosen}>
				<h2>
					{messages.choosePhoto.text}
				</h2>
				{!file &&
					<FileUploadButton
						component={Button}
						onChange={onFileChosen}
						className="ChoosePhoto-button">
						{messages.choosePhoto.button}
					</FileUploadButton>
				}
				{file &&
					<img
						src={previewImage.url}
						className="ChoosePhoto-preview"
					/>
				}
			</DropFileUpload>
		</section>
	)
}