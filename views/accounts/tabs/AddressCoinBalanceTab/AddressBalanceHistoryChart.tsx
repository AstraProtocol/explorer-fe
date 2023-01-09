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
import { useRouter } from 'next/router'
import { Line } from 'react-chartjs-2'
import { formatCurrencyValue } from 'utils/helper'
import useAddressCoinBalanceHistoryChart from 'views/accounts/hook/useAddressCoinBalanceHistoryChart'
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

function getBalanceData(address: string, marketHistoryData: AddressCoinBalanceHistoryChartData[]) {
	const key = `${address}_history_balance`
	if (marketHistoryData.length === 0) {
		return getDataFromLocalStorage(key)
	}
	const data = marketHistoryData.map(({ date, value }) => ({
		x: date,
		y: value
	}))

	setDataToLocalStorage(key, data)
	return data
}

interface Props {
	address: string
}

const AddressBalanceHistoryChart = ({ address }: Props) => {
	const router = useRouter()
	const { locale } = router
	const addressBalanceHistoryData = useAddressCoinBalanceHistoryChart(address)

	const data: any = {
		datasets: [
			{
				label: 'Balance',
				yAxisID: 'balance',
				data: getBalanceData(address, addressBalanceHistoryData),
				borderColor: '#5E5CE6',
				backgroundColor: '#5E5CE6',
				fill: false,
				cubicInterpolationMode: 'monotone',
				pointRadius: 0
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
						if (context.dataset.yAxisID === 'balance') {
							return `${label}: ${formatCurrencyValue(parsed.y, 'ASA')}`
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
			balance: {
				type: 'linear' as const,
				display: true,
				position: 'left' as const,
				grid,
				ticks: {
					beginAtZero: true,
					drawOnChartArea: false
				}
			}
		}
	}

	if (!addressBalanceHistoryData) {
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

	return <Line className={styles.chart} height={100} options={options} data={data} />
}

export default AddressBalanceHistoryChart
