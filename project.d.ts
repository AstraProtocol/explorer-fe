interface SearchItemResponse {
	address_hash?: string
	block_hash?: string
	block_number?: number
	cosmos_hash?: string
	holder_count?: number
	inserted_at?: string
	name?: string
	symbol?: string
	tx_hash?: string
	type: 'transaction_cosmos' | 'address' | 'block' | 'transaction'
}

interface BlockItem {
	base_fee_per_gas: {
		value: string
	}
	consensus: boolean
	difficulty: string
	gas_limit: string
	gas_used: string
	hash: string
	inserted_at: string
	is_empty: null
	miner_hash: string
	nonce: string
	number: number
	parent_hash: string
	refetch_needed: boolean
	size: number
	timestamp: string
	total_difficulty: string
	updated_at: string
}

interface BlockResponse {
	items: BlockItem[]
	next_page_path: string
}

interface TransactionItem {
	block_number: number
	cumulative_gas_used: string
	error: null
	gas: string
	gas_price: {
		value: string
	}
	gas_used: string
	hash: string
	cosmos_hash: string
	index: number
	created_contract_code_indexed_at: null
	input: string
	nonce: number
	r: string
	s: string
	v: string
	status: string
	value: {
		value: string
	}
	revert_reason: null
}

interface TransactionResponse {
	items: TransactionItem[]
	next_page_params: {
		api: string
		block_number: number
		index: number
		page_number: number
		page_size: number
		pages_limit: number
	}
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
