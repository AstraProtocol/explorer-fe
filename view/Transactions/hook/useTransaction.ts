import API_LIST from 'api/api_list'
import { differenceWith, isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useTransaction() {
	const [_items, setState] = useState<TransactionItem[]>()

	const _fetchCondition = () => {
		return [API_LIST.ALL_TRANSACTIONS]
	}
	const { data } = useSWR<TransactionResponse>(_fetchCondition(), {
		refreshInterval: parseInt(process.env.NEXT_PUBLIC_TRANSACTION_INTERVAL)
	})
	useEffect(() => {
		if (data?.items) {
			if (isEmpty(_items)) {
				setState(data?.items)
			} else {
				const items = differenceWith<TransactionItem, TransactionItem>(data.items, _items, (a, b) => {
					return a.hash === b.hash
				})
				console.log(items.map(item => item.hash))
				items.map(item => (item.newTransaction = true))
				setState(data?.items)
			}
		}
	}, [data])
	return {
		top10: _items?.slice(0, 10),
		fullPageData: _items
	}
}
