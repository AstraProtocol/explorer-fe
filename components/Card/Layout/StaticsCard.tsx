import clsx from 'clsx'
import Row from 'components/Grid/Row'
import isUndefined from 'lodash/isUndefined'
import Image from 'next/image'
import { Icon } from 'utils/enum'
import styles from './style.module.scss'

interface Props {
	icon: Icon
	title: string
	content: string | number | undefined
	classes?: string
	contentClasses?: string
}

const StaticsCard = ({ icon, title, content, classes, contentClasses }: Props) => (
	<div className={clsx(styles.staticsCard, classes)}>
		<Row className={'block-ver-center'}>
			<div className={clsx(styles.iconBlock, 'block-center')}>
				{/* <span className={icon}></span> */}
				<Image src={`/images/icons/${icon}.svg`} width={48} height={48} />
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

export default StaticsCard
