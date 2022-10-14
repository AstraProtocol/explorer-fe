import { formatNumber } from '@astraprotocol/astra-ui'
import { CardRowItem } from 'components/Card/CardInfo'
import { LabelTypes } from 'components/Typography/Label'
import { formatEther } from 'ethers/lib/utils'
import { useCallback } from 'react'
import { getAstraSummary } from 'slices/commonSlice'
import { useAppSelector } from 'store/hooks'
import { evmAddressName } from 'utils/evm'
import { ellipseBetweenText, formatCurrencyValue, LinkMaker, sortArrayFollowValue } from 'utils/helper'
import { CardInfoLabels, TransactionDetail } from '../utils'

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
							label: CardInfoLabels.Transaction_Hash,
							type: 'copy',
							contents: [{ value: data[key] }]
						})
						break
					case 'cosmosHash':
						items.push({
							label: CardInfoLabels.Transaction_Cosmos,
							type: 'link-copy',
							contents: [{ value: data[key], link: LinkMaker.transaction(data[key]) }]
						})
						break
					case 'result':
						items.push({
							label: CardInfoLabels.Result,
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
							label: CardInfoLabels.Status,
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
							label: CardInfoLabels.Block,
							type: 'link',
							contents: [{ value: '#' + data[key], link: LinkMaker.block(data[key]) }]
						})
						break
					case 'from': //from
						items.push({
							label: CardInfoLabels.From,
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
							label: CardInfoLabels.To,
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
							label: CardInfoLabels.Timestamp,
							type: 'time',
							contents: [{ value: data[key], type: data[key], suffix: '' }]
						})
						break
					case 'value':
						let money = Number(astraPrice) * parseFloat(data[key])
						let moneyFormat = formatCurrencyValue(money)
						items.push({
							label: CardInfoLabels.Value,
							type: 'balance',
							contents: [{ value: data[key], suffix: `(${moneyFormat})` }]
						})
						break
					case 'fee':
						money = Number(astraPrice) * parseFloat(data[key])
						moneyFormat = formatCurrencyValue(money)

						items.push({
							label: CardInfoLabels.Transaction_Fee,
							type: 'balance',
							contents: [{ value: data[key], suffix: `(${moneyFormat})` }]
						})
						break
					case 'gasPrice':
						items.push({
							label: CardInfoLabels.Gas_Price,
							type: 'text',
							contents: [{ value: data[key] }]
						})
						break
					case 'gasLimit':
						items.push({
							label: CardInfoLabels.Gas_Limit,
							type: 'text',
							contents: [{ value: data[key] }]
						})
						break
					case 'rawInput':
						items.push({
							label: CardInfoLabels.Raw_Input,
							type: 'raw-input',
							contents: [{ value: data[key] }]
						})
						break
					case 'tokenTransfers':
						const transfers = data[key] as EVMTransferItem[]
						for (let transfer of transfers) {
							items.push({
								label: CardInfoLabels.Tokens_Transferred,
								type: 'transfer',
								contents: [
									{
										transfer: {
											from: evmAddressName(
												transfer.fromAddressName,
												ellipseBetweenText(transfer.fromAddress, 6, 6)
											),
											to: evmAddressName(
												transfer.toAddressName,
												ellipseBetweenText(transfer.fromAddress, 6, 6)
											),
											value: Number(formatEther(transfer.amount)),
											token: transfer.tokenSymbol
										}
									}
								],
								responsive: {
									wrap: 'md'
								}
							})
						}
						break
					case 'nonce':
						items.push({
							label: CardInfoLabels.Nonce,
							type: 'nonce',
							contents: [{ value: data[key], suffix: data.index }]
						})
						break
					case 'typeOfTransfer':
						items.push({
							label: CardInfoLabels.Transaction_Type,
							type: 'text',
							contents: [{ value: data[key] }]
						})
						break
					case 'voter':
						items.push({
							label: CardInfoLabels.Voter,
							type: 'link-copy',
							contents: [{ value: data[key] }]
						})
						break
					case 'proposalId':
						items.push({
							label: CardInfoLabels.Proposal_Id,
							type: 'text',
							contents: [{ value: data[key] }]
						})
						break
					case 'option':
						items.push({
							label: CardInfoLabels.Option,
							type: 'text',
							contents: [{ value: data[key] }]
						})
						break
					case 'delegatorAddress':
						items.push({
							label: CardInfoLabels.Delegator_Address,
							type: 'copy',
							contents: [{ value: data[key] }]
						})
						break
					case 'validatorAddress':
						items.push({
							label: CardInfoLabels.Validator_Address,
							type: 'copy',
							contents: [{ value: data[key] }]
						})
						break
					case 'validatorSrcAddress':
						items.push({
							label: CardInfoLabels.Validator_Src_Address,
							type: 'copy',
							contents: [{ value: data[key] }]
						})
						break
					case 'validatorDstAddress':
						items.push({
							label: CardInfoLabels.Validator_Dst_Address,
							type: 'copy',
							contents: [{ value: data[key] }]
						})
						break
					case 'failLog':
						items.push({
							label: CardInfoLabels.Fail_Reason,
							type: 'text',
							contents: [{ value: data[key] }]
						})
						break
					case 'revertReason':
						items.push({
							label: CardInfoLabels.Revert_Reason,
							type: 'raw-input',
							contents: [{ value: data[key] }]
						})
						break
					case 'maxFeePerGas':
						items.push({
							label: CardInfoLabels.Max_Fee_Gas,
							type: 'text',
							contents: [{ value: data[key] }]
						})
						break
					case 'maxPriorityFeePerGas':
						items.push({
							label: CardInfoLabels.Max_Priority_Fer_Gas,
							type: 'text',
							contents: [{ value: data[key] }]
						})
						break
					case 'gasUsedByTransaction':
						items.push({
							label: CardInfoLabels.Gas_Used_by_Transaction,
							type: 'text',
							contents: [{ value: data[key] }]
						})
						break
				}
			}
			const mainItems = sortArrayFollowValue(items, 'label', [
				CardInfoLabels.Transaction_Hash,
				CardInfoLabels.Transaction_Cosmos,
				CardInfoLabels.Result,
				CardInfoLabels.Fail_Reason,
				CardInfoLabels.Revert_Reason,
				CardInfoLabels.Status,
				CardInfoLabels.Block,
				//msgvote
				CardInfoLabels.Voter,
				CardInfoLabels.Proposal_Id,
				CardInfoLabels.Option,
				//delegate
				CardInfoLabels.Delegator_Address,
				CardInfoLabels.Validator_Address,
				//MsgBeginRedelegate
				CardInfoLabels.Validator_Src_Address,
				CardInfoLabels.Validator_Dst_Address,

				CardInfoLabels.Timestamp,
				CardInfoLabels.From,
				CardInfoLabels.To,
				CardInfoLabels.Tokens_Transferred,
				CardInfoLabels.Value,
				CardInfoLabels.Transaction_Fee,
				CardInfoLabels.Gas_Price,
				CardInfoLabels.Transaction_Type
			])
			//remove label of token transfer
			let hashTransfer = false
			mainItems.map(item => {
				if (item.label === CardInfoLabels.Tokens_Transferred) {
					if (!hashTransfer) {
						hashTransfer = true
					} else {
						item.label = ''
					}
				}
			})
			const moreItems = sortArrayFollowValue(items, 'label', [
				CardInfoLabels.Gas_Limit,
				CardInfoLabels.Max_Fee_Gas,
				CardInfoLabels.Max_Priority_Fer_Gas,
				CardInfoLabels.Gas_Used_by_Transaction,
				CardInfoLabels.Nonce,
				CardInfoLabels.Raw_Input
			])
			// console.log(mainItems, moreItems, items, data)
			return [mainItems, moreItems]
		},
		[data, astraSummary]
	)
	const [mainItems, moreItems] = _convertRawDataToCardData(data)
	return [mainItems, moreItems]
}
