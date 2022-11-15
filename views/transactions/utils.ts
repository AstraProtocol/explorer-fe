import { astraToEth } from '@astradefi/address-converter'
import { formatNumber } from '@astraprotocol/astra-ui'
import { cosmosApi } from 'api'
import API_LIST from 'api/api_list'
import { BigNumber } from 'ethers'
import { formatEther, formatUnits } from 'ethers/lib/utils'
import { isUndefined } from 'lodash'
import numeral from 'numeral'
import { convertMessageToTransfer, getTransactionType } from 'utils/cosmos'
import { TransacionTypeEnum } from 'utils/enum'
import { evmConvertTokenTransferToTransactionRow, evmTransactionType, isEmptyRawInput } from 'utils/evm'
import { TransactionRowProps } from './TransactionRow'

export interface TransactionQuery {
	tx: string
	type?: string
	evmHash?: string
}

export interface TransferItem {
	amount?: string
	fromAddress?: string
	logIndex?: string
	toAddress?: string
	tokenContractAddress?: string
	tokenName?: string
	tokenSymbol?: string
	tokenType?: string
}
export interface TransactionDetail {
	pageTitle?: string
	evmHash?: string
	cosmosHash?: string
	result?: string
	confirmations?: string
	blockHeight?: string
	time?: string | number
	from?: string | string[] // Multisig or unique address
	to?: string
	createdContractAddressHash?: string
	value?: string
	valueToken?: string
	fee?: string
	feeToken?: string
	gasPrice?: string
	type?: 'evm' | 'cosmos'
	typeOfTransfer?: string
	gasLimit?: string
	gasUsed?: string
	maxFeePerGas?: string
	maxPriorityFeePerGas?: string
	priorityFeePerGas?: string
	gasUsedByTransaction?: string
	nonce?: string
	rawInput?: string
	tokenTransfers?: TransferItem[]
	tabTokenTransfers?: TransactionRowProps[]
	index?: number
	nonceText?: string
	failLog?: string
	//msvote
	voter?: string
	proposalId?: string
	option?: string
	//msgDelegate
	delegatorAddress?: string
	validatorAddress?: string
	//MsgBeginRedelegate
	validatorSrcAddress?: string
	validatorDstAddress?: string

	revertReason?: string
	logs?: EvmLog[]
	memo?: string
}

export const evmTransactionDetail = async (evmHash?: string, cosmosHash?: string): Promise<TransactionDetail> => {
	let data: TransactionDetail = {}

	const res = await cosmosApi.get<EvmTransactionDetailResponse>(
		`${API_LIST.TRANSACTIONS}/${evmHash || cosmosHash}?type=evm`
	)
	const result = res.data.result
	if (!result) return
	data.evmHash = isUndefined(evmHash)
		? result.messages && result.messages.length > 0
			? result.messages?.[0].content.params.hash
			: result.hash
		: evmHash
	data.pageTitle = result.messages ? getTransactionType(result.messages[0]?.type) : ''
	data.cosmosHash = cosmosHash || result.cosmosHash
	data.result = result.success ? 'Success' : 'Error'
	data.confirmations = result.confirmations ? result.confirmations.toString() : ''
	data.blockHeight = `${result.blockHeight}`
	data.time = result.blockTime
	data.from = result.from
	data.to = result.to
	data.createdContractAddressHash = result.createdContractAddressHash
	data.value = (result.value ? formatEther(result.value) : caculateEthereumTxAmount(result.messages)) || '0'
	data.fee = result.fee && result.fee.length > 0 ? formatEther(result.fee[0].amount) : ''
	data.gasPrice = result.gasPrice ? formatUnits(result.gasPrice, 9) + ' NanoAstra' : ''
	data.gasLimit = result.gasLimit ? formatNumber(result.gasLimit, 0) : ''
	data.gasUsed = result.gasUsed
	data.maxFeePerGas = result.maxFeePerGas ? formatUnits(result.maxFeePerGas, 9) + ' NanoAstra' : undefined
	data.maxPriorityFeePerGas = result.maxPriorityFeePerGas
		? formatUnits(result.maxPriorityFeePerGas, 9) + ' NanoAstra'
		: undefined
	data.gasUsedByTransaction = result.cumulativeGasUsed
		? `${numeral(result.cumulativeGasUsed).format('0,0')} | ${numeral(
				parseFloat(result.cumulativeGasUsed) / parseFloat(result.gasLimit)
		  ).format('0.00%')}`
		: undefined
	data.nonce = result.nonce ? result.nonce.toString() : ''
	data.rawInput = isEmptyRawInput(result.input) ? undefined : result.input
	data.tokenTransfers = result.tokenTransfers
	data.index = result.index
	data.failLog = result.error || result.log
	data.revertReason = result.revertReason
	data.typeOfTransfer = result.type ? evmTransactionType(result.type) : ''
	data.tabTokenTransfers =
		result.tokenTransfers &&
		result.tokenTransfers.length &&
		evmConvertTokenTransferToTransactionRow(
			result.tokenTransfers,
			result.blockTime,
			result.success,
			result.hash,
			result.blockHeight
		)
	data.logs = result.logs
	data['type'] = 'evm'
	return data
}

export const cosmsTransactionDetail = (result: TransactionItem): TransactionDetail => {
	const data: TransactionDetail = {}
	const fee = caculateAmount(result.fee)
	data.type = 'cosmos'
	data.pageTitle = getTransactionType(result?.messages[0]?.type)
	data.evmHash = ''
	data.cosmosHash = result.hash
	data.result = result.success ? 'Success' : 'Error'
	data.confirmations = undefined
	data.blockHeight = `${result.blockHeight}`
	data.time = result.blockTime
	data.failLog = !result.success ? result.log : undefined
	data.value = caculateCosmosTxAmount(result.messages) || '0'
	data.memo = result.memo
	// data.logs = result.log
	data.from = getSignerEthAddress(result.signers)
	// data.to = result.to
	// data.tokenTransfer = []
	// data.value = undefined
	data.fee = formatEther(fee.amount || '0')
	data.feeToken = 'asa'
	// data.gasPrice = undefined
	data.gasLimit = result.gasWanted?.toString()
	data.gasUsed = `${result.gasUsed}`
	// data.maxFeePerGas = undefined
	// data.maxPriorityFeePerGas = undefined
	// data.priorityFeePerGas = undefined
	data.gasUsedByTransaction = result.gasUsed
		? `${numeral(result.gasUsed).format('0,0')} | ${numeral(result.gasUsed / result.gasWanted).format('0.00%')}`
		: undefined
	// data.nonce = undefined
	// data.rawInput = result.input
	// msgsend
	_convertTransfer(data, result?.messages, result?.blockTime, result?.success)
	_mapMsgSendField(data, result)
	_mapMsgVoteField(data, result?.messages)
	_mapMsgDelegate(data, result?.messages)
	_mapMsgBeginRedelegate(data, result?.messages)
	_mapMsgExec(data, result?.messages)
	_mapMsgGrant(data, result?.messages)
	return data
}

/**
 *
 * @param amounts {denom, amount}
 * @returns amount in string (bignumber)
 */
export const getAstraTokenAmount = (amounts: TokenAmount[]): string => {
	if (amounts && amounts.length > 0) {
		let totalAmount = BigNumber.from('0')
		for (let amount of amounts) {
			if (amount.denom === 'aastra') {
				totalAmount = totalAmount.add(BigNumber.from(amount.amount))
			}
		}

		return totalAmount.toString()
	}
	return '0'
}

/**
 * return ethereumtx amount
 * @param tx messages
 * @returns amount in string
 */
export const caculateEthereumTxAmount = (messages: TransactionMessage[]): string => {
	if (messages && messages.length > 0) {
		let totalAmount = BigNumber.from('0')
		for (let message of messages) {
			totalAmount = totalAmount.add(BigNumber.from(message.content?.params?.data?.value || '0'))
		}
		return formatEther(totalAmount)
	}
	return '0'
}

/**
 * return cosmos amount
 * @param tx messages
 * @returns amount in string
 */
export const caculateCosmosTxAmount = (messages: TransactionMessage[]): string => {
	if (messages && messages.length > 0) {
		let totalAmount = BigNumber.from('0')
		for (let message of messages) {
			totalAmount = totalAmount.add(BigNumber.from(getAstraTokenAmount(message.content?.amount)))
		}
		return formatEther(totalAmount)
	}
	return '0'
}

/**
 * return amount with format
 * @param amounts
 * @returns TokenAmount
 */
export const caculateAmount = (amounts: TokenAmount[]): TokenAmount => {
	if (!amounts || amounts.length == 0) {
		return { amount: '0', denom: 'aastra' }
	}
	let totalAmount = BigNumber.from('0')

	for (let amount of amounts) {
		totalAmount = totalAmount.add(BigNumber.from(amount.amount))
	}
	return {
		amount: totalAmount.toBigInt().toString(),
		denom: amounts[0].denom
	}
}

export const getSignerEthAddress = (signers: Signer[]) => {
	const addresses = []
	signers.forEach((s: Signer) => {
		if (s.address) addresses.push(astraToEth(s.address))
	})
	return addresses
}

const _convertTransfer = (
	data: TransactionDetail,
	messages: TransactionMessage[],
	blockTime?: string,
	success?: boolean
) => {
	data.tabTokenTransfers = convertMessageToTransfer(messages, blockTime, success)
}

const _mapMsgSendField = (data: TransactionDetail, result: TransactionItem) => {
	const type: TransacionTypeEnum = result?.messages[0]?.type
	if (type === TransacionTypeEnum.MsgSend) {
		const content = result?.messages[0].content as unknown as MsgSendContent
		data.from = astraToEth(content.fromAddress)
		data.to = astraToEth(content.toAddress)
	}
}
const _mapMsgVoteField = (data: TransactionDetail, messages: TransactionMessage[]) => {
	const type: TransacionTypeEnum = messages[0]?.type
	if (type === TransacionTypeEnum.MsgVote) {
		const content = messages[0].content as unknown as MsgVoteContent
		data.voter = astraToEth(content.voter)
		data.proposalId = content.proposalId
		data.option = content.option
	}
}

const _mapMsgDelegate = (data: TransactionDetail, messages: TransactionMessage[]) => {
	const type: TransacionTypeEnum = messages[0]?.type
	if (type === TransacionTypeEnum.MsgDelegate) {
		const content = messages[0].content as unknown as MsgDelegateContent
		data.delegatorAddress = content.delegatorAddress
		data.validatorAddress = content.validatorAddress
	}
}

const _mapMsgBeginRedelegate = (data: TransactionDetail, messages: TransactionMessage[]) => {
	const type: TransacionTypeEnum = messages[0]?.type
	if (type === TransacionTypeEnum.MsgBeginRedelegate) {
		const content = messages[0].content as MsgBeginRedelegateContent
		data.delegatorAddress = content.delegatorAddress
		data.validatorSrcAddress = content.validatorSrcAddress
		data.validatorDstAddress = content.validatorDstAddress
	}
}

const _mapMsgExec = (data: TransactionDetail, messages: TransactionMessage[]) => {
	const type: TransacionTypeEnum = messages[0]?.type
	if (type === TransacionTypeEnum.MsgExec) {
	}
}
const _mapMsgGrant = (data: TransactionDetail, messages: TransactionMessage[]) => {
	const type: TransacionTypeEnum = messages[0]?.type
	if (type === TransacionTypeEnum.MsgGrant) {
		// const content = messages[0].content as MsgGrantContent
		// data.grantee = content.params.maybeGenericGrant.grantee
		// data.granter = content.params.maybeGenericGrant.granter
	}
}
