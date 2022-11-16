import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useTokenInventory(token: string, page: number) {
	const [hookData, setState] = useState<any>()

	const _fetchCondition = () => {
		return [
			API_LIST.TOKEN_INVENTORY,
			{
				contractaddress: token
			}
		]
	}
	const { data } = useSWR<TokenInventoryResponse>(_fetchCondition())

	useEffect(() => {
		if (data?.result) {
			setState({ result: data.result, hasNextPage: data.hasNextPage })
		}
	}, [data])
	return {
		tokens: hookData?.result,
		hasNextPage: hookData?.hasNextPage
	}
}