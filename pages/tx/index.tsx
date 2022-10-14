import { Breadcumbs, CryptoIconNames, Pagination, useMobileLayout } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import Container from 'components/Container'
import RowLoader from 'components/Loader/RowLoader'
import Search from 'components/Search'
import RowTitle from 'components/Typography/RowTitle'
import { isEmpty } from 'lodash'
import { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { caculateCosmosAmount, getTransactionType } from 'utils/cosmos'
import useTransaction from 'views/transactions/hook/useTransaction'
import TransactionRow from 'views/transactions/TransactionRow'
import Layout from '../../components/Layout'

const BlockDetailPage: React.FC<NextPage> = _ => {
	const [loaderTime, setLoaderTime] = useState(false)
	const { fullPageData, pagination, changePage } = useTransaction()
	const { isMobile } = useMobileLayout(1220)

	//loader display at least 1 second
	useEffect(() => {
		if (isEmpty(fullPageData)) {
			setLoaderTime(true) // time for loader dispaly
			setTimeout(() => {
				setLoaderTime(false) // endtime
			}, 500)
		}
	}, [fullPageData])
	return (
		<Layout>
			<Head>
				<title>Transactions | {process.env.NEXT_PUBLIC_TITLE}</title>
			</Head>
			<Search />
			<Container>
				<div
					className={clsx(
						'flex sm-flex-column sm-margin-bottom-lg',
						'flex-align-center sm-flex-align-start flex-justify-space-between'
					)}
				>
					<div className="sm-margin-bottom-lg">
						<Breadcumbs items={[{ label: 'Validated Transactions' }]} />
					</div>
					<div>
						<Pagination
							total={pagination.total}
							currentPage={pagination.page}
							disabled={false}
							onChange={changePage}
						/>
					</div>
				</div>
				{!isMobile && (
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
				)}
				<div style={{ overflow: 'hidden' }}>
					{loaderTime ? (
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
										valueToken={process.env.NEXT_PUBLIC_EVM_TOKEN as CryptoIconNames}
										// labelStatus="Approve"
										type={getTransactionType(item?.messages[0]?.type)}
										newBlock={item.newTransaction}
										height="auto"
									/>
								)
							})}
						</div>
					)}
				</div>
				<div style={{ justifyContent: 'space-between', display: 'flex' }}>
					<div></div>
					<div>
						<Pagination
							total={pagination.total}
							currentPage={pagination.page}
							disabled={false}
							onChange={changePage}
						/>
					</div>
				</div>
			</Container>
		</Layout>
	)
}

export default BlockDetailPage
