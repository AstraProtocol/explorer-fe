import API_LIST from 'api/api_list'
import useDelayUntilDone from 'hooks/useDelayUntilDone'
import { isEmpty } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
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
				`${API_LIST.ADDRESS_TOKEN_TRANSFER}${address}${params}`,
				{
					blockscout: true
				}
			]
		}

		return [
			`${API_LIST.ADDRESS_TOKEN_TRANSFER}${address}`,
			{
				blockscout: true,
				page: 1,
				offset: getEnvNumber('NEXT_PUBLIC_PAGE_OFFSET')
			}
		]
	}
	const { data, error } = useSWR<AddressTokenTransferResponse>(_fetchCondition())

	const isLoadedData = useCallback(() => {
		return !isEmpty(data) || error
	}, [data])

	const { isWaiting } = useDelayUntilDone(isLoadedData)

	useEffect(() => {
		if (data?.result) {
			setState(data.result)
		}
	}, [data])

	return {
		result: hookData.result,
		hasNextPage: hookData.hasNextPage,
		nextPagePath: hookData.nextPagePath,
		loading: isWaiting
	}
}
