import clsx from 'clsx'
import GradientRow from 'components/Row/GradientRow'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import { ellipseRightText, LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

interface Props {
	transaction: AddressTransactionData
}

const AddressTransaction = ({ transaction }: Props) => {
	return (
		<GradientRow
			type={transaction.success ? 'success' : 'error'}
			classes={clsx(
				'padding-left-lg padding-right-lg',
				'padding-top-xs padding-bottom-xs',
				styles.rowHeight,
				'margin-bottom-xs',
				styles.borderWidthPadding
			)}
			gradient={'transparent'}
		>
			<div
				className={clsx(styles.rowBrief, styles.TransactionRow, 'row')}
				// style={{ minHeight: style === 'inject' ? 'auto' : height }}
			>
				<div className={clsx('col-4')}>
					<div>
						<Typography.LinkText
							href={LinkMaker.transaction(transaction.hash)}
							classes={'margin-right-xs'}
							fontType="Titi"
						>
							{ellipseRightText(transaction.hash, 30)}
						</Typography.LinkText>
						<Typography.Label
							text={'Function Name'}
							backgroundShape="rectangle"
							color="contrast-color-70"
							radius="radius-xs"
							font="money-2xs"
						/>
					</div>
					{/* {(transaction.from || transaction.to) && (
							<div className="margin-top-xs">
								{transaction.from && (
									<>
										<span className={clsx('contrast-color-30 margin-right-xs text text-sm')}>
											From
										</span>
										<span className="contrast-color-70 margin-right-lg money-2xs money">
											{evmAddressName(fromName, ellipseBetweenText(from, 6, 6))}
										</span>
									</>
								)}
								{transaction.to && (
									<>
										<span className={clsx('contrast-color-30 padding-right-2xs text text-sm')}>
											To
										</span>
										<span className="contrast-color-70 margin-right-lg  money-2xs money">
											{evmAddressName(toName, ellipseBetweenText(to, 6, 6))}
										</span>
									</>
								)}
							</div>
						)} */}
				</div>
				<div className={clsx('col-2 block-ver-center')}>
					<Typography.Label
						text={'Dontknow'}
						// titleText={type}
						backgroundShape="rectangle"
						radius="radius-2xl"
						font="text-bold text text-sm"
					/>
				</div>
				<div className={clsx('col-2 block-ver-center')}>
					<Typography.LinkText href={LinkMaker.block(transaction.blockHeight)} fontType="Titi">
						#{transaction.blockHeight}
					</Typography.LinkText>
				</div>
				<div className={clsx('col-2 block-ver-center')}>
					{/* <div>
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
						</div> */}
				</div>
				<div className={clsx('col-1 block-ver-center')}>
					<Timer updatedAt={transaction.blockTime} />
				</div>
				<div
					className={clsx('col-1 padding-left-md gutter-left block-ver-center')}
					style={{ textTransform: 'capitalize' }}
				>
					{transaction.success ? (
						<Typography.SuccessText>Success</Typography.SuccessText>
					) : (
						<Typography.ErrorText>Error</Typography.ErrorText>
					)}
				</div>
			</div>
		</GradientRow>
	)
}
export default AddressTransaction
