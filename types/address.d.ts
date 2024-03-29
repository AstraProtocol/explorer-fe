interface VestingBalances {
	locked: TokenAmount[]
	unvested: TokenAmount[]
	vested: TokenAmount[]
}
interface Address {
	contractName?: string
	balance: string
	delegationBalance?: string
	redelegatingBalance?: string
	unbondingBalance?: string
	totalRewards?: string
	commissions?: string
	totalBalance?: string
	contractName?: string

	creationTransaction: string
	creator: string
	lastBalanceUpdate: number
	tokenName: string
	tokenSymbol: string
	type: 'address' | 'contractaddress' // string
	verified: boolean
	vestingBalances?: VestingBalances

	implementationAddressName?: string
	implementationAddressHash?: string

	verified?: boolean
}

interface AddressDetailResponse {
	message: string
	result: Address
	status: string
}

interface AbiResponse {
	result: string
}

interface HashAbiResponse {
	result: {
		abi: {
			inputs: []
			name: string
			outputs: any
			stateMutability: any
			type: any
		}
		verified: boolean
	}
}

interface LogAbiResponse {
	result: string
}

interface AddressCounterResponse {
	message: string
	result: AddressCounterData
	status: string
}

interface AddressBalanceResponse {
	message: string
	result: UseAddressBalanceData
	status: string
}

interface AddressTokenTransferResponse {
	result: {
		hasNextPage: boolean
		result: TokenTransfer[]
		nextPagePath: string
		pagination: Pagination
	}
}

interface AddressTokenResponse {
	result: {
		hasNextPage: boolean
		nextPagePath: string
		result: AddressToken[]
	}
}

interface AddressInternalTransactionResponse {
	result: InternalTransactionItem[]
	hasNextPage: boolean
	nextPagePath: any
}

interface AddressCoinBalanceHistoryResponse {
	hasNextPage: boolean
	nextPagePath: any
	result: AddressCoinBalanceHistory[]
}

interface AddressTransactionResponse {
	result: AddressTransactionResponse[]
	pagination: Pagination
}

interface ContractTransactionResponse {
	hasNextPage: boolean
	nextPagePath: any
	result: ContractTransactionData[]
}

interface UseAstraHolderData {
	isValidating: boolean
	result: Holder[] | []
	hasNextPage: boolean
	nextPagePath: string
}

interface UseAddressTransactionData {
	result: AddressTransactionData[]
	pagination: Pagination
}

interface UseContractTransactionData {
	result: ContractTransactionData[] | []
	hasNextPage: boolean
	nextPagePath: string
	loading: boolean
}

interface UseAddressTokenTransferData {
	result: TokenTransfer[] | []
	hasNextPage: boolean
	nextPagePath: string
	loading: boolean
}

interface UseAddressTokenData {
	result: AddressToken[] | []
	hasNextPage: boolean
	nextPagePath: string
}

interface UseAddressInternalTransactionData {
	result: TransactionRowProps[] | []
	hasNextPage: boolean
	nextPagePath: string
	loading: boolean
}

interface UseAddressBalanceData {
	balance: string
	lastBalanceUpdate: number
}

interface UseAddressCoinBalanceHistoryData {
	result: AddressCoinBalanceHistory[] | []
	hasNextPage: boolean
	nextPagePath: string
}

interface UseAddressCoinBalanceHistoryChartData {
	result: AddressCoinBalanceHistoryChartData[] | []
}

interface AddressToken {
	balance: string
	contractAddress: string
	decimals: string
	name: string
	symbol: string
	type: string
}

interface AddressCoinBalanceHistory {
	addressHash: string
	blockNumber: number
	blockTimestamp: string
	delta: string
	insertedAt: string
	transactionHash: string
	transactionValue: string
	updatedAt: string
	value: string
	valueFetchedAt: string
}

interface AddressCoinBalanceHistoryChartData {
	date: string
	value: number
}

interface AddressCoinBalanceHistoryChartResponse {
	result: AddressCoinBalanceHistoryChartData[]
}

interface AddressCounterData {
	gasUsageCount?: number
	tokenTransferCount?: number
	transactionCount?: number
	validationCount?: number
	feesCount?: number
}

interface AddressTransactionData {
	account: string
	blockHeight: number
	blockHash: string
	blockTime: string
	hash: string
	messageTypes: string[]
	messages?: {
		type: string
		evmType?: string
		content: MsgEthereumTxContent
	}[]
	success: boolean
	fee: string | number
	value?: string
	from?: string
	fromAddressName?: string
	to?: string
	toAddressName?: string
	type: string
}

interface ContractTransactionData {
	blockHash: string
	blockNumber: string
	createdContractAddressHash?: string
	contractMethodName: string
	cosmosHash: string
	cumulativeGasUsed: string
	error?: string
	from: string
	fromAddressName?: string
	gas: string
	gasPrice: string
	gasUsed: string
	hash: string
	success: boolean
	timeStamp: string
	to: string
	toAddressName: string
	value: string
}

interface AddressTransactionResponse {
	account: string
	blockHeight: number
	blockHash: string
	blockTime: string
	hash: string
	messageTypes: string[]
	success: boolean
	code: number
	log: string
	fee: TokenAmount[]
	feePayer: string
	feeGranter: string
	gasWanted: number
	gasUsed: number
	memo: string
	value?: string
	timeoutHeight: number
	messages: TransactionMessage[]
}

interface AddressSearchResponse {
	addressHash: string
	address: string
	name?: string
	tokenName?: string
	contractName?: string
	insertedAt: string
}

interface ContractFile {
	Filename: string
	SourceCode: string
}

interface ContractCodeData {
	ABI: string
	AdditionalSources: ContractFile[]
	CompilerVersion: string
	ConstructorArguments: string
	ContractCreationCode: string
	ContractName: string
	DeployedByteCode: string
	EVMVersion?: string | null
	FileName: string
	IsProxy: string // boolean
	OptimizationRuns: number
	OptimizationUsed: string
	SourceCode: string
	SameBytecodeAddress?: string
	Address: string
	Verified: boolean
	VerifiedAt: string
}

interface ContractCodeResponse {
	message: string
	result: ContractCodeData[]
	status: string
}

interface UseContractCodeData {
	mutate: Function
	isValidating: boolean
	contractCode: ContractCodeData
}

interface LibraryItem {
	index: number
	name: string
	address: string
}

interface VerifyStatusResponse {
	message: string
	result: string
	status: string
}

interface ContractSearchResponse {
	addressHash: string
	insertedAt: string
	name: string
}

interface Delegation {
	balance: TokenAmount
	delegation: { delegator_address: string; shares: string; validator_address: string }
}

interface AccountDelegationResponse {
	delegation_responses: Delegation[]
	pagination: {
		// Cosmos sdk
		next_key: string | null
		total: string
	}
}

