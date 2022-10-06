import Container from 'components/Container'
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
	const { tokens } = useTokens(currentPage)
	console.log(tokens)

	return (
		<Layout>
			<Head>
				<title>Astra Explorer</title>
			</Head>

			<Container>
				<PageTitle>Tokens</PageTitle>
				<RowTitle
					columns={[
						{ title: '', col: 'gutter-right' },
						{ title: 'Token', col: 'padding-left-lg col-2 gutter-right' },
						{ title: 'Address', col: 'padding-left-lg gutter-left col-5' },
						{ title: 'Total Supply', col: 'padding-left-sm col-4' },
						{ title: 'Holders Count', col: 'padding-left-lg ' }
					]}
				/>
				{/* <Pagination></Pagination> */}
				{!tokens || tokens.length === 0 ? (
					<RowLoader row={10} />
				) : (
					<div className="padding-bottom-sm">
						{tokens?.map((item: Token, index: number) => {
							return <TokenRow key={index} index={index} token={item} />
						})}
					</div>
				)}
			</Container>
		</Layout>
	)
}

export default AllTokensPage
