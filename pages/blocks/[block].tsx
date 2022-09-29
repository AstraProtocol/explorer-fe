import { Breadcumbs } from '@astraprotocol/astra-ui'
import CardInfo, { CardRowItem } from 'components/Card/CardInfo'
import Container from 'components/Container'
import React from 'react'
import { LinkMaker } from 'utils/helper'
import Layout from '../../components/Layout'

type Props = {
	data: any
}

const BlockDetailPage: React.FC<Props> = ({ data }) => {
	const convertRawDataToCardData = data => {
		const keys = Object.keys(data)
		let items: CardRowItem[] = []
		for (let key of keys) {
			switch (key) {
				case 'hash':
					items.push({
						label: 'Transaction Hash:',
						type: 'copy',
						contents: [{ value: data[key] }]
					})
					break
				case 'cosmos':
					items.push({
						label: 'Transaction Cosmons:',
						type: 'link-copy',
						contents: [{ value: data[key], link: LinkMaker.transaction(data[key]) }]
					})
					break
				case 'result':
					items.push({
						label: 'Result',
						type: 'label',
						contents: [{ value: data[key], type: data[key], backgroundType: 'unset' }]
					})
					break
				case 'status':
					items.push({
						label: 'Status',
						type: 'label',
						contents: [
							{ value: 'success', type: 'success', backgroundType: 'rectangle' },
							{ value: data[key], type: 'unset', backgroundType: 'specialShape' }
						]
					})
					break
				case 'blockNumber':
					items.push({
						label: 'Block',
						type: 'link',
						contents: [{ value: '#' + data[key], link: LinkMaker.block(data[key]) }]
					})
					break
				case 'transfers':
					items.push({
						label: 'Tokens Transferred:',
						type: 'transfer',
						contents: [
							{
								transfer: {
									from: '0xbf...214222',
									to: '0xbf865...12311e',
									value: 10.1234123412341,
									token: 'WASA'
								}
							}
						]
					})
					items.push({
						label: '',
						type: 'transfer',
						contents: [
							{
								transfer: {
									from: '0xbf...2142',
									to: '0xbf865...c9d2142',
									value: 7.1234123412341,
									token: 'WASA'
								}
							}
						]
					})
					break
				case 'time':
					items.push({
						label: 'Timestamp',
						type: 'time',
						contents: [{ value: data[key], type: data[key], suffix: '2.33ss' }]
					})
					break
				case 'value':
					items.push({
						label: ' Value',
						type: 'balance',
						contents: [{ value: data[key].value, suffix: '(0.00 VND)' }]
					})
					break
				case 'fee':
					items.push({
						label: 'Transaction fee',
						type: 'balance',
						contents: [{ value: data[key].value, suffix: '(0.00 VND)' }]
					})
					break
				case 'gasPrice':
					items.push({
						label: 'Gas Price',
						type: 'text',
						contents: [{ value: data[key] }]
					})
					break
			}
		}
		return items
	}
	const items = convertRawDataToCardData(data)
	return (
		<Layout>
			<Container>
				<Breadcumbs items={[{ label: 'Blocks', link: LinkMaker.block() }, { label: '#123123123' }]} />
				<CardInfo items={items} classes={['margin-top-sm']} />
				<CardInfo items={items} />
			</Container>
		</Layout>
	)
}

// This gets called on every request
export async function getServerSideProps({ params }) {
	// Fetch data from external API
	// const res = await fetch(`https://.../data`)
	// const data = await res.json()
	const data = {
		hash: '0x304f68be318cf4c8934ef4c1016008ec5eca09a6ec070e2ca5d5498eddc6b7a8',
		cosmos: '0x304f68be318cf4c8934ef4c1016008ec5eca09a6ec070e2ca5d5498eddc6b7a8',
		result: 'success',
		status: ['success', 'confirm by 25,886'],
		blockNumber: '184956',
		time: new Date().toUTCString(),
		from: '0xbf865c01ebd663cf542c3f5d7bd00143bc9d2142',
		to: '0xbf865c01ebd663cf542c3f5d7bd00143bc9d2142',
		transfers: [
			{
				from: '0x5123491823049128340',
				fromName: 'Solarswap LPs',
				to: '0x8273...8172394',
				value: '7,53241234123',
				token: 'WASA',
				tokenAddress: '0x918723491723948172394'
			},
			{
				from: '0x512...340',
				fromName: 'Solarswap LPs',
				to: '0x82734...72394',
				value: '7,53241234123',
				token: 'TUSD',
				tokenAddress: '0x918723491723948172394'
			}
		],
		value: {
			value: 2115.3004,
			token: '0.00 VND'
		},
		fee: {
			value: 2115.3004,
			token: '0.00 VND'
		},
		gasPrice: 0.0001,
		transactionType: '3 MicroAstra'
	}
	console.log('block number', params.block)
	// Pass data to the page via props
	return { props: { data } }
}

export default BlockDetailPage
