import { PaginationLite } from '@astraprotocol/astra-ui'
import Row from 'components/Grid/Row'
import Empty from 'components/Typography/Empty'
import usePaginationLite from 'hooks/usePaginationLite'
import { isEmpty } from 'lodash'
import { useMemo, useState } from 'react'
import useAddressTokenTransfers from 'views/accounts/hook/useAddressTokenTransfer'
import AddressTokenTransfer from './AddressTokenTransfer'

interface Props {
	address: string
}

const AddressTokenTransferTab = ({ address }: Props) => {
	const [currentPage, setPage] = useState(1)
	const { currentParam, makeNextPage, makePrevPage } = usePaginationLite()
	const { hasNextPage, nextPagePath, result } = useAddressTokenTransfers(address, currentParam)
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
			<div style={{ overflowY: 'auto' }}>
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

export default AddressTokenTransferTab
