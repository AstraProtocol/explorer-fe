import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useTxRawTrace(txhash: string, type: 'evm' | 'cosmos') {
	const [hookData, setState] = useState<any>({ result: '' })

	const _fetchCondition = () => {
		if (type === 'cosmos') return ''

		return [
			`${API_LIST.TRANSACTION_RAW_TRACE}`,
			{
				txhash
			}
		]
	}
	const { data } = useSWR<TransactionRawTraceResponse>(_fetchCondition())

	useEffect(() => {
		if (data) {
			setState({ result: data.result.rawTrace })
		}
	}, [data])
	return hookData.result
}
