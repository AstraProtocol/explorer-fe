import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

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
}

const CopyButton = ({ textCopy, textTitle, onCopy }: Props) => {
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		const timeout = copied ? setTimeout(() => setCopied(false), 1 * 1000) : undefined
		return () => clearTimeout(timeout)
	}, [copied, setCopied])
	return (
		<CopyToClipboard
			text={textCopy}
			onCopy={() => {
				setCopied(true)
				if (onCopy) {
					onCopy()
				}
			}}
		>
			<div className={`contrast-color-100`}>
				{textTitle && <span className="">{textTitle}</span>}
				<span
					className={clsx('padding-left-xs pointer', {
						'copy-icon contrast-color-100': !copied,
						'checked-icon alert-color-success': copied
					})}
				/>
			</div>
		</CopyToClipboard>
	)
}

export default CopyButton
