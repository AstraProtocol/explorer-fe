import clsx from 'clsx'
import CardInfo, { CardRowItem } from 'components/Card/CardInfo'
import { EventDecode } from 'components/Card/CardInfo/Components/Decode'
import { TransactionCardTypeEnum } from 'utils/enum'
import styles from './style.module.scss'

export type LogElementProps = {
	address?: string
	addressName?: string
	showAddress?: boolean
	callRow?: string
	verified?: boolean
	methodId?: string
	call?: string
	methodParams?: EventDecode[]
	topics: string[]
	data: string
	index: string
	borderTop?: boolean
	showLeftBorder?: boolean
	useDraftAbiToDecode?: boolean
	onOpenVerify?: Function
}

export default function LogElement({
	address,
	addressName,
	verified,
	methodId,
	call,
	data,
	topics,
	methodParams,
	index,
	borderTop,
	callRow,
	onOpenVerify,
	showAddress = true,
	showLeftBorder = true,
	useDraftAbiToDecode
}: LogElementProps) {
	let items: CardRowItem[] = []

	if (address && showAddress) {
		items.push({
			label: 'Address:',
			type: TransactionCardTypeEnum.TEXT,
			contents: [{ value: addressName ? `${addressName} | ${address}` : address }],
			responsive: {
				ellipsis: false,
				wrap: 'sm'
			}
		})
	}
	if (callRow) {
		items.push({
			label: '',
			type: TransactionCardTypeEnum.TEXT,
			contents: [{ value: callRow }],
			responsive: {
				ellipsis: false,
				wrap: 'sm'
			}
		})
	}

	let topElement: React.ReactNode = null
	if (verified || useDraftAbiToDecode) {
		items.push({
			label: 'Decode:',
			type: TransactionCardTypeEnum.DECODE,
			contents: [
				{
					decode: {
						methodId,
						call,
						items: methodParams
					}
				}
			]
		})
	}
	if (useDraftAbiToDecode || !verified) {
		topElement = (
			<div className="padding-left-2xl padding-right-2xl sm-padding-left-md sm-padding-right-md">
				<div
					className={clsx(
						styles.verifyContract,
						'contrast-color-100',
						'padding-top-sm padding-bottom-sm padding-left-xs padding-right-xs'
					)}
				>
					To see accurate decoded input data, the contract must be verified. Verify the contract{' '}
					{/* <Link href={LinkMaker.address(address, '/verify')}> */}
					<a className="link" onClick={() => onOpenVerify()}>
						here
					</a>
					{/* </Link> */}.
				</div>
			</div>
		)
	}
	for (let idx = 0; idx < topics.length; idx++) {
		let label = ''
		if (idx === 0) {
			label = 'Topics:'
		}
		items.push({
			label: label,
			type: TransactionCardTypeEnum.TEXT,
			contents: [{ value: `[${idx}] ${topics[idx]}` }],
			responsive: {
				ellipsis: false,
				wrap: 'sm'
			}
		})
	}
	if (data) {
		items.push({
			label: 'Data:',
			type: TransactionCardTypeEnum.TEXT,
			contents: [{ value: data }],
			responsive: {
				ellipsis: false,
				wrap: 'sm'
			}
		})
	}
	if (index) {
		items.push({
			label: 'Log Index:',
			type: TransactionCardTypeEnum.TEXT,
			contents: [{ value: index }]
		})
	}

	return (
		<div>
			<div className="padding-left-2xl padding-right-2xl">
				<div className={clsx({ [styles.hr]: borderTop })}></div>
			</div>

			<div
				className={clsx({
					[styles.logItemLeftBorder]: showLeftBorder
				})}
			>
				<CardInfo items={items} background={false} topElement={topElement} backgroundCardBlur={false} />
			</div>
		</div>
	)
}
