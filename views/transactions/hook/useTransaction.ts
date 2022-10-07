import API_LIST from 'api/api_list'
import usePagination from 'hooks/usePagination'
import { differenceWith, isEmpty } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useTransaction() {
	const [_items, _setTransactionItem] = useState<TransactionItem[]>()
	const { pagination, setPagination } = usePagination('/tx')

	const _fetchCondition = () => {
		return [
			API_LIST.ALL_TRANSACTIONS,
			{
				pagination: pagination.pagination,
				page: pagination.page,
				limit: pagination.limit,
				order: pagination.order
			}
		]
	}

	const reloadTime = useCallback(
		() => (pagination.page === 1 ? parseInt(process.env.NEXT_PUBLIC_BLOCK_INTERVAL) : 0),
		[pagination.page]
	)
	const { data } = useSWR<TransactionResponse>(_fetchCondition(), {
		refreshInterval: reloadTime()
	})

	useEffect(() => {
		if (data?.result) {
			if (pagination.page === 1 && isEmpty(_items)) {
				_setTransactionItem(data?.result)
				setPagination({
					page: 1,
					total: Number(data?.pagination.total_page)
				})
			} else {
				// refresh data in page 1
				if (pagination.page === 1) {
					const items = differenceWith<TransactionItem, TransactionItem>(data.result, _items, (a, b) => {
						return a.hash === b.hash
					})
					if (items.length > 0) {
						items[0].newTransaction = true
					}
				}
				_setTransactionItem(data?.result)
				setPagination({
					total: Number(data?.pagination.total_page)
				})
			}
		}
	}, [data])
	const _changePage = (page: number) => {
		_setTransactionItem([])
		setPagination({ page })
	}
	return {
		top10: _items?.slice(0, parseInt(process.env.NEXT_PUBLIC_ITEM_SHOW_HOME_PAGE) || 7),
		fullPageData: _items,
		pagination,
		changePage: _changePage
	}
}
