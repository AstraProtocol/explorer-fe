const API_LIST = {
	SEARCH: '/api/v1/search?keyword=',

	ALL_BLOCKS: '/api/v1/blocks',
	BLOCKS: '/api/v1/blocks/',
	TRANSACTION_OF_BLOCK: '/api/v1/blocks/:id/transactions',
	LATEST_BLOCK: '/api/v1/eth-block-number',

	ALL_TOKENS: '/api/v1/contract/get-list-tokens?blockscout=true', // &page=1&offset=20
	ALL_HOLDERS: '/api/v1/accounts/get-top-addresses-balance?blockscout=true', // &page=1&offset=20
	ALL_TRANSACTIONS: '/api/v1/transactions',

	TRANSACTIONS: '/api/v1/transactions',
	EVM_INTERNAL_TRANSACTION: '/api/v1/transactions/internal-transactions/', // call axios
	COSMOS_TRANSACTION: '/api/v1?module=transaction&action=getTxCosmosInfo&txhash=', // call axios

	ABI: '/api/v1/accounts/getabi/',
	HASH_ABI: '/api/v1/transactions/getabi/',

	VALIDATORS: '/api/v1/validators',

	MARKET_HISTORY_PRICE: '/api/v1/market-history-chart',
	TRANSACTION_HISTORY_COUNTER: '/api/v1/transactions-history-chart',
	TRANSACTION_RAW_TRACE: '/api/v1/transactions/getrawtrace/', // txhash

	MARKET_PRICE: 'https://api.tiki.vn/sandseel/api/v2/public/markets/astra/summary',
	COMMON_STATS: '/api/v1/common-stats',
	ESTIMATE_COUNTED_INFO: '/api/v1/estimate-counted-info',
	GAS_AVG: '/api/v1/gas-price-oracle',

	ADDRESS_DETAIL: '/api/v1/accounts/detail',
	ADDRESS_TOKEN: '/api/v1/accounts/tokenlist/', // address = ?
	ADDRESS_COUNTER: '/api/v1/accounts', // address=?
	// ADDRESS_BALANCE: 'evm_/api/v1?module=account&action=balance', // address=?
	ADDRESS_COIN_BALANCE_HISTORY: 'evm_/api/v1?module=account&action=getcoinbalancehistory', // address, page, offset=?
	ADDRESS_COIN_BALANCE_HISTORY_CHART: 'api/v1/accounts', // address, page, offset=?
	ADDRESS_TRANSACTION: '/api/v1/accounts',
	ADDRESS_INTERNAL_TRANSACTION: 'evm_/api/v1?module=account&action=txlistinternal', // address, page, offset
	ADDRESS_TOKEN_TRANSFER: '/api/v1/accounts/token-transfers/', // address=?

	ACCOUNT_DELEGATION: `${process.env.NEXT_PUBLIC_CHAIN_API}/cosmos/staking/v1beta1/delegations`,

	CONTRACT_TRANSACTION: '/api/v1/contract/txs/', // address = ?

	TOKEN_DETAIL: '/api/v1/contract/token-detail/', // SSR
	TOKEN_TRANSACTIONS: '/api/v1/contract/token-transfers/',
	TOKEN_HOLDERS: '/api/v1/contract/token-holders/', // contractaddress=0x60baCCdfdCa114f97F32121f6b2879fB555Df4d0&page=1&offset=20
	TOKEN_INVENTORY: '/api/v1/contract/token-inventory/', // contractaddress=0x60baCCdfdCa114f97F32121f6b2879fB555Df4d0
	TOKEN_METADATA: '/api/v1/contract/token-metadata/',
	TOKEN_TRANSER_BY_TOKEN_ID: '/api/v1/contract/token-transfers-by-tokenid/', // contractaddress=0x8CB41dA24793D4515E6b96D1adA50b721878C0Ca&tokenid=10

	CONTRACT_CODE: '/api/v1/contract/source-code/',
	VERIFY_CONTRACT: `/verify_smart_contract/contract_verifications`,
	CHECK_VERIFY_STATUS: '/api?module=contract&action=checkverifystatus',
	GET_EVM_VERSION: '/api/v1/evm-versions',
	GET_SOLIDITY_COMPILER: '/api/v1/compiler-versions/',

	// charts && stats
	GET_TRANSACTION_HISTORY: '/api/v1/transactions-history?daily=true',
	GET_ACTIVE_ADDRESS: '/api/v1/active-addresses-history?daily=true',
	GET_ADDRESS_GROWTH: '/api/v1/total-addresses-growth?daily=true',
	GET_GAS_DAILY: '/api/v1/gas-used-history?daily=true',
	GET_GAS_MONTHLY: '/api/v1/gas-used-history',
	GET_FEE_DAILY: '/api/v1/total-fee-history?daily=true',
	GET_FEE_MONTHLY: '/api/v1/total-fee-history'
}

export default API_LIST
