import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useAddressCoinBalanceHistoryChart(address: string) {
	const [hookData, setState] = useState<UseAddressCoinBalanceHistoryChartData>({ result: [] })

	const _fetchCondition = () => {
		return [`${API_LIST.ADDRESS_COIN_BALANCE_HISTORY_CHART}/${address}/coin-balances/by-day`]
	}
	const { data } = useSWR<AddressCoinBalanceHistoryChartResponse>(_fetchCondition())

	useEffect(() => {
		if (data) {
			setState({ result: data.result })
		}
	}, [data])
	return hookData.result
}
