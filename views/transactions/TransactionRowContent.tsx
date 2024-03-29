import { CryptoIcon, Typography as TypographyLib, useMobileLayout } from '@astraprotocol/astra-ui'
import { CryptoIconNames } from '@astraprotocol/astra-ui/lib/es/components/CryptoIcon'
import clsx from 'clsx'
import Row from 'components/Grid/Row'
import Tag from 'components/Tag/PolygonTag'
import TransactionTag from 'components/Tag/TransactionTag'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import Image from 'next/image'
import { useMemo } from 'react'
import { CONFIG } from 'utils/constants'
import { isEvmTransactionType } from 'utils/evm'
import { LinkMaker, convertBalanceToView, ellipseBetweenText, ellipseRightText } from 'utils/helper'
import { getAddressLabel } from 'utils/label'
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
	from?: string
	fromName?: string
	to?: string
	contractAddress?: string
	toName?: string
	height?: string
	transactionType?: string
	typeCount?: string
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
	from,
	to,
	contractAddress,
	style = 'normal',
	height,
	fromName,
	toName,
	transactionType,
	typeCount
}: TransactionRowContentProps) {
	const { isMobile } = useMobileLayout()
	const length = isMobile ? CONFIG.TXS_MOBILE_SPLIT_LENGTH : CONFIG.TXS_DESKTOP_SPLIT_LENGTH
	const statusText = status ? 'success' : 'error'
	const isEvm = isEvmTransactionType(type)
	const addressQuery = hash?.startsWith('0x') ? '' : isEvm ? { type: 'evm' } : ''

	const fromAddressLabel = useMemo(() => getAddressLabel(fromName, from), [fromName, from])
	const toAddressLabel = useMemo(() => getAddressLabel(toName, to || contractAddress), [toName, to, contractAddress])

	return (
		<>
			<div
				className={clsx(styles.rowBrief, styles.TransactionRow, 'row')}
				style={{ minHeight: style === 'inject' ? 'auto' : height }}
			>
				<div className={clsx('col-5')} style={{ alignItems: 'center' }}>
					<Row>
						{isEvm ? (
							<Image alt={'eth'} src={`/images/icons/eth.svg`} width={24} height={24} />
						) : (
							<Image alt={'cosmos'} src={`/images/icons/atom.svg`} width={24} height={24} />
						)}
						<div className="margin-left-xs">
							<Row>
								<Typography.LinkText
									href={LinkMaker.transaction(hash, addressQuery)}
									classes={'margin-right-sm'}
									fontType="Titi"
								>
									{ellipseBetweenText(hash, length, length).toLowerCase()}
								</Typography.LinkText>
								{labelStatus && (
									<Tag hasArrowRight={false} fontType="Titi" text={labelStatus} ellipsis />
								)}
							</Row>
							{(from || to) && (
								<div className="margin-top-xs">
									{from && (
										<>
											<span className={clsx('contrast-color-30 margin-right-xs money money-sm')}>
												From
											</span>
											<Typography.LinkText
												fontType="Titi"
												href={LinkMaker.address(from)}
												classes="margin-right-sm"
											>
												{fromAddressLabel ? fromAddressLabel : ellipseBetweenText(from, 6, 6)}
											</Typography.LinkText>
										</>
									)}
									{(fromName || toName) && <br />}
									{(to || contractAddress) && (
										<>
											<span
												className={clsx('contrast-color-30 padding-right-2xs money money-sm')}
											>
												To
											</span>
											<Typography.LinkText
												fontType="Titi"
												href={LinkMaker.address(to || contractAddress)}
											>
												{toAddressLabel
													? toAddressLabel
													: ellipseBetweenText(to || contractAddress, 6, 6)}
											</Typography.LinkText>
										</>
									)}
								</div>
							)}
						</div>
					</Row>
				</div>
				<div className={clsx('col-2 block-ver-center')}>
					<Typography.Label
						text={ellipseRightText(type, 15)}
						titleText={type}
						backgroundShape="rectangle"
						radius="radius-2xl"
						font="text-bold text text-sm"
					/>
					{typeCount ? (
						<Typography.Label
							text={`${typeCount}`}
							// backgroundShape="rectangle"
							radius="radius-2xl margin-left-2xs"
							font="text-bold text text-sm"
						/>
					) : null}
				</div>
				<div className={clsx('col-2 block-ver-center')}>
					<Typography.LinkText href={LinkMaker.block(blockNumber)} fontType="Titi">
						#{blockNumber}
					</Typography.LinkText>
				</div>
				<div className={clsx('col-2 block-ver-center')}>
					<div>
						{Number(value || '0') >= 0 && (
							<>
								<TypographyLib.Balance
									size="sm"
									value={parseFloat(value || '0').toPrecision(4)}
									// value={value}
									currency={valueCurrency ? valueCurrency.toUpperCase() : ''} // Remove default token transfer is ASA here
									icon={valueToken && <CryptoIcon name={valueToken} size="sm" />}
								/>
								<br />
							</>
						)}
						<span>
							{Number(fee) >= 0 && (
								<TypographyLib.Balance
									icon={<span>Fee:</span>}
									size="xs"
									value={convertBalanceToView(fee)}
									fixNumber={7}
									currency={process.env.NEXT_PUBLIC_NATIVE_TOKEN?.toUpperCase()}
									classes="contrast-color-70"
								/>
							)}
						</span>
					</div>
				</div>
				<div className={clsx('col col-2 padding-left-md ')} style={{ textTransform: 'capitalize' }}>
					{status ? (
						<Typography.SuccessText>{statusText}</Typography.SuccessText>
					) : (
						<Typography.ErrorText>{statusText}</Typography.ErrorText>
					)}
					<Timer updatedAt={updatedAt} />
					{transactionType && <TransactionTag type={transactionType} />}
				</div>
			</div>
		</>
	)
}
