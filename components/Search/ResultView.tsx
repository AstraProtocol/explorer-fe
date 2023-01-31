import { useMobileLayout } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import Typography from 'components/Typography'
import Link from 'next/link'
import { CONFIG } from 'utils/constants'
import { ellipseBetweenText, LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

export interface SearchResultViewItem {
	type: 'Address' | 'Block' | 'Transaction' | 'Validator' | 'Token' | 'Contract'
	time?: string
	status?: string
	value: string | number
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

		if (type === 'Address' || type === 'Validator' || type === 'Contract') {
			return LinkMaker.address(linkValue)
		}

		if (type === 'Token') {
			return LinkMaker.token(linkValue)
		}

		return LinkMaker.transaction(linkValue)
	}
	const length = CONFIG.TXS_MOBILE_SPLIT_LENGTH
	return (
		<Link href={_link()}>
			<div className={clsx(styles.item, 'money money-sm padding-left-xs pointer')}>
				<div className={clsx('text-bold')}>
					{isMobile ? ellipseBetweenText(value?.toString(), length, length) : value}
				</div>
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
