import { astraToEth } from '@astradefi/address-converter'
import { Breadcumbs } from '@astraprotocol/astra-ui'
import { CryptoIconNames } from '@astraprotocol/astra-ui/lib/es/components/CryptoIcon'
import { cosmosApi } from 'api'
import API_LIST from 'api/api_list'
import { AxiosError } from 'axios'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import CardInfo, { CardRowItem } from 'components/Card/CardInfo'
import Container from 'components/Container'
import Tabs from 'components/Tabs/Tabs'
import Empty from 'components/Typography/Empty'
import Head from 'next/head'
import React from 'react'
import { getStakingValidatorByHex } from 'utils/address'
import { caculateCosmosAmount, getTransactionType } from 'utils/cosmos'
import { LinkMaker, sortArrayFollowValue } from 'utils/helper'
import TransactionRow from 'views/transactions/TransactionRow'
import { CardInfoLabels } from 'views/transactions/utils'
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
						label: CardInfoLabels.hash,
						type: 'copy',
						contents: [{ value: data[key] }]
					})
					break
				case 'committedCouncilNodes': //from
					const proposerHash = data[key].find(item => item.isProposer).address
					const proposer = getStakingValidatorByHex(proposerHash) as Proposer
					const address = astraToEth(proposer.initialDelegatorAddress)
					items.push({
						label: CardInfoLabels.To,
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
						label: CardInfoLabels.Block_Height,
						type: 'text',
						contents: [{ value: data[key] }],
						responsive: {
							wrap: 'sm'
						}
					})
					items.push({
						label: CardInfoLabels.Block,
						type: 'link',
						contents: [{ value: data[key], link: LinkMaker.block(data[key]) }]
					})
					break
				case 'blockTime':
					items.push({
						label: CardInfoLabels.Timestamp,
						type: 'time',
						contents: [{ value: data[key], type: data[key], suffix: '' }]
					})
					break
				case 'transactionCount':
					items.push({
						label: CardInfoLabels.Transaction,
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
		return sortArrayFollowValue(items, 'label', [
			CardInfoLabels.Block_Height,
			CardInfoLabels.Timestamp,
			CardInfoLabels.Transaction,
			CardInfoLabels.Block,
			CardInfoLabels.hash,
			CardInfoLabels.To
		])
	}

	const items = _convertRawDataToCardData(blockDetail)
	return (
		<Layout>
			<Head>
				<title>
					Block {blockHeight} | {process.env.NEXT_PUBLIC_TITLE}
				</title>
			</Head>
			<Container>
				<Breadcumbs items={[{ label: 'Blocks', link: LinkMaker.block() }, { label: '#' + blockHeight }]} />
				<CardInfo items={items} classes={['margin-top-sm']} />
				<BackgroundCard>
					<Tabs
						tabs={[{ title: 'Transactions', id: '1' }]}
						contents={{
							'1': (
								<div>
									{!transactions || transactions.length == 0 ? (
										<Empty text="There are no transactions for this block." />
									) : (
										<>
											{transactions?.map((item, index) => {
												const fee = caculateCosmosAmount(item.fee)
												return (
													<TransactionRow
														key={item.hash}
														blockNumber={item.blockHeight}
														updatedAt={item.blockTime}
														fee={fee.amount}
														feeToken={'asa'}
														status={item.success}
														hash={item.hash}
														from={''}
														to={''}
														value={undefined}
														valueToken={
															process.env.NEXT_PUBLIC_EVM_TOKEN as CryptoIconNames
														}
														type={getTransactionType(item?.messages[0]?.type)}
														newBlock={item.newTransaction}
														style="inject"
													/>
												)
											})}
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
		if (e instanceof AxiosError) {
			console.log('error api', e.message, e.code, e?.config?.baseURL, e?.config?.url)
		}
		return {
			redirect: {
				destination: '/404',
				permanent: false
			}
		}
	}
}

export default BlockDetailPage
