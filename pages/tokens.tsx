import { PaginationLite, Row } from '@astraprotocol/astra-ui'
import Container from 'components/Container'
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
					<div className="padding-bottom-sm" style={{ overflowY: 'scroll' }}>
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
				)}
			</Container>
		</Layout>
	)
}

export default AllTokensPage
