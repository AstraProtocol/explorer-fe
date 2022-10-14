import Row from 'components/Grid/Row'
import { useState } from 'react'

interface Props {
	token: string
}

const TokenTransactionTab = ({ token }: Props) => {
	const [currentPage, setPage] = useState(1)
	// const { data, pagination } = useTokenTransactions(token)

	const onPagingChange = (value: number) => setPage(value)

	return (
		<div>
			<Row style={{ justifyContent: 'space-between' }} classes="padding-xl">
				<span className="text text-xl">Transactions</span>
				<div>
					{/* Select Component */}
					{/* <PaginationLite currentPage={currentPage} hasNext={hasNextPage} onChange={onPagingChange} /> */}
				</div>
			</Row>

			{/* {!data || data.length == 0 ? (
				<Empty text={'There are no transactions.'} />
			) : (
				<>
					{data?.map((item, index) => (
						<AddressTransaction key={item.hash + index} transaction={item} />
					))}
				</>
			)} */}
		</div>
	)
}

export default TokenTransactionTab
