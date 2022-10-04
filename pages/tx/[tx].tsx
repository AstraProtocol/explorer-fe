import { astraToEth } from '@astradefi/address-converter'
import { Breadcumbs } from '@astraprotocol/astra-ui'
import { cosmosApi, evmApi } from 'api'
import API_LIST from 'api/api_list'
import CardInfo, { CardRowItem } from 'components/Card/CardInfo'
import Container from 'components/Container'
import Head from 'next/head'
import React from 'react'
import { getStakingValidatorByHex } from 'utils/address'
import { LinkMaker } from 'utils/helper'
import Layout from '../../components/Layout'

type Props = {
	data: any
}

const TransactionDetailPage: React.FC<Props> = ({ data, tx }: { data: TransactionItem; tx: string }) => {
	const convertRawDataToCardData = data => {
		const keys = Object.keys(data)
		console.log(keys)
		let items: CardRowItem[] = []
		for (let key of keys) {
			switch (key) {
				case 'blockHash':
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
				case 'committedCouncilNodes': //from
					const proposerHash = data[key].find(item => item.isProposer).address
					const proposer = getStakingValidatorByHex(proposerHash) as Proposer
					const address = astraToEth(proposer.initialDelegatorAddress)
					items.push({
						label: 'From',
						type: 'link-copy',
						contents: [
							{
								value: address,
								link: LinkMaker.address(astraToEth(proposer.initialDelegatorAddress))
							}
						]
					})
					break
				case 'blockHeight':
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
				case 'blockTime':
					items.push({
						label: 'Timestamp',
						type: 'time',
						contents: [{ value: data[key], type: data[key], suffix: '2.33ss [mock]' }]
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
			<Head>Transaction | {process.env.NEXT_PUBLIC_TITLE}</Head>
			<Container>
				<Breadcumbs
					items={[{ label: 'Validated Transactions', link: LinkMaker.transaction() }, { label: tx }]}
				/>
				<CardInfo items={items} classes={['margin-top-sm']} />
			</Container>
		</Layout>
	)
}

// This gets called on every request
export async function getServerSideProps({ query }) {
	const { tx, type } = query
	try {
		if (type === TransacionTypeEnum.Ethermint) {
			console.log('evm queyr')
			const res = await evmApi.get<BlockDetailResponse>(`${API_LIST.TRANSACTIONS}${tx}`)
			if (res.status === 200) {
				return { props: { data: res.data.result, tx } }
			} else {
				return { props: { data: {} } }
			}
		} else {
			console.log('cosmos query')
			const res = await cosmosApi.get<BlockDetailResponse>(`${API_LIST.TRANSACTIONS}${tx}`)
			if (res.status === 200) {
				return { props: { data: res.data.result, tx } }
			} else {
				return { props: { data: {} } }
			}
		}
	} catch (e) {
		return {
			redirect: {
				destination: '/404',
				permanent: false
			}
		}
	}

	// const data = {
	// 	hash: '0x304f68be318cf4c8934ef4c1016008ec5eca09a6ec070e2ca5d5498eddc6b7a8',
	// 	cosmos: '0x304f68be318cf4c8934ef4c1016008ec5eca09a6ec070e2ca5d5498eddc6b7a8',
	// 	result: 'success',
	// 	status: ['success', 'confirm by 25,886'],
	// 	blockNumber: '184956',
	// 	time: new Date().toUTCString(),
	// 	from: '0xbf865c01ebd663cf542c3f5d7bd00143bc9d2142',
	// 	to: '0xbf865c01ebd663cf542c3f5d7bd00143bc9d2142',
	// 	transfers: [
	// 		{
	// 			from: '0x5123491823049128340',
	// 			fromName: 'Solarswap LPs',
	// 			to: '0x8273...8172394',
	// 			value: '7,53241234123',
	// 			token: 'WASA',
	// 			tokenAddress: '0x918723491723948172394'
	// 		},
	// 		{
	// 			from: '0x512...340',
	// 			fromName: 'Solarswap LPs',
	// 			to: '0x82734...72394',
	// 			value: '7,53241234123',
	// 			token: 'TUSD',
	// 			tokenAddress: '0x918723491723948172394'
	// 		}
	// 	],
	// 	value: {
	// 		value: 2115.3004,
	// 		token: '0.00 VND'
	// 	},
	// 	fee: {
	// 		value: 2115.3004,
	// 		token: '0.00 VND'
	// 	},
	// 	gasPrice: 0.0001,
	// 	transactionType: '3 MicroAstra'
	// }
	// Pass data to the page via props
}

export default TransactionDetailPage
