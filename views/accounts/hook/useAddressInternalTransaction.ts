import API_LIST from 'api/api_list'
import { formatEther } from 'ethers/lib/utils'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { evmInternalTransactionType } from 'utils/evm'
import { upperCaseFirstLetterOfWord } from 'utils/helper'

export default function useAddressInternalTransaction(address: string, page: number) {
	const [hookData, setState] = useState<UseAddressInternalTransactionData>({ result: [], hasNextPage: false })

	const _fetchCondition = () => {
		return [
			API_LIST.ADDRESS_INTERNAL_TRANSACTION,
			{
				address,
				page,
				offset: 20
			}
		]
	}
	const { data } = useSWR<AddressInternalTransactionResponse>(_fetchCondition())

	useEffect(() => {
		// if (data?.result) {
		// 	setState({ result: data.result, hasNextPage: false })
		// }
		if (data && data?.result.length > 0) {
			const internalItems = data.result.map((d: InternalTransactionItem) => ({
				blockNumber: Number(d?.blockNumber),
				updatedAt: Number(d?.timeStamp) * 1000,
				value: formatEther(d?.value),
				valueToken: 'asa',
				// valueCurrency: d.
				hash: d?.transactionHash,
				type: upperCaseFirstLetterOfWord(evmInternalTransactionType(d?.callType)),
				status: d?.errCode === '',
				from: d?.from,
				to: d?.to
			}))
			setState({ result: internalItems, hasNextPage: false })
		}
	}, [data])
	return {
		result: hookData.result || [],
		hasNextPage: hookData.hasNextPage || false
	}
}
