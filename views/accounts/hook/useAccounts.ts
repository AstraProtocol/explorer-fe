import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useAccounts(page: number) {
	const [hookData, setState] = useState<UseAstraHolderData>()

	const _fetchCondition = () => {
		return [
			API_LIST.ALL_HOLDERS,
			{
				page,
				offset: 10
			}
		]
	}
	const { data } = useSWR<TopAstraHolderResponse>(_fetchCondition())

	useEffect(() => {
		if (data?.result) {
			setState(data)
		}
	}, [data])
	return {
		hasNextPage: hookData?.hasNextPage,
		accounts: hookData?.result
	}
}
