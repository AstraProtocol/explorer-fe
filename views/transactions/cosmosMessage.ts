import { astraToEth } from '@astradefi/address-converter'
import { formatNumber } from '@astraprotocol/astra-ui'
import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { isArray, isEmpty } from 'lodash'
import { TransactionTypeEnum } from 'utils/enum'
import { getEnvNumber } from 'utils/helper'

export const handleCosmosMsg = (messages: TransactionMessage[]) => {
	const messageData: CosmosTxMessage[] = []
	for (let msg of messages) {
		switch (msg.type) {
			case TransactionTypeEnum.MsgSend:
				messageData.push(_mapMsgSendField(msg))
				break
			case TransactionTypeEnum.MsgVote:
				messageData.push(_mapMsgVoteField(msg))
				break
			case TransactionTypeEnum.MsgDelegate:
				messageData.push(_mapMsgDelegate(msg))
				break
			case TransactionTypeEnum.MsgUndelegate:
				messageData.push(_mapMsgUndelegate(msg))
				break
			case TransactionTypeEnum.MsgBeginRedelegate:
				messageData.push(_mapMsgBeginRedelegate(msg))
				break
			case TransactionTypeEnum.MsgExec:
				messageData.push(_mapMsgExec(msg, messages))
				break
			case TransactionTypeEnum.MsgGrant:
				messageData.push(_mapMsgGrant(msg))
				break
			case TransactionTypeEnum.MsgWithdrawDelegatorReward:
				messageData.push(_mapMsgWithdrawDelegatorReward(msg))
				break
			case TransactionTypeEnum.MsgCreateValidator:
				messageData.push(_mapMsgCreateValidator(msg))
				break
			case TransactionTypeEnum.TextProposal:
			case TransactionTypeEnum.MsgSubmitProposal:
			case TransactionTypeEnum.CommunityPoolSpendProposal:
				messageData.push(_mapMsgTextProposalOrMsgSubmitProposal(msg))
				break
			case TransactionTypeEnum.MsgDeposit:
				messageData.push(_mapMsgDeposit(msg))
				break
			case TransactionTypeEnum.MsgUnjail:
			case TransactionTypeEnum.MsgEditValidator:
				messageData.push(_mapMsgUnjailOrMsgEditValidator(msg))
				break
			case TransactionTypeEnum.MsgUpdateClient:
				messageData.push(_mapMsgUpdateClient(msg))
				break
			case TransactionTypeEnum.MsgConnectionOpenInit:
				messageData.push(_mapMsgConnectionOpenInit(msg))
				break
			case TransactionTypeEnum.MsgTransfer:
				messageData.push(_mapMsgTransfer(msg))
				break
			case TransactionTypeEnum.MsgCreateClient:
				messageData.push(_mapMsgCreateClient(msg))
				break
			case TransactionTypeEnum.MsgCreateClawbackVestingAccount:
				messageData.push(_mapMsgCreateClawbackVestingAccount(msg))
				break
			case TransactionTypeEnum.MsgAcknowledgement:
				messageData.push(_mapMsgAcknowledgement(msg))
				break
			case TransactionTypeEnum.MsgClawback:
				messageData.push(_mapMsgClawback(msg))
				break
			case TransactionTypeEnum.MsgWithdrawValidatorCommission:
				messageData.push(_mapMsgWithdrawValidatorCommission(msg))
				break
		}
	}
	return {
		messageData
	}
}

/**
 *
 * @param amounts {denom, amount}
 * @returns amount in string (bignumber)
 */
export const getAstraTokenAmount = (amount: TokenAmount | TokenAmount[]): string => {
	let totalAmount = BigNumber.from('0')
	if (isArray(amount) && !isEmpty(amount)) {
		for (let a of amount) {
			totalAmount = totalAmount.add(BigNumber.from(a.amount || '0'))
		}
	} else if (!isArray(amount) && !isEmpty(amount)) {
		totalAmount = totalAmount.add(BigNumber.from(amount.amount || '0'))
	}

	return totalAmount.toString()
}

export const getTokenName = (amount: TokenAmount | TokenAmount[]): string => {
	if (isArray(amount) && !isEmpty(amount)) {
		return amount[0].denom.toLowerCase().includes('astra') ? process.env.NEXT_PUBLIC_NATIVE_TOKEN.toUpperCase() : ''
	} else if (!isArray(amount) && !isEmpty(amount)) {
		return amount.denom.toLowerCase().includes('astra') ? process.env.NEXT_PUBLIC_NATIVE_TOKEN.toUpperCase() : ''
	}

	return ''
}

const _mapMsgSendField = (msg: TransactionMessage): CosmosTxMessage => {
	const content = msg.content as unknown as MsgSendContent
	if (content && msg) {
		return {
			type: msg.type,
			from: astraToEth(content.fromAddress),
			to: astraToEth(content.toAddress),
			amount: formatEther(getAstraTokenAmount(content.amount)),
			amountSymbol: getTokenName(content.amount)
		}
	}
}

const _mapMsgVoteField = (msg: TransactionMessage): CosmosTxMessage => {
	const content = msg.content as unknown as MsgVoteContent
	if (msg && content) {
		return {
			type: msg.type,
			voter: astraToEth(content.voter),
			proposalId: content.proposalId,
			option: content.option
		}
	}
}

const _mapMsgDelegate = (msg: TransactionMessage): CosmosTxMessage => {
	const content = msg.content as unknown as MsgDelegateContent
	if (msg && content) {
		return {
			type: msg.type,
			delegatorAddress: content.delegatorAddress,
			validatorAddress: content.validatorAddress,
			amount: formatEther(getAstraTokenAmount(content.amount)),
			amountSymbol: getTokenName(content.amount)
		}
	}
}

const _mapMsgUndelegate = (msg: TransactionMessage): CosmosTxMessage => {
	const content = msg.content as unknown as MsgUndelegateContent
	if (msg && content) {
		return {
			type: msg.type,
			delegatorAddress: content.delegatorAddress,
			validatorAddress: content.validatorAddress,
			amount: formatEther(content.amount.amount)
		}
	}
}

const _mapMsgBeginRedelegate = (msg: TransactionMessage): CosmosTxMessage => {
	const content = msg.content as unknown as MsgBeginRedelegateContent
	if (msg && content) {
		return {
			type: msg.type,
			delegatorAddress: content.delegatorAddress,
			validatorSrcAddress: content.validatorSrcAddress,
			validatorDstAddress: content.validatorDstAddress,
			amount: formatEther(getAstraTokenAmount(content.amount)),
			amountSymbol: getTokenName(content.amount)
		}
	}
}

const _mapMsgExec = (msg: TransactionMessage, messages: TransactionMessage[]): CosmosTxMessage => {
	const content = msg.content as unknown as MsgExecContent
	// const msgs =
	let msgsObj = {}
	const msgGrants = messages.filter(msg =>
		[TransactionTypeEnum.MsgGrant, TransactionTypeEnum.MsgRevoke].includes(msg.type)
	)
	let tableTitles = ['TYPE', 'GRANTER', 'GRANTEE', 'GRANT', 'MSG TYPE URL']
	let tableContent = []
	if (!isEmpty(msgGrants)) {
		for (let msg of msgGrants) {
			if (msg.type === TransactionTypeEnum.MsgGrant) {
				tableTitles = ['TYPE', 'GRANTER', 'GRANTEE', 'GRANT']
				const { params } = msg.content as MsgGrantContent
				tableContent.push([
					params.maybeGenericGrant['@type'],
					params.maybeGenericGrant.granter,
					params.maybeGenericGrant.grantee,
					JSON.stringify(params.maybeGenericGrant.grant)
				])
			}

			if (msg.type === TransactionTypeEnum.MsgRevoke) {
				tableTitles = ['TYPE', 'GRANTER', 'GRANTEE', 'MSG TYPE URL']
				const { params } = msg.content as unknown as MsgRevokeContent
				tableContent.push([params['@type'], params.granter, params.grantee, params.msgTypeUrl])
			}
		}
		msgsObj = { msgs: { content: tableContent, titles: tableTitles } }
	}
	if (msg && content) {
		return {
			type: msg.type,
			grantee: content.params.grantee,
			...msgsObj
		}
	}
}
const _mapMsgGrant = (msg: TransactionMessage): CosmosTxMessage => {
	const content = msg.content as unknown as MsgGrantContent
	if (msg && content) {
		return {
			type: msg.type,
			granter: content.params.maybeGenericGrant.granter,
			grantee: content.params.maybeGenericGrant.grantee,
			dynamicRender: [{ grant: content.params.maybeGenericGrant.grant }]
		}
	}
}

const _mapMsgWithdrawDelegatorReward = (msg: TransactionMessage): CosmosTxMessage => {
	const content = msg.content as unknown as MsgWithdrawDelegatorRewardContent
	if (msg && content) {
		return {
			type: msg.type,
			delegatorAddress: content.delegatorAddress,
			// recipientAddress: content.recipientAddress,
			amount: formatEther(getAstraTokenAmount(content.amount)),
			validatorAddress: content.validatorAddress
		}
	}
}

const _mapMsgCreateValidator = (msg: TransactionMessage): CosmosTxMessage => {
	const content = msg.content as unknown as MsgCreateValidatorContent
	if (msg && content) {
		return {
			type: msg.type,
			delegatorAddress: content.delegatorAddress,
			dynamicRender: [
				{ validatorDescription: content.description },
				{ commissionRates: content.commissionRates }
			],
			// validatorDescription: content.description,
			// commissionRates: content.commissionRates,
			minSelfDelegation: content?.minSelfDelegation || '0',
			validatorAddress: content.validatorAddress,
			tendermintPubkey: content.tendermintPubkey
		}
	}
}

const _mapMsgTextProposalOrMsgSubmitProposal = (msg: TransactionMessage): CosmosTxMessage => {
	const content = msg.content as unknown as TextProposalFullContent
	if (msg && content) {
		return {
			type: msg.type,
			proposer: content.proposerAddress,
			initialDepositValue: formatEther(getAstraTokenAmount(content.initialDeposit)),
			initialDepositTokenSymbol: getTokenName(content.initialDeposit),
			dynamicRender: [{ textProposalContent: content.content }]
		}
	}
}

const _mapMsgDeposit = (msg: TransactionMessage) => {
	const content = msg.content as unknown as MsgDepositContent
	if (msg && content) {
		return {
			type: msg.type,
			depositor: content.depositor,
			proposalId: content.proposalId,
			amount: formatEther(getAstraTokenAmount(content.amount)),
			amountSymbol: getTokenName(content.amount)
		}
	}
}

const _mapMsgUnjailOrMsgEditValidator = (msg: TransactionMessage): CosmosTxMessage => {
	const content = msg.content as unknown as MsgUnjailContent
	if (msg && content) {
		return {
			type: msg.type,
			validatorAddress: content.validatorAddress
		}
	}
}

const _mapMsgUpdateClient = (msg: TransactionMessage): CosmosTxMessage => {
	const content = msg.content as unknown as MsgUpdateClientContent
	const { params } = content
	if (msg && content) {
		return {
			type: msg.type,
			clientId: params.clientId,
			signer: params.signer,
			dynamicRender: [{ header: content.params.maybeTendermintLightClientUpdate.header }]
		}
	}
}

const _mapMsgConnectionOpenInit = (msg: TransactionMessage): CosmosTxMessage => {
	const content = msg.content as unknown as MsgConnectionOpenInitContent
	const { params } = content
	if (msg && content) {
		return {
			type: msg.type,
			clientId: params.clientId,
			signer: params.signer,
			dynamicRender: [{ counterparty: params.counterparty }, { version: params.version }],
			delayPeriod: params.delayPeriod
		}
	}
}

const _mapMsgTransfer = (msg: TransactionMessage): CosmosTxMessage => {
	const content = msg.content as unknown as MsgTransferContent
	const { params } = content
	if (msg && content) {
		return {
			type: msg.type,
			sourcePort: params.sourcePort,
			sourceChannel: params.sourceChannel,
			sender: params.sender,
			receiver: params.receiver,
			timeoutTimestamp: params.timeoutTimestamp,
			token: `${formatEther(params.token.amount)} ${getTokenName(params.token)}`,
			memo: '',
			dynamicRender: [{ timeoutHeight: params.timeoutHeight }]
		}
	}
}

const _mapMsgCreateClient = (msg: TransactionMessage): CosmosTxMessage => {
	const content = msg.content as unknown as MsgCreateClientContent
	const { params } = content
	if (msg && content) {
		return {
			type: msg.type,
			dynamicRender: [
				{ clientState: params.maybeTendermintLightClient.clientState },
				{ consensusState: params.maybeTendermintLightClient.consensusState }
			],
			signer: params.signer
		}
	}
}

const _mapMsgCreateClawbackVestingAccount = (msg: TransactionMessage): CosmosTxMessage => {
	const content = msg.content as unknown as MsgCreateClawbackVestingAccountContent
	const { params } = content

	if (msg && content) {
		const lockupPeriodsTitle = ['LENGTH', 'AMOUNT']
		const lockupPeriodsContent = []
		for (let lock of params.lockup_periods) {
			const { amount, length } = lock
			const totalAmount = getAstraTokenAmount(amount)
			const tokenName = getTokenName(amount)
			lockupPeriodsContent.push([length, `${formatEther(totalAmount)} ${tokenName}`])
		}

		const vestingPeriodsTitle = ['LENGTH', 'AMOUNT']
		const vestingPeriodsContent = []
		for (let vest of params.vesting_periods) {
			const { amount, length } = vest
			const totalAmount = getAstraTokenAmount(amount)
			const tokenName = getTokenName(amount)
			vestingPeriodsContent.push([
				formatNumber(length),
				`${formatNumber(
					formatEther(totalAmount),
					getEnvNumber('NEXT_PUBLIC_MAXIMUM_FRACTION_DIGITS')
				)} ${tokenName}`
			])
		}
		return {
			type: msg.type,
			from: params.from_address,
			to: params.to_address,
			startTime: params.start_time,
			lockupPeriods: {
				titles: lockupPeriodsTitle,
				content: lockupPeriodsContent
			},
			vestingPeriods: {
				titles: vestingPeriodsTitle,
				content: vestingPeriodsContent
			}
		}
	}
}

const _mapMsgAcknowledgement = (msg: TransactionMessage): CosmosTxMessage => {
	const content = msg.content as unknown as MsgAcknowledgementContent
	const { params } = content
	if (msg && content) {
		return {
			type: msg.type,
			dynamicRender: [{ packet: params.packet }, { proofHeigh: params.proofHeight }],
			acknowledgement: params.acknowledgement,
			proofAcked: params.proofAcked,
			signer: params.signer
		}
	}
}

const _mapMsgClawback = (msg: TransactionMessage): CosmosTxMessage => {
	const content = msg.content as unknown as MsgClawbackContent
	const { params } = content
	if (msg && content) {
		return {
			type: msg.type,
			funderAddress: params.funder_address,
			accountAddress: params.account_address,
			destAddress: params.dest_address || ' '
		}
	}
}
const _mapMsgWithdrawValidatorCommission = (msg: TransactionMessage): CosmosTxMessage => {
	const content = msg.content as unknown as MsgWithdrawValidatorCommissionContent
	if (msg && content) {
		return {
			type: msg.type,
			validatorAddress: content.validatorAddress,
			recipientAddress: content.recipientAddress,
			amount: formatEther(getAstraTokenAmount(content.amount)),
			amountSymbol: getTokenName(content.amount)
		}
	}
}
