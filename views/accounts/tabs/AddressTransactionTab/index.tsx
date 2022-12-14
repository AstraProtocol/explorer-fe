import { Pagination } from '@astraprotocol/astra-ui'
import Row from 'components/Grid/Row'
import Empty from 'components/Typography/Empty'
import { useState } from 'react'
import useAddressTransactions from 'views/accounts/hook/useAddressTransaction'
import AddressTransaction from './AddressTransaction'

interface Props {
	address: string
}

const AddressTransactionTab = ({ address }: Props) => {
	const [currentPage, setPage] = useState(1)
	const { data, pagination } = useAddressTransactions(address, currentPage)

	const onPagingChange = (value: number) => setPage(value)

	return (
		<div>
			<Row style={{ justifyContent: 'space-between' }} classes="padding-xl">
				<span className="text text-xl">Transactions</span>
				<div>
					{/* Select Component */}
					<Pagination
						total={pagination.total_page}
						currentPage={pagination.current_page}
						disabled={false}
						limit={pagination.limit}
						onChange={onPagingChange}
					/>
				</div>
			</Row>
			<div style={{ overflowX: 'auto' }}>
				<div style={{ minWidth: '950px' }}>
					{!data || data.length == 0 ? (
						<Empty text={'There are no transactions.'} />
					) : (
						<>
							{data?.map((item, index) => (
								<AddressTransaction key={item.hash + index} transaction={item} />
							))}
						</>
					)}
				</div>
			</div>
			<div
				style={{ justifyContent: 'space-between', display: 'flex' }}
				className="padding-right-xl padding-left-xl"
			>
				<div></div>
				<div>
					<Pagination
						total={pagination.total_page}
						currentPage={pagination.current_page}
						disabled={false}
						limit={pagination.limit}
						onChange={onPagingChange}
					/>
				</div>
			</div>
		</div>
	)
}

export default AddressTransactionTab
