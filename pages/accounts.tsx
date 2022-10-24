import { PaginationLite } from '@astraprotocol/astra-ui'
import Container from 'components/Container'
import Row from 'components/Grid/Row'
import RowLoader from 'components/Loader/RowLoader'
import { PageTitle } from 'components/Typography/PageTitle'
import usePaginationLite from 'hooks/usePaginationLite'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { getEnvNumber } from 'utils/helper'
import HolderHeadTitle from 'views/accounts/HolderHeadTitle'
import HolderRow from 'views/accounts/HolderRow'
import useAccounts from 'views/accounts/hook/useAccounts'
import Layout from '../components/Layout'

const AstraHolderPage: React.FC<NextPage> = _ => {
	const { page, setPage } = usePaginationLite('/accounts')
	const { accounts, hasNextPage } = useAccounts(page)

	const onPagingChange = (value: number) => setPage(value)

	return (
		<Layout>
			<Head>
				<title>Astra Holders | {process.env.NEXT_PUBLIC_TITLE}</title>
			</Head>
			<Container>
				<Row style={{ justifyContent: 'space-between' }}>
					<PageTitle>Astra Address</PageTitle>
					<div>
						<PaginationLite currentPage={page} hasNext={hasNextPage} onChange={onPagingChange} />
					</div>
				</Row>

				{!accounts || accounts.length === 0 ? (
					<RowLoader row={10} />
				) : (
					<div className="padding-bottom-sm" style={{ overflowY: 'scroll' }}>
						<HolderHeadTitle />
						{accounts?.map((item: Holder, index: number) => {
							return (
								<HolderRow
									key={item.address}
									index={index + (page - 1) * getEnvNumber('NEXT_PUBLIC_PAGE_OFFSET') + 1}
									account={item}
								/>
							)
						})}
					</div>
				)}
			</Container>
		</Layout>
	)
}

export default AstraHolderPage
