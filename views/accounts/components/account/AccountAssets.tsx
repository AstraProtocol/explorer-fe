import { CryptoIcon, Typography, useMobileLayout } from '@astraprotocol/astra-ui'
import { CryptoIconNames } from '@astraprotocol/astra-ui/lib/es/components/CryptoIcon'
import { ArcElement, Chart, ChartData, ChartOptions, DoughnutController } from 'chart.js'
import 'chartjs-adapter-dayjs'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { getAstraSummary } from 'slices/commonSlice'
import { useAppSelector } from 'store/hooks'
import { convertBalanceToView, formatCurrencyValue } from 'utils/helper'

Chart.defaults.font.family =
	'Nunito, "Helvetica Neue", Arial, sans-serif,"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
Chart.register(DoughnutController, ArcElement)

interface Props {
	addressData: Address
	address: string
}

// Make Login page

const AccountAssets = ({ addressData, address }: Props) => {
	const astraSummary = useAppSelector(getAstraSummary)
	const astraPrice = astraSummary?.last || 0
	const [dataSet, setData] = useState([])

	useEffect(() => {
		const { balance, delegationBalance, totalRewards, unbondingBalance } = addressData
		const newDataSet = [
			convertBalanceToView(balance),
			convertBalanceToView(delegationBalance),
			convertBalanceToView(totalRewards),
			convertBalanceToView(unbondingBalance)
		]
		setData(newDataSet)
	}, [addressData])

	const data: ChartData<'doughnut'> = {
		labels: ['Balance', 'Delegation', 'Reward', 'Unbonding'],
		datasets: [
			{
				data: dataSet,
				backgroundColor: [
					'rgba(255, 99, 132, 0.5)',
					'rgba(54, 162, 235, 0.5)',
					'rgba(255, 206, 86, 0.5)',
					'rgba(75, 192, 192, 0.5)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)'
				],
				borderWidth: 0
			}
		]
	}

	const options: ChartOptions<'doughnut'> = {
		layout: {},
		responsive: true,

		elements: {
			arc: {
				borderWidth: 0
			}
		}
	}
	const { isMobile } = useMobileLayout()

	return (
		<div className="row flex flex-wrap margin-top-md margin-bottom-md">
			<div style={{ height: 200, width: 200 }} className="flex flex-align-center ">
				<Doughnut data={data} options={options} />
			</div>
			<div className={clsx('flex col flex-justify-center padding-md', isMobile ? '' : 'margin-left-2xl')}>
				<div className="flex row flex-justify-space-between">
					<div className="text text-base">Balance</div>
					<div className="money money-sm">
						<Typography.Balance
							size="sm"
							currency={process.env.NEXT_PUBLIC_NATIVE_TOKEN?.toUpperCase()}
							// currency={`(${formatCurrencyValue(Number(astraPrice) * dataSet[0] || '0', 'VND')})`}
							// icon={
							// 	<CryptoIcon name={process.env.NEXT_PUBLIC_NATIVE_TOKEN as CryptoIconNames} size="sm" />
							// }
							value={dataSet[0]}
							fixNumber={5}
						/>
					</div>
				</div>
				<div className="flex row flex-justify-space-between">
					<div className="text text-base">Delegation</div>
					<div className="money money-sm">
						<Typography.Balance
							size="sm"
							currency={process.env.NEXT_PUBLIC_NATIVE_TOKEN?.toUpperCase()}
							// currency={`(${formatCurrencyValue(Number(astraPrice) * dataSet[1] || '0', 'VND')})`}
							// icon={
							// 	<CryptoIcon name={process.env.NEXT_PUBLIC_NATIVE_TOKEN as CryptoIconNames} size="sm" />
							// }
							value={dataSet[1]}
							fixNumber={5}
						/>
					</div>
				</div>
				<div className="flex row flex-justify-space-between">
					<div className="text text-base">Reward</div>
					<div className="money money-sm">
						<Typography.Balance
							size="sm"
							currency={process.env.NEXT_PUBLIC_NATIVE_TOKEN?.toUpperCase()}
							// currency={`(${formatCurrencyValue(Number(astraPrice) * dataSet[2] || '0', 'VND')})`}
							// icon={
							// 	<CryptoIcon name={process.env.NEXT_PUBLIC_NATIVE_TOKEN as CryptoIconNames} size="sm" />
							// }
							value={dataSet[2]}
							fixNumber={5}
						/>
					</div>
				</div>
				<div className="flex row flex-justify-space-between">
					<div className="text text-base">Unbonding</div>
					<div className="money money-sm">
						<Typography.Balance
							size="sm"
							currency={process.env.NEXT_PUBLIC_NATIVE_TOKEN?.toUpperCase()}
							// currency={`(${formatCurrencyValue(Number(astraPrice) * dataSet[3] || '0', 'VND')})`}
							// icon={
							// 	<CryptoIcon name={process.env.NEXT_PUBLIC_NATIVE_TOKEN as CryptoIconNames} size="sm" />
							// }
							value={dataSet[3]}
							fixNumber={5}
						/>
					</div>
				</div>
				<div className="flex row flex-justify-end border border-top-base padding-top-xs">
					<div className="text text-base">Total Balance:</div>
					<div className="money money-sm margin-left-xl">
						<Typography.Balance
							size="sm"
							currency={`(${formatCurrencyValue(
								Number(astraPrice) * parseFloat(convertBalanceToView(addressData.totalBalance)) || '0',
								'VND'
							)})`}
							icon={
								<CryptoIcon name={process.env.NEXT_PUBLIC_NATIVE_TOKEN as CryptoIconNames} size="sm" />
							}
							value={convertBalanceToView(addressData.totalBalance)}
							fixNumber={5}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AccountAssets
