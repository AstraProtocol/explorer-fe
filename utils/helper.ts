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
export const dateFormat = (local = 'en') => {
	return local === 'vi' ? process.env.NEXT_PUBLIC_DATE_FORMAT_VI : process.env.NEXT_PUBLIC_DATE_FROMAT_OTHER
}

export function formatCurrencyValue(value: number | string, symbol = 'VND') {
	symbol = symbol || ''
	if (isNaN(value as number)) return 'NaN'
	if (value === 0 || value === '0') return `0.00 ${symbol}`
	if (value < 0.000001) return `Less than 0.000001 ${symbol}`
	if (value < 1000) return `${numeral(value).format('0,0')} ${symbol}`
	if (value < 1000000) return `${numeral(value).format('0,0')} ${symbol}`
	if (value < 1000000000) return `${numeral(Number(value) / 10 ** 6).format('0,0')} Million ${symbol}`
	if (value > 1000000000) return `${numeral(Number(value) / 10 ** 9).format('0,0')} Billion ${symbol}`
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
	static address(address: string, query: string = '') {
		return `/address/${address}${query}`
	}
	/**
	 *
	 * @param blockNumber empty -> block homepage
	 * @returns
	 */
	static block(blockNumber?: string | number, query: string = '') {
		blockNumber = blockNumber > 0 ? `/${blockNumber}${query}` : ''
		return `/blocks${blockNumber}`
	}

	/**
	 *
	 * @param blockNumber empty -> block homepage
	 * @returns
	 */
	static transaction(hash?: string, query: string = '') {
		hash = hash ? `/${hash}${query}` : ''
		return `/tx${hash}`
	}
}

/**
 * sort element of array follow a sorted array value
 * ex: items = [{a: 1}, {a: 3}, {b:5}]
 *     attr = a
 *     arr = [5,1,3]
 * =====> [{a: 5}, {a: 1}, {b:3}]
 * @param items array items
 * @param attr  attribute of one item of items
 * @param arr array value of attr need sort
 * @returns
 */
export const sortArrayFollowValue = (items: any[], attr: string, arr: string[]) => {
	let newItems = []
	for (let value of arr) {
		const _items = items.filter(item => item[attr] === value)
		if (_items.length > 0) {
			newItems = newItems.concat(_items)
		}
	}
	return newItems
}

/**
 * cat dog ==> Cat Dog
 * @param text
 * @returns
 */
export const upperCaseFirstLetterOfWord = (text: string) => text?.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase())

export const convertURLQueryToObject = (path: string): { [key: string]: string } => {
	const query = path.split('?')[1]
	if (!query) {
		return {}
	}
	return JSON.parse('{"' + decodeURI(query).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}
