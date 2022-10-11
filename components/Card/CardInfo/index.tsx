import { CryptoIcon, Typography as TypographyUI } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import CopyButton from 'components/Button/CopyButton'
import Typography from 'components/Typography'
import { LabelBackgroundTypes, LabelTypes } from 'components/Typography/Label'
import Tag from 'components/Typography/Tag'
import BackgroundCard from '../Background/BackgroundCard'
import Decode, { DecodeProps } from './Components/Decode'
import RawInput from './Components/RawInput'
import Transfers from './Components/Transfers'
import styles from './style.module.scss'

export type Content = {
	link?: string
	value?: string | number
	prefix?: string
	suffix?: string
	icon?: boolean
	token?: string
	type?: LabelTypes
	backgroundType?: LabelBackgroundTypes
	transfer?: {
		from?: string
		to?: string
		value?: number
		token?: string
	}
	decode?: DecodeProps
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
	contents: Content[]
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
	return (
		<BackgroundCard
			classes={`margin-bottom-md ${classes.join(' ')}`}
			backgroundColor={background}
			border={background}
			backgroundCardBlur={backgroundCardBlur}
		>
			{topElement && topElement}
			<div className={'margin-left-2xl margin-right-2xl margin-top-lg margin-bottom-lg'}>
				{items.map(({ label, type, contents }, index) => (
					<div key={label + index} className={clsx(styles.cardRow, 'row margin-bottom-sm')}>
						<div className={clsx(styles.leftColumn, 'col-2 gutter-right padding-bottom-sm')}>
							<Typography.CardLabel>{label}</Typography.CardLabel>
							{type === 'nonce' && <Tag text={'Position'} />}
						</div>
						<div
							className={clsx(
								styles.rightColumn,
								'col-10',
								'block-ver-center margin-right-sm padding-bottom-sm',
								'border border-bottom-base'
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
										<span
											className="money money-sm contrast-color-100"
											style={{ wordBreak: 'break-all' }}
										>
											{content.value} {content.suffix && content.suffix}
										</span>
									) : null}
									{type === 'copy' ? (
										<CopyButton
											textCopy={content?.value as string}
											textTitle={content?.value as string}
										/>
									) : null}
									{type === 'link' ? (
										<Typography.LinkText
											href={(content.link as string) || ''}
											fontType="Titi"
											fontSize="text-500"
										>
											{content.value as string}
										</Typography.LinkText>
									) : null}
									{type === 'link-copy' ? (
										<div className="block-center">
											<Typography.LinkText href={content.link || ''}>
												{content.value as string}
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
												icon={<CryptoIcon name={'asa'} />}
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
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</BackgroundCard>
	)
}
