import { Col, Row, useMobileLayout } from '@astraprotocol/astra-ui'
import {
	CategoryScale,
	Chart,
	ChartData,
	ChartOptions,
	Filler,
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
Chart.register(Filler, LineController, CategoryScale, LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip)

const grid = {
	display: false,
	drawBorder: false,
	drawOnChartArea: false
}

type LineChartProps = {
	leftTitle: string
	line1Data: number[]
	line2Data: number[]
	labels: string[]
	line1Label: string
	line2Label: string
	rightTitle: {
		title: string
		value: number
	}
}

const AreaChart = ({ leftTitle, rightTitle, labels, line1Data, line2Data, line1Label, line2Label }: LineChartProps) => {
	const { isMobile } = useMobileLayout('small')
	const router = useRouter()
	const { locale } = router

	const data: ChartData<'line'> = {
		labels,
		datasets: [
			{
				label: line1Label,
				data: line1Data,
				yAxisID: 'active',

				backgroundColor: 'rgb(255 193 7 / 20%)',
				fill: true,
				borderColor: '#ffc107',
				cubicInterpolationMode: 'monotone',
				pointRadius: 0
			},
			{
				label: line2Label,
				data: line2Data,
				backgroundColor: 'rgb(31 233 64 / 20%)',
				fill: true,
				borderColor: '#1fe940',
				cubicInterpolationMode: 'monotone',
				pointRadius: 0
			}
		]
	}

	const options: ChartOptions<'line'> = {
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
					weight: '700',
					lineHeight: 1.6
				},
				padding: {
					top: 8,
					bottom: 8,
					left: 16,
					right: 16
				},
				titleColor: 'rgba(0, 0, 0, 070)',
				footerColor: 'rgba(0, 0, 0, 70)',
				footerFont: {
					family: 'Manrope',
					size: 12,
					weight: '700',
					lineHeight: 1.6
				},
				bodyColor: '#0B0F1E',
				boxPadding: 10,
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
						// if (context.dataset.yAxisID === 'active') {
						// 	return `Active: ${1}`
						// }
						return `${label}: ${formattedValue}`
					},
					footer: context => {
						const total = context[1].parsed.y + context[0].parsed.y
						debugger
						return `Total: ${numeral(total).format('0,0[.]000')}`
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
					stepSize: history.length > 20 ? 5 : 1
				}
			},
			active: {
				type: 'linear' as const,
				display: true,
				position: 'left' as const,
				grid
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
			<Line height={isMobile ? 190 : 100} options={options} data={data} />
		</Col>
	)
}

export default AreaChart
