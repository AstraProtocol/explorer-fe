import { formatNumber } from '@astraprotocol/astra-ui'
import { evmApi } from 'api'
import API_LIST from 'api/api_list'
import { formatEther, formatUnits } from 'ethers/lib/utils'
import { TransactionDetail } from './hook/useConvertData'

export const evmTransactionDetail = async (evmHash?: string, cosmosHash?: string): Promise<TransactionDetail> => {
	const data: TransactionDetail = {}
	if (cosmosHash) {
		const cosmosDetailRes = await evmApi.get<CosmosTransactionDetailResponse>(
			`${API_LIST.COSMOS_TRANSACTION}${cosmosHash}`
		)

		const result = cosmosDetailRes.data.result
		data.evmHash = result.hash
		data.cosmosHash = result?.cosmosHash
		data.result = result.success ? 'Success' : 'Error'
		data.status = `${result.confirmations}`
		data.blockHeight = `${result.blockHeight}`
		data.time = result.blockTime
		data.from = result.from
		data.to = result.to
		data.value = formatEther(result.value)
		data.fee = undefined
		data.gasPrice = formatUnits(result.gasPrice, 9) + ' NanoAstra'
		// data.type = undefined
		data.gasLimit = formatNumber(result.gasLimit, 0)
		data.gasUsed = result.gasUsed
		data.maxFeePerGas = result.maxFeePerGas
		data.maxPriorityFeePerGas = result.maxPriorityFeePerGas
		// data.priorityFeePerGas = undefined
		// data.gasUsedByTransaction = undefined
		data.nonce = `${result.nonce}`
		data.rawInput = result.input
		data.tokenTransfers = result?.tokenTransfers
		data.index = result.index
	} else {
		const evmRes = await evmApi.get<EVMTransactionDetailResponse>(`${API_LIST.EVM_TRANSACTION_DETAIL}${evmHash}`)
		const result = evmRes.data.result
		data.evmHash = result.hash
		// data.cosmosHash = undefined
		data.result = result.success ? 'Success' : 'Error'
		data.status = result.confirmations
		data.blockHeight = result.blockNumber
		data.time = parseFloat(result.timeStamp) * 1000
		data.from = result.from
		data.to = result.to
		// data.tokenTransfer = []
		data.value = formatEther(result.value)
		data.fee = undefined
		data.gasPrice = formatUnits(result.gasPrice, 9) + ' NanoAstra'
		// data.type = undefined
		data.gasLimit = formatNumber(result.gasLimit, 0)
		data.gasUsed = result.gasUsed
		// data.maxFeePerGas = undefined
		// data.maxPriorityFeePerGas = undefined
		// data.priorityFeePerGas = undefined
		// data.gasUsedByTransaction = undefined
		// data.nonce = undefined
		data.rawInput = result.input
		data.tokenTransfers = result?.tokenTransfers
	}

	return data
}

export const cosmsTransactionDetail = async (result: TransactionItem): Promise<TransactionDetail> => {
	const data: TransactionDetail = {}
	data.evmHash = result.hash
	data.cosmosHash = undefined
	data.result = result.success ? 'Success' : 'Error'
	// data.status = undefined
	data.blockHeight = `${result.blockHeight}`
	data.time = result.blockTime
	// data.from = result.from
	// data.to = result.to
	// data.tokenTransfer = []
	// data.value = undefined
	data.fee = formatEther(result?.fee[0]?.amount)
	data.feeToken = result?.fee[0]?.denom
	// data.gasPrice = undefined
	// data.type = undefined
	// data.gasLimit = result.gasLimit
	data.gasUsed = `${result.gasUsed}`
	// data.maxFeePerGas = undefined
	// data.maxPriorityFeePerGas = undefined
	// data.priorityFeePerGas = undefined
	// data.gasUsedByTransaction = undefined
	// data.nonce = undefined
	// data.rawInput = result.input
	return data
}
