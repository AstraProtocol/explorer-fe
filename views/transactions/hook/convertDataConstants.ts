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
	CardInfoLabels.totalAmount,
	CardInfoLabels.fee,
	CardInfoLabels.gasPrice,
	CardInfoLabels.typeOfTransfer
]

export const COSMOS_MESSAGE_FIELD_SORT_ORDER = [
	CardInfoLabels.type,
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
	CardInfoLabels.depositor,
	//
	CardInfoLabels.amount,
	CardInfoLabels.clientId,
	CardInfoLabels.header,
	CardInfoLabels.version,
	CardInfoLabels.delayPeriod,
	CardInfoLabels.clientState,
	CardInfoLabels.consensusState,
	CardInfoLabels.signer,

	CardInfoLabels.sourcePort,
	CardInfoLabels.sourceChannel,
	CardInfoLabels.token,
	CardInfoLabels.sender,
	CardInfoLabels.receiver,
	CardInfoLabels.timeoutHeight,
	CardInfoLabels.timeoutTimestamp,

	CardInfoLabels.startTime,
	CardInfoLabels.lockupPeriods,
	CardInfoLabels.vestingPeriods
]

export const GAS_ITEM_FIELD_SORT_ORDER = [
	CardInfoLabels.gasLimit,
	CardInfoLabels.maxFeePerGas,
	CardInfoLabels.maxPriorityFeePerGas,
	CardInfoLabels.gasUsedByTransaction,
	CardInfoLabels.nonce,
	CardInfoLabels.rawInput
]
