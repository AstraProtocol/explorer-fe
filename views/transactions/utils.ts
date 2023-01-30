import { astraToEth } from '@astradefi/address-converter'
import { formatNumber } from '@astraprotocol/astra-ui'
import { cosmosApi } from 'api'
import API_LIST from 'api/api_list'
import { BigNumber, utils } from 'ethers'
import { formatEther, formatUnits } from 'ethers/lib/utils'
import { isArray, isEmpty, isUndefined } from 'lodash'
import numeral from 'numeral'
import { convertMessageToTransfer, getTransactionType } from 'utils/cosmos'
import { TransactionTypeEnum } from 'utils/enum'
import { evmConvertTokenTransferToTransactionRow, evmTransactionType, isEmptyRawInput } from 'utils/evm'

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
	data.evmHash = isUndefined(evmHash)
		? result.messages && result.messages.length > 0
			? getEvmTxhash(result.messages)
			: result.hash
		: evmHash
	// data.pageTitle = result.messages ? getTransactionType(result.messages[0]?.type) : ''
	data.cosmosHash = cosmosHash || result.cosmosHash
	data.result = result.success ? 'Success' : 'Error'
	data.confirmations = result.confirmations ? result.confirmations.toString() : ''
	data.blockHeight = `${result.blockHeight}`
	data.time = result.blockTime
	data.from = result.from
	data.fromAddressName = result.fromAddressName
	data.to = result.to
	data.toAddressName = result.toAddressName
	data.createdContractAddressHash = result.createdContractAddressHash
	data.createdContractAddressName = result.createdContractAddressName
	data.value = (result.value ? formatEther(result.value) : caculateEthereumTxAmount(result.messages)) || '0'
	data.fee = result.transactionFee && result.transactionFee.length > 0 ? formatEther(result.transactionFee) : ''
	if (!data.fee) {
		data.fee = result.fee && result.fee.length > 0 ? formatEther(result.fee[0].amount) : ''
	}
	data.gasPrice = result.gasPrice ? formatUnits(result.gasPrice, 9) + ' NanoAstra' : ''
	data.gasLimit = result.gasLimit ? formatNumber(result.gasLimit, 0) : ''
	data.gasUsed = result.gasUsed
	data.maxFeePerGas = result.maxFeePerGas ? formatUnits(result.maxFeePerGas, 9) + ' NanoAstra' : undefined
	data.maxPriorityFeePerGas = result.maxPriorityFeePerGas
		? formatUnits(result.maxPriorityFeePerGas, 9) + ' NanoAstra'
		: undefined
	data.gasUsedByTransaction = result.gasUsed
		? `${numeral(result.gasUsed).format('0,0')} | ${numeral(
				parseFloat(result.gasUsed) / parseFloat(result.gasLimit)
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
	// data.from = getSignerEthAddress(result.signers)
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
	_mapMsgUndelegate(data, result?.messages)
	_mapMsgBeginRedelegate(data, result?.messages)
	_mapMsgExec(data as TransactionMsgExecDetail, result?.messages)
	_mapMsgGrant(data, result?.messages)
	_mapMsgWithdrawDelegatorReward(data as TransactionMsgWithdrawDelegatorRewardDetail, result?.messages)
	_mapMsgCreateValidator(data as TransactionMsgCreateValidatorDetail, result?.messages)
	_mapMsgTextProposal(data, result)
	return data
}

// /**
//  *
//  * @param amounts {denom, amount}
//  * @returns amount in string (bignumber)
//  */
// export const getAstraTokenAmount = (amounts: TokenAmount[]): string => {
// 	if (amounts && amounts.length > 0) {
// 		let totalAmount = BigNumber.from('0')
// 		for (let amount of amounts) {
// 			if (amount.denom === 'aastra') {
// 				totalAmount = totalAmount.add(BigNumber.from(amount.amount))
// 			}
// 		}

// 		return totalAmount.toString()
// 	}
// 	return '0'
// }

/**
 *
 * @param amounts {denom, amount}
 * @returns amount in string (bignumber)
 */
export const getAstraTokenAmount = (amount: TokenAmount | TokenAmount[]): string => {
	let totalAmount = BigNumber.from('0')
	if (isArray(amount)) {
		for (let a of amount) {
			totalAmount = totalAmount.add(BigNumber.from(a.amount))
		}
	} else if (!isArray(amount)) {
		totalAmount = totalAmount.add(BigNumber.from(amount.amount))
	}

	return totalAmount.toString()
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
			if (message.content?.amount)
				totalAmount = totalAmount.add(BigNumber.from(getAstraTokenAmount(message.content.amount)))
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
	return messages?.[0]?.content?.params?.hash || undefined
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

const _convertTransfer = (
	data: TransactionDetail,
	messages: TransactionMessage[],
	blockTime?: string,
	success?: boolean
) => {
	data.tabTokenTransfers = convertMessageToTransfer(messages, blockTime, success)
}

const _mapMsgSendField = (data: TransactionDetail, result: TransactionItem) => {
	const type: string = result?.messages[0]?.type
	if (type === TransactionTypeEnum.MsgSend) {
		const content = result?.messages[0].content as unknown as MsgSendContent
		data.from = astraToEth(content.fromAddress)
		data.to = astraToEth(content.toAddress)
	}
}
const _mapMsgVoteField = (data: TransactionDetail, messages: TransactionMessage[]) => {
	const type: string = messages[0]?.type
	if (type === TransactionTypeEnum.MsgVote) {
		const content = messages[0].content as unknown as MsgVoteContent
		data.voter = astraToEth(content.voter)
		data.proposalId = content.proposalId
		data.option = content.option
	}
}

const _mapMsgDelegate = (data: TransactionDetail, messages: TransactionMessage[]) => {
	const type: string = messages[0]?.type
	if (type === TransactionTypeEnum.MsgDelegate) {
		const content = messages[0].content as unknown as MsgDelegateContent
		data.delegatorAddress = content.delegatorAddress
		data.validatorAddress = content.validatorAddress
		data.value = formatEther(content.amount.amount)
	}
}

const _mapMsgUndelegate = (data: TransactionDetail, messages: TransactionMessage[]) => {
	const type: string = messages[0]?.type
	if (type === TransactionTypeEnum.MsgUndelegate) {
		const content = messages[0].content as unknown as MsgUndelegateContent
		data.delegatorAddress = content.delegatorAddress
		data.validatorAddress = content.validatorAddress
		data.value = formatEther(content.amount.amount)
		// Missing amount of auto claim reward
	}
}

const _mapMsgBeginRedelegate = (data: TransactionDetail, messages: TransactionMessage[]) => {
	const type: string = messages[0]?.type
	if (type === TransactionTypeEnum.MsgBeginRedelegate) {
		const content = messages[0].content as MsgBeginRedelegateContent
		data.delegatorAddress = content.delegatorAddress
		data.validatorSrcAddress = content.validatorSrcAddress
		data.validatorDstAddress = content.validatorDstAddress
		data.value = formatEther(content.amount.amount)
	}
}

const _mapMsgExec = (data: TransactionMsgExecDetail, messages: TransactionMessage[]) => {
	const type: string = messages[0]?.type
	if (type === TransactionTypeEnum.MsgExec) {
		const content = messages[0].content as MsgExecContent
		data.grantee = content.params.grantee
		// @todo convert msgs to display
	}
}
const _mapMsgGrant = (data: TransactionDetail, messages: TransactionMessage[]) => {
	const type: string = messages[0]?.type
	if (type === TransactionTypeEnum.MsgGrant) {
		// const content = messages[0].content as MsgGrantContent
		// data.grantee = content.params.maybeGenericGrant.grantee
		// data.granter = content.params.maybeGenericGrant.granter
	}
}

const _mapMsgWithdrawDelegatorReward = (
	data: TransactionMsgWithdrawDelegatorRewardDetail,
	messages: TransactionMessage[]
) => {
	const type: string = messages[0]?.type
	if (type === TransactionTypeEnum.MsgWithdrawDelegatorReward) {
		const content = messages[0].content as MsgWithdrawDelegatorRewardContent
		data.delegatorAddress = content.delegatorAddress
		data.recipientAddress = content.recipientAddress
		data.validatorAddress = content.validatorAddress
	}
}

const _mapMsgCreateValidator = (data: TransactionMsgCreateValidatorDetail, messages: TransactionMessage[]) => {
	const type: string = messages[0]?.type
	if (type === TransactionTypeEnum.MsgCreateValidator) {
		const content = messages[0].content as MsgCreateValidatorContent

		data.delegatorAddress = content.delegatorAddress
		data.validatorDescription = content.description
		data.commissionRates = content.commissionRates
		data.minSelfDelegation = content.minSelfDelegation
		data.validatorAddress = content.validatorAddress
		data.tendermintPubkey = content.tendermintPubkey
	}
}

const _mapMsgTextProposal = (data: TransactionDetail, result: TransactionItem) => {
	const type: string = result?.messages[0]?.type
	if (type === TransactionTypeEnum.TextProposal) {
		const content = result?.messages[0].content as unknown as TextProposalFullContent
		if (content) {
			data.proposer = content.proposerAddress
			if (content.initialDeposit && content.initialDeposit.length > 0) {
				data.initialDepositValue = content.initialDeposit.reduce<number>(
					(sum, obj) => sum + Number(utils.formatEther(obj.amount)),
					0
				)
				data.initialDepositTokenSymbol = content.initialDeposit[0].denom
			}
			const tabContentData = content.content
			if (tabContentData) {
				data.textProposalContent = []
				data.textProposalContent.push({ title: 'Type', description: tabContentData['@type'] })
				data.textProposalContent.push({ title: 'Title', description: tabContentData.title })
				data.textProposalContent.push({ title: 'Description', description: tabContentData.description })
			}
		}
	}
}
