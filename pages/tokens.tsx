import { PaginationLite } from '@astraprotocol/astra-ui'
import Container from 'components/Container'
import Row from 'components/Grid/Row'
import RowLoader from 'components/Loader/RowLoader'
import { PageTitle } from 'components/Typography/PageTitle'
import RowTitle from 'components/Typography/RowTitle'
import { NextPage } from 'next'
// import {Pagination} from '@astraprotocol/astra-ui'
import Head from 'next/head'
import React, { useState } from 'react'
import useTokens from 'views/tokens/hook/useTokens'
import TokenRow from 'views/tokens/TokenRow'
import Layout from '../components/Layout'

const AllTokensPage: React.FC<NextPage> = _ => {
	const [currentPage, setPage] = useState(1)
	const { tokens, hasNextPage } = useTokens(currentPage)

	const onPagingChange = (value: number) => setPage(value)

	return (
		<Layout>
			<Head>
				<title>Astra Explorer</title>
			</Head>
			<Container>
				<Row style={{ justifyContent: 'space-between' }}>
					<PageTitle>Tokens</PageTitle>
					<PaginationLite currentPage={currentPage} hasNext={hasNextPage} onChange={onPagingChange} />
				</Row>
				<RowTitle
					columns={[
						{ title: 'S', col: 'hidden padding-right-lg gutter-right' },
						{ title: 'Token', col: 'padding-left-lg col-3 gutter-right' },
						{ title: 'Address', col: 'padding-left-lg col-4 gutter-right' },
						{ title: 'Total Supply', col: 'padding-left-lg col-4 gutter-right' },
						{ title: 'Holders Count', col: 'padding-left-lg' }
					]}
				/>

				{!tokens || tokens.length === 0 ? (
					<RowLoader row={10} />
				) : (
					<div className="padding-bottom-sm">
						{tokens?.map((item: Token, index: number) => {
							return <TokenRow key={`${index}`} index={index + 1} token={item} />
						})}
						{/* <Pagination currentPage={currentPage} onChange={onPaginationChange} total={pagination.total} /> */}
					</div>
				)}
			</Container>
		</Layout>
	)
}

export default AllTokensPage
