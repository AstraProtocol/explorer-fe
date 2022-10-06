import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useTokens(page: number) {
	const [tokens, setState] = useState<Token[]>()

	const _fetchCondition = () => {
		return [
			API_LIST.ALL_TOKENS,
			{
				page,
				offset: 20
			}
		]
	}
	const { data } = useSWR<TokenResponse>(_fetchCondition())

	useEffect(() => {
		if (data?.result) {
			setState(data?.result)
		}
	}, [data])
	return {
		tokens
	}
}
