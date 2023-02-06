import { CryptoIcon, Table, Typography as TypographyUI, useMobileLayout } from '@astraprotocol/astra-ui'
import { CryptoIconNames } from '@astraprotocol/astra-ui/lib/es/components/CryptoIcon'
import { Column, RowData } from '@astraprotocol/astra-ui/lib/es/components/Table/Table'
import clsx from 'clsx'
import CopyButton from 'components/Button/CopyButton'
import Tag from 'components/Tag/PolygonTag'
import Typography from 'components/Typography'
import { LabelBackgroundTypes, LabelTypes } from 'components/Typography/Label'
import { ellipseRightText } from 'utils/helper'
import BackgroundCard from '../Background/BackgroundCard'
import CardTabs from './Components/CardTabs'
import Decode, { DecodeProps } from './Components/Decode'
import RawInput from './Components/RawInput'
import Transfers from './Components/Transfers'
import ValidatorCommission from './Components/ValidatorCommission'
import ValidatorDescription from './Components/ValidatorDescription'
import styles from './style.module.scss'

export type Content = {
	link?: string
	value?: string | number | any
	text?: string
	prefix?: string
	suffix?: string
	icon?: boolean
	token?: string
	type?: LabelTypes
	backgroundType?: LabelBackgroundTypes
	transfer?: {
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
	type:
		| 'copy'
		| 'link-copy'
		| 'label'
		| 'link'
		| 'balance'
		| 'text'
		| 'time'
		| 'transfer'
		| 'raw-input'
		| 'nonce'
		| 'decode'
		| 'validator-description'
		| 'commission'
		| 'tabs'
		| 'table'
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
								'col-10',
								'block-ver-center margin-right-sm',
								{ 'padding-bottom-sm border border-bottom-base': items.length > 1 },
								{ [`${responsive?.wrap}-full`]: responsive?.wrap }
							)}
						>
							{(contents as Content[]).map((content, index) => (
								<div key={(content.value as string) + index}>
									{type === 'nonce' ? (
										<div className="block-ver-center money money-sm contrast-color-70">
											{content.value}
											<Tag text={content.suffix} />
										</div>
									) : null}
									{type === 'text' ? (
										<span className="money money-sm contrast-color-100 word-break-all ">
											{/* {_ellipsis(content.value, responsive.ellipsis)}{' '} */}
											{content.value} {content.suffix && content.suffix}
										</span>
									) : null}
									{type === 'copy' ? (
										<CopyButton
											textCopy={content?.value as string}
											textTitle={_ellipsis(content?.value as string, responsive.ellipsis)}
										/>
									) : null}
									{type === 'link' ? (
										<Typography.LinkText
											href={(content.link as string) || ''}
											fontType="Titi"
											fontSize="text-500"
										>
											{/* {_ellipsis(content.value as string, responsive.ellipsis)} */}
											{content.value}
										</Typography.LinkText>
									) : null}
									{type === 'link-copy' ? (
										<div className="block-center">
											<Typography.LinkText href={content.link || ''}>
												{/* {_ellipsis(
													content.text || (content.value as string),
													responsive.ellipsis
												)} */}
												{content.text || (content.value as string)}
											</Typography.LinkText>
											<CopyButton textCopy={content.value as string} />
										</div>
									) : null}
									{type === 'label' ? (
										<div className="block-center margin-right-md">
											<Typography.Label
												text={content.value as string}
												icon={content.icon}
												type={content.type as LabelTypes}
												backgroundShape={content.backgroundType as LabelBackgroundTypes}
											/>
										</div>
									) : null}
									{type === 'balance' ? (
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
									{type === 'time' ? (
										<div className="block-center">
											<Typography.Time
												time={content.value}
												confirmedWithin={content.suffix as string}
											/>
										</div>
									) : null}
									{type === 'transfer' ? <Transfers content={content} /> : null}
									{type === 'raw-input' ? <RawInput text={content.value as string} /> : null}
									{type === 'decode' ? <Decode {...content.decode} /> : null}
									{type === 'validator-description' ? (
										<ValidatorDescription description={content.value as ValidatorData} />
									) : null}
									{type === 'commission' ? (
										<ValidatorCommission commission={content.value as CommissionRates} />
									) : null}
									{type === 'tabs' ? <CardTabs {...content.tabs} /> : null}
									{type === 'table'
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
