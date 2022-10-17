import { PaginationLite } from '@astraprotocol/astra-ui'
import Container from 'components/Container'
import Row from 'components/Grid/Row'
import RowLoader from 'components/Loader/RowLoader'
import { PageTitle } from 'components/Typography/PageTitle'
import { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import HolderHeadTitle from 'views/accounts/HolderHeadTitle'
import HolderRow from 'views/accounts/HolderRow'
import useAccounts from 'views/accounts/hook/useAccounts'
import Layout from '../components/Layout'

const AstraHolderPage: React.FC<NextPage> = _ => {
	const [currentPage, setPage] = useState(1)
	const { accounts, hasNextPage } = useAccounts(currentPage)

	const onPagingChange = (value: number) => setPage(value)

	return (
		<Layout>
			<Head>
				<title>Astra Explorer</title>
			</Head>
			<Container>
				<Row style={{ justifyContent: 'space-between' }}>
					{/* <Breadcumbs items={[{ label: 'Astra Address', link: LinkMaker.address() }]} /> */}
					<PageTitle>Astra Address</PageTitle>
					<PaginationLite currentPage={currentPage} hasNext={hasNextPage} onChange={onPagingChange} />
				</Row>

				{/* <RowTitle
						{ title: 'S', col: 'hidden padding-right-lg gutter-right' },
						{ title: 'Address', col: 'padding-left-lg gutter-right col-5' },
						{ title: 'Balance', col: 'padding-left-lg col-5 gutter-right' },
						{ title: 'Transaction Count', col: 'col-2' }
					]}
				/> */}

				{!accounts || accounts.length === 0 ? (
					<RowLoader row={10} />
				) : (
					<div className="padding-bottom-sm" style={{ overflowY: 'scroll' }}>
						<HolderHeadTitle />
						{accounts?.map((item: Holder, index: number) => {
							return <HolderRow key={item.address} index={index + 1} account={item} />
						})}
					</div>
				)}
			</Container>
		</Layout>
	)
}

export default AstraHolderPage
