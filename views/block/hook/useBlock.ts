import API_LIST from 'api/api_list'
import usePagination from 'hooks/usePagination'
import { differenceWith, isEmpty } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useBlock() {
	const [_items, _setBlockItem] = useState<BlockItem[]>()
	const { pagination, setPagination } = usePagination('/blocks')
	const _fetchCondition = () => {
		return [
			API_LIST.ALL_BLOCKS,
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

	const { data } = useSWR<BlockResponse>(_fetchCondition(), {
		refreshInterval: reloadTime()
	})

	const _getPropserAddress = (items: Commited[]): Commited | null => {
		return items?.find(item => item.isProposer)
	}

	useEffect(() => {
		if (data?.result) {
			if (pagination.page === 1 && isEmpty(_items)) {
				_setBlockItem(data?.result)
				setPagination({
					page: 1,
					total: Number(data?.pagination.total_record)
				})
			} else {
				// refresh data in page 1
				if (pagination.page === 1) {
					const items = differenceWith<BlockItem, BlockItem>(data.result, _items, (a, b) => {
						return a.blockHeight === b.blockHeight
					})
					if (items.length > 0) {
						items[0].newBlock = true
					}
				}
				_setBlockItem(data?.result)
				setPagination({
					total: Number(data?.pagination.total_record)
				})
			}
		}
	}, [data])

	const _changePage = (page: number) => {
		// _setBlockItem([])
		setPagination({ page })
	}

	return {
		top10: _items?.slice(0, parseInt(process.env.NEXT_PUBLIC_ITEM_SHOW_HOME_PAGE) || 7),
		fullPageData: _items,
		getPropserAddress: _getPropserAddress,
		pagination,
		changePage: _changePage
	}
}
