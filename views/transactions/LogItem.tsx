import clsx from 'clsx'
import CardInfo, { CardRowItem } from 'components/Card/CardInfo'
import { EventDecode } from 'components/Card/CardInfo/Components/Decode'
import Link from 'next/link'
import { LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

export type LogElementProps = {
	address: string
	verified?: boolean
	methodId?: string
	call?: string
	methodParams?: EventDecode[]
	topics: string[]
	data: string
	index: string
	borderTop?: boolean
}

export default function LogElement({
	address,
	verified,
	methodId,
	call,
	data,
	topics,
	methodParams,
	index,
	borderTop
}: LogElementProps) {
	let items: CardRowItem[] = []
	console.log('verify', verified)
	items.push({
		label: 'Address:',
		type: 'text',
		contents: [{ value: address }]
	})
	let topElement: React.ReactNode = null
	if (verified) {
		items.push({
			label: 'Decode:',
			type: 'decode',
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
		topElement = (
			<div>
				<div className={clsx({ [styles.hr]: borderTop })}></div>
			</div>
		)
	} else {
		topElement = (
			<div>
				<div className={clsx({ [styles.hr]: borderTop })}></div>
				<div className={clsx(styles.verifyContract, 'contrast-color-100')}>
					To see accurate decoded input data, the contract must be verified. Verify the contract{' '}
					<Link href={LinkMaker.address(address)}>
						<a className="link padding-left-xs"> here</a>
					</Link>
					.
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
			type: 'text',
			contents: [{ value: `[${idx}] ${topics[idx]}` }]
		})
	}

	items.push({
		label: 'Data',
		type: 'text',
		contents: [{ value: data }]
	})
	items.push({
		label: 'Log Index',
		type: 'text',
		contents: [{ value: index }]
	})

	return (
		<CardInfo
			items={items}
			background={false}
			topElement={topElement}
			classes={['margin-left-2xl margin-right-2xl']}
		/>
	)
}
