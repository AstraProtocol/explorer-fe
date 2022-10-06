import API_LIST from 'api/api_list'
import { formatEther } from 'ethers/lib/utils'
import { useCallback } from 'react'
import useSWR from 'swr'
import { upperCaseFirstLetterOfWord } from 'utils/helper'
import { TransactionRowProps } from '../TransactionRow'

export default function useInternalTransactions({ hash }: { hash: string }) {
	const _fetchCondition = () => {
		return !!hash ? [`${API_LIST.EVM_INTERNAL_TRANSACTION}${hash}`] : null
	}
	const { data } = useSWR<InternalTransactionReponse>(_fetchCondition(), {
		refreshInterval: 0
	})

	const _convertData = useCallback((): TransactionRowProps[] => {
		const items: TransactionRowProps[] = []
		if (data && data?.result.length > 0) {
			const internalItems = data.result
			for (let internalItem of internalItems) {
				items.push({
					blockNumber: Number(internalItem?.blockNumber),
					updatedAt: Number(internalItem?.timeStamp) * 1000,
					value: Number(formatEther(internalItem?.value)),
					valueToken: 'asa',
					hash: internalItem?.transactionHash,
					type: upperCaseFirstLetterOfWord(internalItem?.callType),
					status: internalItem?.errCode === '',
					from: internalItem?.from,
					to: internalItem?.to
				})
			}
		}
		return items
	}, [data])
	return {
		rows: _convertData()
	}
}