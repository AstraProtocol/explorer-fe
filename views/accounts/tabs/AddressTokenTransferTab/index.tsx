import { PaginationLite } from '@astraprotocol/astra-ui'
import Row from 'components/Grid/Row'
import Empty from 'components/Typography/Empty'
import { useState } from 'react'
import useAddressTokenTransfers from 'views/accounts/hook/useAddressTokenTransfer'
import AddressTokenTransfer from './AddressTokenTransfer'

interface Props {
	address: string
}

const AddressTokenTransferTab = ({ address }: Props) => {
	const [currentPage, setPage] = useState(1)
	const { result, hasNextPage } = useAddressTokenTransfers(address, currentPage)

	const onPagingChange = (value: number) => setPage(value)

	return (
		<div>
			<Row style={{ justifyContent: 'space-between' }} classes="padding-xl">
				<span className="text text-xl">Token Transfers</span>
				<div>
					{/* Select Component */}
					<PaginationLite currentPage={currentPage} hasNext={hasNextPage} onChange={onPagingChange} />
				</div>
			</Row>
			{!result || result.length == 0 ? (
				<Empty classes="margin-top-xl" />
			) : (
				<>
					{result?.map((item, index) => {
						return <AddressTokenTransfer key={item.hash} data={item} />
					})}
				</>
			)}
		</div>
	)
}

export default AddressTokenTransferTab