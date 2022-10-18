interface Signer {
	keyInfo: {
		type: string
		isMultiSig: boolean
		pubkeys: string[]
	}
	address: string
	accountSequence: number
}

interface TokenAmount {
	denom: string
	amount: string
}

interface TransactionMessage {
	type: TransacionTypeEnum
	content: MsgCreateValidatorContent | MsgUnjailContent | MsgEthereumTxContent | MsgBeginRedelegateContent
}

interface TransactionItem {
	newTransaction?: boolean
	blockHeight: number
	blockHash: string
	blockTime: string
	hash: string
	index: number
	success: boolean
	code: number
	log: string
	fee: TokenAmount[]
	feePayer: string
	feeGranter: string
	gasWanted: number
	gasUsed: number
	memo: string
	timeoutHeight: number
	messages: TransactionMessage[]
	signers: Signer[]
}

interface TransactionResponse {
	result: TransactionItem[]
	pagination: Pagination
}

interface TransactionDetailResponse {
	result: TransactionItem
	pagination: Pagination
}
interface EVMTransferItem {
	amount: string
	fromAddress: string
	decimals: string
	logIndex: string
	toAddress: string
	tokenContractAddress: string
	tokenName: string
	tokenSymbol: string
	fromAddressName: string
	toAddressName: string
}
interface EvmLog {
	address: string
	addressName: string
	data: string
	index: string
	topics: string[]
}
interface EVMTransactionDetail {
	blockNumber: string
	blockTime: string
	confirmations: string
	from: string
	gasLimit: string
	gasPrice: string
	gasUsed: string
	hash: string
	input: string
	logs: EvmLog[]
	tokenTransfers: EVMTransferItem[]
	next_page_params: null
	revertReason: string
	success: boolean
	timeStamp: string
	to: string
	value: string
}
interface EVMTransactionDetailResponse {
	message: string
	result: EVMTransactionDetail
	status: string
}

interface InternalTransactionItem {
	blockNumber: string
	callType: string
	contractAddress: string
	errCode: string
	from: string
	gas: string
	gasUsed: string
	index: string
	input: string
	isError: string
	timeStamp: string
	to: string
	transactionHash: string
	type: string
	value: string
	fromAddressName: string
	toAddressName: string
}
interface InternalTransactionReponse {
	message: 'OK' | string
	result: InternalTransactionItem[]
	status: string
}

interface TransactionRawTraceResponse {
	message: string
	result: {
		rawTrace: any[]
	}
	status: string
}

interface EvmTransactionDetailFromCosmosHashResponse {
	message: string
	result: {
		blockHash: string
		blockHeight: number
		blockTime: string
		confirmations: number
		cosmosHash: string
		createdContractCodeIndexedAt: null
		cumulativeGasUsed: string
		error: string
		from: string
		gasLimit: string
		gasPrice: string
		gasUsed: string
		hash: string
		index: number
		input: string
		logs: EvmLog[]
		maxFeePerGas: null
		maxPriorityFeePerGas: null
		nonce: number
		r: string
		revertReason: string
		s: string
		success: boolean
		to: string
		tokenTransfers: EVMTransferItem[]
		type: number
		v: string
		value: string
	}
	status: string
}
