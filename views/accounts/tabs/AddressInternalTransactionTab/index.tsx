import { PaginationLite } from '@astraprotocol/astra-ui'
import Row from 'components/Grid/Row'
import { useState } from 'react'
import useAddressInternalTransaction from 'views/accounts/hook/useAddressInternalTransaction'
import { Transactions } from 'views/transactions/TransactionTabs'

interface Props {
	address: string
}

const AddressInternalTransactionTab = ({ address }: Props) => {
	const [currentPage, setPage] = useState(1)
	const { data, makeNextPage, makePrevPage } = useAddressInternalTransaction(address, currentPage)

	const onPagingChange = (value: number) => {
		if (value < currentPage) {
			makePrevPage()
		} else {
			makeNextPage()
		}
		setPage(value)
	}

	return (
		<div>
			<Row style={{ justifyContent: 'space-between' }} classes="padding-xl">
				<span className="text text-xl">Internal Transactions</span>
				<div>
					<PaginationLite currentPage={currentPage} hasNext={data.hasNextPage} onChange={onPagingChange} />
				</div>
			</Row>

			<Transactions rows={data.result} emptyMsg="There are no internal transactions for this transaction." />
		</div>
	)
}

export default AddressInternalTransactionTab
