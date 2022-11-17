import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { ZERO_ADDRESS } from 'utils/constants'
import { getEnvNumber } from 'utils/helper'

/**
 * @todo: Not implement yet
 * @param token
 * @param params
 * @returns
 */
export default function useNftTransfer(token: string, params: string | undefined): UseTokenTransactionHookData {
	const [hookData, setState] = useState({
		result: [],
		hasNextPage: false,
		nextPagePath: undefined
	})

	const _fetchCondition = () => {
		if (params) {
			return [
				`${API_LIST.TOKEN_TRANSACTIONS}${params}`,
				{
					contractaddress: token
				}
			]
		}

		return [
			API_LIST.TOKEN_TRANSACTIONS,
			{
				contractaddress: token,
				page: 1,
				offset: getEnvNumber('NEXT_PUBLIC_PAGE_OFFSET')
			}
		]
	}
	const { data } = useSWR<TokenTransactionResponse>(_fetchCondition())

	const convertData = (_data: TokenTransactionResponse): TokenTransaction[] => {
		return data.result.map((d: TokenTransaction) => {
			const isMint = d.fromAddress === ZERO_ADDRESS
			const isBurn = d.toAddress === ZERO_ADDRESS

			return {
				...d,
				type: d.type || (isMint && 'Mint') || (isBurn && 'Burn')
			}
		})
	}

	useEffect(() => {
		if (data?.result) {
			setState({
				result: convertData(data),
				hasNextPage: data.hasNextPage,
				nextPagePath: data.nextPagePath
			})
		}
	}, [data])

	return {
		result: hookData.result,
		hasNextPage: hookData.hasNextPage,
		nextPagePath: hookData.nextPagePath
	}
}
