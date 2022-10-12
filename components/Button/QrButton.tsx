import clsx from 'clsx'
import { useState } from 'react'

import styles from './style.module.scss'
/***
 * @param textCopy text copy into clipboard
 * @param textTitle text show on screen
 * @param onCopy trigger event copy
 * @param iconCopy only copy when user click on icon
 */
interface Props {
	classes?: string
	textTitle?: string
	textClasses?: string
	content: string
}

const QrButton = ({ textTitle, textClasses, content, classes }: Props) => {
	const [view, setView] = useState(false)

	const onShowQr = (e: any) => {
		e.preventDefault()
	}

	return (
		<a onClick={onShowQr} className={clsx('link block-hor-center contrast-color-100')}>
			{textTitle && <span className={clsx(styles.text, textClasses)}>{textTitle}</span>}
			<span className={clsx('padding-left-xs pointer icon-qrcode contrast-color-100')} />
		</a>
	)
}

export default QrButton
