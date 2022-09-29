import { BigNumber } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import numeral from 'numeral'

export const ellipseBetweenText = (address: string, left = 10, right = 10) =>
	!address ? '' : address.length < left * 2 ? address : `${address.slice(0, left)}...${address.slice(-right)}`

export const ellipseRightText = (address: string, to: number) => {
	if (!address || address.length <= to) {
		return address
	}
	return `${address.slice(0, to)}...`
}

export const ellipseLeftText = (address: string, to: number) => {
	if (!address || address.length <= to) {
		return address
	}
	return `${address.slice(-to)}...`
}

export const convertBalanceToView = (value: number | string, decimals = 18) => {
	const big = BigNumber.from(value)
	return formatUnits(big, decimals)
}
/**
 * return format text of date
 * @param local
 * @returns
 */
export const dateFormat = (local = 'vi') => {
	return local === 'vi' ? process.env.NEXT_PUBLIC_DATE_FORMAT_VI : process.env.NEXT_PUBLIC_DATE_FROMAT_OTHER
}

export function formatCurrencyValue(value, symbol = 'VND') {
	symbol = symbol || ''
	if (isNaN(value)) return 'NaN'
	if (value === 0 || value === '0') return `0.00 ${symbol}`
	// if (value < 0.000001) return `${window.localized['Less than']} 0.000001 ${symbol}`
	if (value < 1000) return `${numeral(value).format('0,0')} ${symbol}`
	if (value < 1000000) return `${numeral(value).format('0,0')} ${symbol}`
	if (value < 1000000000) return `${numeral(value / 10 ** 6).format('0,0')} Million ${symbol}`
	if (value > 1000000000) return `${numeral(value / 10 ** 9).format('0,0')} Billion ${symbol}`
	return `${numeral(value).format('0,0')} ${symbol}`
}

export function formatUnitValue(value) {
	if (isNaN(value)) return 'NaN'
	if (value === 0 || value === '0') return `0`
	if (value < 1000) return `${numeral(value).format('0,0')} nano ASA`
	if (value < 1000000) return `${numeral(value / 10 ** 3).format('0,0')} micro ASA`
	if (value < 1000000000) return `${numeral(value / 10 ** 6).format('0,0')} ASA`
	return `${numeral(value).format('0,0')}`
}

//   function weiToEther (wei) {
// 	return new BigNumber(wei).dividedBy('1000000000000000000').toNumber()
//   }

//   function etherToUSD (ether, usdExchangeRate) {
// 	return new BigNumber(ether).multipliedBy(usdExchangeRate).toNumber()
//   }

export class LinkMaker {
	static address(address: string) {
		return `/address/${address}`
	}
	/**
	 *
	 * @param blockNumber empty -> block homepage
	 * @returns
	 */
	static block(blockNumber?: string | number) {
		blockNumber = blockNumber > 0 ? `/${blockNumber}` : ''
		return `/blocks${blockNumber}`
	}

	/**
	 *
	 * @param blockNumber empty -> block homepage
	 * @returns
	 */
	static transaction(hash?: string) {
		hash = hash ? `/${hash}` : ''
		return `/tx${hash}`
	}
}
