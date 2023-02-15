import { astraToEth } from '@astradefi/address-converter'
import { formatNumber } from '@astraprotocol/astra-ui'
import { cosmosApi } from 'api'
import API_LIST from 'api/api_list'
import { BigNumber } from 'ethers'
import { formatEther, formatUnits } from 'ethers/lib/utils'
import { isEmpty, isUndefined } from 'lodash'
import numeral from 'numeral'
import { convertMessageToTransfer, getTransactionType } from 'utils/cosmos'
import { TransactionTypeEnum } from 'utils/enum'
import { evmConvertTokenTransferToTransactionRow, evmTransactionType, isEmptyRawInput } from 'utils/evm'
import { getAstraTokenAmount, handleCosmosMsg } from './cosmosMessage'

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

export const evmTransactionDetail = async (evmHash?: string, cosmosHash?: string): Promise<TransactionDetail> => {
	let data: TransactionDetail = {}

	const res = await cosmosApi.get<EvmTransactionDetailResponse>(
		`${API_LIST.TRANSACTIONS}/${evmHash || cosmosHash}?type=evm`
	)
	const result = res.data.result
	if (!result) return

	const [from, to] = _getFromAndToEvmFromCosmosMsg(res.data)
	data.evmHash = isUndefined(evmHash)
		? result.messages && result.messages.length > 0
			? getEvmTxhash(result.messages)
			: result.hash
		: evmHash
	data.cosmosHash = cosmosHash || result.cosmosHash || result.messages?.[0]?.content?.txHash || ''
	data.result = result.success ? 'Success' : 'Error'
	data.confirmations = result.confirmations ? result.confirmations.toString() : ''
	data.blockHeight = `${result.blockHeight}`
	data.time = result.blockTime
	data.from = from
	data.fromAddressName = result.fromAddressName
	data.to = to
	data.toAddressName = result.toAddressName
	data.createdContractAddressHash = result.createdContractAddressHash
	data.createdContractAddressName = result.createdContractAddressName
	data.value = (result.value ? formatEther(result.value) : caculateEthereumTxAmount(result.messages)) || '0'
	data.fee = result.transactionFee && result.transactionFee.length > 0 ? formatEther(result.transactionFee) : ''
	if (!data.fee) {
		data.fee = result.fee && result.fee.length > 0 ? formatEther(result.fee[0].amount) : ''
	}
	data.gasPrice = result.gasPrice
		? formatNumber(formatUnits(result.gasPrice, 9)) + ' NanoAstra'
		: result?.messages[0]?.content?.params?.data?.gasPrice
		? formatNumber(formatUnits(result?.messages[0]?.content?.params?.data?.gasPrice, 9)) + ' NanoAstra'
		: ''
	data.gasLimit = result.gasLimit ? formatNumber(result.gasLimit, 0) : ''
	data.gasUsed = result.gasUsed
	data.maxFeePerGas = result.maxFeePerGas ? formatUnits(result.maxFeePerGas, 9) + ' NanoAstra' : undefined
	data.maxPriorityFeePerGas = result.maxPriorityFeePerGas
		? formatUnits(result.maxPriorityFeePerGas, 9) + ' NanoAstra'
		: undefined
	data.gasUsedByTransaction = result.gasUsed
		? `${numeral(result.gasUsed).format('0,0')} ${
				result.gasLimit
					? `| ${numeral(parseFloat(result.gasUsed) / parseFloat(result.gasLimit)).format('0.00%')}`
					: ''
		  }`
		: undefined
	data.nonce = !isUndefined(result.nonce)
		? result.nonce.toString()
		: result?.messages?.[0]?.content?.params?.data?.nonce
	data.rawInput = isEmptyRawInput(result.input) ? undefined : result.input
	data.tokenTransfers = result.tokenTransfers
	data.index = result.index
	data.failLog = !result.success ? result.error || result.log : ''
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
	// result.messages = result.messages.concat(result.messages).concat(result.messages).concat(result.messages)
	const data: TransactionDetail = {}
	const fee = caculateAmount(result.fee)
	data.type = 'cosmos'
	data.pageTitle = getTransactionType(result?.messages?.[0]?.type)
	data.cosmosMsgCount = comosTransactionMsgCount(result.messages)
	data.evmHash = ''
	data.cosmosHash = result.hash
	data.result = result.success ? 'Success' : 'Error'
	data.confirmations = undefined
	data.blockHeight = `${result.blockHeight}`
	data.time = result.blockTime
	data.failLog = !result.success ? result.log : undefined
	data.totalAmount = caculateCosmosTxAmount(result.messages) || '0'
	data.memo = result.memo
	data.fee = formatEther(fee.amount || '0')
	data.feeToken = process.env.NEXT_PUBLIC_NATIVE_TOKEN.toUpperCase()
	data.gasLimit = result.gasWanted?.toString()
	data.gasUsed = `${result.gasUsed}`
	data.gasUsedByTransaction = result.gasUsed
		? `${numeral(result.gasUsed).format('0,0')} | ${numeral(result.gasUsed / result.gasWanted).format('0.00%')}`
		: undefined
	// msgsend
	_convertTransfer(data, result?.messages, result?.blockTime, result?.success)

	const { messageData } = handleCosmosMsg(result.messages)
	data.cosmosTxnMessages = messageData
	return data
}

/**
 * return ethereumtx amount
 * @param tx messages
 * @returns amount in string
 */
export const caculateEthereumTxAmount = (messages: MsgEthereumTx[] | TransactionMessage[]): string => {
	if (messages && messages.length > 0) {
		let totalAmount = BigNumber.from('0')
		for (let message of messages) {
			totalAmount = totalAmount.add(
				BigNumber.from((message.content as MsgEthereumTxContent)?.params?.data?.value || '0')
			)
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
			if ((message.content as MsgSendContent)?.amount) {
				totalAmount = totalAmount.add(
					BigNumber.from(getAstraTokenAmount((message.content as MsgSendContent).amount))
				)
			}
			if ((message.content as TextProposalFullContent)?.initialDeposit) {
				totalAmount = totalAmount.add(
					BigNumber.from(getAstraTokenAmount((message.content as TextProposalFullContent).initialDeposit))
				)
			}
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

/**
 * Get Evm TxHash from messages
 * @param messages: MsgEthereumTx[]
 * @returns
 */
export const getEvmTxhash = (messages: MsgEthereumTx[] | TransactionMessage[]): string | undefined => {
	return (messages?.[0]?.content as MsgEthereumTxContent)?.params?.hash || undefined
}

export const getSignerEthAddress = (signers: Signer[]) => {
	const addresses = []
	signers.forEach((s: Signer) => {
		if (s.address) addresses.push(astraToEth(s.address))
	})
	return addresses
}

export const getFromToTxFromCosmosEntry = (message: TransactionMessage) => {
	let evmHash = '',
		from = '',
		to = ''
	if (isEmpty(message)) {
		return { evmHash, from, to }
	}

	if (message?.type === TransactionTypeEnum.Ethermint) {
		const content = message.content as MsgEthereumTxContent
		evmHash = content?.params?.hash
		from = content?.params?.from
		to = content?.params?.data?.to
	} else if (message?.type === TransactionTypeEnum.MsgSend) {
		const content = message.content as MsgSendContent
		from = content.fromAddress ? astraToEth(content.fromAddress) : content.fromAddress
		to = content.toAddress ? astraToEth(content.toAddress) : content.toAddress
	}

	return { evmHash, from, to }
}
/**
 * [TransactionTypeEnum.MsgGrant, TransactionTypeEnum.MsgRevoke] are msg of TransactionTypeEnum.MsgExec
 * @param messages
 * @returns
 */
export const comosTransactionMsgCount = (messages: TransactionMessage[]): string => {
	if (!isEmpty(messages) && messages.length > 1) {
		let countMsg = [...messages]
		if (messages[0].type === TransactionTypeEnum.MsgExec) {
			countMsg = countMsg.filter(
				msg => ![TransactionTypeEnum.MsgGrant, TransactionTypeEnum.MsgRevoke].includes(msg.type)
			)
		}
		return countMsg.length > 1 ? `+ ${countMsg.length - 1}` : ''
	}
	return ''
}

const _convertTransfer = (
	data: TransactionDetail,
	messages: TransactionMessage[],
	blockTime?: string,
	success?: boolean
) => {
	data.tabTokenTransfers = convertMessageToTransfer(messages, blockTime, success)
}

const _getFromAndToEvmFromCosmosMsg = (res: EvmTransactionDetailResponse): [string, string] => {
	const { result } = res
	const { messages } = result

	let from = ''
	let to = ''
	if (!isEmpty(result) && !isEmpty(result.from) && !isEmpty(result.to)) {
		// server parsed
		from = result.from
		to = result.to
	} else {
		// server is parsing data
		const message = messages?.[0]
		try {
			from = message.content.params.from
			to = message.content.params.data.to
		} catch (e) {}
	}

	return [from, to]
}
