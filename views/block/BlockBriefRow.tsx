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
		<RowShowAnimation action={newBlock}>
			<div
				className={clsx(styles.rowBrief, 'margin-left-lg margin-right-lg margin-bottom-sm padding-top-sm', {
					'border border-top-base': border
				})}
			>
				<div className={clsx(styles.icon, 'margin-right-sm')}>
					<Image src={'/images/icons/blockchain.png'} alt="height" height={24} width={24} />
				</div>
				<div className={styles.content}>
					<div className={styles.topRow}>
						<Typography.LinkText href={LinkMaker.block(blockNumber)} fontType="Titi">
							#{blockNumber}
						</Typography.LinkText>

						<Timer updatedAt={updatedAt} />
					</div>
					<div className={clsx('margin-top-xs block-ver-center', styles.info)}>
						<div className="block-ver-center sm-wrap">
							<span className={clsx('contrast-color-30 text text-sm padding-right-2xs sm-block')}>
								Block Proposer
							</span>
							<Typography.LinkText
								href={LinkMaker.address(proposerAddress)}
								fontSize="money-2xs"
								fontType="Titi"
								classes="sm-block"
							>
								{proposerName} ({ellipseBetweenText(proposerAddress, 10, 10)})
							</Typography.LinkText>
							{/* <DotSpace /> */}
						</div>
					</div>
					<div className="contrast-color-70 text text-sm">{transactions} Transactions</div>
				</div>
			</div>
		</RowShowAnimation>
	)
}
