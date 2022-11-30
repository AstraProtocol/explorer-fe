export enum Icon {
	Analytics = 'analytics',
	Chart = 'chart',
	Clear = 'clear',
	ClearHover = 'clear_hover',
	Database = 'database',
	Gas = 'gas',
	Loading = 'loading',
	Recovery = 'recovery',
	Wallet = 'wallet'
}

export enum TransacionTypeEnum {
	Ethermint = '/ethermint.evm.v1.MsgEthereumTx',
	MsgVote = '/cosmos.gov.v1beta1.MsgVote',
	MsgDelegate = '/cosmos.staking.v1beta1.MsgDelegate',
	MsgSend = '/cosmos.bank.v1beta1.MsgSend',
	MultipleMsgWithdrawDelegatorReward = '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
	MsgBeginRedelegate = '/cosmos.staking.v1beta1.MsgBeginRedelegate',
	MsgExec = '/cosmos.authz.v1beta1.MsgExec',
	MsgGrant = '/cosmos.authz.v1beta1.MsgGrant'
}

export enum AddressTypeEnum {
	Address = 'address',
	Contract = 'contractaddress'
}

export enum CardInfoLabels {
	evmHash = 'Transaction Hash:',
	cosmosHash = 'Transaction Cosmos:',
	result = 'Result:',
	confirmations = 'Status:',
	block = 'Block:',
	from = 'From:',
	to = 'To:',
	createdContractAddressHash = 'Interacted With (To):',
	time = 'Timestamp:',
	value = 'Value:',
	fee = 'Transaction Fee:',
	gasPrice = 'Gas Price:',
	gasLimit = 'Gas Limit:',
	rawInput = 'Raw Input:',
	tokenTransfers = 'Tokens Transferred:',
	nonce = 'Nonce',
	typeOfTransfer = 'Transaction Type:',
	voter = 'Voter:',
	proposalId = 'Proposal Id:',
	option = 'Option:',
	delegatorAddress = 'Delegator Address:',
	validatorAddress = 'Validator Address:',
	validatorSrcAddress = 'Validator Src Address:',
	validatorDstAddress = 'Validator Dst Address:',
	failLog = 'Fail reason:',
	// Revert_Reason =
	revertReason = 'Revert reason:',
	memo = 'Memo',
	maxFeePerGas = 'Max Fee/ Gas:',
	maxPriorityFeePerGas = 'Max Priority Fee/ Gas:',
	gasUsedByTransaction = 'Gas Used:',
	hash = 'Hash:',
	blockHeight = 'Block Height:',
	Transaction = 'Transaction:'
}

export enum ErcTypeEnum {
	ERC20 = 'ERC-20',
	ERC721 = 'ERC-721'
}
