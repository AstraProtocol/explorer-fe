import { ethToAstra } from '@astradefi/address-converter'
import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useAccountDelegation(address: string): Delegation[] {
	const [delegations, setData] = useState<Delegation[]>([])

	const _fetchCondition = () => {
		return [`${API_LIST.ACCOUNT_DELEGATION}/${ethToAstra(address)}`]
	}
	const { data, mutate, isValidating } = useSWR<AccountDelegationResponse>(_fetchCondition())

	useEffect(() => {
		if (data?.delegation_responses) {
			setData(data?.delegation_responses)
		}
	}, [data])
	return delegations
}
