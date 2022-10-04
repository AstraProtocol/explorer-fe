import clsx from 'clsx'
import styles from './style.module.scss'

interface Props {
	active: boolean
	title: string
	onClick?: any
}

const BorderActive = () => <div className={styles.borderActive} />

const Tab = ({ active, title, onClick }: Props) => {
	if (active)
		return (
			<a
				onClick={onClick}
				className={clsx(
					styles.tab,
					styles.tabActive,
					'text',
					'text-base text-bold',
					'padding-top-lg padding-bottom-sm'
				)}
			>
				<span>{title}</span>
				<BorderActive />
			</a>
		)
	return (
		<a onClick={onClick} className={clsx(styles.tab, 'text', 'text-base', 'padding-top-lg padding-bottom-sm')}>
			<span>{title}</span>
		</a>
	)
}

export default Tab
