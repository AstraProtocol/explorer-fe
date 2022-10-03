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
	border?: boolean
}

export default function TransactionBriefRow({
	hash,
	from,
	to,
	balance,
	updatedAt,
	newTransaction,
	border
}: TransactionBriefRowProps) {
	return (
		<RowShowAnimation minHeight="65px" action={newTransaction}>
			<div
				className={clsx(
					styles.rowBrief,
					'margin-left-lg margin-right-lg margin-top-sm margin-bottom-sm',
					'padding-bottom-sm',
					{ 'border border-bottom-base': border }
				)}
			>
				<div className={clsx(styles.icon, 'margin-right-sm')}>
					<Image src={'/images/icons/transaction.png'} height={24} width={24} />
				</div>
				<div className={styles.content}>
					<div className={clsx('block-ver-center', styles.info)}>
						<div>
							<span className={clsx('contrast-color-30 margin-right-xs text text-sm')}>Hash</span>
							<Typography.LinkText
								href={LinkMaker.transaction(hash)}
								children={`${ellipseRightText(hash, 24)}`}
								fontType="Titi"
								fontSize="money-xs"
							/>
						</div>
						<Timer updatedAt={updatedAt} />
					</div>
					<div className={clsx('block-ver-center margin-top-xs', styles.info)}>
						<div style={{ width: '100%' }}>
							<div>
								<div
									className={clsx('contrast-color-30')}
									style={{ display: 'inline-block', minWidth: '45px' }}
								>
									From
								</div>
								<span className="contrast-color-70 margin-right-lg money money-xs">
									{ellipseBetweenText(from, 6, 6)}
								</span>
							</div>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<div>
									<div
										className={clsx('contrast-color-30')}
										style={{ display: 'inline-block', minWidth: '45px' }}
									>
										To
									</div>
									<span className="contrast-color-70 margin-right-lg money money-xs">
										{ellipseBetweenText(to, 6, 6)}
									</span>
								</div>

								<TypographyUI.Balance
									icon={<CryptoIcon name="asa" />}
									currency={balance.token}
									size="sm"
									value={balance?.value}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</RowShowAnimation>
	)
}
