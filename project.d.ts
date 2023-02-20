/// <reference path="types/transactions.d.ts" />
/// <reference path="types/blocks.d.ts" />
/// <reference path="types/message.d.ts" />
/// <reference path="types/token.d.ts" />
/// <reference path="types/address.d.ts" />

interface SearchItemResponse {
	result: {
		blocks: BlockSearchResponse[]
		transactions: TransactionSearchResponse[]
		validators: ValidatorData[]
		addresses: AddressSearchResponse[]
		tokens: TokenSearchResponse[]
		contracts: ContractSearchResponse[]
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
	numberOfTransactions: number
}

interface MarketHistoryPriceResponse {
	result: {
		history_data: string
		supply_data: string
	}
}

interface TransactionHistoryCounterResponse {
	result: TransactionHistoryCounter[]
}

interface EstimateCountedInfo {
	total_blocks: number
	total_transactions: number
	wallet_addresses: number
}

interface EstimateCountedResponse {
	result: EstimateCountedInfo
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

interface CommonStatsResponse {
	result: CommonStats
}

interface GasTracker {
	result: {
		average: number
		fast: number
		slow: number
	}
}

interface LatestBlock {
	result: {
		jsonrpc: string
		result: string
		id: number
	}
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

interface TransactionHistoryItem {
	date: string
	month: string
	year: string
	numberOfTransactions: number
}

interface TransactionHistoryResponse {
	result: {
		transactionsHistory: TransactionHistoryItem[]
		dailyAverage: number
	}
}

interface ActiveAddressItem {
	date: string
	month: string
	year: string
	numberOfActiveAddresses: number
}

interface ActiveAddressResponse {
	result: {
		activeAddressesHistory: ActiveAddressItem[]
		dailyAverage: number
	}
}

interface AddressGrowthItem {
	date: string
	month: string
	year: string
	total: number
	active: number
	notActive: number
}
interface AddressGrowthResponse {
	result: {
		totalAddressesGrowth: AddressGrowthItem[]
		totalAddresses: number
	}
}

interface GasItem {
	date: string
	month: string
	year: string
	totalGasUsed: number
}
interface GasResponse {
	result: {
		totalGasUsedHistory: GasItem[]
		dailyAverage?: number
		monthlyAverage?: number
	}
}

interface FeeItem {
	date: string
	month: string
	year: string
	totalTransactionFees: number
}
interface FeeResponse {
	result: {
		totalFeesHistory: FeeItem[]
		dailyAverage?: number
		monthlyAverage?: number
	}
}
