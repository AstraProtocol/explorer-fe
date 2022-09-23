import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { selectTheme } from '../../slices/themeSlice'
import { useAppSelector } from '../../store/hooks'
import styles from './style.module.scss'

type ModalWrapperProps = {
	open: boolean
	children: React.ReactNode
}

const ModalWrapper = ({ open, children }: ModalWrapperProps) => {
	const theme = useAppSelector(selectTheme)
	const [isBrowser, setIsBrowser] = useState(false)

	useEffect(() => {
		setIsBrowser(true)
	}, [])

	const modalContent = open ? <div className={clsx(styles.modal, theme)}>{children}</div> : null

	if (isBrowser) {
		return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'))
	} else {
		return null
	}
}
export default ModalWrapper
