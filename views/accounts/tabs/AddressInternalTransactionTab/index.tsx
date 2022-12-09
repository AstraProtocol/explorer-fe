import { PaginationLite } from '@astraprotocol/astra-ui'
import Row from 'components/Grid/Row'
import usePaginationLite from 'hooks/usePaginationLite'
import { useState } from 'react'
import useAddressInternalTransaction from 'views/accounts/hook/useAddressInternalTransaction'
import { Transactions } from 'views/transactions/TransactionTabs'

interface Props {
	address: string
}

const AddressInternalTransactionTab = ({ address }: Props) => {
	const [currentPage, setPage] = useState(1)
	const { currentParam, makeNextPage, makePrevPage } = usePaginationLite()
	const { hasNextPage, nextPagePath, result } = useAddressInternalTransaction(address, currentParam)

	const onPagingChange = (value: number) => {
		if (value < currentPage) {
			makePrevPage()
		} else {
			makeNextPage(nextPagePath)
		}
		setPage(value)
	}

	return (
		<div>
			<Row style={{ justifyContent: 'space-between' }} classes="padding-xl">
				<span className="text text-xl">Internal Transactions</span>
				<div>
					<PaginationLite currentPage={currentPage} hasNext={hasNextPage} onChange={onPagingChange} />
				</div>
			</Row>

			<Transactions rows={result} emptyMsg="There are no internal transactions for this address." />
		</div>
	)
}

export default AddressInternalTransactionTab
