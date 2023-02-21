import { useMobileLayout } from '@astraprotocol/astra-ui'
import API_LIST from 'api/api_list'
import {
	CategoryScale,
	Chart,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
	TimeScale,
	Title,
	Tooltip
} from 'chart.js'
import 'chartjs-adapter-dayjs'
import Spinner from 'components/Spinner'
import dayjs from 'dayjs'
import humps from 'humps'
import { useRouter } from 'next/router'
import numeral from 'numeral'
import { Line } from 'react-chartjs-2'
import useSWR from 'swr'
import { formatCurrencyValue } from 'utils/helper'
import styles from './style.module.scss'

Chart.defaults.font.family =
	'Nunito, "Helvetica Neue", Arial, sans-serif,"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
Chart.register(LineController, CategoryScale, LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip)

const grid = {
	display: false,
	drawBorder: false,
	drawOnChartArea: false
}

function getDataFromLocalStorage(key) {
	const data = window.localStorage.getItem(key)
	return data ? JSON.parse(data) : []
}

function setDataToLocalStorage(key, data) {
	window.localStorage.setItem(key, JSON.stringify(data))
}

function getPriceData(marketHistoryData) {
	if (marketHistoryData.length === 0) {
		return getDataFromLocalStorage('priceData')
	}
	const data = marketHistoryData.map(({ date, closingPrice }) => ({
		x: date,
		y: closingPrice
	}))

	// Because of data return not include today. Add this.
	const prevDay = dayjs(data[0].x)
	let curDay = prevDay.add(1, 'd')
	data.unshift({ x: curDay, y: null })

	setDataToLocalStorage('priceData', data)
	return data
}

function getTxHistoryData(transactionHistory) {
	if (transactionHistory.length === 0) {
		return getDataFromLocalStorage('txHistoryData')
	}
	if (transactionHistory.length == 0) return []

	const data = transactionHistory.map((dataPoint: TransactionHistoryCounter) => ({
		x: dataPoint.date,
		y: dataPoint.numberOfTransactions
	}))

	// it should be empty value for tx history the current day
	// const prevDay = dayjs(data[0].x)
	// let curDay = prevDay.add(1, 'd')
	// // console.log(data)
	// data.unshift({ x: curDay, y: null })

	setDataToLocalStorage('txHistoryData', data)
	return data
}

const OverviewChart = ({}) => {
	const router = useRouter()
	const { locale } = router
	const { isMobile } = useMobileLayout('small')

	const _fetchCondition = key => {
		switch (key) {
			case 'market_history_price':
				return [API_LIST.MARKET_HISTORY_PRICE]
			case 'transaction_history_counter':
				return [API_LIST.TRANSACTION_HISTORY_COUNTER]
		}
	}
	const { data: historyPriceRaw, error: historyPriceError } = useSWR<MarketHistoryPriceResponse>(
		_fetchCondition('market_history_price')
	)
	const { data: historyCounterTransactionRaw, error: historyCounterTransactionError } =
		useSWR<TransactionHistoryCounterResponse>(_fetchCondition('transaction_history_counter'), {
			refreshInterval: parseInt(process.env.NEXT_PUBLIC_CHART_INTERVAL)
		})

	// const availableSupply = JSON.parse(historyPriceRaw.supply_data)
	const marketHistoryData = historyPriceRaw ? humps.camelizeKeys(JSON.parse(historyPriceRaw.result.history_data)) : []
	const historyCounterTransaction = historyCounterTransactionRaw ? historyCounterTransactionRaw.result : []

	const data: any = {
		datasets: [
			{
				label: 'Price',
				yAxisID: 'price',
				data: getPriceData(marketHistoryData),
				borderColor: '#5E5CE6',
				backgroundColor: '#5E5CE6',
				fill: false,
				cubicInterpolationMode: 'monotone',
				pointRadius: 0
			},
			{
				yAxisID: 'numTransactions',
				data: getTxHistoryData(historyCounterTransaction),
				backgroundColor: '#ffc107',
				borderColor: '#ffc107',
				cubicInterpolationMode: 'monotone',
				fill: false,
				pointRadius: 0,
				label: 'Tx/day'
			}
		]
	}

	const options: any = {
		type: 'line',
		responsive: true,
		showLine: true,
		interaction: {
			mode: 'index' as const,
			intersect: false
		},
		locale: locale === 'vi' ? 'vi-VN' : 'en-US',
		stacked: false,
		plugins: {
			title: {
				display: false
			},
			tooltip: {
				mode: 'index',
				intersect: false,
				backgroundColor: 'white',
				cornerRadius: 8,
				titleFont: {
					family: 'Manrope',
					size: 12,
					weight: 400,
					lineHeight: 1.6
				},
				padding: {
					top: 8,
					bottom: 8,
					left: 16,
					right: 16
				},
				titleColor: 'rgba(0, 0, 0, 0.5)',
				bodyColor: '#0B0F1E',
				bodyFont: {
					family: 'Titillium Web',
					size: 15,
					weight: 600,
					lineHeight: 2.2
				},

				callbacks: {
					label: context => {
						const { label } = context.dataset
						const { formattedValue, parsed } = context
						if (context.dataset.yAxisID === 'price') {
							return `${label}: ${formatCurrencyValue(parsed.y)}`
						} else if (context.dataset.yAxisID === 'marketCap') {
							return `${label}: ${formatCurrencyValue(parsed.y)}`
						} else if (context.dataset.yAxisID === 'numTransactions') {
							return `${label}: ${numeral(parsed.y).format('0,0')}`
						}
						return formattedValue
					}
				}
			}
		},
		scales: {
			x: {
				grid,
				type: 'time',
				color: 'red',
				time: {
					unit: 'day',
					tooltipFormat: 'MMM DD, YYYY',
					stepSize: 5
				}
			},
			price: {
				type: 'linear' as const,
				display: true,
				position: 'left' as const,
				grid,
				ticks: {
					beginAtZero: true,
					drawOnChartArea: false
				}
			},
			numTransactions: {
				type: 'linear' as const,
				display: true,
				position: 'right' as const,
				grid,
				ticks: {
					beginAtZero: true,
					maxTicksLimit: 5,
					format: {
						// currency: 'en'
						// localeMatcher: 'en'
						useGrouping: true
					}
				}
			},
			marketCap: {
				position: 'right',
				grid,
				ticks: {
					callback: (_value, _index, _values) => '',
					maxTicksLimit: 6,
					drawOnChartArea: false
				}
			}
		}
	}

	if (!historyCounterTransactionRaw) {
		return (
			<>
				<div className={styles.blurBlock}>
					<Line className={styles.chart} height={100} options={options} data={data} />
				</div>
				<div className={styles.spinner}>
					<Spinner />
				</div>
			</>
		)
	}

	return <Line className={styles.chart} height={isMobile ? 190 : 100} options={options} data={data} />
}

export default OverviewChart
