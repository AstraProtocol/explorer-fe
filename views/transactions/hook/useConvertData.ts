import { formatNumber } from '@astraprotocol/astra-ui'
import { CardRowItem } from 'components/Card/CardInfo'
import { LabelTypes } from 'components/Typography/Label'
import { formatEther } from 'ethers/lib/utils'
import { useCallback } from 'react'
import { getAstraSummary } from 'slices/commonSlice'
import { useAppSelector } from 'store/hooks'
import { ellipseBetweenText, formatCurrencyValue, LinkMaker, sortArrayFollowValue } from 'utils/helper'
import { TransactionDetail } from '../utils'

export default function useConvertData({ data }: { data: TransactionDetail }) {
	const astraSummary = useAppSelector(getAstraSummary)
	const astraPrice = formatNumber(astraSummary?.last || 0, 0)
	const _convertRawDataToCardData = useCallback(
		data => {
			const keys = Object.keys(data)
			let items: CardRowItem[] = []
			for (let key of keys) {
				switch (key) {
					case 'evmHash':
						items.push({
							label: 'Transaction Hash:',
							type: 'copy',
							contents: [{ value: data[key] }]
						})
						break
					case 'cosmosHash':
						items.push({
							label: 'Transaction Cosmos:',
							type: 'link-copy',
							contents: [{ value: data[key], link: LinkMaker.transaction(data[key]) }]
						})
						break
					case 'result':
						items.push({
							label: 'Result:',
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
						items.push({
							label: 'Status:',
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
						items.push({
							label: 'Block:',
							type: 'link',
							contents: [{ value: '#' + data[key], link: LinkMaker.block(data[key]) }]
						})
						break
					case 'from': //from
						items.push({
							label: 'From:',
							type: 'link-copy',
							contents: [
								{
									value: data[key],
									link: LinkMaker.address(data[key])
								}
							]
						})
						break
					case 'to': //from
						items.push({
							label: 'Interacted With (To):',
							type: 'link-copy',
							contents: [
								{
									value: data[key],
									link: LinkMaker.address(data[key])
								}
							]
						})
						break
					case 'time':
						items.push({
							label: 'Timestamp:',
							type: 'time',
							contents: [{ value: data[key], type: data[key], suffix: '' }]
						})
						break
					case 'value':
						let money = Number(astraPrice) * parseFloat(data[key])
						let moneyFormat = formatCurrencyValue(money)
						items.push({
							label: 'Value:',
							type: 'balance',
							contents: [{ value: data[key], suffix: `(${moneyFormat})` }]
						})
						break
					case 'fee':
						money = Number(astraPrice) * parseFloat(data[key])
						moneyFormat = formatCurrencyValue(money)

						items.push({
							label: 'Transaction Fee:',
							type: 'balance',
							contents: [{ value: data[key], suffix: `(${moneyFormat})` }]
						})
						break
					case 'gasPrice':
						items.push({
							label: 'Gas Price:',
							type: 'text',
							contents: [{ value: data[key] }]
						})
						break
					case 'gasLimit':
						items.push({
							label: 'Gas Limit:',
							type: 'text',
							contents: [{ value: data[key] }]
						})
						break
					case 'rawInput':
						items.push({
							label: 'Raw Input:',
							type: 'raw-input',
							contents: [{ value: data[key] }]
						})
						break
					case 'tokenTransfers':
						const transfers = data[key] as EVMTransferItem[]
						for (let transfer of transfers) {
							items.push({
								label: 'Tokens Transferred:',
								type: 'transfer',
								contents: [
									{
										transfer: {
											from: ellipseBetweenText(transfer.fromAddress, 6, 6),
											to: ellipseBetweenText(transfer.fromAddress, 6, 6),
											value: Number(formatEther(transfer.amount)),
											token: transfer.tokenSymbol
										}
									}
								]
							})
						}
						break
					case 'nonce':
						items.push({
							label: 'Nonce',
							type: 'nonce',
							contents: [{ value: data[key], suffix: data.index }]
						})
						break
					case 'typeOfTransfer':
						items.push({
							label: 'Transaction Type:',
							type: 'text',
							contents: [{ value: data[key] }]
						})
						break
					case 'voter':
						items.push({
							label: 'Voter:',
							type: 'link-copy',
							contents: [{ value: data[key] }]
						})
						break
					case 'proposalId':
						items.push({
							label: 'Proposal Id:',
							type: 'text',
							contents: [{ value: data[key] }]
						})
						break
					case 'option':
						items.push({
							label: 'Option:',
							type: 'text',
							contents: [{ value: data[key] }]
						})
						break
					case 'delegatorAddress':
						items.push({
							label: 'Delegator Address:',
							type: 'copy',
							contents: [{ value: data[key] }]
						})
						break
					case 'validatorAddress':
						items.push({
							label: 'Validator Address:',
							type: 'copy',
							contents: [{ value: data[key] }]
						})
						break
					case 'validatorSrcAddress':
						items.push({
							label: 'Validator Src Address:',
							type: 'copy',
							contents: [{ value: data[key] }]
						})
						break
					case 'validatorDstAddress':
						items.push({
							label: 'Validator Dst Address:',
							type: 'copy',
							contents: [{ value: data[key] }]
						})
						break
					case 'failLog':
						items.push({
							label: 'Fail reason:',
							type: 'text',
							contents: [{ value: data[key] }]
						})
						break
				}
			}
			const mainItems = sortArrayFollowValue(items, 'label', [
				'Transaction Hash:',
				'Transaction Cosmos:',
				'Result:',
				'Fail reason:',
				'Status:',
				'Block:',
				//msgvote
				'Voter:',
				'Proposal Id:',
				'Option:',
				//delegate
				'Delegator Address:',
				'Validator Address:',
				//MsgBeginRedelegate
				'Validator Src Address:',
				'Validator Dst Address:',

				'Timestamp:',
				'From:',
				'Interacted With (To):',
				'Tokens Transferred:',
				'Value:',
				'Transaction Fee:',
				'Gas Price:',
				'Transaction Type:'
			])
			//remove label of token transfer
			let hashTransfer = false
			mainItems.map(item => {
				if (item.label === 'Tokens Transferred:') {
					if (!hashTransfer) {
						hashTransfer = true
					} else {
						item.label = ''
					}
				}
			})
			const moreItems = sortArrayFollowValue(items, 'label', ['Gas Limit:', 'Nonce', 'Raw Input:'])
			console.log(mainItems, moreItems, items, data)
			return [mainItems, moreItems]
		},
		[data, astraSummary]
	)
	const [mainItems, moreItems] = _convertRawDataToCardData(data)
	return [mainItems, moreItems]
}
