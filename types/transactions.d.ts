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
	type: TransactionTypeEnum
	evmType?: string
	content:
		| MsgCreateValidatorContent
		| MsgUnjailContent
		| MsgEthereumTxContent
		| MsgBeginRedelegateContent
		| MsgSendContent
		| MsgExecContent
		| MsgGrantContent
		| MsgUndelegateContent
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
	type?: string
	totalFee?: TokenAmount // client
}

interface TransactionItemModified extends TransactionItem {
	totalFee: TokenAmount
	evmType: string
	from?: string
	to?: string
	value?: string
	evmHash?: string
}

interface TransactionSearchResponse {
	evmHash: string
	cosmosHash: string
	insertedAt: string
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
	tokenId?: string
	tokenType?: string
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
	createdContractAddressHash?: string
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
	contractAddress?: string
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

interface EvmTransactionDetailResponse {
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
		fromAddressName?: string
		fee?: TokenAmount[]
		gasLimit: string
		gasPrice: string
		gasUsed: string
		hash: string
		index: number
		input: string
		log?: string
		logs: EvmLog[]
		maxFeePerGas: null
		maxPriorityFeePerGas: null
		nonce: number
		r: string
		revertReason: string
		s: string
		success: boolean
		to: string
		toAddressName?: string
		createdContractAddressName?: string
		createdContractAddressHash?: string
		tokenTransfers: EVMTransferItem[]
		type: number
		v: string
		value: string
		messages?: MsgEthereumTx[]
		transactionFee?: string
	}
	status: string
}

interface TextProposalContent {
	type: 'text' | 'table'
	title: string
	description?: string
	cols?: string[]
	rows?: string[][]
}
interface TransactionDetail {
	pageTitle?: string
	evmHash?: string
	cosmosHash?: string
	result?: string
	confirmations?: string
	blockHeight?: string
	time?: string | number
	from?: string | string[] // Multisig or unique address
	fromAddressName?: string
	to?: string
	toAddressName?: string
	createdContractAddressHash?: string
	createdContractAddressName?: string
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
	//MsgTextProposal
	proposer?: string
	initialDepositValue?: number
	initialDepositTokenSymbol?: string
	textProposalContent?: TextProposalContent[]

	revertReason?: string
	logs?: EvmLog[]
	memo?: string
}

interface TransactionMsgExecDetail extends TransactionDetail {
	grantee: string
}

interface TransactionMsgWithdrawDelegatorRewardDetail extends TransactionDetail {
	recipientAddress: string
	validatorAddress: string
	delegatorAddress: string
}

interface TransactionMsgCreateValidatorDetail extends TransactionDetail {
	uuid: string
	tendermintPubkey: string
	validatorAddress: string
	validatorDescription: ValidatorData
	commissionRates: CommissionRates
	minSelfDelegation: string
}

interface TransactionMsgUndelegateDetail extends TransactionDetail {}
