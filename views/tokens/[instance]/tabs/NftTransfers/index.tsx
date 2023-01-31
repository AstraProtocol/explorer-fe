import { PaginationLite } from '@astraprotocol/astra-ui'
import Row from 'components/Grid/Row'
import Empty from 'components/Typography/Empty'
import usePaginationLite from 'hooks/usePaginationLite'
import { isEmpty } from 'lodash'
import { useMemo, useState } from 'react'
import useNftTransfers from 'views/tokens/[instance]/hook/useNftTransfers'
import NftTransfer from './NftTransfer'

interface Props {
	token: string
	tokenId: string
	tokenData: TokenNFTMetadata
}

const NftTransferTab = ({ token, tokenData, tokenId }: Props) => {
	const [currentPage, setPage] = useState(1)
	const { currentParam, makeNextPage, makePrevPage } = usePaginationLite()
	const { hasNextPage, nextPagePath, result } = useNftTransfers(token, tokenId, currentParam)

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
				<span className="text text-xl">Token Transfers</span>
				{isHasData && (
					<div>
						{/* Select Component */}
						<PaginationLite currentPage={currentPage} hasNext={hasNextPage} onChange={onPagingChange} />
					</div>
				)}
			</Row>
			{!isHasData ? (
				<Empty text={'There are no transactions.'} />
			) : (
				<div style={{ overflowY: 'auto' }}>
					{result.map((item, index) => (
						<NftTransfer key={item.transactionHash} tokenData={tokenData} transaction={item} />
					))}
				</div>
			)}
			<div className="flex flex-justify-end padding-right-xl margin-top-md">
				{isHasData && (
					<div>
						{/* Select Component */}
						<PaginationLite currentPage={currentPage} hasNext={hasNextPage} onChange={onPagingChange} />
					</div>
				)}
			</div>
		</div>
	)
}

export default NftTransferTab
