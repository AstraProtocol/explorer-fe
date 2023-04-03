import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export enum Status {
	Waiting,
	Validated,
	Failed
}

const useContractVerifyStatus = (guid: string): [Status, string | undefined] => {
	const [status, setValidate] = useState(Status.Waiting)
	const [errorMessage, setErrorMessage] = useState(undefined)
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
		refreshInterval: 2000
	})

	useEffect(() => {
		if (data && data?.result) {
			if (data?.result.includes('Pass')) setValidate(Status.Validated)
			else if (data?.result.includes('Fail')) {
				setValidate(Status.Failed)
				setErrorMessage(data?.result)
			}
		}
	}, [data])

	useEffect(() => {
		if (!guid) {
			setValidate(Status.Waiting)
			setErrorMessage(undefined)
		}
	}, [guid])

	return [status, errorMessage]
}

export default useContractVerifyStatus
