import { PaginationLite, RowLoader } from '@astraprotocol/astra-ui'
import Row from 'components/Grid/Row'
import Empty from 'components/Typography/Empty'
import usePaginationLite from 'hooks/usePaginationLite'
import { isEmpty } from 'lodash'
import { useMemo, useState } from 'react'
import useContractTransaction from 'views/accounts/hook/useContractTransaction'
import ContractTransaction from './ContractTransaction'

interface Props {
	address: string
}

const ContractTransactionTab = ({ address }: Props) => {
	const [currentPage, setPage] = useState(1)
	const { currentParam, makeNextPage, makePrevPage } = usePaginationLite()
	const { hasNextPage, nextPagePath, result, loading } = useContractTransaction(address, currentParam)

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
				<span className="text text-xl">Transactions</span>
				{isHasData && (
					<div>
						{/* Select Component */}
						<PaginationLite currentPage={currentPage} hasNext={hasNextPage} onChange={onPagingChange} />
					</div>
				)}
			</Row>
			<div style={{ overflowX: 'auto' }}>
				<div style={{ minWidth: '700px' }}>
					{loading ? (
						<RowLoader row={5} />
					) : !isHasData ? (
						<Empty text={'There are no transactions.'} />
					) : (
						<>
							{result?.map((item, index) => (
								<ContractTransaction key={item.hash + index} transaction={item} />
							))}
						</>
					)}
				</div>
			</div>
			<div className="padding-right-xl padding-left-xl flex flex-justify-end">
				{isHasData && (
					<div>
						<PaginationLite currentPage={currentPage} hasNext={hasNextPage} onChange={onPagingChange} />
					</div>
				)}
			</div>
		</div>
	)
}

export default ContractTransactionTab
