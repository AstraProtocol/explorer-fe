import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useAddressTokenTransfers(address: string, page: number) {
	const [hookData, setState] = useState<UseAddressTokenTransferData>()

	const _fetchCondition = () => {
		return [
			API_LIST.ADDRESS_TOKEN_TRANSFER,
			{
				address,
				page
			}
		]
	}
	const { data } = useSWR<AddressTokenTransferResponse>(_fetchCondition())

	useEffect(() => {
		if (data) {
			setState({ result: data.result, hasNextPage: false })
		}
	}, [data])
	return {
		result: hookData?.result,
		hasNextPage: hookData?.hasNextPage
	}
}
