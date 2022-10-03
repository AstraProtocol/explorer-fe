import clsx from 'clsx'
import RowShowAnimation from 'components/Animation/RowShowAnimation'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import Image from 'next/image'
import { ellipseBetweenText, LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

type BlockBriefRowProps = {
	blockNumber: number
	updatedAt: number | string
	transactions: number
	proposerAddress: string
	proposerName: string
	newBlock?: boolean
	border?: boolean
}

export default function BlockBriefRow({
	blockNumber,
	updatedAt,
	transactions,
	proposerAddress,
	proposerName,
	newBlock,
	border
}: BlockBriefRowProps) {
	return (
		<RowShowAnimation action={newBlock} minHeight="65px">
			<div
				className={clsx(
					styles.rowBrief,
					'margin-left-lg margin-right-lg margin-top-sm margin-bottom-sm padding-bottom-sm',
					{ 'border border-bottom-base': border }
				)}
			>
				<div className={clsx(styles.icon, 'margin-right-sm')}>
					<Image src={'/images/icons/blockchain.png'} height={24} width={24} />
				</div>
				<div className={styles.content}>
					<div className={styles.topRow}>
						<Typography.LinkText
							href={LinkMaker.block(blockNumber)}
							children={`#${blockNumber}`}
							fontType="Titi"
						/>

						<Timer updatedAt={updatedAt} />
					</div>
					<div className={clsx('margin-top-xs block-ver-center', styles.info)}>
						<div className="block-ver-center">
							<span className={clsx('contrast-color-30 text text-sm padding-right-2xs')}>
								Block Proposer
							</span>
							<span className="contrast-color-70 money money-xs">
								{proposerName} ({ellipseBetweenText(proposerAddress, 6, 6)})
							</span>
							{/* <DotSpace /> */}
						</div>
					</div>
					<div className="contrast-color-70 text text-sm">{transactions} Transactions</div>
				</div>
			</div>
		</RowShowAnimation>
	)
}
