import { astraToEth } from '@astradefi/address-converter'
import { ellipseBetweenText, formatNumber } from '@astraprotocol/astra-ui'
import { CardRowItem } from 'components/Card/CardInfo'
import { LabelTypes } from 'components/Typography/Label'
import { formatUnits } from 'ethers/lib/utils'
import { isArray, isBoolean, isEmpty, isNumber, isObject, isString } from 'lodash'
import { CONFIG } from 'utils/constants'
import { CardInfoLabels, TransactionCardTypeEnum } from 'utils/enum'
import { evmAddressName } from 'utils/evm'
import { formatCurrencyValue, LinkMaker } from 'utils/helper'

export const _cardData = (data: TransactionDetail, astraPrice: string) => {
	const keys = Object.keys(data)
	let items: CardRowItem[] = []
	for (let key of keys) {
		switch (key) {
			case 'evmHash':
			case 'cosmosHash':
				if (data[key] !== undefined && data[key] !== null)
					items.push({
						label: CardInfoLabels[key],
						type: TransactionCardTypeEnum.COPY,
						contents: [{ value: data[key] }]
					})
				break
			case 'result':
				if (data[key] !== undefined && data[key] !== null)
					items.push({
						label: CardInfoLabels[key],
						type: TransactionCardTypeEnum.LABEL,
						contents: [
							{
								value:
									data[key] === 'Indexing' ? (
										<>
											Indexing
											<span className="text text-sm text-italic contrast-color-50 margin-left-md">
												This transaction has been included and will be reflected in a short
												while
											</span>
										</>
									) : (
										data[key]
									),
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
							type: TransactionCardTypeEnum.LABEL,
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
						type: TransactionCardTypeEnum.LINK,
						contents: [{ value: '#' + data[key], link: LinkMaker.block(data[key]) }]
					})
				}
				break

			case 'from': //from
				if (data[key] !== undefined && data[key] !== null)
					items.push({
						label: CardInfoLabels[key],
						type: TransactionCardTypeEnum.LINK_COPY,
						contents: [
							{
								value: data['fromAddressName']
									? `${data['fromAddressName']} (${data[key]})`
									: data[key],
								link: LinkMaker.address(data[key] as string)
							}
						]
					})
				break
			case 'to': //to
				if (data[key] !== undefined && data[key] !== null) {
					const isInteractWith = data?.isInteractWithContract
					if (isInteractWith) {
						items.push({
							label: CardInfoLabels.to,
							type: TransactionCardTypeEnum.INTERACT_CONTRACT_WITH_TRANSFER_INTERNAL,
							contents: [
								{
									text: data['toAddressName']
										? `${data['toAddressName']} (${data[key]})`
										: `${data[key]}`,

									value: data[key],
									link: LinkMaker.address(data[key]),
									internalTransfer: data.internalTokenTransfers
								}
							]
						})
					} else {
						items.push({
							label: CardInfoLabels.to,
							type: TransactionCardTypeEnum.LINK_COPY,
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
				}
				break
			case 'createdContractAddressHash': //to
				if (data[key] !== undefined && data[key] !== null) {
					const name = data['createdContractAddressName']
					items.push({
						label: CardInfoLabels.to,
						type: TransactionCardTypeEnum.LINK_COPY,
						contents: [
							{
								text: (
									<>
										<span className="contrast-color-100">[</span>
										<span className="text icon-contract contrast-color-70" />{' '}
										{name ? `${name} (${data[key]})` : data[key]}{' '}
										<span className="contrast-color-100">Created]</span>
									</>
								),
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
						type: TransactionCardTypeEnum.TIME,
						contents: [{ value: data[key], type: data[key] as LabelTypes, suffix: '' }]
					})
				break
			case 'minSelfDelegation':
			case 'value':
			case 'amount':
			case 'totalAmount':
				if (data[key] !== undefined && data[key] !== null) {
					let money = Number(astraPrice) * parseFloat(data[key])
					let moneyFormat = formatCurrencyValue(money)
					items.push({
						label: CardInfoLabels[key],
						type: TransactionCardTypeEnum.BALANCE,
						contents: [{ value: data[key], suffix: `(${moneyFormat})` }]
					})
				}
				break
			case 'fee':
				if (data[key] !== undefined && data[key] !== null) {
					let money = Number(astraPrice) * parseFloat(data[key])
					let moneyFormat = formatCurrencyValue(money)
					const value = Number(data[key]) < CONFIG.APPROXIMATE_ZERO ? 0 : data[key]
					items.push({
						label: CardInfoLabels[key],
						type: TransactionCardTypeEnum.BALANCE,
						contents: [{ value, suffix: `(${moneyFormat})` }]
					})
				}
				break

			case 'tokenTransfers':
				if (data[key] !== undefined && data[key] !== null) {
					const transfers = data[key] as EVMTransferItem[]
					const transferItems = []
					for (let transfer of transfers) {
						transferItems.push({
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
						})
					}
					if (transferItems && transferItems.length > 0)
						items.push({
							label: CardInfoLabels[key],
							type: TransactionCardTypeEnum.TOKEN_TRANSFER,
							contents: transferItems,
							responsive: {
								wrap: 'md'
							}
						})
				}
				break
			case 'nonce':
				if (data[key] !== undefined && data[key] !== null)
					items.push({
						label: CardInfoLabels[key],
						type: TransactionCardTypeEnum.NONCE,
						contents: [{ value: data[key], suffix: data.index.toString() }]
					})
				break

			case 'voter':
			case 'proposer':
			case 'depositor':
			case 'signer':
			case 'receiver':
			case 'sender':
			case 'funderAddress':
			case 'accountAddress':
				if (data[key] !== undefined && data[key] !== null)
					items.push({
						label: CardInfoLabels[key],
						type: TransactionCardTypeEnum.LINK_COPY,
						contents: [{ link: LinkMaker.address(data[key]), value: data[key] }]
					})
				break

			case 'delegatorAddress':
			case 'recipientAddress':
			case 'grantee':
			case 'granter':
				if (!isEmpty(data[key])) {
					const evmAddress = key === 'grantee' ? data[key] : astraToEth(data[key])
					items.push({
						label: CardInfoLabels[key],
						type: TransactionCardTypeEnum.LINK_COPY,
						contents: [{ value: evmAddress, link: LinkMaker.address(evmAddress) }]
					})
				}
				break

			case 'validatorAddress':
			case 'validatorSrcAddress':
			case 'validatorDstAddress':
			case 'destAddress':
				if (!isEmpty(data[key]))
					items.push({
						label: CardInfoLabels[key],
						type: TransactionCardTypeEnum.COPY,
						contents: [{ value: data[key] }]
					})
				break

			case 'revertReason':
			case 'rawInput':
				if (data[key] !== undefined && data[key] !== null)
					items.push({
						label: CardInfoLabels[key],
						type: TransactionCardTypeEnum.RAW_INPUT,
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
			case 'type':
			case 'clientId':
			case 'delayPeriod':
			case 'sourcePort':
			case 'sourceChannel':
			case 'timeoutTimestamp':
			case 'token':
			case 'proofAcked':
			case 'acknowledgement':
				if (data[key] !== undefined && data[key] !== null)
					items.push({
						label: CardInfoLabels[key],
						type: TransactionCardTypeEnum.TEXT,
						contents: [{ value: data[key] }]
					})
				break

			case 'validatorDescription':
				if (!isEmpty(data[key]))
					items.push({
						label: CardInfoLabels[key],
						type: TransactionCardTypeEnum.VALIDATOR_DESCRIPTION,
						contents: [{ value: data[key] }]
					})
				break
			case 'commissionRates':
				if (!isEmpty(data[key]))
					items.push({
						label: CardInfoLabels[key],
						type: TransactionCardTypeEnum.COMMISION,
						contents: [{ value: data[key] }]
					})
				break
			case 'initialDepositValue':
				if (data[key] !== undefined && data[key] !== null) {
					let money = Number(astraPrice) * parseFloat(data[key])
					let moneyFormat = formatCurrencyValue(money)
					items.push({
						label: CardInfoLabels[key],
						type: TransactionCardTypeEnum.BALANCE,
						contents: [{ value: data[key], suffix: `(${moneyFormat})` }]
					})
				}
				break
			case 'lockupPeriods':
			case 'vestingPeriods':
			case 'msgs':
				if (data[key] !== undefined && data[key] !== null) {
					const titleEl = data[key].titles.map(t => ({
						key: t,
						content: <span className="text-md contrast-color-70">{t}</span>,
						render: val => <span className="contrast-color-70 text-sm">{val}</span>
					}))
					const rows = []
					for (let row of data[key].content) {
						const rowData = {}
						for (let i = 0; i < row.length; i++) {
							rowData[data[key].titles[i]] = { content: row[i] }
						}
						rows.push(rowData)
					}
					items.push({
						label: CardInfoLabels[key],
						type: TransactionCardTypeEnum.TABLE,
						contents: [
							{
								table: {
									colums: titleEl,
									rows: rows
								}
							}
						]
					})
				}
				break
			case 'dynamicRender':
				const dynamicData = _dynamicRenderCosmosComplexMsg(data[key])
				const keys = Object.keys(dynamicData)
				for (let key of keys) {
					items.push({
						label: key,
						type: TransactionCardTypeEnum.TABS,
						contents: [
							{
								tabs: {
									...dynamicData[key]
								}
							}
						]
					})
				}
				break
		}
	}
	return items
}

/**
 * trustedHeight => Trusted Height
 * @param v text variable
 * @returns
 */
const _convertVariableToTitle = (v: string) => {
	return v
		? v
				.split(/(?=[A-Z])/)
				.map(w => w.charAt(0).toUpperCase() + w.slice(1))
				.join(' ')
		: ''
}

const _isPrimaryType = (val: any) => {
	return isNumber(val) || isString(val) || isBoolean(val)
}
const _sortKeys = (obj: any): string[] => {
	return isObject(obj) ? Object.keys(obj).sort() : []
}

const _isArrayPrimaryType = (val: any) => {
	return isArray(val) && val.filter(v => _isPrimaryType(v)).length === val.length
}
/**
 * has tableTitles => table
 * has tabTitles => table
 * otherwise is row
 * @param data
 * @returns
 */
const _dynamicRenderCosmosComplexMsg = (data: any[]) => {
	const rows = {}
	for (let obj of data) {
		//row format
		let keys = _sortKeys(obj)
		for (let key of keys) {
			const rowValue = obj[key]
			let title = ''
			if (!isEmpty(CardInfoLabels[key])) {
				title = CardInfoLabels[key]
			} else {
				title = _convertVariableToTitle(key)
			}
			if (_isPrimaryType(rowValue)) {
				// row with value is string
				rows[title] = rowValue.toString()
			} else if (isArray(rowValue)) {
				//table
				const tableTitles = []
				const tableContents = []
				if (_isArrayPrimaryType(rowValue)) {
					tableTitles.push('ARRAY')
					rowValue.map(val => tableContents.push(val))
				} else {
					for (let tableRow of rowValue) {
						const tableKeys = _sortKeys(tableRow)
						const row = []
						for (let tableKey of tableKeys) {
							const title = _convertVariableToTitle(tableKey)
							if (!tableTitles.includes(title)) {
								tableTitles.push(title)
							}

							row.push(
								isString(tableRow[tableKey])
									? tableRow[tableKey]
									: JSON.stringify(tableRow[tableKey], null, '\t')
							)
						}
						tableContents.push(row)
					}
				}

				rows[title] = { tableTitles, tableContents }
			} else {
				//row with value is a tab
				const tabKeys = _sortKeys(rowValue)
				const tabTitles = []
				const tabContent = []
				for (let tabKey of tabKeys) {
					const tabTitle = _convertVariableToTitle(tabKey)
					const tabValue = rowValue[tabKey]
					tabTitles.push(tabTitle)

					if (_isPrimaryType(rowValue[tabKey])) {
						// tab value is string
						tabContent.push(tabValue.toString())
					} else if (isArray(rowValue[tabKey])) {
						//table
						const tableTitles = []
						const tableContents = []
						if (_isArrayPrimaryType(rowValue[tabKey])) {
							tableTitles.push('ARRAY')
							rowValue[tabKey].map(val => tableContents.push([val]))
						} else {
							for (let tableRow of rowValue[tabKey]) {
								const tableKeys = _sortKeys(tableRow)

								const row = []
								for (let tableKey of tableKeys) {
									const title = _convertVariableToTitle(tableKey)
									if (!tableTitles.includes(title)) {
										tableTitles.push(title)
									}

									row.push(
										isString(tableRow[tableKey])
											? tableRow[tableKey]
											: JSON.stringify(tableRow[tableKey], null, '\t')
									)
								}
								tableContents.push(row)
							}
						}
						tabContent.push({ tableTitles, tableContents })
					} else {
						// tab value is row
						tabContent.push(_dynamicRenderCosmosComplexMsg([tabValue]))
					}
				}
				rows[title] = { tabTitles, tabContent }
			}
		}
	}
	return rows
}
