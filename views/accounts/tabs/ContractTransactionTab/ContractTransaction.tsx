import { CryptoIcon, Typography as TypographyLib } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import Row from 'components/Grid/Row'
import GradientRow from 'components/Row/GradientRow'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import { LinkText } from 'components/Typography/LinkText'
import { capitalizeFirstLetter, convertBalanceToView, ellipseBetweenText, LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

interface Props {
	transaction: ContractTransactionData
}

const ContractTransaction = ({ transaction }: Props) => {
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
				<div className={clsx('col-6')}>
					<Row>
						<Typography.LinkText
							href={LinkMaker.transaction(transaction.hash)}
							classes={'margin-right-xs'}
							fontType="Titi"
						>
							{ellipseBetweenText(transaction.hash, 20, 20)}
						</Typography.LinkText>
						<Typography.Label
							text={capitalizeFirstLetter(transaction.contractMethodName)}
							backgroundShape="rectangle"
							radius="radius-2xl"
							font="text-bold text text-sm"
						/>
					</Row>
					{(transaction.from || transaction.to) && (
						<div className="margin-top-xs">
							{transaction.from && (
								<>
									<span className={clsx('contrast-color-30 margin-right-xs text text-sm')}>From</span>
									<LinkText href={LinkMaker.address(transaction.from)} classes="margin-right-lg ">
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
							{transaction.to && (
								<>
									<span className={clsx('contrast-color-30 padding-right-2xs text text-sm')}>To</span>
									<LinkText href={LinkMaker.address(transaction.to)} classes="margin-right-lg">
										{transaction.toAddressName
											? `${transaction.toAddressName} (${ellipseBetweenText(
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
				{/* <div className={clsx('col-2 block-ver-center')}>
					
				</div> */}
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
									size="xs"
									value={transaction.value}
									currency={''}
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
									value={convertBalanceToView(transaction.gasUsed)}
									fixNumber={7}
									currency={process.env.NEXT_PUBLIC_FEE_TOKEN}
									classes="contrast-color-70"
								/>
							)}
						</span>
					</div>
				</div>
				<div className={clsx('col-1 block-ver-center')}>
					<Timer updatedAt={transaction.timeStamp} />
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
export default ContractTransaction
