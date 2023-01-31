import { astraToEth } from '@astradefi/address-converter'
import { formatNumber } from '@astraprotocol/astra-ui'
import { Column, RowData } from '@astraprotocol/astra-ui/lib/es/components/Table/Table'
import { CardRowItem } from 'components/Card/CardInfo'
import { LabelTypes } from 'components/Typography/Label'
import { formatUnits } from 'ethers/lib/utils'
import { isArray, isEmpty, isString } from 'lodash'
import { useCallback } from 'react'
import { getAstraSummary } from 'slices/commonSlice'
import { useAppSelector } from 'store/hooks'
import { CONFIG } from 'utils/constants'
import { CardInfoLabels } from 'utils/enum'
import { evmAddressName } from 'utils/evm'
import { ellipseBetweenText, formatCurrencyValue, LinkMaker, sortArrayFollowValue } from 'utils/helper'
import { EXT_FIELD_SORT_ORDER, MAIN_FIELD_SORT_ORDER, MORE_ITEM_FIELD_SORT_ORDER } from './convertDataConstants'

export default function useConvertData({ data }: { data: TransactionDetail }) {
	const astraSummary = useAppSelector(getAstraSummary)
	const astraPrice = formatNumber(astraSummary?.last || 0, 0)

	const _convertRawDataToCardData = useCallback(
		data => {
			if (!data) return [[], []]
			const keys = Object.keys(data)
			let items: CardRowItem[] = []
			for (let key of keys) {
				switch (key) {
					case 'evmHash':
					case 'cosmosHash':
						if (data[key] !== undefined && data[key] !== null)
							items.push({
								label: CardInfoLabels[key],
								type: 'copy',
								contents: [{ value: data[key] }]
							})
						break
					case 'result':
						if (data[key] !== undefined && data[key] !== null)
							items.push({
								label: CardInfoLabels[key],
								type: 'label',
								contents: [
									{
										value: data[key],
										icon: true,
										type: (data[key] as string).toLowerCase() as LabelTypes,
										backgroundType: 'unset'
									}
								]
							})
						break
					case 'confirmations':
						if (data[key] !== undefined && data[key] !== null)
							if (data[key])
								items.push({
									label: CardInfoLabels[key],
									type: 'label',
									contents: [
										{ value: 'Confirmed', type: 'success', backgroundType: 'rectangle' },
										{
											value: 'Confirmed by ' + formatNumber(data[key], 0),
											type: 'unset',
											backgroundType: 'specialShape'
										}
									]
								})
						break
					case 'blockHeight':
						if (data[key] !== undefined && data[key] !== null) {
							items.push({
								label: CardInfoLabels[key],
								type: 'link',
								contents: [{ value: '#' + data[key], link: LinkMaker.block(data[key]) }]
							})
						}
						break

					case 'from': //from
						if (data[key] !== undefined && data[key] !== null)
							items.push({
								label: CardInfoLabels[key],
								type: 'link-copy',
								contents: [
									{
										value: data['fromAddressName']
											? `${data['fromAddressName']} (${data[key]})`
											: data[key],
										link: LinkMaker.address(data[key])
									}
								]
							})
						break
					case 'to': //to
						if (data[key] !== undefined && data[key] !== null) {
							const isInteractWith = !!data?.rawInput?.startsWith('0x')
							items.push({
								label: isInteractWith ? CardInfoLabels.interactWith : CardInfoLabels.to,
								type: 'link-copy',
								contents: [
									{
										value: data['toAddressName']
											? `${data['toAddressName']} (${data[key]})`
											: data[key],
										link: LinkMaker.address(data[key])
									}
								]
							})
						}
						break
					case 'createdContractAddressHash': //to
						if (data[key] !== undefined && data[key] !== null) {
							const name = data['createdContractAddressName']
							items.push({
								label: CardInfoLabels.interactWith,
								type: 'link-copy',
								contents: [
									{
										text: `[Contract ${name ? `${name} (${data[key]})` : data[key]} created]`,
										value: data[key],
										link: LinkMaker.address(data[key])
									}
								]
							})
						}
						break
					case 'time':
						if (data[key] !== undefined && data[key] !== null)
							items.push({
								label: CardInfoLabels[key],
								type: 'time',
								contents: [{ value: data[key], type: data[key], suffix: '' }]
							})
						break
					case 'minSelfDelegation':
					case 'value':
						if (data[key] !== undefined && data[key] !== null) {
							let money = Number(astraPrice) * parseFloat(data[key])
							let moneyFormat = formatCurrencyValue(money)
							items.push({
								label: CardInfoLabels[key],
								type: 'balance',
								contents: [{ value: data[key], suffix: `(${moneyFormat})` }]
							})
						}
						break
					case 'fee':
						if (data[key] !== undefined && data[key] !== null) {
							let money = Number(astraPrice) * parseFloat(data[key])
							let moneyFormat = formatCurrencyValue(money)
							const value = data[key] < CONFIG.APPROXIMATE_ZERO ? 0 : data[key]
							items.push({
								label: CardInfoLabels[key],
								type: 'balance',
								contents: [{ value, suffix: `(${moneyFormat})` }]
							})
						}
						break

					case 'tokenTransfers':
						if (data[key] !== undefined && data[key] !== null) {
							const transfers = data[key] as EVMTransferItem[]
							const transferItems = []
							for (let transfer of transfers) {
								transferItems.unshift({
									label: CardInfoLabels[key],
									type: 'transfer',
									contents: [
										{
											transfer: {
												from: transfer.fromAddress,
												fromText: evmAddressName(
													transfer.fromAddressName,
													ellipseBetweenText(transfer.fromAddress, 6, 6)
												),
												to: transfer.toAddress,
												toText: evmAddressName(
													transfer.toAddressName,
													ellipseBetweenText(transfer.toAddress, 6, 6)
												),
												value: transfer.amount
													? Number(formatUnits(transfer.amount, transfer.decimals || '1'))
													: '',
												tokenAddress: transfer.tokenContractAddress,
												tokenSymbol: transfer.tokenSymbol,
												tokenName: transfer.tokenName,
												tokenId: transfer.tokenId,
												tokenType: transfer.tokenType
											}
										}
									],
									responsive: {
										wrap: 'md'
									}
								})
							}
							items = items.concat(transferItems)
						}
						break
					case 'nonce':
						if (data[key] !== undefined && data[key] !== null)
							items.push({
								label: CardInfoLabels[key],
								type: 'nonce',
								contents: [{ value: data[key], suffix: data.index }]
							})
						break

					case 'voter':
					case 'proposer':
					case 'depositor':
						if (data[key] !== undefined && data[key] !== null)
							items.push({
								label: CardInfoLabels[key],
								type: 'link-copy',
								contents: [{ link: LinkMaker.address(data[key]), value: data[key] }]
							})
						break

					case 'delegatorAddress':
					case 'recipientAddress':
					case 'grantee':
						if (!isEmpty(data[key])) {
							const evmAddress = astraToEth(data[key])
							items.push({
								label: CardInfoLabels[key],
								type: 'link-copy',
								contents: [{ value: evmAddress, link: LinkMaker.address(evmAddress) }]
							})
						}
						break

					case 'validatorAddress':
					case 'validatorSrcAddress':
					case 'validatorDstAddress':
					case 'validatorDstAddress':
						if (!isEmpty(data[key]))
							items.push({
								label: CardInfoLabels[key],
								type: 'copy',
								contents: [{ value: data[key] }]
							})
						break

					case 'revertReason':
					case 'rawInput':
						if (data[key] !== undefined && data[key] !== null)
							items.push({
								label: CardInfoLabels[key],
								type: 'raw-input',
								contents: [{ value: data[key] }]
							})
						break
					case 'gasPrice':
					case 'gasLimit':
					case 'typeOfTransfer':
					case 'proposalId':
					case 'option':
					case 'failLog':
					case 'maxFeePerGas':
					case 'memo':
					case 'maxPriorityFeePerGas':
					case 'gasUsedByTransaction':
						if (data[key] !== undefined && data[key] !== null)
							items.push({
								label: CardInfoLabels[key],
								type: 'text',
								contents: [{ value: data[key] }]
							})
						break

					case 'validatorDescription':
						if (!isEmpty(data[key]))
							items.push({
								label: CardInfoLabels[key],
								type: 'validator-description',
								contents: [{ value: data[key] }]
							})
						break
					case 'commissionRates':
						if (!isEmpty(data[key]))
							items.push({
								label: CardInfoLabels[key],
								type: 'commission',
								contents: [{ value: data[key] }]
							})
						break
					case 'initialDepositValue':
						if (data[key] !== undefined && data[key] !== null) {
							let money = Number(astraPrice) * parseFloat(data[key])
							let moneyFormat = formatCurrencyValue(money)
							items.push({
								label: CardInfoLabels[key],
								type: 'balance',
								contents: [{ value: data[key], suffix: `(${moneyFormat})` }]
							})
						}
						break
					case 'textProposalContent':
						if (!isEmpty(data[key])) {
							items.push({
								label: CardInfoLabels[key],
								type: 'tabs',
								contents: [
									{
										tabs: {
											titles: (data[key] as TextProposalContent[]).map(item => item.title),
											content: (data[key] as TextProposalContent[]).map(item => {
												if (isString(item.description)) {
													return item.description
												}
												if (isArray(item.rows) && isArray(item.cols)) {
													const cols: Column[] = item.cols.map(col => ({
														key: col,
														content: (
															<span className="text-md contrast-color-70">{col}</span>
														),
														render: val => (
															<span className="contrast-color-70 text-sm">{val}</span>
														)
													}))
													const rows: RowData[] = item.rows.map(row => {
														const _row: RowData = {}
														for (let i = 0; i < item.cols.length; i++) {
															const col = item.cols[i]
															_row[col] = { content: row[i] }
														}
														return _row
													})
													return { cols, rows }
												}
											})
										}
									}
								]
							})
						}
						break
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

			const extraItems = sortArrayFollowValue(items, 'label', EXT_FIELD_SORT_ORDER)

			const moreItems = sortArrayFollowValue(items, 'label', MORE_ITEM_FIELD_SORT_ORDER)
			// console.log(mainItems, moreItems, items, data)
			return [mainItems, extraItems, moreItems]
		},
		[astraPrice]
	)
	if (!data) return [[], []]

	const [mainItems, extraItems, moreItems] = _convertRawDataToCardData(data)
	return [mainItems, extraItems, moreItems]
}
