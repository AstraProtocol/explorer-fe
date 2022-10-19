import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useTokenTransactions(token): UseTokenTransactionHookData {
	const [hookData, setState] = useState({
		result: [],
		hasNextPage: false,
		nextPagePath: undefined
	})

	const [currentParams, setParams] = useState(undefined)
	const prevParams = []

	const _fetchCondition = () => {
		if (currentParams) {
			return [
				`${API_LIST.TOKEN_TRANSACTIONS}${currentParams}`,
				{
					contractaddress: token
				}
			]
		}

		return [
			API_LIST.TOKEN_TRANSACTIONS,
			{
				contractaddress: token,
				page: 1,
				offset: 10
			}
		]
	}
	const { data } = useSWR<TokenTransactionResponse>(_fetchCondition())

	useEffect(() => {
		if (data?.result) {
			setState(data)
		}
	}, [data])

	return {
		data: {
			result: hookData.result,
			hasNextPage: hookData.hasNextPage
		},
		makeNextPage: () => {
			if (currentParams) prevParams.push(currentParams)
			setParams(hookData.nextPagePath)
		},
		makePrevPage: () => {
			const prevParam = prevParams.pop()
			setParams(prevParam)
		}
	}
}
