import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useAddressTransactions(address: string, page: number) {
	const [hookData, setState] = useState<UseAddressTransactionData>()

	const _fetchCondition = () => {
		return [
			`${API_LIST.ADDRESS_TRANSACTION}/${address}`,
			{
				pagination: 'offset',
				order: 'height.desc',
				page,
				limit: 20
			}
		]
	}
	const { data } = useSWR<>(_fetchCondition())

	useEffect(() => {
		if (data) {
			setState(data)
		}
	}, [data])
	return {
		data: hookData.result,
		pagination: hookData.pagination
	}
}
