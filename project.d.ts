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
interface TransactionDetailResponse {
	result: TransactionItem
	pagination: Pagination
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

interface EVMTransferItem {
	amount: string
	fromAddress: string
	logIndex: string
	toAddress: string
	tokenContractAddress: string
	tokenName: string
	tokenSymbol: string
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
	logs: {
		address: string
		data: string
		index: string
		topics: string[]
	}[]
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
}
interface InternalTransactionReponse {
	message: 'OK' | string
	result: InternalTransactionItem[]
	status: string
}

interface CosmosTransactionDetailResponse {
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
		logs: {
			address: string
			data: string
			index: string
			topics: string[]
		}[]
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

interface Token {
	cataloged: boolean
	contractAddressHash: string
	decimals: string
	holderCount: number
	name: string
	symbol: string
	totalSupply: string
	type: string
}

interface AstraHolder {
	address: {
		contract_code: any
		decompiled: boolean
		fetched_coin_balance: {
			value: string
		}
		fetched_coin_balance_block_number: number
		gas_used: number
		has_decompiled_code: any
		hash: string
		inserted_at: string
		nonce: number
		state: any
		token_transfers_count: number
		transactions_count: number
		updated_at: string
		verified: boolean
	}
	total_supply: string
	tx_count: number
}

interface UseTokenHookData {
	result: Token[]
	hasNextPage: boolean
}

interface UseAstraHolderData {
	result: AstraHolder[]
	hasNextPage: boolean
}

interface TokenResponse {
	hasNextPage: boolean
	result: Token[]
}

interface TopAstraHolderResponse {
	hasNextPage: boolean
	result: AstraHolder[]
}
