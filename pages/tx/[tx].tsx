import { Breadcumbs } from '@astraprotocol/astra-ui'
import { cosmosApi } from 'api'
import API_LIST from 'api/api_list'
import { AxiosError } from 'axios'
import CardInfo from 'components/Card/CardInfo'
import Container from 'components/Container'
import Typography from 'components/Typography'
import { pickBy } from 'lodash'
import Head from 'next/head'
import React from 'react'
import { ellipseBetweenText, LinkMaker } from 'utils/helper'
import DecodeInput from 'views/transactions/DecodeInput'
import useConvertData from 'views/transactions/hook/useConvertData'
import TransactionTabs from 'views/transactions/TransactionTabs'
import {
	cosmsTransactionDetail,
	evmTransactionDetail,
	TransactionDetail,
	TransactionQuery
} from 'views/transactions/utils'
import Layout from '../../components/Layout'
import { TransacionTypeEnum } from '../../utils/constants'

type Props = {
	data: TransactionDetail
	evmHash: string
	cosmosHash: string
}

const TransactionDetailPage: React.FC<Props> = ({ data, evmHash, cosmosHash }: Props) => {
	const [items, moreItems] = useConvertData({ data })
	return (
		<Layout>
			<Head>
				<title>Transaction | {process.env.NEXT_PUBLIC_TITLE}</title>
			</Head>
			<Container>
				<Breadcumbs
					items={[
						{ label: 'Validated Transactions', link: LinkMaker.transaction() },
						{ label: ellipseBetweenText(cosmosHash, 6, 6) }
					]}
				/>
				<div className="margin-top-2xl margin-bottom-md">
					<Typography.PageTitle>{data.pageTitle || ''}</Typography.PageTitle>
				</div>
				<CardInfo items={items} classes={['margin-top-sm']} />
				{moreItems.length > 0 && <CardInfo items={moreItems} classes={['margin-top-sm']} />}
				{data.rawInput && <DecodeInput dataInput={data.rawInput} address={data.to} />}
				<TransactionTabs
					evmHash={evmHash}
					cosmosHash={cosmosHash}
					type={data.type}
					transactions={data?.tabTokenTransfers}
					input={data?.rawInput}
					logs={data?.logs}
				/>
			</Container>
		</Layout>
	)
}

// This gets called on every request
export async function getServerSideProps({ query }) {
	/**
	 * @todo nhap65 hash vao tu chuyen trang
	 */
	const { tx } = query as TransactionQuery
	let evmHash = ''
	let cosmosHash = ''
	try {
		let data: TransactionDetail = {}
		//evm
		if (tx.startsWith('0x')) {
			evmHash = tx
			data = await evmTransactionDetail(tx)
		} else {
			// get detail from cosmos hash
			const cosmosDetailRes = await cosmosApi.get<TransactionDetailResponse>(`${API_LIST.TRANSACTIONS}${tx}`)
			let _data = cosmosDetailRes?.data?.result
			const type = _data?.messages[0]?.type
			cosmosHash = _data.hash
			// evm
			if (type === TransacionTypeEnum.Ethermint) {
				evmHash = (_data?.messages[0]?.content as EVMTransactionContent)?.params.hash
				data = await evmTransactionDetail(evmHash, cosmosHash)
			} else {
				data = await cosmsTransactionDetail(_data)
			}
		}
		//remove empty attribute
		data = pickBy(data, item => item !== undefined && item !== '')
		return { props: { data, evmHash, cosmosHash } }
	} catch (e: unknown) {
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

export default TransactionDetailPage
