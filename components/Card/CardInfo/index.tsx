import { CryptoIcon, Typography as TypographyUI } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import CopyButton from 'components/Button/CopyButton'
import Typography from 'components/Typography'
import { LabelBackgroundTypes, LabelTypes } from 'components/Typography/Label'
import { LinkMaker } from 'utils/helper'
import BackgroundCard from '../Background/BackgroundCard'
import styles from './style.module.scss'

export type Content = {
	link?: string
	value?: string | number
	prefix?: string
	suffix?: string
	icon?: string
	token?: string
	type?: LabelTypes
	backgroundType?: LabelBackgroundTypes
	transfer?: {
		from?: string
		to?: string
		value?: number
		token?: string
	}
}

export type CardRowItem = {
	label?: string
	type: 'copy' | 'link-copy' | 'label' | 'link' | 'balance' | 'text' | 'time' | 'transfer'
	contents: Content[]
}

type CardInfoProps = {
	classes?: string[]
	items?: CardRowItem[]
}

export default function CardInfo({ items, classes = [] }: CardInfoProps) {
	return (
		<BackgroundCard classes={`margin-bottom-md ${classes.join(' ')}`}>
			<div className={'margin-left-2xl margin-right-2xl margin-top-lg margin-bottom-lg'}>
				{items.map(({ label, type, contents }) => (
					<div key={label} className={clsx(styles.cardRow, 'row margin-bottom-md')}>
						<div className={clsx(styles.leftColumn, 'col-2 gutter-right block-ver-center')}>
							<Typography.CardLabel>{label}</Typography.CardLabel>
						</div>
						{(contents as Content[]).map(content => (
							<div
								key={content.value || new Date().getTime()}
								className={clsx(styles.rightColumn, 'block-center margin-right-sm')}
							>
								{type === 'text' ? (
									<span className="moeny money-sm contrast-color-100">{content.value}</span>
								) : null}
								{type === 'copy' ? (
									<CopyButton
										textCopy={content?.value as string}
										textTitle={content?.value as string}
									/>
								) : null}
								{type === 'link' ? (
									<Typography.LinkText href={content.link || ''}>
										{content.value as string}
									</Typography.LinkText>
								) : null}
								{type === 'link-copy' ? (
									<div className="block-center">
										<Typography.LinkText href={content.link || ''}>
											{content.value as string}
										</Typography.LinkText>
										<CopyButton textCopy={content.link as string} />
									</div>
								) : null}
								{type === 'label' ? (
									<div className="block-center">
										<Typography.Label
											text={content.value as string}
											icon
											type={content.type as LabelTypes}
											background={content.backgroundType as LabelBackgroundTypes}
										/>
									</div>
								) : null}
								{type === 'balance' ? (
									<div className="block-center">
										<TypographyUI.Balance
											icon={<CryptoIcon name={'asa'} />}
											value={content.value}
											currency={content.token}
											size="sm"
										/>
									</div>
								) : null}
								{type === 'time' ? (
									<div className="block-center">
										<Typography.Time time={content.value} confirmedWithin={content.suffix} />
									</div>
								) : null}
								{type === 'transfer' ? (
									<div className="block-center">
										<span
											className={clsx(
												styles.smallCard,
												'radius-sm block-center',
												'contrast-color-100',
												'padding-left-sm padding-right-sm padding-top-xs padding-bottom-xs',
												'margin-right-md'
											)}
										>
											<span className="padding-right-xs">From</span>
											<Typography.LinkText href={LinkMaker.address(content?.transfer?.from)}>
												{content?.transfer?.from}
											</Typography.LinkText>
											<CopyButton textCopy={content?.transfer?.from} />
										</span>
										<span
											className={clsx(
												styles.smallCard,
												'radius-sm block-center',
												'contrast-color-100',
												'padding-left-sm padding-right-sm padding-top-xs padding-bottom-xs',
												'margin-right-md'
											)}
										>
											<span className="padding-right-xs">To</span>
											<Typography.LinkText href={LinkMaker.address(content?.transfer?.to)}>
												{content?.transfer?.to}
											</Typography.LinkText>
											<CopyButton textCopy={content?.transfer?.to} />
										</span>
										<span
											className={clsx(
												styles.smallCard,
												'radius-sm block-center',
												'contrast-color-100',
												'padding-left-sm padding-right-sm padding-top-xs padding-bottom-xs',
												'margin-right-md'
											)}
										>
											<span className="padding-right-xs">For</span>
											<span className="padding-right-xs">{content?.transfer.value}</span>
											<Typography.LinkText href={LinkMaker.address(content?.transfer?.to)}>
												{content?.transfer?.token}
											</Typography.LinkText>
										</span>
									</div>
								) : null}
							</div>
						))}
					</div>
				))}
			</div>
		</BackgroundCard>
	)
}
