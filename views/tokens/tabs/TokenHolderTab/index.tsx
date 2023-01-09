import { PaginationLite } from '@astraprotocol/astra-ui'
import Row from 'components/Grid/Row'
import Empty from 'components/Typography/Empty'
import { useState } from 'react'
import { getEnvNumber } from 'utils/helper'
import useTokenHolders from 'views/tokens/hook/useTokenHolders'
import TokenHolder from './TokenHolder'

interface Props {
	token: string
	tokenData: Token
}

const TokenHolderTab = ({ token, tokenData }: Props) => {
	const [currentPage, setPage] = useState(1)
	const { tokens, hasNextPage } = useTokenHolders(token, currentPage)

	const onPagingChange = (value: number) => setPage(value)

	return (
		<div>
			<Row style={{ justifyContent: 'space-between' }} classes="padding-xl">
				<span className="text text-xl">Top Holders</span>
				<div>
					{/* Select Component */}
					<PaginationLite currentPage={currentPage} hasNext={hasNextPage} onChange={onPagingChange} />
				</div>
			</Row>

			{!tokens || tokens.length == 0 ? (
				<Empty text={'There are no transactions.'} />
			) : (
				<div className="padding-bottom-sm" style={{ overflowY: 'auto' }}>
					{tokens?.map((item: Holder, index: number) => {
						return (
							<TokenHolder
								key={item.address}
								tokenData={tokenData}
								index={index + (currentPage - 1) * getEnvNumber('NEXT_PUBLIC_PAGE_OFFSET') + 1}
								account={item}
							/>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default TokenHolderTab
