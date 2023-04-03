import { CryptoIcon, ellipseRightText, Typography as TypographyLib, useMobileLayout } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import Row from 'components/Grid/Row'
import GradientRow from 'components/Row/GradientRow'
import PolygonTag from 'components/Tag/PolygonTag'
import TransactionTag from 'components/Tag/TransactionTag'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import { LinkText } from 'components/Typography/LinkText'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import { CONFIG } from 'utils/constants'
import { isEvmTransactionType } from 'utils/evm'
import { convertBalanceToView, ellipseBetweenText, LinkMaker } from 'utils/helper'
import { useTransactionType } from 'views/accounts/hook/useTransactionType'
import { comosTransactionMsgCount } from 'views/transactions/utils'
import styles from './style.module.scss'

interface Props {
	transaction: AddressTransactionData
}

const AddressTransaction = ({ transaction }: Props) => {
	const evmType = transaction?.messages ? transaction?.messages[0]?.evmType : ''
	const isEvm = isEvmTransactionType(transaction?.type)
	const { isMobile } = useMobileLayout()
	const txsHashLength = isMobile ? CONFIG.TXS_MOBILE_SPLIT_LENGTH : CONFIG.TXS_DESKTOP_SPLIT_LENGTH
	const transactionType = useTransactionType(transaction.from, transaction.to)

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
			<div className={clsx(styles.rowBrief, styles.TransactionRow, 'row')}>
				<div className={clsx('col-5')}>
					<Row>
						{isEvm ? (
							<Image alt={'eth'} src={`/images/icons/eth.svg`} width={24} height={24} />
						) : (
							<Image alt={'cosmos'} src={`/images/icons/atom.svg`} width={24} height={24} />
						)}
						<div className="margin-left-xs">
							<Row>
								<Typography.LinkText
									href={LinkMaker.transaction(transaction.hash)}
									classes={'margin-right-xs'}
									fontType="Titi"
								>
									{ellipseBetweenText(transaction.hash, txsHashLength, txsHashLength).toLowerCase()}
								</Typography.LinkText>
								{evmType && <PolygonTag hasArrowRight={false} fontType="Titi" text={evmType} />}
							</Row>
							{(transaction.from || transaction.to) && (
								<div className="margin-top-xs">
									{transaction.from && (
										<>
											<span className={clsx('contrast-color-30 margin-right-xs text text-sm')}>
												From
											</span>
											<LinkText
												href={LinkMaker.address(transaction.from)}
												classes="margin-right-lg "
											>
												{transaction.fromAddressName
													? `${transaction.fromAddressName} (${ellipseBetweenText(
															transaction.from,
															6,
															6
													  )})`
													: ellipseBetweenText(transaction.from, 6, 6)}
											</LinkText>
										</>
									)}
									{(transaction.fromAddressName || transaction.toAddressName) && <br />}
									{transaction.to && (
										<>
											<span className={clsx('contrast-color-30 margin-right-xs text text-sm')}>
												To
											</span>
											<LinkText
												href={LinkMaker.address(transaction.to)}
												classes="margin-right-lg "
											>
												{transaction.fromAddressName
													? `${transaction.fromAddressName} (${ellipseBetweenText(
															transaction.to,
															6,
															6
													  )})`
													: ellipseBetweenText(transaction.to, 6, 6)}
											</LinkText>
										</>
									)}
								</div>
							)}
						</div>
					</Row>
				</div>
				<div className={clsx('col-2 block-ver-center')}>
					<Typography.Label
						text={ellipseRightText(transaction.type, 13)}
						// titleText={type}
						backgroundShape="rectangle"
						radius="radius-2xl"
						font="text-bold text text-sm"
					/>
					{!isEmpty(transaction.messages) && transaction.messages.length > 1 ? (
						<span className="margin-left-2xs contrast-color-70 text-bold">
							{comosTransactionMsgCount(transaction.messages)}
						</span>
					) : null}
				</div>
				<div className={clsx('col-2 block-ver-center')}>
					<Typography.LinkText href={LinkMaker.block(transaction.blockHeight)} fontType="Titi">
						#{transaction.blockHeight}
					</Typography.LinkText>
				</div>
				<div className={clsx('col-2 block-ver-center')}>
					<div>
						{Number(transaction.value || '0') >= 0 && (
							<>
								<TypographyLib.Balance
									size="2xs"
									value={transaction.value}
									currency={process.env.NEXT_PUBLIC_NATIVE_TOKEN?.toUpperCase()}
									icon={<CryptoIcon name="asa" size="sm" />}
								/>
								<br />
							</>
						)}

						{Number(transaction.fee) >= 0 && (
							<TypographyLib.Balance
								icon={<span>Fee:</span>}
								size="xs"
								value={convertBalanceToView(transaction.fee)}
								fixNumber={7}
								currency={process.env.NEXT_PUBLIC_NATIVE_TOKEN?.toUpperCase()}
								classes="contrast-color-70"
							/>
						)}
					</div>
				</div>

				<div className={clsx('col-2 padding-left-md gutter-left col')} style={{ textTransform: 'capitalize' }}>
					{transaction.success ? (
						<Typography.SuccessText>Success</Typography.SuccessText>
					) : (
						<Typography.ErrorText>Error</Typography.ErrorText>
					)}
					<Timer updatedAt={transaction.blockTime} />
					{transactionType && <TransactionTag type={transactionType} />}
				</div>
			</div>
		</GradientRow>
	)
}
export default AddressTransaction
