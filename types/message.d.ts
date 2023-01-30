interface MsgCreateValidator {
	evmType?: string
	type: '/cosmos.staking.v1beta1.MsgCreateValidator'
	content: MsgCreateValidatorContent
}

interface MsgUnjail {
	evmType?: string
	type: '/cosmos.slashing.v1beta1.MsgUnjail'
	content: {
		txHash: string
		msgName: TransactionTypeEnum.MsgUnjail
		version: number
		msgIndex: number
		validatorAddress: string
		name: string
		uuid: string
		height: number
	}
}

interface MsgEthereumTx {
	evmType?: string
	type: '/ethermint.evm.v1.MsgEthereumTx'
	content: MsgEthereumTxContent
}

interface MsgBeginRedelegate {
	evmType?: string
	type: string
	content: MsgBeginRedelegateContent
}

// --------------------------------------------------- //

interface MsgEthereumTxContent {
	msgIndex: number
	name: string
	uuid: string
	height: number
	params: {
		'from': string
		'hash': string
		'size': number
		'@type': TransactionTypeEnum.Ethermint
		'data': {
			'to': string
			'gas': string
			'r': string
			'v': string
			'@type': TransactionTypeEnum.Ethermint
			'nonce': string
			'value': string
			'gasPrice': string
			's': string
			'data': string
		}
	}
	txHash: string
	msgName: TransactionTypeEnum.Ethermint
	version: number
}

interface MsgBeginRedelegateContent {
	height: number
	msgName: TransactionTypeEnum.MsgBeginRedelegate
	delegatorAddress: string
	autoClaimedRewards: TokenAmount
	validatorSrcAddress: string
	name: string
	uuid: string
	amount: TokenAmount
	txHash: string
	version: number
	msgIndex: number
	validatorDstAddress: string
}

interface MsgSendContent {
	amount: TokenAmount[]
	txHash: string
	msgName: TransactionTypeEnum.MsgSend
	msgIndex: number
	toAddress: string
	fromAddress: string
	name: string
	uuid: string
	height: number
	version: number
}

interface MsgExecContent {
	uuid: string
	height: number
	params: {
		'@type': TransactionTypeEnum.MsgExec
		'grantee': string
		'msgs': any[]
	}
	txHash: string
	msgName: TransactionTypeEnum.MsgExec
	version: number
	msgIndex: number
	name: string
}

interface MsgGrantContent {
	msgName: string
	version: number
	msgIndex: number
	name: string
	uuid: string
	height: number
	params: {
		maybeSendGrant: any
		maybeStakeGrant: any
		maybeGenericGrant: {
			'grantee': string
			'granter': string
			'@type': string
			'grant': {
				expiration: string
				authorization: {
					msg: string
				}
			}
		}
	}
	txHash: string
}

interface MsgVoteContent {
	option: string
	txHash: string
	msgName: TransactionTypeEnum.MsgVote
	version: number
	proposalId: string
	name: string
	uuid: string
	voter: string
	height: number
	msgIndex: number
}

interface MsgDelegateContent {
	txHash: string
	msgIndex: number
	msgName: TransactionTypeEnum.MsgDelegate
	version: number
	delegatorAddress: string
	validatorAddress: string
	name: string
	uuid: string
	amount: TokenAmount
	height: number
	autoClaimedRewards: TokenAmount
}

interface MsgUndelegateContent {
	name: string
	amount: TokenAmount
	txHash: string
	version: number
	delegatorAddress: string
	autoClaimedRewards: TokenAmount
	uuid: string
	height: number
	msgName: string
	msgIndex: number
	unbondCompleteAt: string
	validatorAddress: string
}

interface MsgWithdrawDelegatorRewardContent {
	amount: TokenAmount[]
	height: number
	msgName: TransactionTypeEnum.MsgWithdrawDelegatorReward
	version: number
	msgIndex: number
	validatorAddress: string
	name: string
	uuid: string
	txHash: string
	delegatorAddress: string
	recipientAddress: string
}

interface MsgCreateValidatorContent {
	height: number
	txHash: string
	msgName: TransactionTypeEnum.MsgCreateValidator
	msgIndex: number
	delegatorAddress: string
	validatorAddress: string
	name: string
	amount: TokenAmount
	version: number
	uuid: string
	commissionRates: CommissionRates
	tendermintPubkey: string
	description: ValidatorData
	minSelfDelegation: string
}

interface CommissionRates {
	rate: string
	maxRate: string
	maxChangeRate: string
}

interface TextProposalFullContent {
	name: string
	txHash: string
	msgIndex: number
	initialDeposit: {
		denom: string
		amount: string
	}[]
	version: number
	proposalId: string
	proposerAddress: string
	uuid: string
	height: number
	content: {
		'title': string
		'description': string
		'@type': string
		'changes'?: {
			key: string
			value: string
			subspace: string
		}[]
	}
	msgName: string
}
