import API_LIST from 'api/api_list'
import { differenceWith, isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useBlock() {
	const [_items, setState] = useState<BlockItem[]>()

	const _fetchCondition = () => {
		return [API_LIST.ALL_BLOCKS]
	}
	const { data } = useSWR<BlockResponse>(_fetchCondition(), {
		refreshInterval: parseInt(process.env.NEXT_PUBLIC_BLOCK_INTERVAL)
	})
	useEffect(() => {
		if (data?.items) {
			if (isEmpty(_items)) {
				setState(data?.items)
			} else {
				const items = differenceWith<BlockItem, BlockItem>(data.items, _items, (a, b) => {
					return a.number === b.number
				})
				items.map(item => (item.newBlock = true))
				setState(data?.items)
			}
		}
	}, [data])
	return {
		top10: _items?.slice(0, 10),
		fullPageData: _items
	}
}
