import { Col, Row } from '@astraprotocol/astra-ui'
import API_LIST from 'api/api_list'
import { ethers } from 'ethers'
import useSWR from 'swr'
import { convertBalanceToView, convertBigNumberToString } from 'utils/helper'
import BarChart from './components/BarChart'
import ChartHeader from './components/Header'
import LineChart from './components/LineChart'

function convertFeeToDataSet(history: FeeItem[], convertDecimal?: boolean): [string[], number[]] {
	const data = history.map(({ totalTransactionFees }) =>
		parseFloat(ethers.utils.formatEther(`${convertBigNumberToString(totalTransactionFees)}`))
	)

	const labels = history.map(({ date, year, month }) => (date ? date : `${year}-${month}-01`))
	return [labels, data]
}

export default function Fee() {
	const { data: feeDailyRes } = useSWR<FeeResponse>(API_LIST.GET_FEE_DAILY)
	const { data: feeMonthRes } = useSWR<FeeResponse>(API_LIST.GET_FEE_MONTHLY)

	const feeDaily = feeDailyRes?.result?.totalFeesHistory || []
	const [feeDailyLabels, feeDailyData] = convertFeeToDataSet(feeDaily)

	const feeMonthly = feeMonthRes?.result?.totalFeesHistory || []
	const [feeMonthlyLabels, feeMonthData] = convertFeeToDataSet(feeMonthly, true)

	return (
		<Col>
			<ChartHeader text="Transaction fees" />
			<Row className="md-flex-column">
				<LineChart
					leftTitle="Total Transaction Fees | Daily"
					rightTitle={{
						title: 'Daily Average',
						value: convertBalanceToView(feeDailyRes?.result?.dailyAverage)
					}}
					data={feeDailyData}
					labels={feeDailyLabels}
					label="Fee"
					unitName="ASA"
				/>
				<div style={{ width: '10px', height: '10px' }}></div>
				<BarChart
					leftTitle="Total Transaction Fees | Monthly"
					rightTitle={{
						title: 'Monthly Average',
						value: convertBalanceToView(feeMonthRes?.result?.monthlyAverage)
					}}
					data={feeMonthData}
					labels={feeMonthlyLabels}
					label="Fee"
					unitName="ASA"
				/>
			</Row>
		</Col>
	)
}
