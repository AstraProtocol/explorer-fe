import { PaginationLite } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Row from 'components/Grid/Row'
import Empty from 'components/Typography/Empty'
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
	const { data, makeNextPage, makePrevPage } = useAddressToken(address, currentPage)
	const astraSummary = useAppSelector(getAstraSummary)
	const addressBalance = useAddressBalance(address)

	const onPagingChange = (value: number) => {
		if (value < currentPage) {
			makePrevPage()
		} else {
			makeNextPage()
		}
		setPage(value)
	}

	const netWorth = numeral((astraSummary.last * parseInt(addressBalance.balance)) / 10 ** 18).format('0,0.00000')

	return (
		<div className="margin-left-xl margin-right-xl">
			<Row classes="margin-top-xl margin-bottom-xl">
				<BackgroundCard classes="radius-sm margin-right-xl padding-top-xs padding-bottom-xs padding-left-md padding-right-md">
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
				<BackgroundCard classes="radius-sm margin-right-xl padding-top-xs padding-bottom-xs padding-left-md padding-right-md">
					<span className="text text-base contrast-color-50">Token</span>
					<br />
					<AmountUnit classes="padding-right-sm border border-right-base" amount={0} unit="VND" />
					<AmountUnit classes="padding-left-sm" amount={data.result?.length} unit="Tokens" />
				</BackgroundCard>
			</Row>
			<div style={{ overflowY: 'scroll' }}>
				<BackgroundCard
					classes={clsx(
						styles.noRadius,
						'text text-base  padding-left-lg padding-right-lg padding-top-sm padding-bottom-sm'
					)}
				>
					<Row>
						<div style={{ width: '10%' }}>Assets</div>
						<div style={{ width: '10%' }}>Type</div>
						<div style={{ width: '20%' }}>Amount</div>
						<div style={{ width: '10%' }}>Symbol</div>
						<div style={{ width: '10%' }}>Price</div>
						<div style={{ width: '10%' }}>Value</div>
						<div style={{ width: '20%' }}>Contract Address</div>
					</Row>
				</BackgroundCard>
				<div>
					{!data.result || data.result.length == 0 ? (
						<Empty classes="margin-top-xl" />
					) : (
						<>
							{data.result?.map((item, index) => {
								return <AddressTokenRow key={item.contractAddress} data={item} />
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

export default AddressTokenTab
