import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { getEnvNumber } from 'utils/helper'

export default function useAddressTokenTransfers(
	address: string,
	params: string | undefined
): UseAddressTokenTransferData {
	const [hookData, setState] = useState({
		result: [],
		hasNextPage: false,
		nextPagePath: undefined
	})

	const _fetchCondition = () => {
		if (params) {
			return [
				`${API_LIST.ADDRESS_TOKEN_TRANSFER}${params}`,
				{
					address
				}
			]
		}

		return [
			API_LIST.ADDRESS_TOKEN_TRANSFER,
			{
				address,
				page: 1,
				offset: getEnvNumber('NEXT_PUBLIC_PAGE_OFFSET')
			}
		]
	}
	const { data } = useSWR<AddressTokenTransferResponse>(_fetchCondition())

	useEffect(() => {
		if (data?.result) {
			setState(data)
		}
	}, [data])

	return {
		result: hookData.result,
		hasNextPage: hookData.hasNextPage,
		nextPagePath: hookData.nextPagePath
	}
}
