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
				<div className={clsx(styles.icon, 'margin-right-sm')}>
					<Image src={'/images/icons/blockchain.png'} height={24} width={24} />
				</div>
				<div className="col-2">
					{mine ? (
						<span className={clsx('money', 'money-sm')}>#{blockNumber}</span>
					) : (
						<Typography.LinkText
							href={LinkMaker.block(blockNumber)}
							children={`#${blockNumber}`}
							className={['money', 'money-sm']}
						/>
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
									children={proposerAddress}
									className={['money', 'money-sm']}
								/>
							</div>
							<div className={clsx('block-ver-center', styles.info)}>
								<div className="block-ver-center">
									<span className={clsx('text text-sm contrast-color-30 padding-right-2xs')}>
										{transactions} Transactions
									</span>
									<DotSpace />
									<span className="text text-sm contrast-color-30">{size} bytes</span>
								</div>
							</div>
						</div>

						<div className="col-2">
							<Timer updatedAt={updatedAt} />
						</div>

						<div className="money money-xs contrast-color-70">{value}</div>
					</>
				)}
			</div>
		</RowShowAnimation>
	)
}