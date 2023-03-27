import {
	CryptoIcon,
	ellipseBetweenText,
	Table,
	Typography as TypographyUI,
	useMobileLayout
} from '@astraprotocol/astra-ui'
import { CryptoIconNames } from '@astraprotocol/astra-ui/lib/es/components/CryptoIcon'
import { Column, RowData } from '@astraprotocol/astra-ui/lib/es/components/Table/Table'
import clsx from 'clsx'
import CopyButton from 'components/Button/CopyButton'
import Tag from 'components/Tag/PolygonTag'
import Typography from 'components/Typography'
import { LabelBackgroundTypes, LabelTypes } from 'components/Typography/Label'
import Image from 'next/image'
import { TransactionCardTypeEnum } from 'utils/enum'
import { ellipseRightText } from 'utils/helper'
import BackgroundCard from '../Background/BackgroundCard'
import CardTabs from './Components/CardTabs'
import Decode, { DecodeProps } from './Components/Decode'
import RawInput from './Components/RawInput'
import Transfers from './Components/Transfers'
import ValidatorCommission from './Components/ValidatorCommission'
import ValidatorDescription from './Components/ValidatorDescription'
import styles from './style.module.scss'

type TransferContent = {
	from?: string
	fromText?: string
	to?: string
	toText?: string
	value?: number
	tokenAddress?: string
	tokenName?: string
	tokenSymbol?: string
	tokenType?: string
	tokenId?: string
}

export interface InternalTransferContent extends TransferContent {
	index: string
}

export type Content = {
	link?: string
	value?: string | number | any
	text?: string | JSX.Element | JSX.Element[]
	prefix?: string
	suffix?: string
	icon?: boolean
	token?: string
	type?: LabelTypes
	backgroundType?: LabelBackgroundTypes
	internalTransfer?: InternalTransferContent[]
	transfer?: TransferContent
	decode?: DecodeProps
	tabs?: {
		tabTitles: string[]
		tabContent: any[]
	}
	table?: {
		colums: Column[]
		rows: RowData[]
	}
}

export type CardRowItem = {
	label?: string
	type: TransactionCardTypeEnum
	contents: Content[]
	responsive?: {
		wrap?: 'sm' | 'md'
		ellipsis?: boolean
	}
}

type CardInfoProps = {
	classes?: string[]
	items?: CardRowItem[]
	topElement?: React.ReactNode
	background?: boolean
	backgroundCardBlur?: boolean
}

export default function CardInfo({
	items,
	classes = [],
	topElement,
	background = true,
	backgroundCardBlur = true
}: CardInfoProps) {
	const { isMobile: isSmallDevice } = useMobileLayout('small')
	const { isMobile: isMediumDevice } = useMobileLayout('medium')
	const _ellipsis = (text: string | number, cut = true): string =>
		cut ? ellipseRightText(`${text}`, isSmallDevice ? 27 : isMediumDevice ? 45 : 150) : (text as string)

	return (
		<BackgroundCard
			classes={`margin-bottom-md ${classes.join(' ')}`}
			backgroundColor={background}
			border={background}
			backgroundCardBlur={backgroundCardBlur}
		>
			{topElement && topElement}
			<div
				className={clsx(
					'margin-left-2xl margin-right-2xl margin-top-lg margin-bottom-lg',
					'sm-margin-left-md sm-margin-right-md'
				)}
			>
				{items.map(({ label, type, contents, responsive = { wrap: 'sm' } }, index) => (
					<div
						key={label + index}
						className={clsx(styles.cardRow, 'row margin-bottom-sm', {
							[`${responsive?.wrap}-flex-column`]: responsive
						})}
					>
						<div
							className={clsx(styles.leftColumn, 'col-2 gutter-right block-ver-center', {
								'padding-bottom-sm': items.length > 1
							})}
						>
							<Typography.CardLabel>{label}</Typography.CardLabel>
							{type === 'nonce' && <Tag text={'Position'} />}
						</div>
						<div
							className={clsx(
								styles.rightColumn,
								'flex col flex-align-center flex-wrap',
								'margin-right-sm',
								'col-10',
								// 'block-ver-center margin-right-sm',
								{ 'padding-bottom-sm border border-bottom-base': items.length > 1 },
								{ [`${responsive?.wrap}-full`]: responsive?.wrap }
							)}
							style={{ overflowX: type === 'table' ? 'auto' : 'unset' }}
						>
							{(contents as Content[]).map((content, index) => (
								<div key={(content.value as string) + index}>
									{type === TransactionCardTypeEnum.NONCE ? (
										<div className="block-ver-center money money-sm contrast-color-70">
											{content.value}
											<Tag text={content.suffix} />
										</div>
									) : null}
									{type === TransactionCardTypeEnum.TEXT ? (
										<span className="money money-sm contrast-color-100 word-break-all ">
											{/* {_ellipsis(content.value, responsive.ellipsis)}{' '} */}
											{content.value} {content.suffix && content.suffix}
										</span>
									) : null}
									{type === TransactionCardTypeEnum.COPY ? (
										<CopyButton
											textCopy={content?.value as string}
											textTitle={_ellipsis(content?.value as string, responsive.ellipsis)}
										/>
									) : null}
									{type === TransactionCardTypeEnum.LINK ? (
										<Typography.LinkText
											href={(content.link as string) || ''}
											fontType="Titi"
											fontSize="text-500"
										>
											{/* {_ellipsis(content.value as string, responsive.ellipsis)} */}
											{content.value}
										</Typography.LinkText>
									) : null}
									{type === TransactionCardTypeEnum.LINK_COPY ? (
										<div className="block-center">
											<Typography.LinkText href={content.link || ''}>
												{/* {_ellipsis(
													content.text || (content.value as string),
													responsive.ellipsis
												)} */}
												{content.text || content.value}
											</Typography.LinkText>
											<CopyButton textCopy={content.value as string} />
										</div>
									) : null}
									{type === TransactionCardTypeEnum.INTERACT_CONTRACT_WITH_TRANSFER_INTERNAL ? (
										<div className="col">
											<div className="row ">
												<Typography.LinkText href={content.link || ''}>
													{content.text || content.value}
												</Typography.LinkText>
												<CopyButton textCopy={content.value as string} />
											</div>
											{content.internalTransfer?.map((t: InternalTransferContent) => (
												<div key={t.index} className="margin-left-sm margin-top-xs">
													<Image
														className="contrast-color-100"
														alt="internal-tx"
														src={'/images/icons/shape.svg'}
														width={8}
														height={8}
													/>
													<span className="margin-left-xs text text-sm contrast-color-70">
														Transfer <span className="money money-sm">{t.value} ASA</span>
														{'  '}
														From{'  '}
														<Typography.LinkText href={t.from || ''}>
															{t.fromText
																? `${t.fromText} (${ellipseBetweenText(t.from)})`
																: ellipseBetweenText(t.from)}
														</Typography.LinkText>
														{'  '}
														To{'  '}
														<Typography.LinkText href={t.to || ''}>
															{t.toText
																? `${t.toText} (${ellipseBetweenText(t.to)})`
																: ellipseBetweenText(t.to)}
														</Typography.LinkText>
													</span>
												</div>
											))}
										</div>
									) : null}
									{type === TransactionCardTypeEnum.LABEL ? (
										<div className="block-center margin-right-md">
											<Typography.Label
												text={content.value as string}
												icon={content.icon}
												type={content.type as LabelTypes}
												backgroundShape={content.backgroundType as LabelBackgroundTypes}
											/>
										</div>
									) : null}
									{type === TransactionCardTypeEnum.BALANCE ? (
										<div className="block-center">
											<TypographyUI.Balance
												icon={
													<CryptoIcon
														name={process.env.NEXT_PUBLIC_NATIVE_TOKEN as CryptoIconNames}
													/>
												}
												value={content.value}
												currency={content.suffix}
												size="sm"
											/>
										</div>
									) : null}
									{type === TransactionCardTypeEnum.TIME ? (
										<div className="block-center">
											<Typography.Time
												time={content.value}
												confirmedWithin={content.suffix as string}
											/>
										</div>
									) : null}
									{type === TransactionCardTypeEnum.TOKEN_TRANSFER ? (
										<Transfers content={content} />
									) : null}
									{type === TransactionCardTypeEnum.RAW_INPUT ? (
										<RawInput text={content.value as string} />
									) : null}
									{type === TransactionCardTypeEnum.DECODE ? <Decode {...content.decode} /> : null}
									{type === TransactionCardTypeEnum.VALIDATOR_DESCRIPTION ? (
										<ValidatorDescription description={content.value as ValidatorData} />
									) : null}
									{type === TransactionCardTypeEnum.COMMISION ? (
										<ValidatorCommission commission={content.value as CommissionRates} />
									) : null}
									{type === TransactionCardTypeEnum.TABS ? <CardTabs {...content.tabs} /> : null}
									{type === TransactionCardTypeEnum.TABLE
										? content.table && (
												<div
													style={{
														maxHeight: '300px',
														minWidth: '250px',
														overflowY: 'auto',
														width: '100%'
													}}
												>
													<Table
														classes={{ table: styles.tableTD }}
														colums={content.table.colums}
														rows={content.table.rows}
													/>
												</div>
										  )
										: null}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</BackgroundCard>
	)
}
