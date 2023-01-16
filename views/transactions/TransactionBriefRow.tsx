import clsx from 'clsx'
import RowShowAnimation from 'components/Animation/RowShowAnimation'
import Row from 'components/Grid/Row'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import Tag from 'components/Typography/Tag'
import Image from 'next/image'
import { TransactionTypeEnum } from 'utils/enum'
import { ellipseBetweenText, LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

type TransactionBriefRowProps = {
	hash: string
	from: string
	to: string
	balance: {
		value?: string
		token?: string
	}
	updatedAt: number | string
	newTransaction?: boolean
	border?: boolean
	evmType: string
	transactionType: string
	fullBox?: boolean
	isMobile?: boolean
}

export default function TransactionBriefRow({
	hash,
	from,
	to,
	balance,
	updatedAt,
	newTransaction,
	border,
	evmType,
	transactionType,
	fullBox,
	isMobile
}: TransactionBriefRowProps) {
	const isEvm = transactionType === TransactionTypeEnum.Ethermint
	const transactionQuery = isEvm ? { type: 'evm' } : null
	const ellipseLength = isMobile ? 12 : 20

	return (
		<RowShowAnimation action={newTransaction}>
			<div
				className={clsx(
					styles.rowBrief,
					'margin-left-lg margin-right-lg',
					'inline-min-height',

					{ 'border border-bottom-base': border }
				)}
				style={{ ['--min-height' as string]: '60px', maxHeight: fullBox ? '105px' : 'auto' }}
			>
				<div className={clsx(styles.icon, 'margin-right-sm', 'sm-hide')}>
					{isEvm ? (
						<Image alt={'eth'} src={`/images/icons/eth.svg`} width={24} height={24} />
					) : (
						<Image alt={'cosmos'} src={`/images/icons/atom.svg`} width={24} height={24} />
					)}
				</div>
				<div className={clsx(styles.content)}>
					<div className={clsx('block-ver-center', styles.info, 'sm-wrap')}>
						<Row style={{ justifyContent: 'space-between' }}>
							<div>
								<Row>
									<Typography.LinkText
										href={LinkMaker.transaction(hash, transactionQuery)}
										fontType="Titi"
										fontSize="money-2xs"
									>
										{ellipseBetweenText(hash, ellipseLength, ellipseLength).toLowerCase()}
									</Typography.LinkText>
									{evmType && <Tag hasArrowRight={false} fontType="Titi" text={evmType} />}
								</Row>
								{(from || to) && !isMobile && (
									<div className="margin-top-xs">
										{from && (
											<>
												<span
													className={clsx(
														'contrast-color-30 margin-right-xs money money-2xs'
													)}
												>
													From
												</span>
												<Typography.LinkText
													fontType="Titi"
													href={LinkMaker.address(from)}
													fontSize="money-2xs"
													classes="margin-right-sm"
												>
													{ellipseBetweenText(from, 6, 6)}
												</Typography.LinkText>
											</>
										)}
										{to && (
											<>
												<span
													className={clsx(
														'contrast-color-30 padding-right-2xs money money-2xs'
													)}
												>
													To
												</span>
												<Typography.LinkText
													fontType="Titi"
													href={LinkMaker.address(to)}
													fontSize="money-2xs"
												>
													{ellipseBetweenText(to)}
												</Typography.LinkText>
											</>
										)}
									</div>
								)}
							</div>
							<Timer updatedAt={updatedAt} />
						</Row>
					</div>
				</div>
			</div>
		</RowShowAnimation>
	)
}
