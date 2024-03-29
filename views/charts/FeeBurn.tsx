import { Col, Row } from '@astraprotocol/astra-ui'
import API_LIST from 'api/api_list'
import { ethers } from 'ethers'
import useSWR from 'swr'
import { convertBalanceToView, convertBigNumberToString } from 'utils/helper'
import ChartHeader from './components/Header'
import LineChart from './components/LineChart'

function convertFeeToDataSet(history: FeeItem[], convertDecimal?: boolean): [string[], number[]] {
	const data = history.map(({ totalTransactionFees }) =>
		parseFloat(ethers.utils.formatEther(`${convertBigNumberToString((totalTransactionFees || 0) / 2)}`))
	)

	const labels = history.map(({ date, year, month }) => (date ? date : `${year}-${month}-01`))
	return [labels, data]
}

export default function FeeBurn() {
	const { data: feeDailyRes } = useSWR<FeeResponse>(API_LIST.GET_FEE_DAILY)
	const feeDaily = feeDailyRes?.result?.totalFeesHistory || []
	const [feeDailyLabels, feeDailyData] = convertFeeToDataSet(feeDaily)

	return (
		<Col>
			<ChartHeader text="Fees Burned" />
			<Row className="md-flex-column">
				<LineChart
					leftTitle="Total Fees Burned | Daily"
					rightTitle={{
						title: 'Daily Average',
						value: convertBalanceToView((feeDailyRes?.result?.dailyAverage || 0) / 2)
					}}
					data={feeDailyData}
					labels={feeDailyLabels}
					label="Fee Burned"
					unitName="ASA"
					stepSize={() => 5}
				/>
			</Row>
		</Col>
	)
}
