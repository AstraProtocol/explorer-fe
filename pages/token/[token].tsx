import { Breadcumbs } from '@astraprotocol/astra-ui'
import Container from 'components/Container'
import Head from 'next/head'
import React from 'react'
import { ellipseBetweenText, LinkMaker } from 'utils/helper'
import TokenDetailTab from 'views/tokens/TokenDetailTabs'
import TokenOverview from 'views/tokens/TokenOverview'
import Layout from '../../components/Layout'

type Props = {
	token: string
}

const TokenDetailPage: React.FC<Props> = props => {
	const { token } = props

	return (
		<Layout>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<title>
					Token {token} - {process.env.NEXT_PUBLIC_TITLE}
				</title>
			</Head>
			<Container>
				<Breadcumbs
					items={[{ label: 'Address', link: LinkMaker.token() }, { label: ellipseBetweenText(token) }]}
				/>
				<TokenOverview token={token} />
				<TokenDetailTab token={token} />
			</Container>
		</Layout>
	)
}

export async function getServerSideProps({ params }) {
	const { token } = params
	// if (web3.utils.isAddress(address))
	return {
		props: {
			token
		}
	}

	// return {
	// 	redirect: {
	// 		destination: '/404',
	// 		permanent: false
	// 	}
	// }
}

export default TokenDetailPage
