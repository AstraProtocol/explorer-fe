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

interface Commited {
	address: string
	time: string
	signature: string
	isProposer: boolean
}
interface Pagination {
	total_record: number
	total_page: number
	current_page: number
	limit: number
}
interface BlockItem {
	blockHeight: number
	blockHash: string
	blockTime: string
	appHash: string
	transactionCount: number
	committedCouncilNodes: Commited[]
	newBlock?: boolean
}

interface BlockResponse {
	result: BlockItem[]
	pagination: Pagination
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
	fee: {
		denom: string
		amount: string
	}[]
	feePayer: string
	feeGranter: string
	gasWanted: number
	gasUsed: number
	memo: string
	timeoutHeight: number
	messages: {
		type: string
		content: {
			msgIndex: number
			name: string
			uuid: string
			height: number
			params: {
				'from': string
				'hash': string
				'size': number
				'@type': string
				'data': {
					'to': string
					'gas': string
					'r': string
					'v': string
					'@type': string
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
	}[]
	signers: never[]
}

interface TransactionResponse {
	result: TransactionItem[]
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

interface MarketPrice {
	ticker: {
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
	at: string
}

// enum Icon {
// 	Analytics,
// 	Chart,
// 	Clear,
// 	ClearHover,
// 	Database,
// 	Gas,
// 	Loading,
// 	Recovery,
// 	Wallet
// }
