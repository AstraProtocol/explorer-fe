import { formatNumber } from '@astraprotocol/astra-ui'
import { isArray, isEmpty } from 'lodash'
import { useCallback } from 'react'
import { getAstraSummary } from 'slices/commonSlice'
import { useAppSelector } from 'store/hooks'
import { CardInfoLabels } from 'utils/enum'
import { convertBalanceToView, sortArrayFollowValue } from 'utils/helper'
import {
	COSMOS_MESSAGE_SORT_FIELD,
	EVM_MESSAGE_SORT_FIELD,
	GAS_ITEM_FIELD_SORT_ORDER,
	MAIN_SORT_FIELD
} from './convertDataConstants'
import { _cardData } from './utils'

export default function useConvertData({
	data,
	internalLoading,
	internalTransactionRows
}: {
	internalTransactionRows: InternalTransactionItem[]
	internalLoading: boolean
	data: TransactionDetail
}) {
	const astraSummary = useAppSelector(getAstraSummary)
	const astraPrice = formatNumber(astraSummary?.last || 0, 0)

	const _convertRawDataToCardData = useCallback(() => {
		if (!data) return [[], []]
		// Trigger internal tx have amount
		let internalTokenTransfers = []
		if (data.result !== 'Error') {
			internalTokenTransfers = internalTransactionRows
				// filter tx
				.filter((t: InternalTransactionItem) => t.callType === 'call' && convertBalanceToView(t.value) > 0)
				// Reformat value
				.map((t: InternalTransactionItem) => ({
					...t,
					value: convertBalanceToView(t.value).toString()
				}))
		}

		const items = _cardData({ ...data, internalTokenTransfers }, astraPrice)
		const cosmosCards = []
		const { cosmosTxnMessages } = data
		if (isArray(cosmosTxnMessages) && cosmosTxnMessages.length > 0) {
			for (let msg of cosmosTxnMessages) {
				const cardFields = _cardData(msg as TransactionDetail, astraPrice)
				cosmosCards.push(cardFields)
			}
		}

		const mainItems = sortArrayFollowValue(items, 'label', MAIN_SORT_FIELD)
		//remove label of Token Transfers
		let hashTransfer = false
		mainItems.map(item => {
			if (item.label === CardInfoLabels.tokenTransfers) {
				if (!hashTransfer) {
					hashTransfer = true
				} else {
					item.label = ''
				}
			}
		})
		const cosmosSortItems = []
		for (let cos of cosmosCards) {
			cosmosSortItems.push(sortArrayFollowValue(cos, 'label', COSMOS_MESSAGE_SORT_FIELD))
		}
		const evmSortItems = []
		if (isEmpty(cosmosCards)) {
			const evm = sortArrayFollowValue(items, 'label', EVM_MESSAGE_SORT_FIELD)
			evmSortItems.push(evm)
		}

		const gasItems = sortArrayFollowValue(items, 'label', GAS_ITEM_FIELD_SORT_ORDER)

		return [mainItems, ...cosmosSortItems, ...evmSortItems, gasItems].filter(c => !isEmpty(c))
	}, [astraPrice, data, internalTransactionRows])
	if (!data) return [[], []]

	const cards = _convertRawDataToCardData()
	return cards
}
