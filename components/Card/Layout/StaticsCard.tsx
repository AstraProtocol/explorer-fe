import clsx from 'clsx'
import Row from 'components/Grid/Row'
import isUndefined from 'lodash/isUndefined'
import styles from './style.module.scss'

interface Props {
	icon: 'wallet-icon' | 'copy-icon'
	title: string
	content: string | number | undefined
	classes?: string
	contentClasses?: string
}

const StaticsCard = ({ icon, title, content, classes, contentClasses }: Props) => {
	return (
		<div className={clsx(styles.staticsCard, classes)}>
			<Row className={'block-ver-center'}>
				<div className={clsx(styles.iconBlock, 'block-center')}>
					<span className={icon}></span>
				</div>
				<div className={clsx(styles.contentBlock)}>
					<span className={clsx('text', 'text-sm', 'contrast-color-70')}>{title}</span>
					<span className={clsx('money', 'money-sm', 'money-bold', contentClasses)}>
						{isUndefined(content) ? 'NaN' : content}
					</span>
				</div>
			</Row>
		</div>
	)
}

export default StaticsCard
