import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useTokenHolders(token: string, page: number) {
	const [hookData, setState] = useState<TokenHolderResponse>()

	const _fetchCondition = () => {
		return [
			API_LIST.TOKEN_HOLDERS,
			{
				contractaddress: token,
				page,
				offset: 20
			}
		]
	}
	const { data } = useSWR<any>(_fetchCondition())

	useEffect(() => {
		if (data?.result) {
			const tokens: any = data.result.map(d => ({ address: d.address, balance: d.value }))
			setState({ result: tokens, hasNextPage: data.hasNextPage })
		}
	}, [data])
	return {
		tokens: hookData?.result,
		hasNextPage: hookData?.hasNextPage
	}
}
