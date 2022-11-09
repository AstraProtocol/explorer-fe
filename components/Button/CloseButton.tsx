import clsx from 'clsx'

/***
 * @param textCopy text copy into clipboard
 * @param textTitle text show on screen
 * @param onCopy trigger event copy
 * @param iconCopy only copy when user click on icon
 */
interface Props {
	classes?: string
	onClose: Function
}

const CloseButton = ({ classes, onClose }: Props) => {
	const onClick = (e: any) => {
		e.preventDefault()
		onClose()
	}

	return (
		<a onClick={onClick} className={clsx('link block-hor-center', classes)}>
			<span className={clsx('pointer icon-close text text-base same-color-100')} />
		</a>
	)
}

export default CloseButton
