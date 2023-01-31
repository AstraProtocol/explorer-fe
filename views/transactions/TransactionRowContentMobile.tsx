import { useMobileLayout } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import { CONFIG } from 'utils/constants'
import { ellipseBetweenText, LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

export type TransactionRowContentMobileProps = {
	style?: 'normal' | 'inject'
	blockNumber: number
	updatedAt: number | string
	hash: string
	type?: string
	height?: string
}

export default function TransactionRowContentMobile({
	blockNumber,
	updatedAt,
	hash,
	type,
	style,
	height
}: TransactionRowContentMobileProps) {
	const { isMobile } = useMobileLayout()
	const length = isMobile ? CONFIG.TXS_MOBILE_SPLIT_LENGTH : CONFIG.TXS_DESKTOP_SPLIT_LENGTH
	const isEvm = type === 'MsgEthereumTx'
	const addressQuery = isEvm ? { type: 'evm' } : ''
	return (
		<>
			<div
				className={clsx(styles.rowBrief, styles.TransactionRow, 'row width-100')}
				style={{ minHeight: style === 'inject' ? 'auto' : height }}
			>
				<div className="flex flex-justify-space-between width-100 sm-wrap">
					<div>
						<Typography.LinkText
							href={LinkMaker.transaction(hash, addressQuery)}
							classes={'margin-right-xs word-break-all'}
							fontType="Titi"
						>
							{ellipseBetweenText(hash, length, length).toLowerCase()}
						</Typography.LinkText>
					</div>
					<div className={clsx(' block-ver-center')}>
						<Timer updatedAt={updatedAt} />
					</div>
				</div>
			</div>
			<div
				className={clsx(styles.rowBrief, styles.TransactionRow, 'row width-100 margin-top-xs')}
				style={{ minHeight: style === 'inject' ? 'auto' : height }}
			>
				<div className="flex width-100">
					<div>
						<Typography.LinkText
							href={LinkMaker.block(blockNumber)}
							classes={'margin-right-xs'}
							fontType="Titi"
						>
							#{blockNumber}
						</Typography.LinkText>
					</div>
					<div className={clsx('block-ver-center')}>
						<Typography.Label
							text={type}
							titleText={type}
							backgroundShape="rectangle"
							radius="radius-2xl"
							font="text-bold text text-sm"
						/>
					</div>
				</div>
			</div>
		</>
	)
}
