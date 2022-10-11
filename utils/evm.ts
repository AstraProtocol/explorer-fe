import { formatEther } from 'ethers/lib/utils'
import { TransactionRowProps } from 'views/transactions/TransactionRow'

export const evmTransactionType = (type: number): string => {
	if (type === 2) {
		return `2 (EIP-1559)`
	}
	if (type === 1) {
		return `1 (EIP-2930)`
	}
	return `${type}`
}

export const evmConvertTokenTransferToTransactionRow = (
	items: EVMTransferItem[],
	blockTime: string,
	status?: boolean,
	hash?: string,
	blockHeight?: number
): TransactionRowProps[] => {
	const rows: TransactionRowProps[] = []
	for (let item of items) {
		rows.push({
			style: 'inject',
			blockNumber: blockHeight,
			updatedAt: blockTime,
			value: formatEther(item.amount),
			valueCurrency: item.tokenSymbol,
			hash: hash,
			status,
			from: item.fromAddress,
			to: item.toAddress
		})
	}

	return rows
}

export const isEmptyRawInput = (input: string) => {
	return !input || input.trim().length === 0 || input.toLowerCase() === '0x'
}

export const evmInternalTransactionType = (type: string) => {
	type = type.toLowerCase()
	switch (type) {
		case 'call':
			return 'Call'
		case 'staticcall':
			return 'Static Call'
		default:
			return type
	}
}

export const isEvmAddress = (address: string) => {
	return address && address.startsWith('0x')
}

/**
 * https://ethereum.stackexchange.com/questions/3364/encoding-decoding-contract-abi-data
 * methodid is first 4 bytes
 * @param data
 */
export const evmMethodId = (data: string) => {
	if (!data) {
		return ''
	}
	if (data.startsWith('0x')) {
		return data.slice(0, 10)
	}
	return data.slice(0, 8)
}
