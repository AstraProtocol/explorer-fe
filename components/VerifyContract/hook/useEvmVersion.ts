import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWRImmutable from 'swr/immutable'

const useEvmVersion = (): string[] => {
	const [evmVersions, setEvmVersions] = useState([])
	const _fetchCondition = () => {
		return [API_LIST.GET_EVM_VERSION]
	}
	const { data } = useSWRImmutable<any>(_fetchCondition())

	useEffect(() => {
		if (data && data?.result) {
			setEvmVersions(data?.result?.versions)
		}
	}, [data])
	return evmVersions || []
}

export default useEvmVersion
