import { CryptoIcon, CryptoIconNames, Typography as TypographyUI } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import RowShowAnimation from 'components/Animation/RowShowAnimation'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import Image from 'next/image'
import { TransacionTypeEnum } from 'utils/constants'
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
	transactionType: TransacionTypeEnum
}

const Address = ({ address, label }: { address: string; label: string }) => {
	return (
		<div>
			<>
				<div
					className={clsx(
						'contrast-color-30',
						'text-base text',
						'inline-block inline-width',
						'sm-inline-width sm-padding-right-2xs'
					)}
					style={{ ['--width' as string]: '45px', ['--sm-width' as string]: 'auto' }}
				>
					{label}
				</div>
				<span className="contrast-color-70 margin-right-lg money money-2xs">
					{ellipseBetweenText(address, 6, 6)}
				</span>
			</>
		</div>
	)
}

export default function TransactionBriefRow({
	hash,
	from,
	to,
	balance,
	updatedAt,
	newTransaction,
	border,
	transactionType
}: TransactionBriefRowProps) {
	return (
		<RowShowAnimation action={newTransaction}>
			<div
				className={clsx(
					styles.rowBrief,
					'margin-left-lg margin-right-lg',
					'inline-min-height',

					{ 'border border-bottom-base': border }
				)}
				style={{ ['--min-height' as string]: '60px' }}
			>
				<div
					className={clsx(styles.icon, 'margin-right-sm', 'sm-hide')}
					style={{ alignSelf: !to && !from ? '' : 'baseline' }}
				>
					<Image src={'/images/icons/transaction.png'} height={24} width={24} />
				</div>
				<div className={clsx(styles.content)}>
					<div className={clsx('block-ver-center', styles.info, 'sm-wrap')}>
						<div>
							<span className={clsx('contrast-color-30 margin-right-xs text text-sm', 'sm-hide')}>
								Hash
							</span>
							<Typography.LinkText
								href={LinkMaker.transaction(hash, `?type=${transactionType}`)}
								children={`${ellipseRightText(hash, 24)}`}
								fontType="Titi"
								fontSize="money-2xs"
							/>
						</div>
						<Timer updatedAt={updatedAt} />
					</div>
					{(!!from || !!to) && (
						<div className={clsx('block-ver-center margin-top-xs', styles.info)}>
							<div style={{ width: '100%' }}>
								{!!from && <Address address={from} label="From" />}
								<div style={{ display: 'flex', justifyContent: 'space-between' }}>
									<div>{!!to && <Address address={to} label="To" />}</div>
									{!!balance?.value && (
										<TypographyUI.Balance
											icon={
												<CryptoIcon
													name={process.env.NEXT_PUBLIC_EVM_TOKEN as CryptoIconNames}
												/>
											}
											currency={balance.token}
											size="sm"
											value={balance?.value}
										/>
									)}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</RowShowAnimation>
	)
}
