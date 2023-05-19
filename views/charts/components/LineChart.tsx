import { Col, Row, useMobileLayout } from '@astraprotocol/astra-ui'
import {
	CategoryScale,
	Chart,
	ChartData,
	ChartOptions,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
	TimeScale,
	Title,
	Tooltip
} from 'chart.js'
import 'chartjs-adapter-dayjs'
import { useRouter } from 'next/router'
import numeral from 'numeral'
import { Line } from 'react-chartjs-2'

Chart.defaults.font.family =
	'Nunito, "Helvetica Neue", Arial, sans-serif,"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
Chart.register(LineController, CategoryScale, LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip)

const grid = {
	display: false,
	drawBorder: false,
	drawOnChartArea: false
}

type LineChartProps = {
	leftTitle: string
	data: number[]
	label: string
	labels: string[]
	unitName?: string
	rightTitle: {
		title: string
		value: string
	}
	stepSize?: (history: History) => number
}

const LineChart = ({ leftTitle, rightTitle, labels, label, data, unitName, stepSize }: LineChartProps) => {
	const { isMobile } = useMobileLayout('small')
	const router = useRouter()
	const { locale } = router

	const cfg: ChartData<'line'> = {
		labels: labels,
		datasets: [
			{
				label: label,
				yAxisID: 'y',
				data: data,
				borderColor: '#5E5CE6',
				backgroundColor: '#5E5CE6',
				fill: false,
				cubicInterpolationMode: 'monotone',
				pointRadius: 0
			}
		]
	}

	const options: ChartOptions<'line'> = {
		responsive: true,
		showLine: true,
		interaction: {
			mode: 'index' as const,
			intersect: false
		},
		locale: locale === 'vi' ? 'vi-VN' : 'en-US',
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
					weight: '600',
					lineHeight: 1.6
				},
				padding: {
					top: 8,
					bottom: 8,
					left: 16,
					right: 16
				},
				titleColor: 'rgba(0, 0, 0, 0.7)',
				bodyColor: '#0B0F1E',
				bodyFont: {
					family: 'Titillium Web',
					size: 15,
					weight: '600',
					lineHeight: 2.2
				},

				callbacks: {
					label: context => {
						const { label } = context.dataset
						const { formattedValue } = context
						if (context.dataset.yAxisID === 'y') {
							return `${label}: ${formattedValue}${unitName ? ' ' + unitName : ''}`
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
				time: {
					unit: 'day',
					tooltipFormat: 'MMM DD, YYYY',
					stepSize: stepSize ? stepSize(history) : history.length > 30 ? 10 : 1
				}
			},
			y: {
				ticks: {
					callback: function (value) {
						return numeral(value).format('0,0[.]000a')
					}
				}
			}
		}
	}

	return (
		<Col className="contrast-bg-color-5 padding-sm">
			<Row className="flex-align-center margin-bottom-xl">
				<Col className="text text-lg">
					<span>{leftTitle}</span>
				</Col>
				<Col className="flex-align-end">
					<span className=" text text-sm contrast-color-70">{rightTitle.title}</span>
					<span className=" text text-xl">{rightTitle.value} </span>
				</Col>
			</Row>
			<Line height={isMobile ? 190 : 100} options={options} data={cfg} />
		</Col>
	)
}

export default LineChart
