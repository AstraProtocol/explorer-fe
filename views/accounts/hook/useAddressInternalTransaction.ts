import API_LIST from 'api/api_list'
import { formatEther } from 'ethers/lib/utils'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { evmInternalTransactionType } from 'utils/evm'
import { upperCaseFirstLetterOfWord } from 'utils/helper'

export default function useAddressInternalTransaction(
	address: string,
	page: number
): UseAddressInternalTransactionData {
	const [hookData, setState] = useState({
		result: [],
		hasNextPage: false,
		nextPagePath: undefined
	})

	const [currentParams, setParams] = useState(undefined)
	const prevParams = []

	const _fetchCondition = () => {
		if (currentParams) {
			return [
				`${API_LIST.ADDRESS_INTERNAL_TRANSACTION}${currentParams}`,
				{
					address
				}
			]
		}

		return [
			API_LIST.ADDRESS_INTERNAL_TRANSACTION,
			{
				address,
				page: 1,
				offset: 10
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
				to: d?.to,
				fromName: d?.fromAddressName,
				toName: d?.toAddressName
			}))
			setState({ hasNextPage: data.hasNextPage, nextPagePath: data.nextPagePath, result: internalItems })
		}
	}, [data])
	return {
		data: {
			result: hookData.result,
			hasNextPage: hookData.hasNextPage
		},
		makeNextPage: () => {
			if (currentParams) prevParams.push(currentParams)
			setParams(hookData.nextPagePath)
		},
		makePrevPage: () => {
			const prevParam = prevParams.pop()
			setParams(prevParam)
		}
	}
}
