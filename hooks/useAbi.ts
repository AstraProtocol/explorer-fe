import API_LIST from 'api/api_list'
import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { isEvmAddress } from 'utils/evm'
import { AbiItem, isAddress } from 'web3-utils'

export default function useAbi(address: string) {
	const [abi, setAbi] = useState<AbiItem[]>()
	const _fetch = useCallback(() => {
		if (isAddress(address) && isEvmAddress(address)) {
			return [`${API_LIST.ABI}${address}`]
		}
		return null
	}, [address])
	const { data } = useSWR<AbiResponse>(_fetch())

	useEffect(() => {
		if (data.message === 'OK') {
			const abiRaw = data.result
			setAbi(JSON.parse(abiRaw))
		}
	}, [data])

	return {
		abi
	}
}
