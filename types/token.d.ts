interface TokenResponse {
	hasNextPage: boolean
	result: Token[]
}

interface TokenHolderResponse {
	hasNextPage: boolean
	result: Holder[]
}

interface TopAstraHolderResponse {
	hasNextPage: boolean
	nextPageParams: {
		offset: number
		page: number
	}
	result: Holder[]
}

interface UseTokenHookData {
	result: Token[]
	hasNextPage: boolean
}

interface UseTokenHolderData {
	result: Holder[]
	hasNextPage: boolean
}

interface Token {
	cataloged?: boolean
	contractAddressHash: string
	decimals: string
	holderCount?: number
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
	value: string
	blockHash: string
	blockNumber: string
	confirmations: string
	contractAddress: string
	cumulativeGasUsed: string
	from: string
	gas: string
	gasPrice: string
	gasUsed: string
	hash: string
	input: string
	logIndex: string
	nonce: string
	timeStamp: string
	to: string
	tokenDecimal: string
	tokenName: string
	tokenSymbol: string
	transactionIndex: string
}
