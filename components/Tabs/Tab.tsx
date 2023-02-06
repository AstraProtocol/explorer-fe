import clsx from 'clsx'
import styles from './style.module.scss'

interface Props {
	active: boolean
	title: string | React.ReactNode
	onClick?: any
	padding?: string
}

const BorderActive = () => <div className={styles.borderActive} />

const Tab = ({ active, title, onClick, padding }: Props) => {
	if (active)
		return (
			<a
				onClick={onClick}
				className={clsx(
					styles.tab,
					styles.tabActive,
					'text',
					'text-base text-bold',
					padding || 'padding-top-lg padding-bottom-sm',
					'padding-left-xs padding-right-xs',
					'margin-right-sm'
				)}
			>
				<span>{title}</span>
				<BorderActive />
			</a>
		)
	return (
		<a
			onClick={onClick}
			className={clsx(
				styles.tab,
				'text',
				'text-base',
				padding || 'padding-top-lg padding-bottom-sm',
				'padding-left-xs padding-right-xs',
				'margin-right-sm'
			)}
		>
			<span>{title}</span>
		</a>
	)
}

export default Tab
