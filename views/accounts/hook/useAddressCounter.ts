import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useAddressCounter(address: string) {
	const [hookData, setState] = useState<AddressCounterData>({})

	const _fetchCondition = () => {
		return [
			API_LIST.ADDRESS_COUNTER,
			{
				address
			}
		]
	}
	const { data } = useSWR<AddressCounterResponse>(_fetchCondition())

	useEffect(() => {
		if (data && data.result) {
			setState(data.result)
		}
	}, [data])
	return hookData
}
