import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useAddressToken(address: string, page: number): UseAddressTokenData {
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
				`${API_LIST.ADDRESS_TOKEN}${currentParams}`,
				{
					address
				}
			]
		}

		return [
			API_LIST.ADDRESS_TOKEN,
			{
				address,
				page: 1,
				offset: 10
			}
		]
	}

	const { data } = useSWR<AddressTokenResponse>(_fetchCondition())

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
