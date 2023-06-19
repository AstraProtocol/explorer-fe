import { Breadcumbs, useMobileLayout } from '@astraprotocol/astra-ui'
import * as Sentry from '@sentry/react'
import { cosmosApi } from 'api'
import API_LIST from 'api/api_list'
import { AxiosError } from 'axios'
import CardInfo from 'components/Card/CardInfo'
import Container from 'components/Container'
import PolygonTag from 'components/Tag/PolygonTag'
import Typography from 'components/Typography'
import { pickBy } from 'lodash'
import React from 'react'
import { TransactionTypeEnum } from 'utils/enum'
import { ellipseBetweenText, isMainnet, LinkMaker } from 'utils/helper'
import DecodeInput from 'views/transactions/DecodeInput'
import useConvertData from 'views/transactions/hook/useConvertData'
import useInternalTransactions from 'views/transactions/hook/useInternalTransactions'
import TransactionTabs from 'views/transactions/TransactionTabs'
import { cosmsTransactionDetail, evmTransactionDetail, TransactionQuery } from 'views/transactions/utils'
import Layout from '../../components/Layout'

type Props = {
	errorMessage?: string
	data: TransactionDetail
	evmHash: string
	cosmosHash: string
}

const TransactionDetailPage: React.FC<Props> = ({ errorMessage, data, evmHash, cosmosHash }: Props) => {
	const hash = evmHash || cosmosHash
	const { isMobile } = useMobileLayout('small')
	// Recheck here
	const { raw: internalTransactionRows, loading: internalLoading } = useInternalTransactions({
		hash: data?.isInteractWithContract ? hash : null
	})
	const cards = useConvertData({ data, internalTransactionRows, internalLoading })
	const isEvm = data && !!data.evmHash

	return (
		<Layout>
			<Container>
				<Breadcumbs
					items={[
						{ label: 'Transactions', link: LinkMaker.transaction() },
						{ label: isMobile ? ellipseBetweenText(hash) : hash }
					]}
				/>
				{data ? (
					<>
						<div className="margin-top-2xl margin-bottom-md">
							<Typography.PageTitle className={['flex flex-align-center']}>
								{data.cosmosMsgCount ? (
									<span className="flex flex-align-center">
										{data.pageTitle}
										<PolygonTag text={`${data.cosmosMsgCount.toString()}`} />
									</span>
								) : (
									data.pageTitle || ''
								)}
							</Typography.PageTitle>
						</div>
						{cards.map((card, idx) => (
							<CardInfo items={card} classes={['margin-top-sm']} key={idx} />
						))}
						{data.rawInput && <DecodeInput dataInput={data.rawInput} address={data.to} evmHash={evmHash} />}
						{isEvm && (
							<TransactionTabs
								evmHash={evmHash}
								cosmosHash={cosmosHash}
								type={data.type}
								transactions={data?.tabTokenTransfers}
								input={data?.rawInput}
								logs={data?.logs}
							/>
						)}
					</>
				) : (
					<h1 className="text contrast-color-70 margin-top-sm">
						{isMainnet
							? errorMessage
								? 'Something went wrong'
								: 'Transaction Not Found'
							: errorMessage || 'Transaction Not Found'}
					</h1>
				)}
			</Container>
		</Layout>
	)
}

// This gets called on every request
export async function getServerSideProps({ query }) {
	const { tx, type } = query as TransactionQuery

	let evmHash = ''
	let cosmosHash = ''
	let txHash = tx
	let errorMessage = null
	let data: TransactionDetail = null
	try {
		//evm
		if (tx.startsWith('0x')) {
			data = await evmTransactionDetail(tx)
			evmHash = tx
		} else if (type == 'evm') {
			data = await evmTransactionDetail('', tx)
			evmHash = data.evmHash
			cosmosHash = tx
		} else {
			// get detail from cosmos hash
			cosmosHash = tx
			const cosmosDetailRes = await cosmosApi.get<TransactionDetailResponse>(`${API_LIST.TRANSACTIONS}/${tx}`)
			let _data = cosmosDetailRes?.data?.result

			if (_data) {
				const type = _data?.messages[0]?.type
				if (type === TransactionTypeEnum.Ethermint) {
					evmHash = (_data?.messages[0]?.content as MsgEthereumTxContent)?.params.hash
					data = await evmTransactionDetail(evmHash, cosmosHash)
				} else {
					data = cosmsTransactionDetail(_data)
				}
			}
		}

		if (data == null || data == undefined) {
			errorMessage = '404 Not Found'
		} else {
			data = pickBy(data, item => item !== undefined && item !== '')
			txHash = evmHash || cosmosHash
		}
	} catch (e: any) {
		Sentry.captureException(e)
		errorMessage = e.message
		if (e instanceof AxiosError) {
			if (e.code !== '200') errorMessage = '404 Not Found'
		}
	}
	const txHashEllipsis = ellipseBetweenText(txHash)
	return {
		props: {
			errorMessage,
			data,
			evmHash,
			cosmosHash,
			title: `Transaction ${txHashEllipsis}`,
			description: `Astra (ASA) detailed transaction info for txhash ${txHash}. The transaction status, block confirmation, gas fee, Astra (ASA), and token transfer are shown.`
		}
	}
}

export default TransactionDetailPage
