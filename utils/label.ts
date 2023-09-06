import { isMainnet } from './helper'

const addressLabelArr = isMainnet ? require('../data/address/mainnet.json') : require('../data/address/testnet.json')

export const getAddressLabel = (label, address: string) => {
	if (label && label.trim() !== '') return label + ' ✅'
	if (!address) return ''
	if (addressLabelArr[address.toLowerCase()]) return addressLabelArr[address.toLowerCase()] + ' ✅'
	return ''
}
