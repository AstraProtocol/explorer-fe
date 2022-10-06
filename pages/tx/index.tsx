import { Breadcumbs, Pagination } from '@astraprotocol/astra-ui'
import Container from 'components/Container'
import RowLoader from 'components/Loader/RowLoader'
import Search from 'components/Search'
import RowTitle from 'components/Typography/RowTitle'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { caculateCosmosAmount, getCosmosType } from 'utils/cosmos'
import useTransaction from 'views/transactions/hook/useTransaction'
import TransactionRow from 'views/transactions/TransactionRow'
import Layout from '../../components/Layout'

const BlockDetailPage: React.FC<NextPage> = _ => {
	const { fullPageData, pagination, changePage } = useTransaction()
	return (
		<Layout>
			<Head>
				<title>Transactions | {process.env.NEXT_PUBLIC_TITLE}</title>
			</Head>
			<Search />
			<Container>
				<div style={{ justifyContent: 'space-between', display: 'flex' }}>
					<div>
						<Breadcumbs items={[{ label: 'Validated Transactions' }]} />
					</div>
					<div>
						<Pagination
							total={pagination.total}
							defaultCurrent={pagination.page}
							disabled={false}
							onChange={changePage}
						/>
					</div>
				</div>
				<RowTitle
					classes="padding-left-lg padding-right-lg"
					columns={[
						{ title: 'Hash', col: 'col-4' },
						{ title: 'Type', col: 'col-2' },
						{ title: 'Block', col: 'col-2 padding-left-2xs' },
						{ title: 'Amount', col: 'col-2 padding-left-2xs' },
						{ title: 'Time', col: 'col-1' },
						{ title: 'Status', col: 'col-1 padding-left-md gutter-left' }
					]}
				/>
				<div>
					{!fullPageData || fullPageData.length === 0 ? (
						<RowLoader row={12} />
					) : (
						<div>
							{fullPageData?.map(item => {
								const fee = caculateCosmosAmount(item.fee)
								return (
									<TransactionRow
										key={item.hash}
										blockNumber={item.blockHeight}
										updatedAt={item.blockTime}
										fee={fee.amount}
										feeToken={fee.denom}
										status={item.success}
										hash={item.hash}
										from={''}
										to={''}
										value={undefined}
										valueToken="asa"
										// labelStatus="Approve"
										type={getCosmosType(item?.messages[0]?.type)}
										newBlock={item.newTransaction}
										transactionType={item?.messages[0]?.type}
										height="auto"
									/>
								)
							})}
						</div>
					)}
				</div>
			</Container>
		</Layout>
	)
}

export default BlockDetailPage
