import { CryptoIconNames } from '@astraprotocol/astra-ui/lib/es/components/CryptoIcon'
import API_LIST from 'api/api_list'
import { formatEther } from 'ethers/lib/utils'
import useDelayUntilDone from 'hooks/useDelayUntilDone'
import { useCallback } from 'react'
import useSWR from 'swr'
import { evmInternalTransactionType } from 'utils/evm'
import { upperCaseFirstLetterOfWord } from 'utils/helper'
import { TransactionRowProps } from '../TransactionRow'

export default function useInternalTransactions({ hash }: { hash: string }) {
	const _fetchCondition = () => {
		return !!hash ? [`${API_LIST.EVM_INTERNAL_TRANSACTION}${hash}`] : null
	}
	const { data, error } = useSWR<InternalTransactionReponse>(_fetchCondition(), {
		refreshInterval: 0
	})

	console.log({ data })

	const isLoadedData = useCallback(() => {
		return !!data || !!error || !hash
	}, [data, error, hash])

	const { isWaiting } = useDelayUntilDone(isLoadedData)

	const _convertData = useCallback((): TransactionRowProps[] => {
		if (!data) return []
		const items: TransactionRowProps[] = []
		if (data && data?.result && data?.result.length > 0) {
			const internalItems = data?.result
			for (let internalItem of internalItems) {
				items.push({
					blockNumber: Number(internalItem?.blockNumber),
					updatedAt: Number(internalItem?.timeStamp) * 1000,
					value: formatEther(internalItem?.value || '0'),
					valueToken: process.env.NEXT_PUBLIC_NATIVE_TOKEN.toUpperCase() as CryptoIconNames,
					// valueCurrency: internalItem.
					hash: internalItem?.transactionHash,
					labelStatus: upperCaseFirstLetterOfWord(
						evmInternalTransactionType(internalItem?.callType || internalItem?.type)
					),
					type: 'MsgEthereumTx',
					status: internalItem?.errCode === '',
					from: internalItem?.from,
					to: internalItem?.to,
					contractAddress: internalItem?.contractAddress,
					fromName: internalItem.fromAddressName,
					toName: internalItem.toAddressName
				})
			}
		}
		return items
	}, [data])
	return {
		rows: _convertData(),
		loading: isWaiting
	}
}
