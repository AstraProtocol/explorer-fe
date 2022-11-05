import { CryptoIcon, Typography as TypographyLib, useMobileLayout } from '@astraprotocol/astra-ui'
import { CryptoIconNames } from '@astraprotocol/astra-ui/lib/es/components/CryptoIcon'
import clsx from 'clsx'
import Row from 'components/Grid/Row'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import Tag from 'components/Typography/Tag'
import Image from 'next/image'
import { evmAddressName } from 'utils/evm'
import {
	capitalizeFirstLetter,
	convertBalanceToView,
	ellipseBetweenText,
	ellipseRightText,
	LinkMaker
} from 'utils/helper'
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
	toName
}: TransactionRowContentProps) {
	const { isMobile: isSmallDevice } = useMobileLayout('small')
	const statusText = status ? 'success' : 'error'
	const isEvm = type === 'MsgEthereumTx'
	const addressQuery = hash?.startsWith('0x') ? '' : isEvm ? { type: 'evm' } : ''
	return (
		<>
			<div
				className={clsx(styles.rowBrief, styles.TransactionRow, 'row')}
				style={{ minHeight: style === 'inject' ? 'auto' : height }}
			>
				<div className={clsx('col-4')} style={{ alignItems: 'center' }}>
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
									{ellipseBetweenText(hash, 12, 12).toLowerCase()}
								</Typography.LinkText>
								{labelStatus && (
									<Tag
										hasArrowRight={false}
										fontType="Titi"
										text={capitalizeFirstLetter(labelStatus)}
									/>
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
												{evmAddressName(fromName, ellipseBetweenText(from, 6, 6))}
											</Typography.LinkText>
										</>
									)}
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
												{evmAddressName(
													toName,
													ellipseBetweenText(to || contractAddress, 6, 6)
												)}
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
									currency={
										valueCurrency
											? valueCurrency.toLowerCase() == 'aastra'
												? process.env.NEXT_PUBLIC_FEE_TOKEN
												: valueCurrency?.toUpperCase()
											: 'ASA'
									}
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
									currency={process.env.NEXT_PUBLIC_FEE_TOKEN}
									classes="contrast-color-70"
								/>
							)}
						</span>
					</div>
				</div>
				<div className={clsx('col col-2 padding-left-md gutter-left ')} style={{ textTransform: 'capitalize' }}>
					{status ? (
						<Typography.SuccessText>{statusText}</Typography.SuccessText>
					) : (
						<Typography.ErrorText>{statusText}</Typography.ErrorText>
					)}
					<Timer updatedAt={updatedAt} />
				</div>
			</div>
		</>
	)
}
