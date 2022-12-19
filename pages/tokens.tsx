import { PaginationLite } from '@astraprotocol/astra-ui'
import Container from 'components/Container'
import Row from 'components/Grid/Row'
import RowLoader from 'components/Loader/RowLoader'
import { PageTitle } from 'components/Typography/PageTitle'
import usePageQuery from 'hooks/usePageQuery'
import { NextPage } from 'next'
// import {Pagination} from '@astraprotocol/astra-ui'
import Head from 'next/head'
import React from 'react'
import { getEnvNumber } from 'utils/helper'
import useTokens from 'views/tokens/hook/useTokens'
import TokenHeadTitle from 'views/tokens/TokenHeadTitle'
import TokenRow from 'views/tokens/TokenRow'
import Layout from '../components/Layout'

const AllTokensPage: React.FC<NextPage> = _ => {
	const { page, setPage } = usePageQuery('/tokens')
	const { tokens, hasNextPage } = useTokens(page)

	const onPagingChange = (value: number) => {
		setPage(value)
	}

	return (
		<Layout>
			<Head>
				<title>Tokens | {process.env.NEXT_PUBLIC_TITLE}</title>
				<meta
					name="description"
					content="Transactions that have been validated and confirmed on the Astra Blockchain. The list consists of transactions from sending ASA and the transactions for interacting with a smart contract."
				/>
				<meta name="author" content="https://explorer.astranaut.io" />
				<meta name="keywords" content="astra, explorer, ASA, search, blockchain, crypto, currency" />
				<meta name="format-detection" content="telephone=no" />
				<meta property="og:title" content="Astra Transactions Information | AstraExplorer" />
				<meta
					property="og:description"
					content="Transactions that have been validated and confirmed on the Astra Blockchain. The list consists of transactions from sending ASA and the transactions for interacting with a smart contract."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="Astra (ASA) Blockchain Explorer" />
				<meta property="og:url" content="http://explorer.astranaut.io/tx" />
				{/* <meta property="og:image" content="https://explorer.astranaut.io/images/brandassets/explorer.astranaut.ioo-circle.jpg" /> */}
				{/* <meta property="og:image:alt" content="Visit explorer.astranaut.io" /> */}
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content="Astra Transactions Information | AstraExplorer" />
				<meta
					property="twitter:description"
					content="Transactions that have been validated and confirmed on the Astra Blockchain. The list consists of transactions from sending ASA and the transactions for interacting with a smart contract."
				/>
				<meta name="twitter:site" content="@AstraOfficial5" />
				{/* <meta
					property="twitter:image"
					content="https://explorer.astranaut.io/images/brandassets/explorer.astranaut.ioo-circle.jpg"
				/> */}
			</Head>
			<Container>
				<Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
					<PageTitle>Tokens</PageTitle>
					<div>
						<PaginationLite currentPage={page} hasNext={hasNextPage} onChange={onPagingChange} />
					</div>
				</Row>

				{!tokens || tokens.length === 0 ? (
					<RowLoader row={10} />
				) : (
					<div className="padding-bottom-sm" style={{ overflowX: 'scroll' }}>
						<div style={{ minWidth: '1272px' }}>
							<TokenHeadTitle />
							{tokens?.map((item: Token, index: number) => {
								return (
									<TokenRow
										key={item.contractAddressHash}
										index={index + (page - 1) * getEnvNumber('NEXT_PUBLIC_PAGE_OFFSET') + 1}
										token={item}
									/>
								)
							})}
						</div>
					</div>
				)}
			</Container>
		</Layout>
	)
}

export default AllTokensPage
