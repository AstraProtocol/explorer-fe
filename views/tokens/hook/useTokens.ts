import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { getEnvNumber } from 'utils/helper'

export default function useTokens(page: number): UseTokenHookData {
	const [hookData, setState] = useState<any>({ tokens: [], hasNextPage: false })

	const _fetchCondition = () => {
		return [
			API_LIST.ALL_TOKENS,
			{
				page,
				offset: getEnvNumber('NEXT_PUBLIC_PAGE_OFFSET')
			}
		]
	}
	const { data, isValidating } = useSWR<TokenResponse>(_fetchCondition())

	useEffect(() => {
		if (data?.result?.result) {
			setState({ tokens: data.result.result, hasNextPage: data.result.hasNextPage })
		}
	}, [data])
	return {
		isValidating,
		tokens: hookData.tokens,
		hasNextPage: hookData.hasNextPage
	}
}
