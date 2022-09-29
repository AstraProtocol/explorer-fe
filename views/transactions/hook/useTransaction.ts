import API_LIST from 'api/api_list'
import { differenceWith, isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useTransaction() {
	const [_items, setState] = useState<TransactionItem[]>()

	const _fetchCondition = () => {
		return [
			API_LIST.ALL_TRANSACTIONS,
			{
				pagination: 'offset',
				page: 1,
				limit: 20,
				order: 'height.desc'
			}
		]
	}
	const { data } = useSWR<TransactionResponse>(_fetchCondition(), {
		refreshInterval: parseInt(process.env.NEXT_PUBLIC_TRANSACTION_INTERVAL)
	})
	useEffect(() => {
		if (data?.result) {
			if (isEmpty(_items)) {
				setState(data?.result)
			} else {
				const items = differenceWith<TransactionItem, TransactionItem>(data.result, _items, (a, b) => {
					return a.hash === b.hash
				})
				items.map(item => (item.newTransaction = true))
				setState(data?.result)
			}
		}
	}, [data])
	return {
		top10: _items?.slice(0, 10),
		fullPageData: _items
	}
}
