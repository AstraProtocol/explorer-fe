import { PaginationLite } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Row from 'components/Grid/Row'
import Empty from 'components/Typography/Empty'
import usePaginationLite from 'hooks/usePaginationLite'
import numeral from 'numeral'
import { useState } from 'react'
import { getAstraSummary } from 'slices/commonSlice'
import { useAppSelector } from 'store/hooks'
import AmountUnit from 'views/accounts/AmountUnit'
import useAddressBalance from 'views/accounts/hook/useAddressBalance'
import useAddressToken from 'views/accounts/hook/useAddressToken'
import AddressTokenRow from './AddressTokenRow'
import styles from './style.module.scss'

interface Props {
	address: string
}

const AddressTokenTab = ({ address }: Props) => {
	const [currentPage, setPage] = useState(1)
	const { currentParam, makeNextPage, makePrevPage } = usePaginationLite()
	const { hasNextPage, nextPagePath, result } = useAddressToken(address, currentParam)
	const astraSummary = useAppSelector(getAstraSummary)
	const addressBalance = useAddressBalance(address)

	const onPagingChange = (value: number) => {
		if (value < currentPage) {
			makePrevPage()
		} else {
			makeNextPage(nextPagePath)
		}
		setPage(value)
	}

	const netWorth = numeral((astraSummary.last * parseInt(addressBalance.balance)) / 10 ** 18).format('0,0.00000')

	return (
		<div className="margin-left-xl margin-right-xl">
			<Row classes="margin-top-xl margin-bottom-xl" style={{ overflowY: 'scroll' }}>
				<BackgroundCard
					classes={clsx(
						'radius-sm margin-right-xl padding-top-xs padding-bottom-xs padding-left-md padding-right-md',
						styles.cardUnitBalance
					)}
				>
					<span className="text text-base contrast-color-50">Net Worth</span>
					<br />
					<AmountUnit amount={netWorth} unit="VND" />
				</BackgroundCard>
				{/* <BackgroundCard classes="radius-sm margin-right-xl padding-top-xs padding-bottom-xs padding-left-md padding-right-md">
					<span className="text text-base contrast-color-50">Astra Balance</span>
					<br />
					<AmountUnit classes="padding-right-sm border border-right-base" amount={netWorth} unit="VND" />
					<AmountUnit
						classes="padding-left-sm"
						amount={addressBalance.balance ? convertBalanceToView(addressBalance.balance) : ''}
						unit="Astra"
					/>
				</BackgroundCard> */}
				<BackgroundCard
					classes={clsx(
						'radius-sm margin-right-xl padding-top-xs padding-bottom-xs padding-left-md padding-right-md',
						styles.cardUnitToken
					)}
				>
					<span className="text text-base contrast-color-50">Token</span>
					<br />
					<AmountUnit classes="padding-right-sm border border-right-base" amount={0} unit="VND" />
					<AmountUnit classes="padding-left-sm" amount={result?.length} unit="Tokens" />
				</BackgroundCard>
			</Row>
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
						'text text-base row padding-left-lg padding-right-lg padding-top-sm padding-bottom-sm'
					)}
				>
					<div className={clsx('col-2 margin-right-xs', styles.colSymbol)}>Assets</div>
					<div className={clsx('col-1 margin-right-xs', styles.colType)}>Type</div>
					<div className={clsx('col-3 margin-right-xs', styles.colAmount)}>Amount</div>
					<div className={clsx('col-1 margin-right-xs', styles.colSymbol)}>Symbol</div>
					<div className={clsx('col-1', styles.colPrice)}>Price</div>
					<div className={clsx('col-1', styles.colValue)}>Value</div>
					<div className={clsx('col-3', styles.colAddress)}>Contract Address</div>
				</BackgroundCard>
				<div>
					{!result || result.length == 0 ? (
						<Empty classes="margin-top-xl" />
					) : (
						<>
							{result?.map((item, index) => {
								return <AddressTokenRow key={item.contractAddress} data={item} />
							})}
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default AddressTokenTab
