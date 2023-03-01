import { PaginationLite } from '@astraprotocol/astra-ui'
import Container from 'components/Container'
import Row from 'components/Grid/Row'
import RowLoader from 'components/Loader/RowLoader'
import { PageTitle } from 'components/Typography/PageTitle'
import usePaginationLite from 'hooks/usePaginationLite'
import { NextPage } from 'next'
import React, { useState } from 'react'
import { getEnvNumber } from 'utils/helper'
import HolderHeadTitle from 'views/accounts/HolderHeadTitle'
import HolderRow from 'views/accounts/HolderRow'
import useAccounts from 'views/accounts/hook/useAccounts'
import Layout from '../components/Layout'

const AstraHolderPage: React.FC<NextPage> = _ => {
	const [page, setPage] = useState(1)
	const { currentParam, makeNextPage, makePrevPage } = usePaginationLite()
	const { hasNextPage, nextPagePath, result, isValidating } = useAccounts(currentParam)

	const onPagingChange = (value: number) => {
		if (value < page) {
			makePrevPage()
		} else {
			makeNextPage(nextPagePath)
		}
		setPage(value)
	}

	return (
		<Layout>
			<Container>
				<Row style={{ justifyContent: 'space-between' }}>
					<PageTitle>Astra Address</PageTitle>
					<div>
						<PaginationLite currentPage={page} hasNext={hasNextPage} onChange={onPagingChange} />
					</div>
				</Row>

				{isValidating && result.length == 0 ? (
					<RowLoader row={10} />
				) : (
					<div className="padding-bottom-sm" style={{ overflowY: 'auto' }}>
						<HolderHeadTitle />
						{result?.map((item: Holder, index: number) => {
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

export async function getServerSideProps({}) {
	return {
		props: {
			title: `Astra Holders`
		}
	}
}

export default AstraHolderPage
