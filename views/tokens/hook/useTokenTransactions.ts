import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useTokenTransactions(page: number) {
	const [hookData, setState] = useState<UseTokenHookData>()

	const _fetchCondition = () => {
		return [
			API_LIST.TOKEN_TRANSACTIONS,
			{
				page,
				offset: 10
			}
		]
	}
	const { data } = useSWR<TokenResponse>(_fetchCondition())

	useEffect(() => {
		if (data?.result) {
			setState(data)
		}
	}, [data])
	return {
		tokens: hookData?.result,
		hasNextPage: hookData?.hasNextPage
	}
}
