import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useAddressToken(address: string, page: number) {
	const [hookData, setState] = useState<UseAddressTokenData>()

	const _fetchCondition = () => {
		return [
			API_LIST.ADDRESS_TOKEN,
			{
				address,
				page
			}
		]
	}
	const { data } = useSWR<AddressTokenResponse>(_fetchCondition())

	useEffect(() => {
		if (data) {
			setState({ result: data.result, hasNextPage: data.hasNextPage })
		}
	}, [data])
	return {
		result: hookData?.result,
		hasNextPage: hookData?.hasNextPage
	}
}
