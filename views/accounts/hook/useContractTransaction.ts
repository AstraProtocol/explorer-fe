import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { getEnvNumber } from 'utils/helper'

export default function useContractTransaction(address: string, params: string): UseContractTransactionData {
	const [hookData, setState] = useState({
		result: [],
		hasNextPage: false,
		nextPagePath: undefined
	})

	const _fetchCondition = () => {
		if (params) {
			return [
				`${API_LIST.CONTRACT_TRANSACTION}${params}`,
				{
					address
				}
			]
		}

		return [
			API_LIST.CONTRACT_TRANSACTION,
			{
				address,
				page: 1,
				offset: getEnvNumber('NEXT_PUBLIC_PAGE_OFFSET')
			}
		]
	}
	const { data } = useSWR<ContractTransactionResponse>(_fetchCondition())

	useEffect(() => {
		if (data?.result) {
			setState({
				hasNextPage: data.hasNextPage,
				nextPagePath: data.nextPagePath,
				result: data.result.map(d => ({ ...d, timeStamp: parseInt(d.timeStamp) * 1000 }))
			})
		}
	}, [data])

	return {
		result: hookData.result,
		hasNextPage: hookData.hasNextPage,
		nextPagePath: hookData.nextPagePath
	}
}
