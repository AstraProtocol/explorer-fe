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
export default function useNftTransfer(token: string, tokenId: string, params: string | undefined): useNftTransfer {
	const [hookData, setState] = useState({
		result: [],
		hasNextPage: false,
		nextPagePath: undefined
	})

	const _fetchCondition = () => {
		if (params) {
			return [
				`${API_LIST.TOKEN_TRANSER_BY_TOKEN_ID}${params}`,
				{
					contractaddress: token,
					tokenid: tokenId
				}
			]
		}

		return [
			API_LIST.TOKEN_TRANSER_BY_TOKEN_ID,
			{
				contractaddress: token,
				tokenid: tokenId,
				page: 1,
				offset: getEnvNumber('NEXT_PUBLIC_PAGE_OFFSET')
			}
		]
	}
	const { data } = useSWR<NftTransferResponse>(_fetchCondition())

	const convertData = (_data: NftTransferResponse): NftTransfer[] => {
		return data.result.map((d: NftTransfer) => {
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
