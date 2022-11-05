import { PaginationLite } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Empty from 'components/Typography/Empty'
import usePaginationLite from 'hooks/usePaginationLite'
import { useState } from 'react'
import { getAstraSummary } from 'slices/commonSlice'
import { useAppSelector } from 'store/hooks'
import useAddressBalance from 'views/accounts/hook/useAddressBalance'
import useAddressCoinBalanceHistory from 'views/accounts/hook/useAddressCoinBalanceHistory'
import AddressBalanceHistory from './AddressBalanceHistory'
import AddressBalanceHistoryChart from './AddressBalanceHistoryChart'
import styles from './style.module.scss'

interface Props {
	address: string
}

const AddressCoinBalanceTab = ({ address }: Props) => {
	const [currentPage, setPage] = useState(1)
	const { currentParam, makeNextPage, makePrevPage } = usePaginationLite()
	const { hasNextPage, nextPagePath, result } = useAddressCoinBalanceHistory(address, currentParam)
	const addressBalance = useAddressBalance(address)
	const astraSummary = useAppSelector(getAstraSummary)

	const onPagingChange = (value: number) => {
		if (value < currentPage) {
			makePrevPage()
		} else {
			makeNextPage(nextPagePath)
		}
		setPage(value)
	}

	return (
		<div className="margin-left-xl margin-right-xl">
			{/* <Row style={{ justifyContent: 'space-between' }} classes="padding-xl">
				<span className="text text-xl">Internal Transactions</span>
				<div>
					<PaginationLite currentPage={currentPage} hasNext={hasNextPage} onChange={onPagingChange} />
				</div>
			</Row> */}
			<div className={clsx('margin-top-xl margin-bottom-xl', styles.container)}>
				<AddressBalanceHistoryChart address={address} />
			</div>
			<div className="margin-bottom-xs">
				<PaginationLite
					style={{ justifyContent: 'flex-end' }}
					currentPage={currentPage}
					hasNext={hasNextPage}
					onChange={onPagingChange}
				/>
			</div>
			<div style={{ overflowY: 'scroll' }}>
				<BackgroundCard
					classes={clsx(
						styles.noRadius,
						'text text-base row  padding-left-lg padding-right-lg padding-top-sm padding-bottom-sm'
					)}
				>
					<div className={clsx('col-2', styles.colBlockNumber)}>Blocks</div>
					<div className={clsx('col-3', styles.colTransactionHash)}>Tx Hash</div>
					<div className={clsx('col-5', styles.colValue)}>Value</div>
					<div className={clsx('col-2', styles.colTimer)}>Time</div>
				</BackgroundCard>
				<div className="">
					{!result || result.length == 0 ? (
						<Empty classes="margin-top-lg" />
					) : (
						<>
							{result?.map((item: AddressCoinBalanceHistory, index) => {
								return (
									<AddressBalanceHistory
										addressBalance={addressBalance}
										astraSummary={astraSummary}
										key={item.blockNumber}
										data={item}
									/>
								)
							})}
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default AddressCoinBalanceTab
