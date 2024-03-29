import { Col, Row } from '@astraprotocol/astra-ui'
import API_LIST from 'api/api_list'
import numeral from 'numeral'
import useSWR from 'swr'
import BarChart from './components/BarChart'
import ChartHeader from './components/Header'
import LineChart from './components/LineChart'

function convertGasToDataSet(history: GasItem[]): [string[], number[]] {
	const data = history.map(({ totalGasUsed }) => totalGasUsed)
	const labels = history.map(({ date, month, year }) => (date ? date : `${year}-${month}-01`))
	return [labels, data]
}

export default function Gas() {
	const { data: gasDailyRes } = useSWR<GasResponse>(API_LIST.GET_GAS_DAILY)
	const { data: gasMonthRes } = useSWR<GasResponse>(API_LIST.GET_GAS_MONTHLY)

	const gasDaily = gasDailyRes?.result?.totalGasUsedHistory || []
	const [gasDailyLabels, gasDailyData] = convertGasToDataSet(gasDaily)

	const gasMonthly = gasMonthRes?.result?.totalGasUsedHistory || []
	const [gasMonthlyLabels, gasMonthlyData] = convertGasToDataSet(gasMonthly)

	return (
		<Col>
			<ChartHeader text="Gas Usage" />
			<Row className="md-flex-column">
				<LineChart
					leftTitle="Average Gas Usage | Daily"
					rightTitle={{
						title: 'Daily Average',
						value: numeral(gasDailyRes?.result?.dailyAverage).format('0,0')
					}}
					data={gasDailyData}
					labels={gasDailyLabels}
					label="Gas"
					// unitName="AASTRA"
					stepSize={history =>
						history ? (history.length > 4 /*months*/ * 30 ? 30 : history.length > 15 ? 15 : 3) : 1
					}
				/>
				<div style={{ width: '10px', height: '10px' }}></div>
				<BarChart
					leftTitle="Average Gas Usage | Monthly"
					rightTitle={{
						title: 'Monthly Average',
						value: numeral(gasMonthRes?.result?.monthlyAverage).format('0,0')
					}}
					data={gasMonthlyData}
					labels={gasMonthlyLabels}
					// unitName="AASTRA"
					label="Gas"
				/>
			</Row>
		</Col>
	)
}
