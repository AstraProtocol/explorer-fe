import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useAddressCoinBalanceHistoryChart(address: string) {
	const [hookData, setState] = useState<UseAddressCoinBalanceHistoryChartData>({ result: [] })

	const _fetchCondition = () => {
		return [`${API_LIST.ADDRESS_COIN_BALANCE_HISTORY_CHART}/${address}/coin-balances/by-day?type=JSON`]
	}
	const { data } = useSWR<AddressCoinBalanceHistoryChartData[]>(_fetchCondition())

	useEffect(() => {
		if (data) {
			setState({ result: data })
		}
	}, [data])
	return hookData.result
}
