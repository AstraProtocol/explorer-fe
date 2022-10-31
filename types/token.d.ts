interface TokenTransactionResponse {
	hasNextPage: boolean
	nextPagePath: any
	result: TokenTransaction[]
}

interface TokenHolderResponse {
	hasNextPage: boolean
	result: Holder[]
}

interface TopAstraHolderResponse {
	hasNextPage: boolean
	nextPagePath: any
	result: Holder[]
}

interface UseTokenTransactionHookData {
	result: TokenTransaction[] | []
	hasNextPage: boolean
	nextPagePath: string
}

interface UseTokenHolderData {
	result: Holder[]
	hasNextPage: boolean
}

interface UseTokenHookData {
	tokens: Token[]
	hasNextPage: boolean
}

interface TokenResponse {
	result: Token[]
	hasNextPage: boolean
}

interface TokenTransaction {
	amount: string
	blockHash: string
	blockNumber: string
	decimals: string
	fromAddress: string
	fromAddressName: string
	timestamp: string
	toAddress: string
	toAddressName: string
	tokenContractAddress: string
	tokenName: string
	tokenSymbol: string
	transactionHash: string
}

interface Token {
	cataloged?: boolean
	contractAddressHash?: string
	contractAddress?: string
	decimals: string
	holderCount?: number
	holdersCount?: number
	transfersCount?: number
	name: string
	symbol: string
	totalSupply: string
	type: string
}

interface Holder {
	address: string
	balance: string
	txnCount?: number
}

interface TokenTransfer {
	// value: string
	blockHash: string
	blockNumber: string
	contractMethodName?: string
	confirmations: string
	// contractAddress: string
	cumulativeGasUsed: string
	from: string
	gas: string
	gasPrice: string
	gasUsed: string
	hash: string
	input: string
	// logIndex: string
	nonce: string
	timeStamp: string
	to: string
	// tokenDecimal: string
	// tokenName: string
	// tokenSymbol: string
	transactionIndex: string
	tokenTransfers: {
		amount: string
		decimals: string
		fromAddress: string
		fromAddressName: string
		logIndex: string
		toAddress: string
		toAddressName: string
		tokenContractAddress: string
		tokenName: string
		tokenSymbol: string
	}[]
	// type?: string
}

interface TokenDetailResponse {
	message: string
	result: Token
	status: string
}

interface TokenSearchResponse {
	addressHash: string
	holderCount: number
	name: string
	symbol: string
	insertedAt: string
}
