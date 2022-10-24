import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { getEnvNumber } from 'utils/helper'

export default function useAccounts(page: number) {
	const [hookData, setState] = useState<UseAstraHolderData>()

	const _fetchCondition = () => {
		return [
			API_LIST.ALL_HOLDERS,
			{
				page,
				offset: getEnvNumber('NEXT_PUBLIC_PAGE_OFFSET')
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
