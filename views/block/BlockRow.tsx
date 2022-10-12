import clsx from 'clsx'
import RowShowAnimation from 'components/Animation/RowShowAnimation'
import DotSpace from 'components/DotSpace'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import Image from 'next/image'
import { LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

type BlockRowProps = {
	blockNumber: number
	size: number
	updatedAt: number | string
	transactions: number
	proposerAddress: string
	mine?: boolean
	value: number
	newBlock?: boolean
}

export default function BlockRow({
	blockNumber,
	updatedAt,
	transactions,
	proposerAddress,
	mine,
	size,
	value,
	newBlock
}: BlockRowProps) {
	return (
		<RowShowAnimation action={newBlock}>
			<div
				className={clsx(
					styles.rowBrief,
					styles.blockRow,
					'row padding-left-lg',
					'padding-right-lg padding-top-sm padding-bottom-sm',
					'radius-lg',
					'margin-bottom-xs'
				)}
			>
				<div className={clsx(styles.iconCetner, 'margin-right-sm')}>
					<Image src={'/images/icons/blockchain.png'} height={24} width={24} />
				</div>
				<div className="col-2 block-ver-center">
					{mine ? (
						<span className={clsx('money', 'money-sm')}>#{blockNumber}</span>
					) : (
						<Typography.LinkText href={LinkMaker.block(blockNumber)} classes={'money money-sm'}>
							{' '}
							#{blockNumber}
						</Typography.LinkText>
					)}
				</div>
				{mine ? (
					<div className="col-9 gutter-left">
						<div className="contrast-color-70">Block mined, awaiting import...</div>
					</div>
				) : (
					<>
						<div className={clsx('col-6 padding-left-lg', styles.borderLeft)}>
							<div>
								<Typography.LinkText
									href={LinkMaker.address(proposerAddress)}
									classes={'money money-sm'}
								>
									{proposerAddress}
								</Typography.LinkText>
							</div>
							<div className={clsx('block-ver-center', styles.info)}>
								<div className="block-ver-center">
									<span className={clsx('text text-sm contrast-color-30 padding-right-2xs')}>
										{transactions} Transactions
									</span>
									{!!size && (
										<>
											<DotSpace />
											<span className="text text-sm contrast-color-30">{size} bytes</span>
										</>
									)}
								</div>
							</div>
						</div>

						<div className="col-2 block-ver-center">
							<Timer updatedAt={updatedAt} />
						</div>

						<div className="money money-2xs contrast-color-70 block-ver-center">{transactions}</div>
					</>
				)}
			</div>
		</RowShowAnimation>
	)
}
