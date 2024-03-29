import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styles from './style.module.scss'
/***
 * @param textCopy text copy into clipboard
 * @param textTitle text show on screen
 * @param onCopy trigger event copy
 * @param iconCopy only copy when user click on icon
 */
interface Props {
	textCopy: string
	textTitle?: JSX.Element | string
	onCopy?: Function
	iconCopy?: boolean
	textColor?: string
	textClasses?: string
	size?: 'small' | 'medium' | 'large'
	classes?: string
}

const CopyButton = ({ classes, textCopy, textTitle, onCopy, textColor, textClasses, size = 'medium' }: Props) => {
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		const timeout = copied ? setTimeout(() => setCopied(false), 1 * 1000) : undefined
		return () => clearTimeout(timeout)
	}, [copied, setCopied])

	const fontSize = size === 'large' ? 24 : size === 'medium' ? 20 : 16
	return (
		<div className={classes}>
			<CopyToClipboard
				text={textCopy}
				onCopy={() => {
					setCopied(true)
					if (onCopy) {
						onCopy()
					}
				}}
			>
				<div className={clsx('block-hor-center', textColor || 'contrast-color-100')}>
					{textTitle && <span className={clsx(styles.text, textClasses)}>{textTitle}</span>}
					<span
						style={{ fontSize }}
						className={clsx('padding-left-xs pointer word-break-all', {
							'icon-copy contrast-color-100': !copied,
							'icon-checked alert-color-success': copied
						})}
					/>
				</div>
			</CopyToClipboard>
		</div>
	)
}

export default CopyButton
