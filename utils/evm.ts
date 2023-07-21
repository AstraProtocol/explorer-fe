import { TransactionRowProps } from 'views/transactions/TransactionRow'
import { ZERO_ADDRESS } from './constants'
import { convertBalanceToView, isERC721 } from './helper'

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
		const isCreate = item.fromAddress === ZERO_ADDRESS && item.toAddress === ZERO_ADDRESS
		const isMint = item.fromAddress === ZERO_ADDRESS
		const isBurn = item.toAddress === ZERO_ADDRESS
		const labelStatus = (isCreate && 'Create') || (isMint && 'Mint') || (isBurn && 'Burn')

		const isNft = isERC721(item.tokenType)
		// const value = isNft ? '1' : formatUnits(item.amount || '0', item.decimals)
		const value = convertBalanceToView(item.amount, item.decimals)

		rows.push({
			style: 'inject',
			blockNumber: blockHeight,
			updatedAt: blockTime,
			value,
			valueCurrency: isNft
				? item.tokenSymbol?.toUpperCase() || `NFT [${item.tokenId}]`
				: item.tokenSymbol?.toUpperCase(),
			hash: hash,
			status,
			from: item.fromAddress,
			fromName: item.fromAddressName,
			to: item.toAddress,
			toName: item.toAddressName,
			labelStatus,
			type: 'MsgEthereumTx'
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

export const isEvmTransactionType = (type: string) => {
	return type && type.endsWith('EthereumTx')
}
