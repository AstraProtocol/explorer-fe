import { CryptoIcon, Typography as TypographyLib } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import Row from 'components/Grid/Row'
import GradientRow from 'components/Row/GradientRow'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import Tag from 'components/Typography/Tag'
import Image from 'next/image'
import { convertBalanceToView, ellipseBetweenText, LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

interface Props {
	transaction: AddressTransactionData
}

const AddressTransaction = ({ transaction }: Props) => {
	const evmType = transaction?.messages ? transaction?.messages[0]?.evmType : ''
	const isEvm = transaction?.type === 'MsgEthereumTx'
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
									{ellipseBetweenText(transaction.hash, 12, 12).toLowerCase()}
								</Typography.LinkText>
								{evmType && <Tag hasArrowRight={false} fontType="Titi" text={evmType} />}
							</Row>
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
					</Row>
				</div>
				<div className={clsx('col-2 block-ver-center')}>
					<Typography.Label
						text={transaction.type}
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
					<div>
						{Number(transaction.value || '0') >= 0 && (
							<>
								<TypographyLib.Balance
									size="xs"
									value={transaction.value}
									currency={''}
									icon={<CryptoIcon name={'asa'} size="sm" />}
								/>
								<br />
							</>
						)}

						{Number(transaction.fee) >= 0 && (
							<TypographyLib.Balance
								icon={<span>Fee:</span>}
								size="2xs"
								value={convertBalanceToView(transaction.fee)}
								fixNumber={7}
								currency={process.env.NEXT_PUBLIC_NATIVE_TOKEN?.toUpperCase()}
								classes="contrast-color-70"
							/>
						)}
					</div>
				</div>

				<div className={clsx('col-1 padding-left-md gutter-left col')} style={{ textTransform: 'capitalize' }}>
					{transaction.success ? (
						<Typography.SuccessText>Success</Typography.SuccessText>
					) : (
						<Typography.ErrorText>Error</Typography.ErrorText>
					)}
					<Timer updatedAt={transaction.blockTime} />
				</div>
			</div>
		</GradientRow>
	)
}
export default AddressTransaction
