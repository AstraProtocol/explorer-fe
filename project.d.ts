/// <reference path="types/transactions.d.ts" />
/// <reference path="types/blocks.d.ts" />
interface SearchItemResponse {
	result: {
		blocks: BlockItem[]
		transactions: TransactionItem[]
		validators: ValidatorData[]
		accounts: never[]
	}
}

interface Pagination {
	total_record: number
	total_page: number
	current_page: number
	limit: number
}

interface MarketHistoryPrice {
	closing_price: number
	date: string
}

interface TransactionHistoryCounter {
	date: string
	number_of_transactions: number
}

interface MarketHistoryPriceResponse {
	history_data: string
	supply_data: string
}

interface TransactionHistoryCounterResponse {
	history_data: string
}

interface EstimateCountedInfo {
	total_blocks: number
	total_transactions: number
	wallet_addresses: number
}

interface CommonStats {
	average_block_time: number
	token_stats: {
		circulating_supply: string
		market_cap: string
		price: string
		volume_24h: string
	}
	transaction_stats: {
		date: string
		gas_used: string
		number_of_transactions: number
		total_fee: string
	}
}

interface GasTracker {
	average: number
	fast: number
	slow: number
}

interface LatestBlock {
	jsonrpc: string
	result: string
	id: number
}

interface MarketPriceResponse {
	ticker: AstraSummary
	at: string
}

interface AstraSummary {
	low: string
	high: string
	open: string
	last: string
	volume: string
	amount: string
	vol: string
	avg_price: string
	price_change_percent: string
}

interface ValidatorData {
	operatorAddress: string
	consensusNodeAddress: string
	initialDelegatorAddress: string
	tendermintPubkey: string
	tendermintAddress: string
	status: string
	failed: boolean
	joinedAtBlockHeight: number
	power: string
	moniker: string
	identity: string
	website: string
	securityContact: string
	details: string
	commissionRate: string
	commissionMaxRate: string
	commissionMaxChangeRate: string
	minSelfDelegation: string
	totalSignedBlock: number
	totalActiveBlock: number
	impreciseUpTime: string
	votedGovProposal: number
	powerPercentage: string
	cumulativePowerPercentage: string
}

interface ValidatorResponse {
	result: ValidatorData[]
	pagination: {
		total_record: number
		total_page: number
		current_page: number
		limit: number
	}
}

interface Proposer {
	operatorAddress: string
	consensusNodeAddress: string
	initialDelegatorAddress: string
	tendermintPubkey: string
	tendermintAddress: string
	status: string
	jailed: boolean
	joinedAtBlockHeight: number
	power: string
	moniker: string
	identity: string
	website: string
	securityContact: string
	details: string
	commissionRate: string
	commissionMaxRate: string
	commissionMaxChangeRate: string
	minSelfDelegation: string
	totalSignedBlock: number
	totalActiveBlock: number
	impreciseUpTime: string
	votedGovProposal: number
	powerPercentage: string
	cumulativePowerPercentage: string
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

interface AstraHolder {
	address: string
	balance: string
	txnCount: number
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

interface UseTokenHookData {
	result: Token[]
	hasNextPage: boolean
}

interface UseAstraHolderData {
	result: AstraHolder[]
	hasNextPage: boolean
}

interface UseAddressTransactionData {
	result: any[]
	pagination: Pagination
}

interface UseAddressTokenTransferData {
	result: TokenTransfer[]
	hasNextPage: boolean
}

interface UseAddressTokenData {
	result: AddressToken[]
	hasNextPage: boolean
}

interface UseAddressInternalTransactionData {
	result: TransactionRowProps[] | []
	hasNextPage: boolean
}

interface UseAddressBalanceData {
	balance: string
	lastBalanceUpdate: number
}

interface UseAddressCoinBalanceHistoryData {
	result: AddressCoinBalanceHistory[] | []
	hasNextPage: boolean
}

interface UseAddressCoinBalanceHistoryChartData {
	result: AddressCoinBalanceHistoryChartData[] | []
}

interface TokenResponse {
	hasNextPage: boolean
	result: Token[]
}

interface TopAstraHolderResponse {
	hasNextPage: boolean
	nextPageParams: {
		offset: number
		page: number
	}
	result: AstraHolder[]
}

interface AddressCounterResponse {
	gasUsageCount: number
	tokenTransferCount: number
	transactionCount: number
	validationCount: number
}

interface AddressBalanceResponse {
	message: string
	result: UseAddressBalanceData
	status: string
}

interface AddressTokenTransferResponse {
	message: string
	result: TokenTransfer[]
	status: string
}

interface AddressTokenResponse {
	hasNextPage: boolean
	nextPageParams: any
	result: AddressToken[]
}

interface AddressInternalTransactionResponse {
	message: string
	result: InternalTransactionItem[]
	status: string
}

interface AddressCoinBalanceHistoryResponse {
	hasNextPage: boolean
	nextPageParams: any
	result: AddressCoinBalanceHistory[]
}
