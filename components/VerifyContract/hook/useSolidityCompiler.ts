import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWRImmutable from 'swr/immutable'

const useSolidityCompiler = (): string[] => {
	const [evmVersions, setEvmVersions] = useState([])
	const _fetchCondition = () => {
		return [API_LIST.GET_SOLIDITY_COMPILER]
	}
	const { data } = useSWRImmutable<any>(_fetchCondition())

	useEffect(() => {
		if (data && data?.result) {
			setEvmVersions(data?.result?.versions)
		}
	}, [data])
	return evmVersions || []
}

export default useSolidityCompiler
