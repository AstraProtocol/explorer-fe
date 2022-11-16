import { astraToEth } from '@astradefi/address-converter'
import { Breadcumbs } from '@astraprotocol/astra-ui'
import { cosmosApi } from 'api'
import API_LIST from 'api/api_list'
import { AxiosError } from 'axios'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import CardInfo, { CardRowItem } from 'components/Card/CardInfo'
import Container from 'components/Container'
import Tabs from 'components/Tabs/Tabs'
import Head from 'next/head'
import React from 'react'
import { getStakingValidatorByHex } from 'utils/address'
import { CardInfoLabels } from 'utils/enum'
import { LinkMaker, sortArrayFollowValue } from 'utils/helper'
import BlockTransactionTab from 'views/block/tabs/BlockTransactionTab'
import Layout from '../../components/Layout'

type Props = {
	errorMessage?: string
	blockDetail: BlockItem
	blockHeight: string
	transactions: TransactionItem[]
}

const BlockDetailPage: React.FC<Props> = ({ errorMessage, blockDetail, blockHeight, transactions }: Props) => {
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
						label: CardInfoLabels.to,
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
						label: CardInfoLabels.blockHeight,
						type: 'text',
						contents: [{ value: data[key] }],
						responsive: {
							wrap: 'sm'
						}
					})
					items.push({
						label: CardInfoLabels.block,
						type: 'link',
						contents: [{ value: data[key], link: LinkMaker.block(data[key]) }]
					})
					break
				case 'blockTime':
					items.push({
						label: CardInfoLabels.time,
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
			CardInfoLabels.blockHeight,
			CardInfoLabels.time,
			CardInfoLabels.Transaction,
			CardInfoLabels.block,
			CardInfoLabels.hash,
			CardInfoLabels.to
		])
	}

	return (
		<Layout>
			<Head>
				<title>
					Block {blockHeight} | {process.env.NEXT_PUBLIC_TITLE}
				</title>
			</Head>
			<Container>
				<Breadcumbs items={[{ label: 'Blocks', link: LinkMaker.block() }, { label: '#' + blockHeight }]} />
				{blockDetail ? (
					<>
						<CardInfo items={_convertRawDataToCardData(blockDetail)} classes={['margin-top-sm']} />
						<BackgroundCard>
							<Tabs
								classes="padding-bottom-lg"
								tabs={[{ title: 'Transactions', id: '1' }]}
								contents={{
									'1': <BlockTransactionTab blockHeight={blockHeight} />
								}}
							></Tabs>
						</BackgroundCard>
					</>
				) : (
					<h1 className="text contrast-color-70 margin-top-sm">{errorMessage || 'Block Not Found'}</h1>
				)}
			</Container>
		</Layout>
	)
}

// This gets called on every request
export async function getServerSideProps({ params }) {
	const { block: blockHeight } = params
	try {
		const blockRes = await cosmosApi.get<BlockDetailResponse>(`${API_LIST.BLOCKS}${blockHeight}`)

		if (blockRes?.data?.result) {
			return { props: { blockDetail: blockRes.data.result, blockHeight } }
		} else {
			return {
				props: {
					errorMessage: '404 Not Found',
					blockDetail: null,
					blockHeight
				}
			}
		}
	} catch (e) {
		let errorMessage = e.message
		if (e instanceof AxiosError) {
			console.log('error api', e.message, e.code, e?.config?.baseURL, e?.config?.url)
			if (e.code !== '200') errorMessage = '404 Not Found'
		}
		return {
			props: {
				errorMessage,
				blockDetail: null,
				blockHeight
			}
		}
	}
}

export default BlockDetailPage
