import API_LIST from 'api/api_list'
import usePagination from 'hooks/usePagination'
import { differenceWith, isEmpty } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { getTransactionEvmType, getTransactionType } from 'utils/cosmos'
import { caculateAmount, caculateCosmosTxAmount, caculateEthereumTxAmount, getFromToTxFromCosmosEntry } from '../utils'

export default function useTransaction() {
	const [_items, _setTransactionItem] = useState<TransactionItemModified[]>()
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

	const convertData = (transactionResult: TransactionItem[]) => {
		return transactionResult.map((item: TransactionItem) => {
			const totalFee = caculateAmount(item.fee)
			const evmType = getTransactionEvmType(item.messages)
			const type = getTransactionType(item?.messages[0]?.type)
			const typeCount = item?.messages.length - 1
			const { from, to, evmHash } = getFromToTxFromCosmosEntry(item.messages[0])

			return {
				...item,
				value:
					(type === 'MsgEthereumTx'
						? caculateEthereumTxAmount(item.messages)
						: caculateCosmosTxAmount(item.messages)) || '0',
				totalFee,
				type,
				evmType,
				from,
				to,
				evmHash,
				typeCount
			}
		})
	}

	useEffect(() => {
		if (data?.result) {
			if (pagination.page === 1 && isEmpty(_items)) {
				_setTransactionItem(convertData(data?.result))
				setPagination({
					page: 1,
					total: Number(data?.pagination.total_record)
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
				_setTransactionItem(convertData(data?.result))
				setPagination({
					total: Number(data?.pagination.total_record)
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
