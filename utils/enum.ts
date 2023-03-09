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
	MsgSubmitProposal = '/cosmos.params.v1beta1.ParameterChangeProposal',
	MsgDeposit = '/cosmos.gov.v1beta1.MsgDeposit',
	MsgEditValidator = '/cosmos.staking.v1beta1.MsgEditValidator',
	MsgUpdateClient = '/ibc.core.client.v1.MsgUpdateClient',
	MsgChannelOpenAck = '/ibc.core.channel.v1.MsgChannelOpenAck',
	MsgConnectionOpenInit = '/ibc.core.connection.v1.MsgConnectionOpenInit',
	MsgTransfer = '/ibc.applications.transfer.v1.MsgTransfer',
	MsgCreateClient = '/ibc.core.client.v1.MsgCreateClient',
	MsgCreateClawbackVestingAccount = '/evmos.vesting.v1.MsgCreateClawbackVestingAccount',
	CommunityPoolSpendProposal = '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal',
	MsgAcknowledgement = '/ibc.core.channel.v1.MsgAcknowledgement',
	MsgRevoke = '/cosmos.authz.v1beta1.MsgRevoke',
	MsgClawback = '/evmos.vesting.v1.MsgClawback',
	MsgWithdrawValidatorCommission = '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission'
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

	//cosmos
	amount = 'Amount:',
	totalAmount = 'Total Amount:',
	type = 'Type:',
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
	proposer = 'Proposer:',
	// MSG Deposit
	depositor = 'Depositor:',
	//Msg update client
	signer = 'Signer:',
	header = 'Header:',
	clientId = 'Client ID: ',
	delayPeriod = 'Deplay Period',
	version = 'Version: ',
	counterparty = 'Counterparty: ',
	sourcePort = 'Source Port: ',
	sourceChannel = 'Source Channel:',
	sender = 'Sender:',
	receiver = 'Receider:',
	timeoutTimestamp = 'Timeout Timestamp:',
	timeoutHeight = 'Timeout Height',
	token = 'Token: ',

	clientState = 'Client State',
	consensusState = 'Consensus State',

	startTime = 'Start Time',
	lockupPeriods = 'Lockup Periods',
	vestingPeriods = 'Vesting Periods',

	packet = 'Packet: ',
	acknowledgement = 'Acknowledgement: ',
	proofAcked = 'Proof Acked: ',
	proofHeigh = 'Proof Height: ',
	msgs = 'Msgs: ',

	funderAddress = 'Funder Address:',
	accountAddress = 'Account Address: ',
	destAddress = 'Dest Address:',

	grant = 'Grant: ',
	granter = 'Granter: '
}

export enum ErcTypeEnum {
	ERC20 = 'ERC-20',
	ERC721 = 'ERC-721'
}
