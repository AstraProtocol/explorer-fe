import { PaginationLite } from '@astraprotocol/astra-ui'
import Row from 'components/Grid/Row'
import { useState } from 'react'
import useAddressTokenTransfers from 'views/accounts/hook/useAddressTokenTransfer'
import { Transactions } from 'views/transactions/TransactionTabs'

interface Props {
	address: string
}

const AddressTransactionTab = ({ address }: Props) => {
	const [currentPage, setPage] = useState(1)
	const { result, hasNextPage } = useAddressTokenTransfers(address, currentPage)

	const onPagingChange = (value: number) => setPage(value)

	return (
		<div>
			<Row style={{ justifyContent: 'space-between' }} classes="padding-xl">
				<span className="text text-xl">Transactions</span>
				<div>
					{/* Select Component */}
					<PaginationLite currentPage={currentPage} hasNext={hasNextPage} onChange={onPagingChange} />
				</div>
			</Row>

			<Transactions rows={[]} emptyMsg="There are no transactions." />
		</div>
	)
}

export default AddressTransactionTab
