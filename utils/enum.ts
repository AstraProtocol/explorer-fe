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

export enum TransactionTypeEnum {
	Ethermint = '/ethermint.evm.v1.MsgEthereumTx',
	MsgVote = '/cosmos.gov.v1beta1.MsgVote',
	MsgDelegate = '/cosmos.staking.v1beta1.MsgDelegate',
	MsgUndelegate = '/cosmos.staking.v1beta1.MsgUndelegate',
	MsgSend = '/cosmos.bank.v1beta1.MsgSend',
	MsgWithdrawDelegatorReward = '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
	MsgBeginRedelegate = '/cosmos.staking.v1beta1.MsgBeginRedelegate',
	MsgExec = '/cosmos.authz.v1beta1.MsgExec',
	MsgGrant = '/cosmos.authz.v1beta1.MsgGrant',
	MsgCreateValidator = '/cosmos.staking.v1beta1.MsgCreateValidator',
	MsgUnjail = '/cosmos.slashing.v1beta1.MsgUnjail',
	TextProposal = '/cosmos.gov.v1beta1.TextProposal',
	MsgSubmitProposal = '/cosmos.params.v1beta1.ParameterChangeProposal'
}

export enum AddressTypeEnum {
	Address = 'address',
	Contract = 'contractaddress'
}

export enum CardInfoLabels {
	evmHash = 'Transaction Hash (Evm Layer):',
	cosmosHash = 'Transaction Hash (Cosmos Layer):',
	result = 'Result:',
	confirmations = 'Status:',
	block = 'Block:',
	from = 'From:',
	to = 'To:',
	interactWith = 'Interacted With:',
	time = 'Timestamp:',
	value = 'Amount:',
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
	recipientAddress = 'Recipient Address:',
	validatorSrcAddress = 'Validator Src Address:',
	validatorDstAddress = 'Validator Dst Address:',
	minSelfDelegation = 'Min Self Delegation:',
	validatorDescription = 'Description:',
	commissionRates = 'Commission Rates:',
	grantee = 'Grantee',
	failLog = 'Fail reason:',
	// Revert_Reason =
	revertReason = 'Revert reason:',
	memo = 'Memo',
	maxFeePerGas = 'Max Fee/ Gas:',
	maxPriorityFeePerGas = 'Max Priority Fee/ Gas:',
	gasUsedByTransaction = 'Gas Used:',
	hash = 'Hash:',
	blockHeight = 'Block Height:',
	Transaction = 'Transaction:',
	//Text Proposal
	textProposalContent = 'Content: ',
	initialDepositValue = 'Initial Deposit:',
	proposer = 'Proposer:'
}

export enum ErcTypeEnum {
	ERC20 = 'ERC-20',
	ERC721 = 'ERC-721'
}
