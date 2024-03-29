import { Pagination, RowLoader } from '@astraprotocol/astra-ui'
import Row from 'components/Grid/Row'
import Empty from 'components/Typography/Empty'
import { isEmpty } from 'lodash'
import { useMemo, useState } from 'react'
import useAddressTransactions from 'views/accounts/hook/useAddressTransaction'
import AddressTransaction from './AddressTransaction'

interface Props {
	address: string
}

const AddressTransactionTab = ({ address }: Props) => {
	const [currentPage, setPage] = useState(1)
	const { data, pagination, loading } = useAddressTransactions(address, currentPage)

	const onPagingChange = (value: number) => setPage(value)
	const isHasData = useMemo(() => !isEmpty(data), [data])

	return (
		<div>
			<Row style={{ justifyContent: 'space-between' }} classes="padding-xl">
				<span className="text text-xl">Transactions</span>
				<div>
					{isHasData && (
						<Pagination
							total={pagination.total_record}
							currentPage={pagination.current_page}
							disabled={false}
							limit={pagination.limit}
							onChange={onPagingChange}
						/>
					)}
				</div>
			</Row>
			<div style={{ overflowX: 'auto' }}>
				<div style={{ minWidth: '950px' }}>
					{loading ? (
						<RowLoader row={5} />
					) : !isHasData ? (
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
			<div className="padding-right-xl padding-left-xl flex flex-justify-end">
				<div>
					{isHasData && (
						<Pagination
							total={pagination.total_record}
							currentPage={pagination.current_page}
							disabled={false}
							limit={pagination.limit}
							onChange={onPagingChange}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default AddressTransactionTab
