import { CryptoIconNames } from '@astraprotocol/astra-ui/lib/es/components/CryptoIcon'
import API_LIST from 'api/api_list'
import { formatEther } from 'ethers/lib/utils'
import useDelayUntilDone from 'hooks/useDelayUntilDone'
import { isEmpty } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { evmInternalTransactionType } from 'utils/evm'
import { getEnvNumber } from 'utils/helper'

export default function useAddressInternalTransaction(
	address: string,
	params: string | undefined
): UseAddressInternalTransactionData {
	const [hookData, setState] = useState({
		result: [],
		hasNextPage: false,
		nextPagePath: undefined
	})

	const _fetchCondition = () => {
		if (params) {
			return [
				`${API_LIST.ADDRESS_INTERNAL_TRANSACTION}${params}`,
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
				offset: getEnvNumber('NEXT_PUBLIC_PAGE_OFFSET')
			}
		]
	}
	const { data, error } = useSWR<AddressInternalTransactionResponse>(_fetchCondition())

	const isLoadedData = useCallback(() => {
		return !isEmpty(data) || error
	}, [data])

	const { isWaiting } = useDelayUntilDone(isLoadedData)

	useEffect(() => {
		if (data && data?.result.length > 0) {
			const internalItems = data.result.map((d: InternalTransactionItem) => ({
				blockNumber: Number(d?.blockNumber),
				updatedAt: Number(d?.timeStamp) * 1000,
				value: formatEther(d?.value || '0'),
				valueToken: process.env.NEXT_PUBLIC_NATIVE_TOKEN as CryptoIconNames,
				// valueCurrency: d.
				hash: d?.transactionHash,
				labelStatus: evmInternalTransactionType(d?.callType || d?.type),
				type: 'MsgEthereumTx',
				status: d?.errCode === '',
				from: d?.from,
				to: d?.to,
				contractAddress: d?.contractAddress,
				fromName: d?.fromAddressName,
				toName: d?.toAddressName
			}))
			setState({ hasNextPage: data.hasNextPage, nextPagePath: data.nextPagePath, result: internalItems })
		}
	}, [data])
	return {
		result: hookData.result,
		hasNextPage: hookData.hasNextPage,
		nextPagePath: hookData.nextPagePath,
		loading: isWaiting
	}
}
