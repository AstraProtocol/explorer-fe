import { CryptoIcon, CryptoIconNames, Typography as TypographyLib, useMobileLayout } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import { evmAddressName } from 'utils/evm'
import { convertBalanceToView, ellipseBetweenText, ellipseRightText, LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

export type TransactionRowContentProps = {
	style?: 'normal' | 'inject'
	blockNumber: number
	updatedAt: number | string
	value?: string
	valueCurrency?: string
	valueToken?: CryptoIconNames
	hash: string
	type?: string
	labelStatus?: string
	status?: boolean
	fee?: number | string
	feeToken?: string
	from?: string
	fromName?: string
	to?: string
	toName?: string
	height?: string
}

export default function TransactionRowContent({
	blockNumber,
	updatedAt,
	value,
	valueCurrency,
	valueToken,
	hash,
	type,
	labelStatus,
	status,
	fee,
	feeToken,
	from,
	to,
	style = 'normal',
	height,
	fromName,
	toName
}: TransactionRowContentProps) {
	const { isMobile: isSmallDevice } = useMobileLayout('small')
	const statusText = status ? 'success' : 'error'
	return (
		<>
			<div
				className={clsx(styles.rowBrief, styles.TransactionRow, 'row')}
				style={{ minHeight: style === 'inject' ? 'auto' : height }}
			>
				<div className={clsx('col-4')}>
					<div>
						<Typography.LinkText
							href={LinkMaker.transaction(hash)}
							classes={'margin-right-xs'}
							fontType="Titi"
						>
							{ellipseRightText(hash, 30)}
						</Typography.LinkText>
						{!!labelStatus && (
							<Typography.Label
								text={labelStatus}
								backgroundShape="rectangle"
								color="contrast-color-70"
								radius="radius-xs"
								font="money-2xs"
							/>
						)}
					</div>
					{(from || to) && (
						<div className="margin-top-xs">
							{from && (
								<>
									<span className={clsx('contrast-color-30 margin-right-xs text text-sm')}>From</span>
									<span className="contrast-color-70 margin-right-lg money-2xs money">
										{evmAddressName(fromName, ellipseBetweenText(from, 6, 6))}
									</span>
								</>
							)}
							{to && (
								<>
									<span className={clsx('contrast-color-30 padding-right-2xs text text-sm')}>To</span>
									<span className="contrast-color-70 margin-right-lg  money-2xs money">
										{evmAddressName(toName, ellipseBetweenText(to, 6, 6))}
									</span>
								</>
							)}
						</div>
					)}
				</div>
				<div className={clsx('col-2 block-ver-center')}>
					<Typography.Label
						text={ellipseRightText(type, 17)}
						titleText={type}
						backgroundShape="rectangle"
						radius="radius-2xl"
						font="text-bold text text-sm"
					/>
				</div>
				<div className={clsx('col-2 block-ver-center')}>
					<Typography.LinkText href={LinkMaker.block(blockNumber)} fontType="Titi">
						#{blockNumber}
					</Typography.LinkText>
				</div>
				<div className={clsx('col-2 block-ver-center')}>
					<div>
						{Number(value) >= 0 && (
							<>
								<TypographyLib.Balance
									size="xs"
									value={value}
									currency={valueCurrency?.toUpperCase()}
									icon={valueToken && <CryptoIcon name={valueToken} size="sm" />}
								/>
								<br />
							</>
						)}
						<span>
							{Number(fee) >= 0 && (
								<TypographyLib.Balance
									icon={<span>Fee:</span>}
									size="2xs"
									value={convertBalanceToView(fee)}
									fixNumber={7}
									currency={feeToken.toUpperCase()}
									classes="contrast-color-70"
								/>
							)}
						</span>
					</div>
				</div>
				<div className={clsx('col-1 block-ver-center')}>
					<Timer updatedAt={updatedAt} />
				</div>
				<div
					className={clsx('col-1 padding-left-md gutter-left block-ver-center')}
					style={{ textTransform: 'capitalize' }}
				>
					{status ? (
						<Typography.SuccessText>{statusText}</Typography.SuccessText>
					) : (
						<Typography.ErrorText>{statusText}</Typography.ErrorText>
					)}
				</div>
			</div>
		</>
	)
}