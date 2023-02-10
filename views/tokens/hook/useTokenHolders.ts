import API_LIST from 'api/api_list'
import useDelayUntilDone from 'hooks/useDelayUntilDone'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { getEnvNumber } from 'utils/helper'

export default function useTokenHolders(token: string, page: number) {
	const [hookData, setState] = useState<TokenHolderResponse>()

	const _fetchCondition = () => {
		return [
			API_LIST.TOKEN_HOLDERS,
			{
				contractaddress: token,
				page,
				offset: getEnvNumber('NEXT_PUBLIC_PAGE_OFFSET')
			}
		]
	}
	const { data, error } = useSWR<any>(_fetchCondition())
	const { isWaiting } = useDelayUntilDone(() => !isEmpty(data) || error)
	useEffect(() => {
		if (data?.result) {
			const tokens: any = data.result.map(d => ({ address: d.address, balance: d.value }))
			setState({ result: tokens, hasNextPage: data.hasNextPage })
		}
	}, [data])
	return {
		tokens: hookData?.result,
		hasNextPage: hookData?.hasNextPage,
		loading: isWaiting
	}
}
