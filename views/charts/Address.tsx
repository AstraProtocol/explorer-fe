import { Col, Row } from '@astraprotocol/astra-ui'
import API_LIST from 'api/api_list'
import useSWR from 'swr'
import AreaChart from './components/AreaChart'
import ChartHeader from './components/Header'
import LineChart from './components/LineChart'

function convertActiveAddressToDataSet(history: ActiveAddressItem[]): [string[], number[]] {
	const data = history.map(({ numberOfActiveAddresses }) => numberOfActiveAddresses)
	const labels = history.map(({ date }) => date)
	return [labels, data]
}

function convertAddressGrowthToDataSet(history: AddressGrowthItem[]): [string[], number[], number[]] {
	const notActiveAddressData = history.map(({ notActive }) => notActive)
	const activeAddressData = history.map(({ active }) => active)
	const labels = history.map(({ date }) => date)
	return [labels, notActiveAddressData, activeAddressData]
}

export default function Address() {
	const { data: activeAddressRes } = useSWR<ActiveAddressResponse>(
		API_LIST.GET_ACTIVE_ADDRESS.replace('#YEAR', new Date().getFullYear().toString())
	)
	const { data: addressGrowthRes } = useSWR<AddressGrowthResponse>(
		API_LIST.GET_ADDRESS_GROWTH.replace('#YEAR', new Date().getFullYear().toString())
	)

	const activeAddress = activeAddressRes?.result?.activeAddressesHistory || []
	const [activeAddressLabels, activeAddressdata] = convertActiveAddressToDataSet(activeAddress)

	const addressGrowth = addressGrowthRes?.result?.totalAddressesGrowth || []
	const [labels, notActiveAddressData, activeAddressData] = convertAddressGrowthToDataSet(addressGrowth)
	return (
		<Col>
			<ChartHeader text="Addresses" />
			<Row className="md-flex-column">
				<LineChart
					leftTitle="Active Addresses | Daily"
					rightTitle={{ title: 'Daily Average', value: activeAddressRes?.result?.dailyAverage }}
					data={activeAddressdata}
					labels={activeAddressLabels}
					label="Addresses"
				/>
				<div style={{ width: '10px', height: '10px' }}></div>
				<AreaChart
					leftTitle="Total Addresses Growth | Daily"
					rightTitle={{ title: 'Total Addresses', value: addressGrowthRes?.result?.totalAddresses }}
					line1Data={notActiveAddressData}
					line2Data={activeAddressData}
					labels={labels}
					line2Label={'Active'}
					line1Label={'Not Active'}
				/>
			</Row>
		</Col>
	)
}
