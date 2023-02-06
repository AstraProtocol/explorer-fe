import { formatNumber } from '@astraprotocol/astra-ui'
import { isArray, isEmpty } from 'lodash'
import { useCallback } from 'react'
import { getAstraSummary } from 'slices/commonSlice'
import { useAppSelector } from 'store/hooks'
import { CardInfoLabels } from 'utils/enum'
import { sortArrayFollowValue } from 'utils/helper'
import {
	COSMOS_MESSAGE_FIELD_SORT_ORDER,
	GAS_ITEM_FIELD_SORT_ORDER,
	MAIN_FIELD_SORT_ORDER
} from './convertDataConstants'
import { _cardData } from './utils'

export default function useConvertData({ data }: { data: TransactionDetail }) {
	const astraSummary = useAppSelector(getAstraSummary)
	const astraPrice = formatNumber(astraSummary?.last || 0, 0)

	const _convertRawDataToCardData = useCallback(
		(data: TransactionDetail) => {
			if (!data) return [[], []]
			const items = _cardData(data, astraPrice)
			const cosmosCards = []
			const { cosmosTxnMessages } = data
			if (isArray(cosmosTxnMessages) && cosmosTxnMessages.length > 0) {
				for (let msg of cosmosTxnMessages) {
					const cardFields = _cardData(msg as TransactionDetail, astraPrice)
					cosmosCards.push(cardFields)
				}
			}

			const mainItems = sortArrayFollowValue(items, 'label', MAIN_FIELD_SORT_ORDER)
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
				cosmosSortItems.push(sortArrayFollowValue(cos, 'label', COSMOS_MESSAGE_FIELD_SORT_ORDER))
			}

			const gasItems = sortArrayFollowValue(items, 'label', GAS_ITEM_FIELD_SORT_ORDER)
			// console.log(mainItems, moreItems, items, data)
			return [mainItems, ...cosmosSortItems, gasItems].filter(c => !isEmpty(c))
		},
		[astraPrice]
	)
	if (!data) return [[], []]

	const cards = _convertRawDataToCardData(data)
	return cards
}
