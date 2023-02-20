import API_LIST from 'api/api_list'
import useDelayUntilDone from 'hooks/useDelayUntilDone'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { ZERO_ADDRESS } from 'utils/constants'
import { getEnvNumber } from 'utils/helper'

export default function useTokenTransactions(token: string, params: string | undefined): UseTokenTransactionHookData {
	const [hookData, setState] = useState({
		result: [],
		hasNextPage: false,
		nextPagePath: undefined
	})

	const _fetchCondition = () => {
		if (params) {
			return [
				`${API_LIST.TOKEN_TRANSACTIONS}${token}${params}`,
				{
					blockscout: true
				}
			]
		}

		return [
			`${API_LIST.TOKEN_TRANSACTIONS}${token}`,
			{
				blockscout: true,
				page: 1,
				offset: getEnvNumber('NEXT_PUBLIC_PAGE_OFFSET')
			}
		]
	}
	const { data, error } = useSWR<TokenTransactionResponse>(_fetchCondition())

	const { isWaiting } = useDelayUntilDone(() => !isEmpty(data) || error)

	const convertData = (_data: TokenTransaction[]): TokenTransaction[] => {
		return _data.map((d: TokenTransaction) => {
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
				result: convertData(data?.result?.result),
				hasNextPage: data.result.hasNextPage,
				nextPagePath: data.result.nextPagePath
			})
		}
	}, [data])

	return {
		result: hookData.result,
		hasNextPage: hookData.hasNextPage,
		nextPagePath: hookData.nextPagePath,
		loading: isWaiting
	}
}
