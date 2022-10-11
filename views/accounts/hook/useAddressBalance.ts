import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useAddressBalance(address: string) {
	const [hookData, setState] = useState<UseAddressBalanceData>({ balance: '', lastBalanceUpdate: 0 })

	const _fetchCondition = () => {
		return [
			API_LIST.ADDRESS_BALANCE,
			{
				address
			}
		]
	}
	const { data } = useSWR<AddressBalanceResponse>(_fetchCondition())

	useEffect(() => {
		if (data?.result) {
			setState(data.result)
		}
	}, [data])
	return {
		balance: hookData.balance,
		lastBalanceUpdate: hookData.lastBalanceUpdate
	}
}
