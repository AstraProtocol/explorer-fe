import { Breadcumbs } from '@astraprotocol/astra-ui'
import Container from 'components/Container'
import RowLoader from 'components/Loader/RowLoader'
import Search from 'components/Search'
import RowTitle from 'components/Typography/RowTitle'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import useTransaction from 'views/transactions/hook/useTransaction'
import TransactionRow from 'views/transactions/TransactionRow'
import Layout from '../../components/Layout'

const BlockDetailPage: React.FC<NextPage> = _ => {
	const { fullPageData } = useTransaction()
	return (
		<Layout>
			<Head>
				<title>Block</title>
			</Head>
			<Search />
			<Container>
				<Breadcumbs items={[{ label: 'Validated Transactions' }]} />
				<RowTitle
					classes="padding-left-lg padding-right-lg"
					columns={[
						{ title: 'Hash', col: 'col-5' },
						{ title: 'Type', col: 'col-2' },
						{ title: 'Block', col: 'col-2' },
						{ title: 'Amount', col: 'col-2' },
						{ title: 'Time', col: 'col-1' },
						{ title: 'Status', col: 'col-1' }
					]}
				/>
				<div>
					{!fullPageData || fullPageData.length === 0 ? (
						<RowLoader row={12} />
					) : (
						<div>
							{fullPageData?.map(item => (
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
									labelStatus="Approve"
									type="Contract Call"
									newBlock={item.newTransaction}
								/>
							))}
						</div>
					)}
				</div>
			</Container>
		</Layout>
	)
}

export default BlockDetailPage
