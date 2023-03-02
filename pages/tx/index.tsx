import { Pagination, useMobileLayout } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import Container from 'components/Container'
import RowLoader from 'components/Loader/RowLoader'
import Search from 'components/Search'
import { PageTitle } from 'components/Typography/PageTitle'
import RowTitle from 'components/Typography/RowTitle'
import { isEmpty } from 'lodash'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import useTransaction from 'views/transactions/hook/useTransaction'
import TransactionRow from 'views/transactions/TransactionRow'
import Layout from '../../components/Layout'

const BlockDetailPage: React.FC<NextPage> = _ => {
	const [loaderTime, setLoaderTime] = useState(false)
	const { fullPageData, pagination, changePage } = useTransaction('/tx')
	const { isMobile } = useMobileLayout(1220)

	//loader display at least 1 second
	useEffect(() => {
		if (isEmpty(fullPageData)) {
			setLoaderTime(true) // time for loader dispaly
			setTimeout(() => {
				setLoaderTime(false) // endtime
			}, 1000)
		}
	}, [fullPageData])
	return (
		<Layout>
			<Search />
			<Container>
				<div
					className={clsx(
						'flex sm-flex-column sm-margin-bottom-lg',
						'flex-align-center sm-flex-align-start flex-justify-space-between'
					)}
				>
					<div className="sm-margin-bottom-lg">
						{/* <Breadcumbs items={[{ label: 'Transactions' }]} /> */}
						<PageTitle>Transactions</PageTitle>
					</div>
					<div>
						<Pagination
							total={pagination.total}
							currentPage={pagination.page}
							disabled={false}
							onChange={changePage}
							noted="(Only the first 50,000 results are displayed)"
						/>
					</div>
				</div>
				{!isMobile && (
					<RowTitle
						classes="padding-left-lg padding-right-lg"
						columns={[
							{ title: 'Hash', col: 'col-5' },
							{ title: 'Type', col: 'col-2' },
							{ title: 'Block', col: 'col-2 padding-left-2xs' },
							{ title: 'Amount', col: 'col-2 padding-left-2xs' },
							{ title: 'Status', col: 'col-1 padding-left-md ' }
						]}
					/>
				)}
				<div style={{ overflow: 'hidden' }} className="margin-top-xs">
					{loaderTime ? (
						<RowLoader row={12} />
					) : (
						<div>
							{fullPageData?.map(item => {
								return (
									<TransactionRow
										key={`${item.blockHeight}-${item.hash}`}
										blockNumber={item.blockHeight}
										updatedAt={item.blockTime}
										fee={item.totalFee.amount}
										status={item.success}
										hash={item.evmHash || item.hash}
										from={item.from}
										to={item.to}
										value={item.value}
										labelStatus={item.evmType}
										type={item.type}
										newBlock={item.newTransaction}
										height="auto"
										typeCount={item.typeCount}
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
							noted="(Only the first 50,000 results are displayed)"
						/>
					</div>
				</div>
			</Container>
		</Layout>
	)
}

export async function getServerSideProps({}) {
	return {
		props: {
			title: `Astra Transactions`,
			description: `Astra Transactions Information`
		}
	}
}

export default BlockDetailPage
