interface Signer {
	keyInfo: {
		type: string
		isMultiSig: boolean
		pubkeys: string[]
	}
	address: string
	accountSequence: number
}

interface EVMTransactionContent {
	msgIndex: number
	name: string
	uuid: string
	height: number
	params: {
		'from': string
		'hash': string
		'size': number
		'@type': TransacionTypeEnum
		'data': {
			'to': string
			'gas': string
			'r': string
			'v': string
			'@type': TransacionTypeEnum
			'nonce': string
			'value': string
			'gasPrice': string
			's': string
			'data': string
		}
	}
	txHash: string
	msgName: string
	version: number
}

interface CosmosMsgSend {
	amount: {
		denom: string
		amount: string
	}[]
	txHash: string
	msgName: string
	msgIndex: number
	toAddress: string
	fromAddress: string
	name: string
	uuid: string
	height: number
	version: number
}

interface CosmosMsgBeginRedelegate {
	height: number
	msgName: string
	delegatorAddress: string
	autoClaimedRewards: {
		denom: string
		amount: string
	}
	validatorSrcAddress: string
	name: string
	uuid: string
	amount: {
		denom: string
		amount: string
	}
	txHash: string
	version: number
	msgIndex: number
	validatorDstAddress: string
}

interface CosmosMsgVote {
	option: string
	txHash: string
	msgName: string
	version: number
	proposalId: string
	name: string
	uuid: string
	voter: string
	height: number
	msgIndex: number
}

interface CosmosMsgDelegate {
	txHash: string
	msgIndex: number
	msgName: string
	version: number
	delegatorAddress: string
	validatorAddress: string
	name: string
	uuid: string
	amount: {
		denom: string
		amount: string
	}
	height: number
	autoClaimedRewards: {
		amount: string
		denom: string
	}
}

interface CosmosMsgWithdrawDelegatorReward {
	amount: {
		denom: string
		amount: string
	}[]
	height: number
	msgName: string
	version: number
	msgIndex: number
	validatorAddress: string
	name: string
	uuid: string
	txHash: string
	delegatorAddress: string
	recipientAddress: string
}

interface CosmosAmountItem {
	denom: string
	amount: string
}

interface TransactionMessage {
	type: TransacionTypeEnum
	content:
		| EVMTransactionContent
		| CosmosMsgSend
		| CosmosMsgBeginRedelegate
		| CosmosMsgWithdrawDelegatorReward
		| CosmosMsgVote
		| CosmosMsgDelegate
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
	fee: CosmosAmountItem[]
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
	data: string
	index: string
	topics: string[]
}
interface EVMTransactionDetail {
	blockNumber: string
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
