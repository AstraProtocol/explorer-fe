import API_LIST from 'api/api_list'
import { differenceWith, isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useBlock() {
	const [_items, setState] = useState<BlockItem[]>()

	const _fetchCondition = () => {
		return [
			API_LIST.ALL_BLOCKS,
			{
				pagination: 'offset',
				page: 1,
				limit: 20,
				order: 'height.desc'
			}
		]
	}
	const { data } = useSWR<BlockResponse>(_fetchCondition(), {
		refreshInterval: parseInt(process.env.NEXT_PUBLIC_BLOCK_INTERVAL)
	})

	const _getPropserAddress = (items: Commited[]): Commited | null => {
		return items?.find(item => item.isProposer)
	}

	useEffect(() => {
		if (data?.result) {
			if (isEmpty(_items)) {
				setState(data?.result)
			} else {
				const items = differenceWith<BlockItem, BlockItem>(data.result, _items, (a, b) => {
					return a.blockHeight === b.blockHeight
				})
				// items.map(item => (item.newBlock = true))
				if (items.length > 0) {
					items[0].newBlock = true
				}
				setState(data?.result)
			}
		}
	}, [data])
	return {
		top10: _items?.slice(0, 7),
		fullPageData: _items,
		getPropserAddress: _getPropserAddress
	}
}
