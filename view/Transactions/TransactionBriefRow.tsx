import { CryptoIcon, Typography as TypographyUI } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import RowShowAnimation from 'components/Animation/RowShowAnimation'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import Image from 'next/image'
import { ellipseBetweenText, ellipseRightText, LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

type TransactionBriefRowProps = {
	hash: string
	from: string
	to: string
	balance: {
		value?: string
		token?: string
	}
	updatedAt: number | string
	newTransaction?: boolean
}

export default function TransactionBriefRow({
	hash,
	from,
	to,
	balance,
	updatedAt,
	newTransaction
}: TransactionBriefRowProps) {
	return (
		<RowShowAnimation minHeight="65px" action={newTransaction}>
			<div className={clsx(styles.rowBrief, 'padding-left-lg padding-right-lg padding-top-sm padding-bottom-sm')}>
				<div className={clsx(styles.icon, 'margin-right-sm')}>
					<Image src={'/images/icons/blockchain.png'} height={24} width={24} />
				</div>
				<div className={styles.content}>
					<div className={clsx('block-ver-center', styles.info)}>
						<div>
							<span className={clsx('contrast-color-30 margin-right-xs')}>Hash</span>
							<Typography.LinkText
								href={LinkMaker.transaction(hash)}
								children={`${ellipseRightText(hash, 24)}`}
								className={['money', 'money-sm']}
							/>
						</div>
						<TypographyUI.Balance
							icon={<CryptoIcon name="asa" />}
							currency={balance.token}
							size="sm"
							value={balance?.value}
						/>
					</div>
					<div className={clsx('block-ver-center', styles.info)}>
						<div className="block-ver-center">
							<span className={clsx('contrast-color-30 margin-right-xs')}>From</span>
							<span className="contrast-color-70 margin-right-lg">{ellipseBetweenText(from, 6, 6)}</span>
							<span className={clsx('contrast-color-30 padding-right-2xs')}>To</span>
							<span className="contrast-color-70 margin-right-lg">{ellipseBetweenText(to, 6, 6)}</span>
						</div>
						<Timer updatedAt={updatedAt} />
					</div>
				</div>
			</div>
		</RowShowAnimation>
	)
}
