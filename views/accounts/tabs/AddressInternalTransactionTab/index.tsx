import { PaginationLite, RowLoader } from '@astraprotocol/astra-ui'
import Row from 'components/Grid/Row'
import usePaginationLite from 'hooks/usePaginationLite'
import { isEmpty } from 'lodash'
import { useMemo, useState } from 'react'
import useAddressInternalTransaction from 'views/accounts/hook/useAddressInternalTransaction'
import { Transactions } from 'views/transactions/TransactionTabs'

interface Props {
	address: string
}

const AddressInternalTransactionTab = ({ address }: Props) => {
	const [currentPage, setPage] = useState(1)
	const { currentParam, makeNextPage, makePrevPage } = usePaginationLite()
	const { hasNextPage, nextPagePath, result, loading } = useAddressInternalTransaction(address, currentParam)

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
				<span className="text text-xl">Internal Transactions</span>
				{isHasData && (
					<div>
						<PaginationLite currentPage={currentPage} hasNext={hasNextPage} onChange={onPagingChange} />
					</div>
				)}
			</Row>
			{loading ? (
				<RowLoader row={5} />
			) : (
				<Transactions rows={result} emptyMsg="There are no internal transactions for this address." />
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

export default AddressInternalTransactionTab
