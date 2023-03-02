import { PaginationLite } from '@astraprotocol/astra-ui'
import Container from 'components/Container'
import Row from 'components/Grid/Row'
import RowLoader from 'components/Loader/RowLoader'
import { PageTitle } from 'components/Typography/PageTitle'
import usePageQuery from 'hooks/usePageQuery'
import { NextPage } from 'next'
import React from 'react'
import { getEnvNumber } from 'utils/helper'
import useTokens from 'views/tokens/hook/useTokens'
import TokenHeadTitle from 'views/tokens/TokenHeadTitle'
import TokenRow from 'views/tokens/TokenRow'
import Layout from '../components/Layout'

const AllTokensPage: React.FC<NextPage> = _ => {
	const { page, setPage } = usePageQuery('/tokens')
	const { tokens, hasNextPage, isValidating } = useTokens(page)

	const onPagingChange = (value: number) => {
		setPage(value)
	}

	return (
		<Layout>
			<Container>
				<Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
					<PageTitle>Tokens</PageTitle>
					<div>
						<PaginationLite currentPage={page} hasNext={hasNextPage} onChange={onPagingChange} />
					</div>
				</Row>

				{isValidating && tokens.length == 0 ? (
					<RowLoader row={10} />
				) : (
					<div className="padding-bottom-sm" style={{ overflowX: 'auto' }}>
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

export async function getServerSideProps({}) {
	return {
		props: {
			title: `All Tokens`
		}
	}
}

export default AllTokensPage
