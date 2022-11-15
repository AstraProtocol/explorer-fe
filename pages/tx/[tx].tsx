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
import { TransacionTypeEnum } from 'utils/enum'
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

type Props = {
	errorMessage?: string
	data: TransactionDetail
	evmHash: string
	cosmosHash: string
}

const TransactionDetailPage: React.FC<Props> = ({ errorMessage, data, evmHash, cosmosHash }: Props) => {
	const [items, moreItems] = useConvertData({ data })

	return (
		<Layout>
			<Head>
				<title>
					Transaction {evmHash || cosmosHash} | {process.env.NEXT_PUBLIC_TITLE}
				</title>
			</Head>
			<Container>
				<Breadcumbs
					items={[
						{ label: 'Transactions', link: LinkMaker.transaction() },
						{ label: ellipseBetweenText(evmHash || cosmosHash, 6, 6) }
					]}
				/>
				{data ? (
					<>
						<div className="margin-top-2xl margin-bottom-md">
							<Typography.PageTitle>{data.pageTitle || ''}</Typography.PageTitle>
						</div>
						<CardInfo items={items} classes={['margin-top-sm']} />
						{moreItems.length > 0 && <CardInfo items={moreItems} classes={['margin-top-sm']} />}
						{data.rawInput && <DecodeInput dataInput={data.rawInput} address={data.to} evmHash={evmHash} />}
						<TransactionTabs
							evmHash={evmHash}
							cosmosHash={cosmosHash}
							type={data.type}
							transactions={data?.tabTokenTransfers}
							input={data?.rawInput}
							logs={data?.logs}
						/>
					</>
				) : (
					<h1 className="text contrast-color-70 margin-top-sm">{errorMessage || 'Token Not Found'}</h1>
				)}
			</Container>
		</Layout>
	)
}

// This gets called on every request
export async function getServerSideProps({ query }) {
	/**
	 * @todo nhap65 hash vao tu chuyen trang
	 */
	const { tx, type } = query as TransactionQuery

	let evmHash = ''
	let cosmosHash = ''
	try {
		let data: TransactionDetail = null
		//evm
		if (tx.startsWith('0x')) {
			data = await evmTransactionDetail(tx)
			evmHash = tx
		} else if (type == 'evm') {
			data = await evmTransactionDetail('', tx)
			evmHash = data.evmHash
		} else {
			// get detail from cosmos hash
			const cosmosDetailRes = await cosmosApi.get<TransactionDetailResponse>(`${API_LIST.TRANSACTIONS}/${tx}`)
			let _data = cosmosDetailRes?.data?.result
			if (_data) {
				const type = _data?.messages[0]?.type
				cosmosHash = _data?.hash
				// evm
				if (type === TransacionTypeEnum.Ethermint) {
					evmHash = (_data?.messages[0]?.content as MsgEthereumTxContent)?.params.hash
					data = await evmTransactionDetail(evmHash, cosmosHash)
				} else {
					data = await cosmsTransactionDetail(_data)
				}
			}
		}
		if (data == null || data == undefined)
			return { props: { errorMessage: '404 Not Found', data: null, evmHash: tx, cosmosHash } }

		//remove empty attribute
		data = pickBy(data, item => item !== undefined && item !== '')
		return { props: { data, evmHash, cosmosHash } }
	} catch (e: any) {
		let errorMessage = e.message
		if (e instanceof AxiosError) {
			console.log('error api', e.message, e.code, e?.config?.baseURL, e?.config?.url)
			if (e.code !== '200') errorMessage = '404 Not Found'
		}

		return { props: { errorMessage, data: null, evmHash: tx, cosmosHash } }
	}
}

export default TransactionDetailPage
