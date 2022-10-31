import { useMobileLayout } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import Typography from 'components/Typography'
import Link from 'next/link'
import { ellipseBetweenText, LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

export interface SearchResultViewItem {
	type: 'Address' | 'Block' | 'Transaction' | 'Validator' | 'Token'
	time?: string
	status?: string
	value: string
	key: string | number
	linkValue?: string
}

type ResultViewProps = {
	item: SearchResultViewItem
}

export default function ResultView({ item }: ResultViewProps) {
	const { time, type, value, status, linkValue } = item
	const { isMobile } = useMobileLayout(732)

	const _link = () => {
		if (type === 'Block') {
			return LinkMaker.block(linkValue)
		}

		if (type === 'Address') {
			return LinkMaker.address(linkValue)
		}

		if (type === 'Token') {
			return LinkMaker.token(linkValue)
		}

		return LinkMaker.transaction(linkValue)
	}
	return (
		<Link href={_link()}>
			<div className={clsx(styles.item, 'money money-sm padding-left-xs pointer')}>
				<div className={clsx('text-bold')}>{isMobile ? ellipseBetweenText(value, 10, 10) : value}</div>
				<div
					className={clsx(
						styles.viewMoreInfo,
						'margin-top-xs sm-wrap border border-bottom-base',
						'margin-bottom-xs padding-bottom-xs'
					)}
				>
					<div>
						{status && <span>Status: {status}</span>}
						{time && <Typography.Time time={time} />}
					</div>
					<div
						className={clsx(
							styles.viewTag,
							'text-xs text-bold',
							'padding-left-sm padding-right-sm sm-margin-top-xs md-margin-bottom-xs',
							'border border-base',
							'block-center'
						)}
					>
						{type}
					</div>
				</div>
			</div>
		</Link>
	)
}
