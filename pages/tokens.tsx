import Container from 'components/Container'
import RowLoader from 'components/Loader/RowLoader'
import { PageTitle } from 'components/Typography/PageTitle'
import { NextPage } from 'next'
// import {Pagination} from '@astraprotocol/astra-ui'
import Head from 'next/head'
import React, { useState } from 'react'
import useTokens from 'views/tokens/hook/useTokens'
import TokenHeadTitle from 'views/tokens/TokenHeadTitle'
import TokenRow from 'views/tokens/TokenRow'
import Layout from '../components/Layout'

const AllTokensPage: React.FC<NextPage> = _ => {
	const [currentPage, setPage] = useState(1)
	const { tokens } = useTokens(currentPage)

	const onPagingChange = (value: number) => setPage(value)

	return (
		<Layout>
			<Head>
				<title>Astra Explorer</title>
			</Head>
			<Container>
				{/* <Row style={{ justifyContent: 'space-between' }}> */}
				{/* <Breadcumbs items={[{ label: 'Astra Address', link: LinkMaker.token() }]} /> */}
				<PageTitle>Tokens</PageTitle>
				{/* <PaginationLite currentPage={currentPage} hasNext={hasNextPage} onChange={onPagingChange} /> */}
				{/* </Row> */}

				{!tokens || tokens.length === 0 ? (
					<RowLoader row={10} />
				) : (
					<div className="padding-bottom-sm" style={{ overflowY: 'scroll' }}>
						<TokenHeadTitle />
						{tokens?.map((item: Token, index: number) => {
							return <TokenRow key={item.contractAddressHash} index={index + 1} token={item} />
						})}
						{/* <Pagination currentPage={currentPage} onChange={onPaginationChange} total={pagination.total} /> */}
					</div>
				)}
			</Container>
		</Layout>
	)
}

export default AllTokensPage
