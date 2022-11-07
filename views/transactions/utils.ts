import { astraToEth } from '@astradefi/address-converter'
import { formatNumber } from '@astraprotocol/astra-ui'
import { cosmosApi, evmApi } from 'api'
import API_LIST from 'api/api_list'
import { BigNumber } from 'ethers'
import { formatEther, formatUnits } from 'ethers/lib/utils'
import numeral from 'numeral'
import { TransacionTypeEnum } from 'utils/constants'
import { caculateCosmosAmount, convertMessageToTransfer, getTransactionType } from 'utils/cosmos'
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
	from?: string
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
}

export enum CardInfoLabels {
	Transaction_Hash = 'Transaction Hash:',
	Transaction_Cosmos = 'Transaction Cosmos:',
	Result = 'Result:',
	Status = 'Status:',
	Block = 'Block:',
	From = 'From:',
	To = 'Interacted With (To):',
	CreatedContractAddressHash = 'To',
	Timestamp = 'Timestamp:',
	Value = 'Value:',
	Transaction_Fee = 'Transaction Fee:',
	Gas_Price = 'Gas Price:',
	Gas_Limit = 'Gas Limit:',
	Raw_Input = 'Raw Input:',
	Tokens_Transferred = 'Tokens Transferred:',
	Nonce = 'Nonce',
	Transaction_Type = 'Transaction Type:',
	Voter = 'Voter:',
	Proposal_Id = 'Proposal Id:',
	Option = 'Option:',
	Delegator_Address = 'Delegator Address:',
	Validator_Address = 'Validator Address:',
	Validator_Src_Address = 'Validator Src Address:',
	Validator_Dst_Address = 'Validator Dst Address:',
	Fail_Reason = 'Fail reason:',
	Revert_Reason = 'Revert reason:',
	Max_Fee_Gas = 'Max Fee/ Gas:',
	Max_Priority_Fer_Gas = 'Max Priority Fee/ Gas:',
	Gas_Used_by_Transaction = 'Gas Used by Transaction:',
	hash = 'Hash:',
	Block_Height = 'Block Height:',
	Transaction = 'Transaction:'
}

export const evmTransactionDetail = async (evmHash?: string, cosmosHash?: string): Promise<TransactionDetail> => {
	let data: TransactionDetail = {}
	if (cosmosHash) {
		const cosmosDetailRes = await cosmosApi.get<EvmTransactionDetailFromCosmosHashResponse>(
			`${API_LIST.TRANSACTIONS}/${cosmosHash}?type=evm`
		)
		const result = cosmosDetailRes.data.result
		if (!result) return

		data.evmHash =
			result.messages && result.messages.length > 0 ? result.messages[0].content.params.hash : result.hash
		data.pageTitle = result.messages ? getTransactionType(result.messages[0]?.type) : ''
		data.cosmosHash = result.cosmosHash || cosmosHash
		data.result = result.success ? 'Success' : 'Error'
		data.confirmations = result.confirmations ? result.confirmations.toString() : ''
		data.blockHeight = `${result.blockHeight}`
		data.time = result.blockTime
		data.from = result.from
		data.to = result.to
		data.createdContractAddressHash = result.createdContractAddressHash
		data.value = (result.value ? formatEther(result.value) : caculateTxAmount(result.messages)) || '0'
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
	} else if (evmHash?.startsWith('0x')) {
		const evmRes = await evmApi.get<EvmTransactionDetailFromCosmosHashResponse>(
			`${API_LIST.EVM_TRANSACTION_DETAIL}${evmHash}`
		)
		const result = evmRes.data.result
		if (!result) return

		data.evmHash =
			result.messages && result.messages.length > 0 ? result.messages[0].content.params.hash : result.hash
		data.cosmosHash = result.cosmosHash
		data.pageTitle = result.messages ? getTransactionType(result.messages[0]?.type) : ''
		data.result = result.success ? 'Success' : 'Error'
		data.confirmations = result.confirmations ? result.confirmations.toString() : ''
		data.blockHeight = `${result.blockHeight}`
		data.time = result.blockTime
		data.from = result.from
		data.to = result.to
		data.createdContractAddressHash = result.createdContractAddressHash
		data.value = (result.value ? formatEther(result.value) : caculateTxAmount(result.messages)) || '0'
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
		data.nonce = `${result.nonce}`
		data.rawInput = isEmptyRawInput(result.input) ? undefined : result.input
		data.tokenTransfers = result.tokenTransfers
		data.index = result.index
		data.failLog = result.error || result.log
		data.revertReason = result.revertReason
		data.typeOfTransfer = evmTransactionType(result.type)
		data.tabTokenTransfers =
			result.tokenTransfers &&
			result.tokenTransfers.length > 0 &&
			evmConvertTokenTransferToTransactionRow(
				result.tokenTransfers,
				result.blockTime,
				result.success,
				result.hash,
				result.blockHeight
			)
		data.logs = result.logs
	} else {
		return null
	}
	data['type'] = 'evm'
	return data
}

export const cosmsTransactionDetail = async (result: TransactionItem): Promise<TransactionDetail> => {
	const data: TransactionDetail = {}
	const fee = caculateCosmosAmount(result.fee)
	data.type = 'cosmos'
	data.pageTitle = getTransactionType(result?.messages[0]?.type)
	data.evmHash = ''
	data.cosmosHash = result.hash
	data.result = result.success ? 'Success' : 'Error'
	data.confirmations = undefined
	data.blockHeight = `${result.blockHeight}`
	data.time = result.blockTime
	data.failLog = !result.success ? result.log : undefined
	data.value = caculateTxAmount(result.messages) || '0'
	// data.from = result.from
	// data.to = result.to
	// data.tokenTransfer = []
	// data.value = undefined
	data.fee = formatEther(fee.amount || '0')
	data.feeToken = 'asa'
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
	_mapMsgSendField(data, result)
	_mapMsgVoteField(data, result?.messages)
	_mapMsgDelegate(data, result?.messages)
	_mapMsgBeginRedelegate(data, result?.messages)

	return data
}

/**
 * return tx amount
 * @param tx messages
 * @returns amount in string
 */
export const caculateTxAmount = (messages: TransactionMessage[]): string => {
	if (messages && messages.length > 0) {
		let totalAmount = BigNumber.from('0')
		for (let message of messages) {
			totalAmount = totalAmount.add(BigNumber.from(message.content?.params?.data?.value || '0'))
		}
		return formatEther(totalAmount)
	}
	return '0'
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
