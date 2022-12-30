import { PaginationLite } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Row from 'components/Grid/Row'
import Empty from 'components/Typography/Empty'
import usePaginationLite from 'hooks/usePaginationLite'
import { useState } from 'react'
import { getEnvNumber } from 'utils/helper'
import useTokenInventory from 'views/tokens/hook/useTokenInventory'
import InventoryItem from './InventoryItem'
import styles from './style.module.scss'

interface Props {
	token: string
}

const InventoryTab = ({ token }: Props) => {
	const [currentPage, setPage] = useState(1)
	const { currentParam, makeNextPage, makePrevPage } = usePaginationLite()
	const { tokens, hasNextPage, nextPagePath } = useTokenInventory(token, currentParam)

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
				<span className="text text-xl">Inventory</span>
				<div>
					<PaginationLite currentPage={currentPage} hasNext={hasNextPage} onChange={onPagingChange} />
				</div>
			</Row>
			<BackgroundCard
				classes={clsx(
					styles.noRadius,
					'text text-base row padding-left-lg padding-right-lg padding-top-sm padding-bottom-sm'
				)}
			>
				<div className={clsx('col-1 padding-left-lg ', styles.colId)}>Token ID</div>
				<div className={clsx('col-5 padding-left-lg ', styles.colOwner)}>Owner</div>
				<div className={clsx('col-6 padding-left-lg ', styles.colImage)}>Image</div>
			</BackgroundCard>
			{!tokens || tokens.length == 0 ? (
				<Empty text={'There are no token instance.'} />
			) : (
				<div className="padding-bottom-sm" style={{ overflowY: 'scroll' }}>
					{tokens?.map((item: TokenNFTInstance, index: number) => {
						return (
							<InventoryItem
								tokenAddress={token}
								key={item.tokenId}
								token={item}
								index={index + (currentPage - 1) * getEnvNumber('NEXT_PUBLIC_PAGE_OFFSET') + 1}
							/>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default InventoryTab
