import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { getEnvNumber } from 'utils/helper'

export default function useAccounts(): UseAstraHolderData {
	const [hookData, setState] = useState({
		result: [],
		hasNextPage: false,
		nextPagePath: undefined
	})

	const [currentParams, setParams] = useState(undefined)
	const prevParams = []

	const _fetchCondition = () => {
		if (currentParams) {
			return [`${API_LIST.ALL_HOLDERS}${currentParams}`]
		}

		return [
			API_LIST.ALL_HOLDERS,
			{
				page: 1,
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
