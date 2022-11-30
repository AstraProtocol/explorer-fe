import { formatNumber } from '@astraprotocol/astra-ui'
import { CardRowItem } from 'components/Card/CardInfo'
import { LabelTypes } from 'components/Typography/Label'
import { formatUnits } from 'ethers/lib/utils'
import { useCallback } from 'react'
import { getAstraSummary } from 'slices/commonSlice'
import { useAppSelector } from 'store/hooks'
import { CONFIG } from 'utils/constants'
import { CardInfoLabels } from 'utils/enum'
import { evmAddressName } from 'utils/evm'
import { ellipseBetweenText, formatCurrencyValue, LinkMaker, sortArrayFollowValue } from 'utils/helper'
import { TransactionDetail } from '../utils'

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
						if (data[key] !== undefined && data[key] !== null)
							items.push({
								label: CardInfoLabels[key],
								type: 'copy',
								contents: [{ value: data[key] }]
							})
						break
					case 'cosmosHash':
						if (data[key] !== undefined && data[key] !== null)
							items.push({
								label: CardInfoLabels.cosmosHash,
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
						const name = data['createdContractAddressHash']
							? data['createdContractAddressName']
							: data['toAddressName']
						if (data[key] !== undefined && data[key] !== null)
							items.push({
								label: CardInfoLabels[key],
								type: 'link-copy',
								contents: [
									{
										value: name ? `${name} (${data[key]})` : data[key],
										link: LinkMaker.address(data[key])
									}
								]
							})
						break
					case 'createdContractAddressHash': //to
						if (data[key] !== undefined && data[key] !== null)
							items.push({
								label: CardInfoLabels[key],
								type: 'link-copy',
								contents: [
									{
										text: `[Contract ${data[key]} created]`,
										value: data[key],
										link: LinkMaker.address(data[key])
									}
								]
							})
						break
					case 'time':
						if (data[key] !== undefined && data[key] !== null)
							items.push({
								label: CardInfoLabels[key],
								type: 'time',
								contents: [{ value: data[key], type: data[key], suffix: '' }]
							})
						break
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
						if (data[key] !== undefined && data[key] !== null)
							items.push({
								label: CardInfoLabels[key],
								type: 'link-copy',
								contents: [{ value: data[key] }]
							})
						break

					case 'delegatorAddress':
					case 'validatorAddress':
					case 'validatorSrcAddress':
					case 'validatorDstAddress':
						if (data[key] !== undefined && data[key] !== null)
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
				}
			}
			const mainItems = sortArrayFollowValue(items, 'label', [
				CardInfoLabels.evmHash,
				CardInfoLabels.cosmosHash,
				CardInfoLabels.result,
				CardInfoLabels.failLog,
				CardInfoLabels.revertReason,
				CardInfoLabels.memo,
				CardInfoLabels.confirmations,
				CardInfoLabels.block,
				CardInfoLabels.blockHeight,
				//msgvote
				CardInfoLabels.voter,
				CardInfoLabels.proposalId,
				CardInfoLabels.option,
				//delegate
				CardInfoLabels.delegatorAddress,
				CardInfoLabels.validatorAddress,
				//MsgBeginRedelegate
				CardInfoLabels.validatorSrcAddress,
				CardInfoLabels.validatorDstAddress,

				CardInfoLabels.time,
				CardInfoLabels.from,
				CardInfoLabels.to,
				CardInfoLabels.createdContractAddressHash,
				CardInfoLabels.tokenTransfers,
				CardInfoLabels.value,
				CardInfoLabels.fee,
				CardInfoLabels.gasPrice,
				CardInfoLabels.typeOfTransfer
			])
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
			const moreItems = sortArrayFollowValue(items, 'label', [
				CardInfoLabels.gasLimit,
				CardInfoLabels.maxFeePerGas,
				CardInfoLabels.maxPriorityFeePerGas,
				CardInfoLabels.gasUsedByTransaction,
				CardInfoLabels.nonce,
				CardInfoLabels.rawInput
			])
			// console.log(mainItems, moreItems, items, data)
			return [mainItems, moreItems]
		},
		[astraPrice]
	)
	if (!data) return [[], []]

	const [mainItems, moreItems] = _convertRawDataToCardData(data)
	return [mainItems, moreItems]
}
