import { CardInfoLabels } from 'utils/enum'

export const MAIN_FIELD_SORT_ORDER = [
	CardInfoLabels.evmHash,
	CardInfoLabels.cosmosHash,
	CardInfoLabels.result,
	CardInfoLabels.failLog,
	CardInfoLabels.revertReason,
	CardInfoLabels.memo,
	CardInfoLabels.confirmations,
	CardInfoLabels.block,
	CardInfoLabels.blockHeight,

	CardInfoLabels.time,

	CardInfoLabels.value,
	CardInfoLabels.fee,
	CardInfoLabels.gasPrice,
	CardInfoLabels.typeOfTransfer
]

export const EXT_FIELD_SORT_ORDER = [
	CardInfoLabels.from,
	CardInfoLabels.to,
	CardInfoLabels.interactWith,
	CardInfoLabels.tokenTransfers,
	//msgvote
	CardInfoLabels.voter,
	CardInfoLabels.proposalId,
	CardInfoLabels.option,
	//delegate
	CardInfoLabels.delegatorAddress,
	CardInfoLabels.recipientAddress,
	CardInfoLabels.validatorAddress,
	//MsgBeginRedelegate

	CardInfoLabels.validatorSrcAddress,
	CardInfoLabels.validatorDstAddress,
	//MsgExec
	CardInfoLabels.grantee,
	//MsgCreateValidator
	CardInfoLabels.validatorDescription,
	CardInfoLabels.commissionRates,
	CardInfoLabels.minSelfDelegation,
	//MsgTextProposal
	CardInfoLabels.textProposalContent,
	CardInfoLabels.initialDepositValue,
	CardInfoLabels.proposer,
	// Msg Deposit
	CardInfoLabels.depositor
]

export const MORE_ITEM_FIELD_SORT_ORDER = [
	CardInfoLabels.gasLimit,
	CardInfoLabels.maxFeePerGas,
	CardInfoLabels.maxPriorityFeePerGas,
	CardInfoLabels.gasUsedByTransaction,
	CardInfoLabels.nonce,
	CardInfoLabels.rawInput
]
