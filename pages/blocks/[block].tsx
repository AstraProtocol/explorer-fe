import { astraToEth } from '@astradefi/address-converter'
import { Breadcumbs } from '@astraprotocol/astra-ui'
import { cosmosApi } from 'api'
import API_LIST from 'api/api_list'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import CardInfo, { CardRowItem } from 'components/Card/CardInfo'
import Container from 'components/Container'
import Tabs from 'components/Tabs/Tabs'
import Head from 'next/head'
import React from 'react'
import { getStakingValidatorByHex } from 'utils/address'
import { LinkMaker } from 'utils/helper'
import TransactionRow from 'views/transactions/TransactionRow'
import Layout from '../../components/Layout'

type Props = {
	blockDetail: BlockItem
	blockHeight: string
	transactions: TransactionItem[]
}

const BlockDetailPage: React.FC<Props> = ({ blockDetail, blockHeight, transactions }: Props) => {
	const _convertRawDataToCardData = data => {
		const keys = Object.keys(data)
		let items: CardRowItem[] = []
		for (let key of keys) {
			switch (key) {
				case 'blockHash':
					items.push({
						label: 'Hash:',
						type: 'copy',
						contents: [{ value: data[key] }]
					})
					break
				case 'committedCouncilNodes': //from
					const proposerHash = data[key].find(item => item.isProposer).address
					const proposer = getStakingValidatorByHex(proposerHash) as Proposer
					const address = astraToEth(proposer.initialDelegatorAddress)
					items.push({
						label: 'Interacted With (To):',
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
						label: 'Block Height:',
						type: 'text',
						contents: [{ value: data[key] }]
					})
					items.push({
						label: 'Block:',
						type: 'link',
						contents: [{ value: data[key], link: LinkMaker.block(data[key]) }]
					})
					break
				case 'blockTime':
					items.push({
						label: 'Timestamp',
						type: 'time',
						contents: [{ value: data[key], type: data[key], suffix: '' }]
					})
					break
				case 'transactionCount':
					items.push({
						label: 'Transaction:',
						type: 'label',
						contents: [
							{
								value: `${data[key]} transaction${data[key] > 1 ? 's' : ''}`,
								backgroundType: 'rectangle',
								type: 'unset',
								icon: false
							}
						]
					})
					break
			}
		}
		return _sortItemByLabel(items, [
			'Block Height:',
			'Timestamp:',
			'Transaction:',
			'Block:',
			'Hash:',
			'Interacted With (To):'
		])
	}
	const _sortItemByLabel = (items: CardRowItem[], labels: string[]) => {
		const newItems: CardRowItem[] = []
		for (let label of labels) {
			const item = items.find(item => item.label === label)
			if (item) {
				newItems.push(item)
			}
		}
		return newItems
	}
	const items = _convertRawDataToCardData(blockDetail)
	return (
		<Layout>
			<Head>
				BLock {blockHeight} | {process.env.NEXT_PUBLIC_TITLE}
			</Head>
			<Container>
				<Breadcumbs items={[{ label: 'Blocks', link: LinkMaker.block() }, { label: '#' + blockHeight }]} />
				<CardInfo items={items} classes={['margin-top-sm']} />
				<BackgroundCard>
					<Tabs
						tabs={[{ title: 'Transactions', value: '1' }]}
						contents={{
							'1': (
								<div>
									{transactions && transactions.length == 0 ? (
										<div className="contrast-color-100 text-center">
											There are no transactions for this block.
										</div>
									) : (
										<>
											{transactions?.map((item, index) => (
												<TransactionRow
													key={item.hash}
													blockNumber={item.blockHeight}
													updatedAt={item.blockTime}
													fee={item.fee[0].amount}
													feeToken={item.fee[0].denom}
													status={item.success}
													hash={item.hash}
													from={''}
													to={''}
													value={100000.93841029348}
													valueToken="asa"
													type={item?.messages[0]?.type.split('.').slice(-1).join('')}
													newBlock={item.newTransaction}
													transactionType={item?.messages[0]?.type}
													style="inject"
													order={index === transactions.length - 1 ? 'end' : ''}
												/>
											))}
										</>
									)}
								</div>
							)
						}}
					></Tabs>
				</BackgroundCard>
			</Container>
		</Layout>
	)
}

// This gets called on every request
export async function getServerSideProps({ params }) {
	const { block: blockHeight } = params
	try {
		const blockRes = await cosmosApi.get<BlockDetailResponse>(`${API_LIST.BLOCKS}${blockHeight}`)
		const transactionRes = await cosmosApi.get<TransactionResponse>(
			`${API_LIST.TRANSACTION_OF_BLOCK.replace(':id', blockHeight)}`
		)
		const transactions = transactionRes.data.result
		if (blockRes.status === 200) {
			return { props: { blockDetail: blockRes.data.result, blockHeight, transactions } }
		} else {
			return { props: { data: {} } }
		}
	} catch (e) {
		return {
			redirect: {
				destination: '/404',
				permanent: false
			}
		}
	}
}

export default BlockDetailPage
