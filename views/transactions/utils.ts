import { astraToEth } from '@astradefi/address-converter'
import { formatNumber } from '@astraprotocol/astra-ui'
import { cosmosApi, evmApi } from 'api'
import API_LIST from 'api/api_list'
import { formatEther, formatUnits } from 'ethers/lib/utils'
import { TransacionTypeEnum } from 'utils/constants'
import { caculateCosmosAmount, convertMessageToTransfer, getCosmosType } from 'utils/cosmos'
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
}
export interface TransactionDetail {
	pageTitle?: string
	evmHash?: string
	cosmosHash?: string
	result?: string
	confirmations?: string
	blockHeight?: string
	time?: string | number
	from?: string
	to?: string
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
}

export const evmTransactionDetail = async (evmHash?: string, cosmosHash?: string): Promise<TransactionDetail> => {
	const data: TransactionDetail = {
		type: 'evm'
	}
	if (cosmosHash) {
		const cosmosDetailRes = await cosmosApi.get<EvmTransactionDetailFromCosmosHashResponse>(
			`${API_LIST.TRANSACTIONS}${cosmosHash}?type=evm`
		)
		const result = cosmosDetailRes.data.result
		data.evmHash = result.hash
		data.cosmosHash = result?.cosmosHash
		data.result = result.success ? 'Success' : 'Error'
		data.confirmations = `${result.confirmations}`
		data.blockHeight = `${result.blockHeight}`
		data.time = result.blockTime
		data.from = result.from
		data.to = result.to
		data.value = formatEther(result.value)
		data.fee = undefined
		data.gasPrice = formatUnits(result.gasPrice, 9) + ' NanoAstra'
		data.gasLimit = formatNumber(result.gasLimit, 0)
		data.gasUsed = result.gasUsed
		data.maxFeePerGas = result.maxFeePerGas
		data.maxPriorityFeePerGas = result.maxPriorityFeePerGas
		// data.priorityFeePerGas = undefined
		// data.gasUsedByTransaction = undefined
		data.nonce = `${result.nonce}`
		data.rawInput = isEmptyRawInput(result.input) ? undefined : result.input
		data.tokenTransfers = result?.tokenTransfers
		data.index = result.index
		data.typeOfTransfer = evmTransactionType(result.type)
		data.tabTokenTransfers = evmConvertTokenTransferToTransactionRow(
			result?.tokenTransfers,
			result.blockTime,
			result.success,
			result.hash,
			result.blockHeight
		)
	} else {
		const evmRes = await evmApi.get<EVMTransactionDetailResponse>(`${API_LIST.EVM_TRANSACTION_DETAIL}${evmHash}`)
		const result = evmRes.data.result
		data.evmHash = result.hash
		// data.cosmosHash = undefined
		data.result = result.success ? 'Success' : 'Error'
		data.confirmations = result.confirmations
		data.blockHeight = result.blockNumber
		data.time = parseFloat(result.timeStamp) * 1000
		data.from = result.from
		data.to = result.to
		// data.tokenTransfer = []
		data.value = formatEther(result.value)
		data.fee = undefined
		data.gasPrice = formatUnits(result.gasPrice, 9) + ' NanoAstra'
		data.gasLimit = formatNumber(result.gasLimit, 0)
		data.gasUsed = result.gasUsed
		// data.maxFeePerGas = undefined
		// data.maxPriorityFeePerGas = undefined
		// data.priorityFeePerGas = undefined
		// data.gasUsedByTransaction = undefined
		// data.nonce = undefined
		data.rawInput = isEmptyRawInput(result.input) ? undefined : result.input
		// data.tokenTransfers = result?.tokenTransfers
	}

	return data
}

export const cosmsTransactionDetail = async (result: TransactionItem): Promise<TransactionDetail> => {
	const data: TransactionDetail = {}
	const fee = caculateCosmosAmount(result.fee)
	data.type = 'cosmos'
	data.pageTitle = getCosmosType(result?.messages[0]?.type as string)
	data.evmHash = undefined
	data.cosmosHash = result.hash
	data.result = result.success ? 'Success' : 'Error'
	data.confirmations = undefined
	data.blockHeight = `${result.blockHeight}`
	data.time = result.blockTime
	// data.from = result.from
	// data.to = result.to
	// data.tokenTransfer = []
	// data.value = undefined
	data.fee = formatEther(fee.amount)
	data.feeToken = fee.denom
	// data.gasPrice = undefined
	// data.gasLimit = result.gasLimit
	data.gasUsed = `${result.gasUsed}`
	// data.maxFeePerGas = undefined
	// data.maxPriorityFeePerGas = undefined
	// data.priorityFeePerGas = undefined
	// data.gasUsedByTransaction = undefined
	// data.nonce = undefined
	// data.rawInput = result.input
	// msgsend
	_convertTransfer(data, result?.messages, result?.blockTime, result?.success)

	_mapMsgVoteField(data, result?.messages)
	_mapMsgDelegate(data, result?.messages)
	_mapMsgBeginRedelegate(data, result?.messages)

	return data
}
const _convertTransfer = (
	data: TransactionDetail,
	messages: TransactionMessage[],
	blockTime?: string,
	success?: boolean
) => {
	data.tabTokenTransfers = convertMessageToTransfer(messages, blockTime, success)
}
const _mapMsgVoteField = (data: TransactionDetail, messages: TransactionMessage[]) => {
	const type: TransacionTypeEnum = messages[0]?.type
	if (type === TransacionTypeEnum.MsgVote) {
		const content = messages[0].content as CosmosMsgVote
		data.voter = astraToEth(content.voter)
		data.proposalId = content.proposalId
		data.option = content.option
	}
}

const _mapMsgDelegate = (data: TransactionDetail, messages: TransactionMessage[]) => {
	const type: TransacionTypeEnum = messages[0]?.type
	if (type === TransacionTypeEnum.MsgDelegate) {
		const content = messages[0].content as CosmosMsgDelegate
		data.delegatorAddress = content.delegatorAddress
		data.validatorAddress = content.validatorAddress
	}
}

const _mapMsgBeginRedelegate = (data: TransactionDetail, messages: TransactionMessage[]) => {
	const type: TransacionTypeEnum = messages[0]?.type
	if (type === TransacionTypeEnum.MsgBeginRedelegate) {
		const content = messages[0].content as CosmosMsgBeginRedelegate
		data.delegatorAddress = content.delegatorAddress
		data.validatorSrcAddress = content.validatorSrcAddress
		data.validatorDstAddress = content.validatorDstAddress
	}
}
