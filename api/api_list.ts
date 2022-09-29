const API_LIST = {
	SEARCH: '/token-autocomplete',

	ALL_BLOCKS: 'evm_/blocks',
	ALL_TRANSACTIONS: 'evm_/transactions',
	LATEST_BLOCK: '/api/v1?module=block&action=eth_block_number',

	MARKET_HISTORY_PRICE: '/api/v1/market-history-chart',
	TRANSACTION_HISTORY_COUNTER: '/api/v1/transaction-history-chart',

	MARKET_PRICE: 'https://api.tiki.vn/sandseel/api/v2/public/markets/astra/summary',
	COMMON_STATS: '/api/v1/common-stats',
	ESTIMATE_COUNTED_INFO: '/api/v1/estimate-counted-info',
	GAS_AVG: '/api/v1/gas-price-oracle'
}

export default API_LIST
