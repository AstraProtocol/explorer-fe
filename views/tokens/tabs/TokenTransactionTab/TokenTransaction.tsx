import { Typography as TypographyLib } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import GradientRow from 'components/Row/GradientRow'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import { evmAddressName } from 'utils/evm'
import { convertBalanceToView, ellipseBetweenText, ellipseRightText, LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

interface Props {
	transaction: TokenTransaction
}

const AddressTransaction = ({ transaction }: Props) => {
	return (
		<GradientRow
			type={'success'}
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
				<div className={clsx('col-6')}>
					<div>
						<Typography.LinkText
							href={LinkMaker.transaction(transaction.transactionHash, '?type=evm')}
							classes={'margin-right-xs'}
							fontType="Titi"
						>
							{ellipseRightText(transaction.transactionHash, 30)}
						</Typography.LinkText>
						{/* <Typography.Label
							text={'Function Name'}
							backgroundShape="rectangle"
							color="contrast-color-70"
							radius="radius-xs"
							font="money-2xs"
						/> */}
					</div>
					{(transaction.fromAddress || transaction.toAddress) && (
						<div className="margin-top-xs">
							{transaction.fromAddress && (
								<>
									<span className={clsx('contrast-color-30 margin-right-xs text text-sm')}>From</span>
									<span className="contrast-color-70 margin-right-lg money-2xs money">
										{evmAddressName(
											transaction.fromAddressName,
											ellipseBetweenText(transaction.fromAddress, 6, 6)
										)}
									</span>
								</>
							)}
							{transaction.toAddress && (
								<>
									<span className={clsx('contrast-color-30 padding-right-2xs text text-sm')}>To</span>
									<span className="contrast-color-70 margin-right-lg  money-2xs money">
										{evmAddressName(
											transaction.toAddressName,
											ellipseBetweenText(transaction.toAddress, 6, 6)
										)}
									</span>
								</>
							)}
						</div>
					)}
				</div>

				<div className={clsx('col-2 block-ver-center')}>
					<Typography.LinkText href={LinkMaker.block(transaction.blockNumber)} fontType="Titi">
						#{transaction.blockNumber}
					</Typography.LinkText>
				</div>
				<div className={clsx('col-2 block-ver-center')}>
					<div>
						{Number(transaction.amount) >= 0 && (
							<>
								<TypographyLib.Balance
									size="xs"
									value={convertBalanceToView(transaction.amount)}
									currency={transaction.tokenSymbol}
								/>
								<br />
							</>
						)}
						{/* <span>
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
							</span> */}
					</div>
				</div>
				<div className={clsx('col-1 block-ver-center')}>
					<Timer updatedAt={parseInt(transaction.timestamp) * 1000} />
				</div>
				<div
					className={clsx('col-1 padding-left-md gutter-left block-ver-center')}
					style={{ textTransform: 'capitalize' }}
				>
					<Typography.SuccessText>Success</Typography.SuccessText>
				</div>
			</div>
		</GradientRow>
	)
}
export default AddressTransaction
