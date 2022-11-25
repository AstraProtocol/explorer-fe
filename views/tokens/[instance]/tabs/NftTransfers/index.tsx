import { PaginationLite } from '@astraprotocol/astra-ui'
import Row from 'components/Grid/Row'
import usePaginationLite from 'hooks/usePaginationLite'
import { useState } from 'react'
import useTokenTransactions from 'views/tokens/hook/useTokenTransactions'

interface Props {
	token: string
	tokenData: TokenNFTMetadata
}

const NftTransferTab = ({ token, tokenData }: Props) => {
	const [currentPage, setPage] = useState(1)
	const { currentParam, makeNextPage, makePrevPage } = usePaginationLite()
	const { hasNextPage, nextPagePath, result } = useTokenTransactions(token, currentParam)

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
				<span className="text text-xl">Transactions</span>
				<div>
					{/* Select Component */}
					<PaginationLite currentPage={currentPage} hasNext={hasNextPage} onChange={onPagingChange} />
				</div>
			</Row>
			In Development
			{/* {!result || result.length == 0 ? (
				<Empty text={'There are no transactions.'} />
			) : (
				<div style={{ overflowY: 'scroll' }}>
					{result.map((item, index) => (
						<NftTransfer key={item.transactionHash} tokenData={tokenData} transaction={item} />
					))}
				</div>
			)} */}
		</div>
	)
}

export default NftTransferTab