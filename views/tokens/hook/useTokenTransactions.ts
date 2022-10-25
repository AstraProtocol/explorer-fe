import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { getEnvNumber } from 'utils/helper'

export default function useTokenTransactions(token: string, params: string | undefined): UseTokenTransactionHookData {
	const [hookData, setState] = useState({
		result: [],
		hasNextPage: false,
		nextPagePath: undefined
	})

	const _fetchCondition = () => {
		if (params) {
			return [
				`${API_LIST.TOKEN_TRANSACTIONS}${params}`,
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
				offset: getEnvNumber('NEXT_PUBLIC_PAGE_OFFSET')
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
		result: hookData.result,
		hasNextPage: hookData.hasNextPage,
		nextPagePath: hookData.nextPagePath
	}
}
