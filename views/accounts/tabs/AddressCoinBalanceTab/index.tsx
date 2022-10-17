import { PaginationLite } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Row from 'components/Grid/Row'
import Empty from 'components/Typography/Empty'
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
	const { data, makeNextPage, makePrevPage } = useAddressCoinBalanceHistory(address)
	const addressBalance = useAddressBalance(address)
	const astraSummary = useAppSelector(getAstraSummary)

	const onPagingChange = (value: number) => {
		if (value < currentPage) {
			makePrevPage()
		} else {
			makeNextPage()
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

			<div style={{ overflowY: 'scroll' }}>
				<BackgroundCard
					classes={clsx(
						styles.noRadius,
						'text text-base  padding-left-lg padding-right-lg padding-top-sm padding-bottom-sm'
					)}
				>
					<Row>
						<div className="col-2">Blocks</div>
						<div className="col-3">Tx Hash</div>
						<div className="col-5">Value</div>
						<div className="col-2">Time</div>
					</Row>
				</BackgroundCard>
				<div className="">
					{!data.result || data.result.length == 0 ? (
						<Empty classes="margin-top-lg" />
					) : (
						<>
							{data.result?.map((item: AddressCoinBalanceHistory, index) => {
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
			<div className={clsx(styles.pagination, 'margin-top-xl')}>
				<PaginationLite currentPage={currentPage} hasNext={data.hasNextPage} onChange={onPagingChange} />
			</div>
		</div>
	)
}

export default AddressCoinBalanceTab
