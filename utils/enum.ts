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
	MsgBeginRedelegate = '/cosmos.staking.v1beta1.MsgBeginRedelegate'
}

export enum AddressTypeEnum {
	Address = 'address',
	Contract = 'contractaddress'
}

export enum CardInfoLabels {
	Transaction_Hash = 'Transaction Hash:',
	Transaction_Cosmos = 'Transaction Cosmos:',
	Result = 'Result:',
	Status = 'Status:',
	Block = 'Block:',
	From = 'From:',
	To = 'Interacted With (To):',
	CreatedContractAddressHash = 'To',
	Timestamp = 'Timestamp:',
	Value = 'Value:',
	Transaction_Fee = 'Transaction Fee:',
	Gas_Price = 'Gas Price:',
	Gas_Limit = 'Gas Limit:',
	Raw_Input = 'Raw Input:',
	Tokens_Transferred = 'Tokens Transferred:',
	Nonce = 'Nonce',
	Transaction_Type = 'Transaction Type:',
	Voter = 'Voter:',
	Proposal_Id = 'Proposal Id:',
	Option = 'Option:',
	Delegator_Address = 'Delegator Address:',
	Validator_Address = 'Validator Address:',
	Validator_Src_Address = 'Validator Src Address:',
	Validator_Dst_Address = 'Validator Dst Address:',
	Fail_Reason = 'Fail reason:',
	Revert_Reason = 'Revert reason:',
	Max_Fee_Gas = 'Max Fee/ Gas:',
	Max_Priority_Fer_Gas = 'Max Priority Fee/ Gas:',
	Gas_Used_by_Transaction = 'Gas Used by Transaction:',
	hash = 'Hash:',
	Block_Height = 'Block Height:',
	Transaction = 'Transaction:'
}

export enum ErcTypeEnum {
	ERC20 = 'ERC-20',
	ERC721 = 'ERC-721'
}
