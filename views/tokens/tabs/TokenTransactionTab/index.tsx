import { PaginationLite } from '@astraprotocol/astra-ui'
import Row from 'components/Grid/Row'
import Empty from 'components/Typography/Empty'
import { useState } from 'react'
import useTokenTransactions from 'views/tokens/hook/useTokenTransactions'
import AddressTransaction from './TokenTransaction'

interface Props {
	token: string
}

const TokenTransactionTab = ({ token }: Props) => {
	const [currentPage, setPage] = useState(1)
	const { data, makePrevPage, makeNextPage } = useTokenTransactions(token)

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
				<span className="text text-xl">Transactions</span>
				<div>
					{/* Select Component */}
					<PaginationLite currentPage={currentPage} hasNext={data.hasNextPage} onChange={onPagingChange} />
				</div>
			</Row>

			{!data.result || data.result.length == 0 ? (
				<Empty text={'There are no transactions.'} />
			) : (
				<div style={{ overflowY: 'scroll' }}>
					{data.result.map((item, index) => (
						<AddressTransaction key={item.transactionHash} transaction={item} />
					))}
				</div>
			)}
		</div>
	)
}

export default TokenTransactionTab
