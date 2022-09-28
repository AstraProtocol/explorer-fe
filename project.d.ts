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
	newBlock?: boolean
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
	newTransaction?: boolean
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
