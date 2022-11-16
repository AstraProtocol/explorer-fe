import clsx from 'clsx'
import RowShowAnimation from 'components/Animation/RowShowAnimation'
import Row from 'components/Grid/Row'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import { LinkText } from 'components/Typography/LinkText'
import Tag from 'components/Typography/Tag'
import Image from 'next/image'
import { TransacionTypeEnum } from 'utils/enum'
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
	transactionType: TransacionTypeEnum
}

const Address = ({ address, label, textClasses }: { address: string; label: string; textClasses?: string }) => {
	return (
		<>
			<div
				className={clsx(
					'contrast-color-30',
					'text-base text',
					'inline-block inline-width',
					'sm-inline-width sm-padding-right-2xs'
				)}
				style={{ ['--width' as string]: '45px', ['--sm-width' as string]: 'auto' }}
			>
				{label}
			</div>
			{/* <span className="contrast-color-70 margin-right-lg money money-2xs"> */}
			<LinkText href={LinkMaker.address(address)} classes={clsx('margin-right-lg', textClasses)}>
				{ellipseBetweenText(address, 12, 12)}
			</LinkText>
			{/* </span> */}
		</>
	)
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
	transactionType
}: TransactionBriefRowProps) {
	const transactionQuery = evmType ? { type: evmType } : null
	const isEvm = transactionType === TransacionTypeEnum.Ethermint
	return (
		<RowShowAnimation action={newTransaction}>
			<div
				className={clsx(
					styles.rowBrief,
					'margin-left-lg margin-right-lg',
					'inline-min-height',

					{ 'border border-bottom-base': border }
				)}
				style={{ ['--min-height' as string]: '60px' }}
			>
				<div
					className={clsx(styles.icon, 'margin-right-sm', 'sm-hide')}
					// style={{ alignSelf: !to && !from ? '' : 'baseline' }}
				>
					{isEvm ? (
						<Image alt={'eth'} src={`/images/icons/eth.svg`} width={24} height={24} />
					) : (
						<Image alt={'cosmos'} src={`/images/icons/atom.svg`} width={24} height={24} />
					)}
				</div>
				<div className={clsx(styles.content)}>
					<div className={clsx('block-ver-center', styles.info, 'sm-wrap')}>
						<Row>
							{/* <span className={clsx('contrast-color-30 margin-right-xs text text-sm', 'sm-hide')}>
								Hash
							</span> */}
							<Typography.LinkText
								href={LinkMaker.transaction(hash, transactionQuery)}
								fontType="Titi"
								fontSize="money-2xs"
							>
								{ellipseBetweenText(hash, 12, 12).toLowerCase()}
							</Typography.LinkText>
							{evmType && <Tag hasArrowRight={false} fontType="Titi" text={evmType} />}
						</Row>
						<Timer updatedAt={updatedAt} />
					</div>
					{/* {(!!from || !!to) && (
						<div className={clsx('block-ver-center margin-top-xs', styles.info)}>
							<div style={{ width: '100%' }}>
								{!!from && <Address textClasses="money-2xs" address={from} label="From" />}
								<div style={{ display: 'flex', justifyContent: 'space-between' }}>
									<div>{!!to && <Address textClasses="money-2xs" address={to} label="To" />}</div>
									{!!balance?.value && (
										<TypographyUI.Balance
											icon={
												<CryptoIcon
													name={process.env.NEXT_PUBLIC_EVM_TOKEN as CryptoIconNames}
												/>
											}
											currency={balance.token}
											size="sm"
											value={balance?.value}
										/>
									)}
								</div>
							</div>
						</div>
					)} */}
				</div>
			</div>
		</RowShowAnimation>
	)
}
