import { astraToEth } from '@astradefi/address-converter'
import { formatEther } from 'ethers/lib/utils'
import { TransactionRowProps } from 'views/transactions/TransactionRow'
import { caculateAmount } from 'views/transactions/utils'
import { TransacionTypeEnum } from './enum'

/**
 * get last word of text with separate is dot
 * @param type
 * @returns
 */
export const getTransactionType = (type: TransacionTypeEnum) => type?.split('.').slice(-1).join('') || ''
export const getTransactionEvmType = (messages: TransactionMessage[]) =>
	messages.length > 0 ? messages[0].evmType : ''

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
