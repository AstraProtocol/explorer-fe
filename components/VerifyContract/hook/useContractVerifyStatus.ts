import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const useContractVerifyStatus = (guid: string): boolean => {
	const [validated, setValidate] = useState(false)
	const _fetchCondition = () => {
		if (!guid) return null
		return [
			API_LIST.CHECK_VERIFY_STATUS,
			{
				guid
			}
		]
	}
	const { data } = useSWR<VerifyStatusResponse>(_fetchCondition(), {
		refreshInterval: 2
	})

	useEffect(() => {
		if (data && data?.result) {
			if (data?.result.includes('Pass - Verified')) setValidate(true)
		}
	}, [data])
	return validated
}

export default useContractVerifyStatus
