import { CryptoIcon, Typography as TypographyLib, useMobileLayout } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import Row from 'components/Grid/Row'
import GradientRow from 'components/Row/GradientRow'
import TransactionTag from 'components/Tag/TransactionTag'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import { LinkText } from 'components/Typography/LinkText'
import Image from 'next/image'
import { CONFIG } from 'utils/constants'
import {
	calculateGasFee,
	capitalizeFirstLetter,
	convertBalanceToView,
	ellipseBetweenText,
	LinkMaker
} from 'utils/helper'
import { useTransactionType } from 'views/accounts/hook/useTransactionType'
import styles from './style.module.scss'

interface Props {
	transaction: ContractTransactionData
}

const ContractTransaction = ({ transaction }: Props) => {
	const interactToAddress = transaction.to || transaction.createdContractAddressHash
	const { isMobile } = useMobileLayout()
	const txsHashLength = isMobile ? CONFIG.TXS_MOBILE_SPLIT_LENGTH : CONFIG.TXS_DESKTOP_SPLIT_LENGTH

	const type = useTransactionType(transaction.from, transaction.to, transaction.createdContractAddressHash)
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
				<div className={clsx('col-6 md-col-9')}>
					<Row>
						<Image alt="eth" src={`/images/icons/eth.svg`} width={24} height={24} />
						<div className="margin-left-xs">
							<Row>
								<Typography.LinkText
									href={LinkMaker.transaction(transaction.hash)}
									classes={'margin-right-xs'}
									fontType="Titi"
								>
									{ellipseBetweenText(transaction.hash, txsHashLength, txsHashLength)}
								</Typography.LinkText>
								{transaction.contractMethodName && (
									<Typography.Label
										text={capitalizeFirstLetter(transaction.contractMethodName)}
										backgroundShape="rectangle"
										radius="radius-2xl"
										font="text-bold text text-sm"
									/>
								)}
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
									{interactToAddress && (
										<>
											<span className={clsx('contrast-color-30 padding-right-2xs text text-sm')}>
												To
											</span>
											<LinkText
												href={LinkMaker.address(interactToAddress)}
												classes="margin-right-lg"
											>
												{transaction.toAddressName
													? `${transaction.toAddressName} (${ellipseBetweenText(
															interactToAddress,
															6,
															6
													  )})`
													: ellipseBetweenText(interactToAddress, 6, 6)}
											</LinkText>
										</>
									)}
								</div>
							)}
						</div>
					</Row>
				</div>
				<div className={clsx('col-2 block-ver-center')}>
					<Typography.LinkText href={LinkMaker.block(transaction.blockNumber)} fontType="Titi">
						#{transaction.blockNumber}
					</Typography.LinkText>
				</div>
				<div className={clsx('col-2 block-ver-center')}>
					<div>
						{Number(transaction.value) >= 0 && (
							<>
								<TypographyLib.Balance
									size="2xs"
									value={convertBalanceToView(transaction.value)}
									currency={process.env.NEXT_PUBLIC_NATIVE_TOKEN?.toUpperCase()}
									icon={<CryptoIcon name={'asa'} size="sm" />}
								/>
								<br />
							</>
						)}
						<span>
							{Number(transaction.gasUsed) >= 0 && (
								<TypographyLib.Balance
									icon={<span>Fee:</span>}
									size="2xs"
									value={convertBalanceToView(
										calculateGasFee(transaction.gasUsed, transaction.gasPrice)
									)}
									fixNumber={7}
									currency={process.env.NEXT_PUBLIC_NATIVE_TOKEN.toUpperCase()}
									classes="contrast-color-70"
								/>
							)}
						</span>
					</div>
				</div>
				<div className={clsx('col col-2 padding-left-md gutter-left ')} style={{ textTransform: 'capitalize' }}>
					{transaction.success ? (
						<Typography.SuccessText>Success</Typography.SuccessText>
					) : (
						<Typography.ErrorText>Error</Typography.ErrorText>
					)}
					<Timer updatedAt={transaction.timeStamp} />
					{type && <TransactionTag type={type} />}
				</div>
			</div>
		</GradientRow>
	)
}
export default ContractTransaction
