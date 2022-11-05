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

export const CONFIG = {
	APPROXIMATE_ZERO: 10 ** -6
}
