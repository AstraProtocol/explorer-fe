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
}

export default function BlockBriefRow({
	blockNumber,
	updatedAt,
	transactions,
	proposerAddress,
	proposerName,
	newBlock
}: BlockBriefRowProps) {
	return (
		<RowShowAnimation action={newBlock} minHeight="65px">
			<div className={clsx(styles.rowBrief, 'padding-left-lg padding-right-lg padding-top-sm padding-bottom-sm')}>
				<div className={clsx(styles.icon, 'margin-right-sm')}>
					<Image src={'/images/icons/blockchain.png'} height={24} width={24} />
				</div>
				<div className={styles.content}>
					<div>
						<Typography.LinkText
							href={LinkMaker.block(blockNumber)}
							children={`#${blockNumber}`}
							className={['money', 'money-sm']}
						/>
					</div>
					<div className={clsx('margin-top-xs block-ver-center', styles.info)}>
						<div className="block-ver-center">
							<span className={clsx('contrast-color-30 padding-right-2xs')}>Block Proposer</span>
							<span className="contrast-color-70 money">
								{proposerName} ({ellipseBetweenText(proposerAddress, 6, 6)})
							</span>
							{/* <DotSpace /> */}
						</div>
						<Timer updatedAt={updatedAt} />
					</div>
					<div className="contrast-color-70">{transactions} Transactions</div>
				</div>
			</div>
		</RowShowAnimation>
	)
}
