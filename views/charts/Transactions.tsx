import { Col } from '@astraprotocol/astra-ui'
import API_LIST from 'api/api_list'
import useSWR from 'swr'
import ChartHeader from './components/Header'
import LineChart from './components/LineChart'

function convertToDataSet(history: TransactionHistoryItem[]): [string[], number[]] {
	const data = history.map(({ date, numberOfTransactions }) => numberOfTransactions)
	const labels = history.map(({ date }) => date)
	return [labels, data]
}

export default function Transactions() {
	const { data: res } = useSWR<TransactionHistoryResponse>(
		API_LIST.GET_TRANSACTION_HISTORY.replace('#YEAR', new Date().getFullYear().toString())
	)
	const history = res?.result?.transactionsHistory || []
	const [labels, data] = convertToDataSet(history)
	return (
		<Col>
			<ChartHeader text="Transactions" />
			<LineChart
				leftTitle="Transactions | Daily"
				label="Transactions"
				rightTitle={{ title: 'Daily Average', value: res?.result?.dailyAverage }}
				data={data}
				labels={labels}
			/>
		</Col>
	)
}
