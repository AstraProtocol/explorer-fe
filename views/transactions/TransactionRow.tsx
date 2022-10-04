import { CryptoIcon, CryptoIconNames, Typography as TypographyLib } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import RowShowAnimation from 'components/Animation/RowShowAnimation'
import GradientRow from 'components/Row/GradientRow'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import { convertBalanceToView, ellipseBetweenText, ellipseRightText, LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

type TransactionRowProps = {
	style?: 'normal' | 'inject'
	blockNumber: number
	updatedAt: number | string
	value: number
	valueToken: CryptoIconNames
	newBlock?: boolean
	hash: string
	type?: string
	labelStatus?: string
	status?: boolean
	fee: number | string
	feeToken?: string
	from?: string
	to?: string
	transactionType: TransacionTypeEnum
	order?: 'end' | 'start' | ''
}

export default function TransactionRow({
	blockNumber,
	updatedAt,
	value,
	valueToken,
	newBlock,
	hash,
	type,
	labelStatus,
	status,
	fee,
	feeToken,
	from,
	to,
	transactionType,
	style = 'normal',
	order
}: TransactionRowProps) {
	const statusText = status ? 'success' : 'error'
	return (
		<RowShowAnimation action={newBlock}>
			<GradientRow
				type={statusText}
				classes={[
					clsx('padding-left-lg padding-right-lg', 'padding-top-xs padding-bottom-xs', {
						'margin-bottom-xs': style === 'normal',
						'radius-lg': style === 'normal',
						// 'border border-bottom-base': style === 'inject' && order === 'end',
						[styles.borderWidthPadding]: style === 'inject'
					})
				]}
				gradient={style === 'inject' ? 'transparent' : 'normal'}
			>
				<div className={clsx(styles.rowBrief, styles.TransactionRow, 'row')}>
					<div className={clsx('col-5 block-ver-center')}>
						<div>
							<Typography.LinkText
								href={LinkMaker.transaction(hash, `?type=${transactionType}`)}
								className={['margin-right-xs']}
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
									font="money-xs"
								/>
							)}
						</div>
						{!!from ||
							(!!to && (
								<div className="margin-top-xs">
									{!!from && (
										<>
											<span className={clsx('contrast-color-30 margin-right-xs text text-sm')}>
												From
											</span>
											<span className="contrast-color-70 margin-right-lg money-xs money">
												{ellipseBetweenText(from, 6, 6)}
											</span>
										</>
									)}
									{!!to && (
										<>
											<span className={clsx('contrast-color-30 padding-right-2xs text text-sm')}>
												To
											</span>
											<span className="contrast-color-70 margin-right-lg  money-xs money">
												{ellipseBetweenText(to, 6, 6)}
											</span>
										</>
									)}
								</div>
							))}
					</div>
					<div className={clsx('col-2 block-ver-center')}>
						<Typography.Label
							text={type}
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
							<TypographyLib.Balance
								size="xs"
								value={value}
								icon={<CryptoIcon name={valueToken} size="sm" />}
							/>
							<br />
							<span>
								<TypographyLib.Balance
									icon={<span>Fee:</span>}
									size="2xs"
									value={convertBalanceToView(fee)}
									fixNumber={7}
									currency={feeToken.toUpperCase()}
									classes="contrast-color-70"
								/>
							</span>
						</div>
					</div>
					<div className={clsx('col-1 block-ver-center')}>
						<Timer updatedAt={updatedAt} />
					</div>
					<div
						className={clsx('col-1 padding-left-md block-ver-center')}
						style={{ textTransform: 'capitalize' }}
					>
						{status ? (
							<Typography.SuccessText>{statusText}</Typography.SuccessText>
						) : (
							<Typography.ErrorText>{statusText}</Typography.ErrorText>
						)}
					</div>
				</div>
			</GradientRow>
		</RowShowAnimation>
	)
}
