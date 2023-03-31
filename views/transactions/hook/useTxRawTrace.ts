import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWRImmutable from 'swr/immutable'

export default function useTxRawTrace(txhash: string, type: 'evm' | 'cosmos') {
	const [hookData, setState] = useState<any>({ result: '' })

	const _fetchCondition = () => {
		if (type === 'cosmos') return ''

		return [`${API_LIST.TRANSACTION_RAW_TRACE}${txhash}`]
	}
	const { data } = useSWRImmutable<TransactionRawTraceResponse>(_fetchCondition(), {
		refreshInterval: 0
	})

	useEffect(() => {
		if (data?.result) {
			setState({ result: data.result.rawTrace })
		}
	}, [data])
	return hookData.result
}
