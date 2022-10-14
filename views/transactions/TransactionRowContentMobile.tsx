import { useMobileLayout } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import { ellipseRightText, LinkMaker } from 'utils/helper'
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
	const { isMobile: isSmallDevice } = useMobileLayout('small')
	return (
		<>
			<div
				className={clsx(styles.rowBrief, styles.TransactionRow, 'row width-100')}
				style={{ minHeight: style === 'inject' ? 'auto' : height }}
			>
				<div className="flex flex-justify-space-between width-100">
					<div>
						<Typography.LinkText
							href={LinkMaker.transaction(hash)}
							classes={'margin-right-xs'}
							fontType="Titi"
						>
							{ellipseRightText(hash, isSmallDevice ? 20 : 100)}
						</Typography.LinkText>
					</div>
					<div className={clsx('col-1 block-ver-center')}>
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
					<div className={clsx('col-1 block-ver-center')}>
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
