import { ethToAstra } from '@astradefi/address-converter'
import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useAddressTransactions(address: string, page: number) {
	const [hookData, setState] = useState<UseAddressTransactionData>({
		result: [],
		pagination: { total_record: 0, total_page: 0, current_page: 0, limit: 0 }
	})

	const _fetchCondition = () => {
		return [
			`${API_LIST.ADDRESS_TRANSACTION}/${ethToAstra(address)}/transactions`,
			{
				pagination: 'offset',
				order: 'height.desc',
				page,
				limit: 20
			}
		]
	}
	const { data } = useSWR<AddressTransactionResponse>(_fetchCondition())

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
