const API_LIST = {
	SEARCH: '/search?keyword=',

	ALL_BLOCKS: '/api/v1/blocks',
	BLOCKS: '/api/v1/blocks/',
	TRANSACTION_OF_BLOCK: '/api/v1/blocks/:id/transactions?pagination=offset&page=1&limit=20&order=height.desc',
	LATEST_BLOCK: 'evm_/api/v1?module=block&action=eth_block_number',

	ALL_TOKENS: 'evm_/api/v1?module=token&action=getListTokens', // &page=1&offset=20
	ALL_HOLDERS: 'evm_/api/v1?module=account&action=getTopAddressesBalance', // &page=1&offset=20
	ALL_TRANSACTIONS: '/api/v1/transactions',

	TRANSACTIONS: '/api/v1/transactions',
	EVM_TRANSACTION_DETAIL_WITH_COSMOSHASH: '/api/v1/transactions', // call axios
	EVM_TRANSACTION_DETAIL: '/api/v1?module=transaction&action=gettxinfo&txhash=', // call axios
	EVM_INTERNAL_TRANSACTION: 'evm_/api/v1?module=account&action=txlistinternal&txhash=', // call axios
	COSMOS_TRANSACTION: '/api/v1?module=transaction&action=getTxCosmosInfo&txhash=', // call axios

	ABI: '/api/v1?module=contract&action=getabi&address=',
	HASH_ABI: '/api/v1?module=transaction&action=getabibytxhash&txhash=',

	VALIDATORS: '/api/v1/validators',

	MARKET_HISTORY_PRICE: 'evm_/api/v1/market-history-chart',
	TRANSACTION_HISTORY_COUNTER: 'evm_/api/v1/transaction-history-chart',
	TRANSACTION_RAW_TRACE: 'evm_/api/v1?module=transaction&action=getrawtracebytxhash', // txhash

	MARKET_PRICE: 'https://api.tiki.vn/sandseel/api/v2/public/markets/astra/summary',
	COMMON_STATS: 'evm_/api/v1/common-stats',
	ESTIMATE_COUNTED_INFO: 'evm_/api/v1/estimate-counted-info',
	GAS_AVG: 'evm_/api/v1/gas-price-oracle',

	ADDRESS_TOKEN: 'evm_/api/v1?module=account&action=tokenlist', // address = ?
	ADDRESS_COUNTER: 'evm_/api/v1?module=account&action=getaddresscounters', // address=?
	ADDRESS_BALANCE: 'evm_/api/v1?module=account&action=balance', // address=?
	ADDRESS_COIN_BALANCE_HISTORY: 'evm_/api/v1?module=account&action=getcoinbalancehistory', // address, page, offset=?
	ADDRESS_COIN_BALANCE_HISTORY_CHART: 'evm_/address', // address, page, offset=?
	ADDRESS_TRANSACTION: '/api/v1/accounts',
	ADDRESS_INTERNAL_TRANSACTION: 'evm_/api/v1?module=account&action=txlistinternal', // address, page, offset
	ADDRESS_TOKEN_TRANSFER: 'evm_/api/v1?module=account&action=getlisttokentransfers', // address=?

	TOKEN_DETAIL: '',
	TOKEN_TRANSACTIONS: '',
	TOKEN_HOLDERS: 'evm_/api/v1?module=token&action=getTokenHolders' // contractaddress=0x60baCCdfdCa114f97F32121f6b2879fB555Df4d0&page=1&offset=20
}

export default API_LIST
