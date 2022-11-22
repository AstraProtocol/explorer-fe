enum TransacionTypeEnum {
	Ethermint = '/ethermint.evm.v1.MsgEthereumTx',
	MsgVote = '/cosmos.gov.v1beta1.MsgVote',
	MsgDelegate = '/cosmos.staking.v1beta1.MsgDelegate',
	MsgSend = '/cosmos.bank.v1beta1.MsgSend',
	MultipleMsgWithdrawDelegatorReward = '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
	MsgBeginRedelegate = '/cosmos.staking.v1beta1.MsgBeginRedelegate',
	MsgExec = '/cosmos.authz.v1beta1.MsgExec',
	MsgGrant = '/cosmos.authz.v1beta1.MsgGrant'
}

interface MsgCreateValidator {
	evmType?: string
	type: '/cosmos.staking.v1beta1.MsgCreateValidator'
	content: {
		height: number
		txHash: string
		msgName: TransactionTypeEnum
		msgIndex: number
		delegatorAddress: string
		validatorAddress: string
		name: string
		amount: TokenAmount
		version: number
		uuid: string
		commissionRates: {
			rate: string
			maxRate: string
			maxChangeRate: string
		}
		tendermintPubkey: string
		description: {
			details: string
			moniker: string
			website: string
			identity: string
			securityContract: string
		}
		minSelfDelegation: string
	}
}

interface MsgUnjail {
	evmType?: string
	type: '/cosmos.slashing.v1beta1.MsgUnjail'
	content: {
		txHash: string
		msgName: TransactionTypeEnum
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
		'@type': TransacionTypeEnum
		'data': {
			'to': string
			'gas': string
			'r': string
			'v': string
			'@type': TransacionTypeEnum
			'nonce': string
			'value': string
			'gasPrice': string
			's': string
			'data': string
		}
	}
	txHash: string
	msgName: TransactionTypeEnum
	version: number
}

interface MsgBeginRedelegateContent {
	height: number
	msgName: TransactionTypeEnum
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
	msgName: TransactionTypeEnum
	msgIndex: number
	toAddress: string
	fromAddress: string
	name: string
	uuid: string
	height: number
	version: number
}

interface MsgExecContent {
	'@type': string
	'amount': TokenAmount
	'delegator_address': string
	'validator_address': string
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
	msgName: TransactionTypeEnum
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
	msgName: TransactionTypeEnum
	version: number
	delegatorAddress: string
	validatorAddress: string
	name: string
	uuid: string
	amount: TokenAmount
	height: number
	autoClaimedRewards: TokenAmount
}

interface CosmosMsgWithdrawDelegatorReward {
	amount: TokenAmount[]
	height: number
	msgName: TransactionTypeEnum
	version: number
	msgIndex: number
	validatorAddress: string
	name: string
	uuid: string
	txHash: string
	delegatorAddress: string
	recipientAddress: string
}
