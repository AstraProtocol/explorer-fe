import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useContractCode(address: string) {
	const [hookData, setState] = useState<ContractCodeData>(undefined)

	const _fetchCondition = () => {
		return [
			API_LIST.CONTRACT_CODE,
			{
				address
			}
		]
	}
	const { data } = useSWR<ContractCodeResponse>(_fetchCondition())

	useEffect(() => {
		if (data?.result) {
			setState(data.result?.[0])
		}
	}, [data])
	return hookData
}
