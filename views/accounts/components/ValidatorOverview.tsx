import clsx from 'clsx'
import styles from '../style.module.scss'

const ValidatorOverview = ({ validator }) => {
	return (
		<div
			style={{ justifyContent: 'space-between' }}
			className={clsx(styles.borderBottom, 'padding-bottom-lg padding-top-lg')}
		>
			<span className="text text-base contrast-color-50">Description</span>
			<br />
			<span className="text text-base">{validator.details}</span>
		</div>
	)
}

export default ValidatorOverview
