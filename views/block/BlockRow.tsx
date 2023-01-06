import { useMobileLayout } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import RowShowAnimation from 'components/Animation/RowShowAnimation'
import DotSpace from 'components/DotSpace'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import Image from 'next/image'
import { getStakingValidatorByAstraAddress } from 'utils/address'
import { ellipseBetweenText, LinkMaker } from 'utils/helper'
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

const Mobile = ({ blockNumber, proposerAddress, transactionCounts, newBlock }) => {
	return (
		<RowShowAnimation action={newBlock}>
			<div></div>
		</RowShowAnimation>
	)
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
	const { isMobile } = useMobileLayout('medium')
	const { isMobile: isSmallDevice } = useMobileLayout('small')
	const proposer = proposerAddress ? getStakingValidatorByAstraAddress(proposerAddress) : null
	const proposerName = proposer?.moniker
	const proposerDisplay = proposerName
		? `${proposerName} (${ellipseBetweenText(proposerAddress, 10, 10)})`
		: proposerAddress
	return (
		<RowShowAnimation action={newBlock}>
			<div
				className={clsx(
					styles.rowBrief,
					styles.blockRow,
					'row padding-left-lg',
					'padding-right-lg padding-top-sm padding-bottom-sm',
					'radius-lg',
					'margin-bottom-xs',
					'md-flex-column'
				)}
			>
				<div className={clsx(styles.iconCetner, 'margin-right-sm md-flex-justify-space-between')}>
					<div className="block-ver-center md-col-7">
						<Image alt="nothing" src={'/images/icons/blockchain.png'} height={24} width={24} />
						{isMobile && (
							<div className="col-2 md-col-12 block-ver-center md-padding-left-xs">
								<Typography.LinkText
									href={LinkMaker.block(blockNumber)}
									classes={clsx('money', 'money-sm')}
								>
									{`#${blockNumber}`}
								</Typography.LinkText>
							</div>
						)}
					</div>
					{isMobile && (
						<div className="col-2 block-ver-center">
							<Timer updatedAt={updatedAt} />
						</div>
					)}
				</div>
				{!isMobile && (
					<div className="col-2 block-ver-center">
						<Typography.LinkText href={LinkMaker.block(blockNumber)} classes={clsx('money', 'money-sm')}>
							{`#${blockNumber}`}
						</Typography.LinkText>
					</div>
				)}
				<div
					className={clsx('col-6 padding-left-lg', styles.borderLeft, 'md-padding-left-0', 'md-border-none')}
				>
					<div>
						<Typography.LinkText
							href={LinkMaker.address(proposerAddress)}
							classes={clsx('money', 'money-sm')}
						>
							{proposerDisplay}
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
				{!isMobile && (
					<>
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
