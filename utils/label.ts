import { isMainnet } from './helper'

const addressLabelArr = isMainnet ? require('../data/address/mainnet.json') : require('../data/address/testnet.json')

export const getAddressLabel = (label, address: string) => {
	if (!address) return label || ''

	const whitelistLabel = addressLabelArr[address.toLowerCase()]
	if (whitelistLabel) return whitelistLabel + ' ✅'

	return label || ''
}
