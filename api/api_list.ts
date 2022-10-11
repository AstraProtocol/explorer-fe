const API_LIST = {
	SEARCH: '/search?keyword=',

	ALL_BLOCKS: '/blocks',
	BLOCKS: '/blocks/',
	TRANSACTION_OF_BLOCK: '/blocks/:id/transactions?pagination=offset&page=1&limit=20&order=height.desc',
	LATEST_BLOCK: 'evm_/api/v1?module=block&action=eth_block_number',

	ALL_TRANSACTIONS: '/transactions',
	TRANSACTIONS: '/transactions/',
	EVM_TRANSACTION_DETAIL: '/api/v1?module=transaction&action=gettxinfo&txhash=', // call axios
	EVM_INTERNAL_TRANSACTION: 'evm_/api/v1?module=account&action=txlistinternal&txhash=', // call axios
	COSMOS_TRANSACTION: '/api/v1?module=transaction&action=getTxCosmosInfo&txhash=', // call axios

	ABI: '/api/v1?module=contract&action=getabi&address=',

	VALIDATORS: 'http://128.199.238.171:8080/api/v1/validators',

	MARKET_HISTORY_PRICE: 'evm_/api/v1/market-history-chart',
	TRANSACTION_HISTORY_COUNTER: 'evm_/api/v1/transaction-history-chart',

	MARKET_PRICE: 'https://api.tiki.vn/sandseel/api/v2/public/markets/astra/summary',
	COMMON_STATS: 'evm_/api/v1/common-stats',
	ESTIMATE_COUNTED_INFO: 'evm_/api/v1/estimate-counted-info',
	GAS_AVG: 'evm_/api/v1/gas-price-oracle'
}

export default API_LIST
