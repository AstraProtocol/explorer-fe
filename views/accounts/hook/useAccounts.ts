import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { getEnvNumber } from 'utils/helper'

export default function useAccounts(params: string | undefined): UseAstraHolderData {
	const [hookData, setState] = useState({
		result: [],
		hasNextPage: false,
		nextPagePath: undefined
	})

	const _fetchCondition = () => {
		if (params) {
			return [`${API_LIST.ALL_HOLDERS}${params}`]
		}

		return [
			API_LIST.ALL_HOLDERS,
			{
				page: 1,
				offset: getEnvNumber('NEXT_PUBLIC_PAGE_OFFSET')
			}
		]
	}
	const { data, isValidating } = useSWR<TopAstraHolderResponse>(_fetchCondition())

	useEffect(() => {
		if (data?.result) {
			setState(data)
		}
	}, [data])
	return {
		isValidating,
		result: hookData.result,
		hasNextPage: hookData.hasNextPage,
		nextPagePath: hookData.nextPagePath
	}
}
