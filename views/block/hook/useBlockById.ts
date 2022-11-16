import API_LIST from 'api/api_list'
import usePagination from 'hooks/usePagination'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import useSWRImmutable from 'swr/immutable'

export default function useBlockById(blockHeight: string) {
	const [items, setBlockItem] = useState<TransactionItem[]>()
	const { pagination, setPagination } = usePagination(`/blocks/${blockHeight}`)
	const _fetchCondition = () => {
		return [
			`${API_LIST.TRANSACTION_OF_BLOCK.replace(':id', blockHeight)}`,
			{
				pagination: pagination.pagination,
				page: pagination.page,
				limit: 10
			}
		]
	}
	const { data } = useSWRImmutable<TransactionResponse>(_fetchCondition())

	useEffect(() => {
		if (data && data?.result) {
			if (isEmpty(items)) {
				setPagination({
					page: 1,
					total: data?.pagination.total_page
				})
			}
			setBlockItem(data?.result)
		}
	}, [data])

	const _changePage = (page: number) => {
		setPagination({ page })
	}

	return {
		result: items,
		pagination,
		changePage: _changePage
	}
}
