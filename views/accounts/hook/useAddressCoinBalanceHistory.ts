import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useAddressCoinBalanceHistory(address: string, page: number) {
	const [hookData, setState] = useState<UseAddressCoinBalanceHistoryData>({ result: [], hasNextPage: false })

	const _fetchCondition = () => {
		return [
			API_LIST.ADDRESS_COIN_BALANCE_HISTORY,
			{
				address,
				page,
				offset: 20
			}
		]
	}
	const { data } = useSWR<AddressCoinBalanceHistoryResponse>(_fetchCondition())

	useEffect(() => {
		if (data?.result) {
			setState({
				result: data.result,
				hasNextPage: data.hasNextPage
			})
		}
	}, [data])
	return {
		result: hookData.result,
		hasNextPage: hookData.hasNextPage
	}
}
