import { formatEther } from 'ethers/lib/utils'
import { TransactionRowProps } from 'views/transactions/TransactionRow'
import { TransacionTypeEnum } from './constants'

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
		case 'callcode':
			return 'Call Code'
		case 'delegatecall':
			return 'Delegate Call'
		case 'staticcall':
			return 'Static Call'
		case 'selfdestruct':
			return 'Self Destruct'
		case 'create':
			return 'Create'
		case 'create2':
			return 'Create2'
		case 'reward':
			return 'Reward'
		default:
			return type
	}
}
export const isEvmAddress = (address: string) => {
	return address && address.startsWith('0x')
}

/**
 * https://ethereum.stackexchange.com/questions/3364/encoding-decoding-contract-abi-data
 * https://github.com/web3/web3.js/blob/9b7540d283c3c72978ebdfacc0dea2d0f3f36a05/packages/web3-eth-abi/src/index.js#L58
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

/**
 * ex: Solarswap LPs (0x59cebe...bdc231)
 * @param addressName
 * @param addresValue
 * @returns
 */
export const evmAddressName = (addressName: string, addresValue: string) => {
	if (!addressName || !addressName.trim()) {
		return addresValue
	}
	return `${addressName} (${addresValue})`
}

export const getFromToEvmTxFromCosmosEntry = (message: TransactionMessage) => {
	if (message.type !== TransacionTypeEnum.Ethermint) {
		return { evmHash: '', from: '', to: '' }
	}

	const evmHash = message?.content?.params?.hash
	const from = message?.content?.params?.from
	const to = message?.content?.params?.data?.to
	return { evmHash, from, to }
}
