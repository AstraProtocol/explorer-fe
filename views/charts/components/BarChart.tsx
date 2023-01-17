import { Col, Row, useMobileLayout } from '@astraprotocol/astra-ui'
import {
	BarController,
	BarElement,
	CategoryScale,
	Chart,
	ChartData,
	ChartOptions,
	LinearScale,
	PointElement,
	TimeScale,
	Title,
	Tooltip
} from 'chart.js'
import 'chartjs-adapter-dayjs'
import { useRouter } from 'next/router'
import numeral from 'numeral'
import { Bar } from 'react-chartjs-2'

Chart.defaults.font.family =
	'Nunito, "Helvetica Neue", Arial, sans-serif,"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
Chart.register(BarController, CategoryScale, BarElement, PointElement, LinearScale, TimeScale, Title, Tooltip)

const grid = {
	display: false,
	drawBorder: false,
	drawOnChartArea: false
}

type LineChartProps = {
	leftTitle: string
	data: number[]
	labels: string[]
	label: string
	unitName?: string
	rightTitle: {
		title: string
		value: number
	}
}

const BarChart = ({ leftTitle, rightTitle, label, data, labels, unitName }: LineChartProps) => {
	const { isMobile } = useMobileLayout('small')
	const router = useRouter()
	const { locale } = router

	const cfg: ChartData<'bar'> = {
		labels,
		datasets: [
			{
				label: label,
				yAxisID: 'y',
				data: data,
				borderColor: '#5E5CE6',
				backgroundColor: '#5E5CE6'
			}
		]
	}

	const options: ChartOptions<'bar'> = {
		responsive: true,
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
					weight: '400',
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
					weight: '600',
					lineHeight: 2.2
				},

				callbacks: {
					label: context => {
						const { label } = context.dataset
						const { formattedValue, parsed } = context
						if (context.dataset.yAxisID === 'y') {
							return `${label}: ${numeral(parsed.y).format('0,0.000a')}${unitName ? ' ' + unitName : ''}`
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
					unit: 'month',
					tooltipFormat: 'MMM DD, YYYY'
				}
			},
			y: {
				ticks: {
					callback: label => numeral(label).format('0,0[.]000a')
				}
			}
		}
	}

	return (
		<Col className="contrast-bg-color-5 padding-sm">
			<Row className="flex-align-center margin-bottom-xl">
				<Col className="text text-lg" style={{ flex: 2 }}>
					<span>{leftTitle}</span>
				</Col>
				<Col className="flex-align-end" style={{ flex: 1 }}>
					<span className=" text text-sm contrast-color-70">{rightTitle.title}</span>
					<span className=" text text-xl">{numeral(rightTitle.value).format('0,0[.]000')} </span>
				</Col>
			</Row>
			<Bar height={isMobile ? 190 : 100} options={options} data={cfg} />
		</Col>
	)
}

export default BarChart
