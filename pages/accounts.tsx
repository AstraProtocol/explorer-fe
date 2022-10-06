import Container from 'components/Container'
import { PageTitle } from 'components/Typography/PageTitle'
import RowTitle from 'components/Typography/RowTitle'
import { NextPage } from 'next'
// import {Pagination} from '@astraprotocol/astra-ui'
import Head from 'next/head'
import React, { useState } from 'react'
import Layout from '../components/Layout'

const AstraHolderPage: React.FC<NextPage> = _ => {
	const [currentPage, setPage] = useState(1)
	// const { tokens } = useTokens(currentPage)
	// console.log(tokens)

	return (
		<Layout>
			<Head>
				<title>Astra Explorer</title>
			</Head>

			<Container>
				<PageTitle>Astra Address</PageTitle>
				<RowTitle
					columns={[
						{ title: '', col: 'gutter-right' },
						{ title: 'Address', col: 'padding-left-lg gutter-left col-5' },
						{ title: 'Balance', col: 'padding-left-sm col-4' },
						{ title: 'Transaction Count', col: 'padding-left-lg ' }
					]}
				/>
				{/* <Pagination></Pagination> */}
				{/* {!tokens || tokens.length === 0 ? (
					<RowLoader row={10} />
				) : (
					<div className="padding-bottom-sm">
						{tokens?.map((item: Token, index: number) => {
							return <TokenRow key={index} index={index} token={item} />
						})}
					</div>
				)} */}
			</Container>
		</Layout>
	)
}

export default AstraHolderPage
