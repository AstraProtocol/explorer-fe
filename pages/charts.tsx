import Container from 'components/Container'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import Address from 'views/charts/Address'
import Fee from 'views/charts/Fee'
import Gas from 'views/charts/Gas'
import Transactions from 'views/charts/Transactions'
import Overview from 'views/homepage/Overview'
import Layout from '../components/Layout'

const Charts: React.FC<NextPage> = _ => {
	return (
		<Layout>
			<Head>
				<title>{process.env.NEXT_PUBLIC_TITLE}</title>
			</Head>
			<Container>
				<div className="col md-wrap" style={{ paddingTop: '150px' }}>
					<Overview hasFetchLatestBlock />
					<Transactions />
					<Address />
					<Gas />
					<Fee />
				</div>
			</Container>
		</Layout>
	)
}

export default Charts
