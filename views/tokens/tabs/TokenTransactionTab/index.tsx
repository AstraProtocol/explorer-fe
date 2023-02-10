import { PaginationLite, RowLoader } from '@astraprotocol/astra-ui'
import Row from 'components/Grid/Row'
import Empty from 'components/Typography/Empty'
import usePaginationLite from 'hooks/usePaginationLite'
import { isEmpty } from 'lodash'
import { useMemo, useState } from 'react'
import useTokenTransactions from 'views/tokens/hook/useTokenTransactions'
import TokenTransaction from './TokenTransaction'

interface Props {
	token: string
	tokenData: Token
}

const TokenTransactionTab = ({ token, tokenData }: Props) => {
	const [currentPage, setPage] = useState(1)
	const { currentParam, makeNextPage, makePrevPage } = usePaginationLite()
	const { hasNextPage, nextPagePath, result, loading } = useTokenTransactions(token, currentParam)

	const onPagingChange = (value: number) => {
		if (value < currentPage) {
			makePrevPage()
		} else {
			makeNextPage(nextPagePath)
		}
		setPage(value)
	}
	const isHasData = useMemo(() => !isEmpty(result), [result])

	return (
		<div>
			<Row style={{ justifyContent: 'space-between' }} classes="padding-xl">
				<span className="text text-xl">Token Transfers</span>
				{isHasData && (
					<div>
						{/* Select Component */}
						<PaginationLite currentPage={currentPage} hasNext={hasNextPage} onChange={onPagingChange} />
					</div>
				)}
			</Row>

			{loading ? (
				<RowLoader row={5} />
			) : !isHasData ? (
				<Empty text={'There are no transactions.'} />
			) : (
				<div style={{ overflowY: 'auto' }}>
					{result.map((item, index) => (
						<TokenTransaction key={item.transactionHash} tokenData={tokenData} transaction={item} />
					))}
				</div>
			)}
			<div className="flex flex-justify-end padding-right-xl margin-top-md">
				{isHasData && (
					<div>
						{/* Select Component */}
						<PaginationLite currentPage={currentPage} hasNext={hasNextPage} onChange={onPagingChange} />
					</div>
				)}
			</div>
		</div>
	)
}

export default TokenTransactionTab
