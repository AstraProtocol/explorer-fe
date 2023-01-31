import { CryptoIcon, Typography as TypographyLib, useMobileLayout } from '@astraprotocol/astra-ui'
import { CryptoIconNames } from '@astraprotocol/astra-ui/lib/es/components/CryptoIcon'
import clsx from 'clsx'
import GradientRow from 'components/Row/GradientRow'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import { LinkText } from 'components/Typography/LinkText'
import { CONFIG } from 'utils/constants'
import { evmAddressName } from 'utils/evm'
import { convertBalanceToView, ellipseBetweenText, isERC721, LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

interface Props {
	transaction: TokenTransaction
	tokenData: Token
}

const TokenTransaction = ({ transaction, tokenData }: Props) => {
	const isNFT = isERC721(tokenData.type)
	const { isMobile } = useMobileLayout()
	const txsHashLength = isMobile ? CONFIG.TXS_MOBILE_SPLIT_LENGTH : CONFIG.TXS_DESKTOP_SPLIT_LENGTH

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
							href={LinkMaker.transaction(transaction.transactionHash, { type: 'evm' })}
							classes={'margin-right-xs'}
							fontType="Titi"
						>
							{ellipseBetweenText(transaction.transactionHash, txsHashLength, txsHashLength)}
						</Typography.LinkText>
						<Typography.Label
							text={transaction.type}
							backgroundShape="rectangle"
							color="contrast-color-70"
							radius="radius-xs"
							font="money-2xs"
						/>
					</div>
					{(transaction.fromAddress || transaction.toAddress) && (
						<div className="margin-top-xs">
							{transaction.fromAddress && (
								<>
									<span className={clsx('contrast-color-30 margin-right-xs text text-sm')}>From</span>
									<LinkText
										href={LinkMaker.address(transaction.fromAddress)}
										classes="margin-right-lg"
										fontType="Titi"
										fontSize="money-2xs"
									>
										{evmAddressName(
											transaction.fromAddressName,
											ellipseBetweenText(transaction.fromAddress, 6, 6)
										)}
									</LinkText>
								</>
							)}
							{transaction.toAddress && (
								<>
									<span className={clsx('contrast-color-30 padding-right-2xs text text-sm')}>To</span>
									<LinkText
										href={LinkMaker.address(transaction.toAddress)}
										classes="margin-right-lg"
										fontType="Titi"
										fontSize="money-2xs"
									>
										{evmAddressName(
											transaction.toAddressName,
											ellipseBetweenText(transaction.toAddress, 6, 6)
										)}
									</LinkText>
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
						{isNFT ? (
							<LinkText href={LinkMaker.token(transaction.tokenContractAddress, transaction.tokenId)}>
								Token ID [{transaction.tokenId}] {transaction.tokenSymbol}
							</LinkText>
						) : (
							Number(transaction.amount) >= 0 && (
								<>
									<TypographyLib.Balance
										size="xs"
										value={convertBalanceToView(transaction.amount, parseInt(transaction.decimals))}
										currency={transaction.tokenSymbol}
										icon={
											<CryptoIcon
												name={transaction.tokenSymbol?.toLowerCase() as CryptoIconNames}
												size="sm"
											/>
										}
									/>
									<br />
								</>
							)
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
export default TokenTransaction
