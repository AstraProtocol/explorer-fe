interface TokenTransactionResponse {
	hasNextPage: boolean
	nextPagePath: any
	result: TokenTransaction[]
}

interface NftTransferResponse {
	hasNextPage: boolean
	nextPagePath: any
	result: NftTransfer[]
}

interface TokenHolderResponse {
	hasNextPage: boolean
	result: Holder[]
}

interface TokenInventoryResponse {
	hasNextPage: boolean
	nextPagePath: string
	result: []
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

interface useNftTransfer {
	result: NftTransfer[] | []
	hasNextPage: boolean
	nextPagePath: string
}

interface UseTokenHolderData {
	result: Holder[]
	hasNextPage: boolean
}

interface UseTokenHookData {
	isValidating: boolean
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
	tokenId: string
	tokenContractAddress: string
	tokenName: string
	tokenSymbol: string
	transactionHash: string
	type?: string
}

interface NftTransfer {
	amount: string
	blockHash: string
	blockNumber: string
	decimals: string
	fromAddress: string
	fromAddressName: string
	timestamp: string
	toAddress: string
	toAddressName: string
	tokenId: string
	tokenContractAddress: string
	tokenName: string
	tokenSymbol: string
	transactionHash: string
	type?: string
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

interface TokenNFTAttributes {
	trait_type: string
	value: string
}

interface TokenNFTMetadata {
	attributes: TokenNFTAttributes[]
	description: string
	image: string
	name: string
}

interface TokenNFTInstance {
	metadata: TokenNFTMetadata
	ownerAddress: string
	tokenId: string
}

interface TokenTransfer {
	value?: string
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

interface TokenInstanceResponse {
	message: string
	result: {
		result: TokenNFTMetadata
	}
	status: string
}

interface TokenSearchResponse {
	addressHash: string
	holderCount: number
	name: string
	symbol: string
	insertedAt: string
}
