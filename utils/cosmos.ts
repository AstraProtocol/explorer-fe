import { astraToEth } from '@astradefi/address-converter'
import { formatEther } from 'ethers/lib/utils'
import { TransactionRowProps } from 'views/transactions/TransactionRow'
import { caculateAmount } from 'views/transactions/utils'
import { TransactionTypeEnum } from './enum'

/**
 * get last word of text with separate is dot
 * @param type
 * @returns
 */
export const getTransactionType = (type: string) => type?.split('.').slice(-1).join('') || ''
export const getTransactionEvmType = (messages: TransactionMessage[]) =>
	messages.length > 0 ? messages[0].evmType : ''

export const convertMessageToTransfer = (
	messages: TransactionMessage[],
	blockTime: string,
	status: boolean
): TransactionRowProps[] => {
	const rows: TransactionRowProps[] = []
	const type: string = messages[0]?.type
	for (let message of messages) {
		const content = message.content
		if (type === TransactionTypeEnum.MsgSend) {
			rows.push(_parseCosmosMsgSend(content as MsgSendContent, blockTime, status))
		} else if (type === TransactionTypeEnum.MsgBeginRedelegate) {
		} else if (type === TransactionTypeEnum.MsgDelegate) {
		} else if (type === TransactionTypeEnum.MsgVote) {
		} else if (type === TransactionTypeEnum.MsgWithdrawDelegatorReward) {
		}
	}
	return rows
}

const _parseCosmosMsgSend = (content: MsgSendContent, blockTime: string, status: boolean): TransactionRowProps => {
	const amountItem = caculateAmount(content?.amount)
	return {
		style: 'inject',
		blockNumber: content.height,
		updatedAt: blockTime,
		value: formatEther(amountItem.amount || '0'),
		valueCurrency: amountItem.denom,
		hash: content.txHash,
		type: getTransactionType(content?.msgName),
		status,
		from: astraToEth(content?.fromAddress),
		to: astraToEth(content?.toAddress)
	}
}
