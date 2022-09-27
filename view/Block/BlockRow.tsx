import clsx from 'clsx'
import DotSpace from 'components/DotSpace'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import Image from 'next/image'
import styles from './style.module.scss'

type BlockRowProps = {
	blockNumber: number
	size: number
	updatedAt: number | string
	transactions: number
	proposerAddress: string
	mine?: boolean
}

export default function BlockRow({ blockNumber, updatedAt, transactions, proposerAddress, mine }: BlockRowProps) {
	return (
		<div className={clsx(styles.rowBrief, 'padding-left-lg padding-right-lg padding-top-sm padding-bottom-sm')}>
			<div className={clsx(styles.icon, 'margin-right-sm')}>
				<Image src={'/images/icons/blockchain.png'} height={24} width={24} />
			</div>
			<div>
				<Typography.LinkText
					href={`/block/${blockNumber}/transactions`}
					children={`#${blockNumber}`}
					className={['money', 'money-sm']}
				/>
			</div>
			<div className={styles.content}>
				<div>
					<Typography.LinkText
						href={`/address/${proposerAddress}`}
						children={`#${blockNumber}`}
						className={['money', 'money-sm']}
					/>
				</div>
				<div className={clsx('block-ver-center', styles.info)}>
					<div className="block-ver-center">
						<span className={clsx('contrast-color-30 padding-right-2xs')}>Block Proposer</span>
						<span className="contrast-color-70 money">{proposerAddress}</span>
						<DotSpace />
						<span className="contrast-color-70">{transactions} Transactions</span>
					</div>
					<Timer updatedAt={updatedAt} />
				</div>
			</div>
		</div>
	)
}
