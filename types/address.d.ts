interface Address {
	balance: string
	creationTransaction: string
	creator: string
	lastBalanceUpdate: number
	tokenName: string
	tokenSymbol: string
	type: 'address' | 'contractaddress' // string
}

interface AbiResponse {
	message: string
	result: string
	status: string
}

interface HashAbiResponse {
	message: string
	result: {
		abi: any
	}
	status: string
}

interface AddressCounterResponse {
	message: string
	result: AddressCounterData
	status: string
}

interface AddressBalanceResponse {
	message: string
	result: UseAddressBalanceData
	status: string
}

interface AddressTokenTransferResponse {
	hasNextPage: boolean
	result: TokenTransfer[]
	nextPagePath: string
}

interface AddressTokenResponse {
	hasNextPage: boolean
	nextPagePath: string
	result: AddressToken[]
}

interface AddressInternalTransactionResponse {
	result: InternalTransactionItem[]
	hasNextPage: boolean
	nextPagePath: any
}

interface AddressCoinBalanceHistoryResponse {
	hasNextPage: boolean
	nextPagePath: any
	result: AddressCoinBalanceHistory[]
}

interface AddressTransactionResponse {
	result: AddressTransactionResponse[]
	pagination: Pagination
}

interface UseAstraHolderData {
	result: Holder[] | []
	hasNextPage: boolean
	nextPagePath: string
}

interface UseAddressTransactionData {
	result: AddressTransactionData[]
	pagination: Pagination
}

interface UseAddressTokenTransferData {
	result: TokenTransfer[] | []
	hasNextPage: boolean
	nextPagePath: string
}

interface UseAddressTokenData {
	result: AddressToken[] | []
	hasNextPage: boolean
	nextPagePath: string
}

interface UseAddressInternalTransactionData {
	result: TransactionRowProps[] | []
	hasNextPage: boolean
	nextPagePath: string
}

interface UseAddressBalanceData {
	balance: string
	lastBalanceUpdate: number
}

interface UseAddressCoinBalanceHistoryData {
	result: AddressCoinBalanceHistory[] | []
	hasNextPage: boolean
	nextPagePath: string
}

interface UseAddressCoinBalanceHistoryChartData {
	result: AddressCoinBalanceHistoryChartData[] | []
}

interface AddressToken {
	balance: string
	contractAddress: string
	decimals: string
	name: string
	symbol: string
	type: string
}

interface AddressCoinBalanceHistory {
	addressHash: string
	blockNumber: number
	blockTimestamp: string
	delta: string
	insertedAt: string
	transactionHash: string
	transactionValue: string
	updatedAt: string
	value: string
	valueFetchedAt: string
}

interface AddressCoinBalanceHistoryChartData {
	date: string
	value: number
}

interface AddressCounterData {
	gasUsageCount?: number
	tokenTransferCount?: number
	transactionCount?: number
	validationCount?: number
}

interface AddressTransactionData {
	account: string
	blockHeight: number
	blockHash: string
	blockTime: string
	hash: string
	messageTypes: string[]
	success: boolean
	fee: string | number
	amount?: string
	from?: string
	to?: string
	type: string
}

interface AddressTransactionResponse {
	account: string
	blockHeight: number
	blockHash: string
	blockTime: string
	hash: string
	messageTypes: string[]
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
}
