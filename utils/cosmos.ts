import { astraToEth } from '@astradefi/address-converter'
import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { TransactionRowProps } from 'views/transactions/TransactionRow'

/**
 * get last word of text with separate is dot
 * @param type
 * @returns
 */
export const getCosmosType = (type: string) => type?.split('.').slice(-1).join('') || ''

/**
 * return fee with format
 * @param fees
 * @returns CosmosAmountItem
 */
export const caculateCosmosAmount = (fees: CosmosAmountItem[]): CosmosAmountItem => {
	if (!fees) {
		return { amount: undefined, denom: undefined }
	}
	let totalAmount = BigNumber.from('0')
	for (let fee of fees) {
		totalAmount = totalAmount.add(BigNumber.from(fee.amount))
	}
	return {
		amount: totalAmount.toBigInt().toString(),
		denom: fees[0].denom
	}
}

export const convertMessageToTransfer = (
	messages: TransactionMessage[],
	blockTime: string,
	status: boolean
): TransactionRowProps[] => {
	const rows: TransactionRowProps[] = []
	for (let message of messages) {
		const content = message.content as CosmosTransactionContent
		const amountItem = caculateCosmosAmount(content?.amount)
		rows.push({
			style: 'inject',
			blockNumber: content.height,
			updatedAt: blockTime,
			value: formatEther(amountItem.amount),
			valueCurrency: amountItem.denom,
			hash: content.txHash,
			type: getCosmosType(content?.name || content?.msgName),
			status,
			from: astraToEth(content?.fromAddress),
			to: astraToEth(content?.toAddress)
		})
	}
	return rows
}
