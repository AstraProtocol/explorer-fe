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
import dayjs from 'dayjs'
import humps from 'humps'
import numeral from 'numeral'
import { Line } from 'react-chartjs-2'
import useSWR from 'swr'
import { formatCurrencyValue } from 'utils/helper'
import styles from './style.module.scss'

Chart.defaults.font.family =
	'Nunito, "Helvetica Neue", Arial, sans-serif,"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
Chart.register(LineController, CategoryScale, LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip)

interface Props {}

const grid = {
	display: false,
	drawBorder: false,
	drawOnChartArea: false
}

function xAxe(fontColor) {
	return {
		grid: grid,
		type: 'time',
		time: {
			unit: 'day',
			tooltipFormat: 'YYYY-MM-DD',
			stepSize: 14
		},
		ticks: {
			color: fontColor
		}
	}
}

// const padding = {
// 	left: 20,
// 	right: 20
// }

// const legend = {
// 	display: false
// }

function formatValue(val) {
	return `${numeral(val).format('0,0')}`
}

function getDataFromLocalStorage(key) {
	const data = window.localStorage.getItem(key)
	return data ? JSON.parse(data) : []
}

function setDataToLocalStorage(key, data) {
	window.localStorage.setItem(key, JSON.stringify(data))
}

function getPriceData(marketHistoryData) {
	// if (marketHistoryData.length === 0) {
	//   return getDataFromLocalStorage('priceData')
	// }
	const data = marketHistoryData.map(({ date, closingPrice }) => ({
		x: date,
		y: closingPrice
	}))
	// setDataToLocalStorage('priceData', data)
	return data
}

function getTxHistoryData(transactionHistory) {
	// if (transactionHistory.length === 0) {
	//   return getDataFromLocalStorage('txHistoryData')
	// }
	if (transactionHistory.length == 0) return []

	const data = transactionHistory.map(dataPoint => ({
		x: dataPoint.date,
		y: dataPoint.number_of_transactions
	}))

	// it should be empty value for tx history the current day
	const prevDay = dayjs(data[0].x)
	let curDay = prevDay.add(1, 'd')
	data.unshift({ x: curDay, y: null })

	// setDataToLocalStorage('txHistoryData', data)
	return data
}

const OverviewChart = ({}) => {
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
		useSWR<TransactionHistoryCounterResponse>(_fetchCondition('transaction_history_counter'))

	// const availableSupply = JSON.parse(historyPriceRaw.supply_data)
	const marketHistoryData = historyPriceRaw ? humps.camelizeKeys(JSON.parse(historyPriceRaw.history_data)) : []
	const historyCounterTransaction = historyCounterTransactionRaw
		? JSON.parse(historyCounterTransactionRaw.history_data)
		: []

	const data = {
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

	const options = {
		responsive: true,
		interaction: {
			mode: 'index' as const,
			intersect: false
		},
		stacked: false,
		plugins: {
			title: {
				display: false
			},
			tooltip: {
				mode: 'index',
				intersect: false,
				callbacks: {
					label: context => {
						const { label } = context.dataset
						const { formattedValue, parsed } = context
						if (context.dataset.yAxisID === 'price') {
							return `${label}: ${formatCurrencyValue(parsed.y)}`
						} else if (context.dataset.yAxisID === 'marketCap') {
							return `${label}: ${formatCurrencyValue(parsed.y)}`
						} else if (context.dataset.yAxisID === 'numTransactions') {
							return `${label}: ${formattedValue}`
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
					maxTicksLimit: 4
				}
			},
			numTransactions: {
				type: 'linear' as const,
				display: true,
				position: 'right' as const,
				grid,
				ticks: {
					beginAtZero: true,
					maxTicksLimit: 5
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

	return (
		// <div className={styles.chart}>
		<Line className={styles.chart} height={100} options={options} data={data} />
		// </div>
	)
}

export default OverviewChart
