interface Commited {
	address: string
	time: string
	signature: string
	isProposer: boolean
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

interface BlockDetailResponse {
	result: BlockItem
}
