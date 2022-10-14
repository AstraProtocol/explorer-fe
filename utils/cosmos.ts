import { astraToEth } from '@astradefi/address-converter'
import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { TransactionRowProps } from 'views/transactions/TransactionRow'
import { TransacionTypeEnum } from './constants'

/**
 * get last word of text with separate is dot
 * @param type
 * @returns
 */
export const getTransactionType = (type: TransacionTypeEnum) => type?.split('.').slice(-1).join('') || ''

/**
 * return fee with format
 * @param fees
 * @returns TokenAmount
 */
export const caculateCosmosAmount = (amounts: TokenAmount[]): TokenAmount => {
	if (!amounts) {
		return { amount: undefined, denom: undefined }
	}
	let totalAmount = BigNumber.from('0')
	for (let amount of amounts) {
		totalAmount = totalAmount.add(BigNumber.from(amount.amount))
	}
	return {
		amount: totalAmount.toBigInt().toString(),
		denom: amounts[0].denom
	}
}

export const convertMessageToTransfer = (
	messages: TransactionMessage[],
	blockTime: string,
	status: boolean
): TransactionRowProps[] => {
	const rows: TransactionRowProps[] = []
	const type: TransacionTypeEnum = messages[0]?.type
	for (let message of messages) {
		const content = message.content
		if (type === TransacionTypeEnum.MsgSend) {
			rows.push(_parseCosmosMsgSend(content as MsgSendContent, blockTime, status))
		} else if (type === TransacionTypeEnum.MsgBeginRedelegate) {
		} else if (type === TransacionTypeEnum.MsgDelegate) {
		} else if (type === TransacionTypeEnum.MsgVote) {
		} else if (type === TransacionTypeEnum.MultipleMsgWithdrawDelegatorReward) {
		}
	}
	return rows
}

const _parseCosmosMsgSend = (content: MsgSendContent, blockTime: string, status: boolean): TransactionRowProps => {
	const amountItem = caculateCosmosAmount(content?.amount)
	return {
		style: 'inject',
		blockNumber: content.height,
		updatedAt: blockTime,
		value: formatEther(amountItem.amount),
		valueCurrency: amountItem.denom,
		hash: content.txHash,
		type: getTransactionType(content?.msgName),
		status,
		from: astraToEth(content?.fromAddress),
		to: astraToEth(content?.toAddress)
	}
}
