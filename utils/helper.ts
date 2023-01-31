import { BigNumber } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { isUndefined } from 'lodash'
import numeral from 'numeral'
import qs from 'qs'
import { CONFIG } from './constants'
import { ErcTypeEnum } from './enum'

export const ellipseBetweenText = (
	address: string,
	left = CONFIG.TXS_MOBILE_SPLIT_LENGTH,
	right = CONFIG.TXS_MOBILE_SPLIT_LENGTH
) => (!address ? '' : address.length < left * 2 ? address : `${address.slice(0, left)}...${address.slice(-right)}`)

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
	if (!value) return 0
	if (!decimals) decimals = 1

	const big = BigNumber.from(value)
	const valueInWei = formatUnits(big, decimals).valueOf()
	if (parseFloat(valueInWei) < CONFIG.APPROXIMATE_ZERO) return '0'
	return valueInWei
}

/**
 * return format text of date
 * @param local
 * @returns
 */
export const dateFormat = (local = 'en') => {
	return local === 'vi' ? process.env.NEXT_PUBLIC_DATE_FORMAT_VI : process.env.NEXT_PUBLIC_DATE_FROMAT_OTHER
}

export function formatCurrencyValue(value: number | string | undefined, symbol = 'VND') {
	symbol = symbol || ''
	if (isNaN(value as number) || isUndefined(value)) return 'NaN'
	if (value === 0 || value === '0') return `0.00 ${symbol}`
	if (value < 0.000001) return `Less than 0.000001 ${symbol}`
	if (value < 1000) return `${numeral(value).format('0,0')} ${symbol}`
	if (value < 1000000) return `${numeral(value).format('0,0')} ${symbol}`
	if (value < 1000000000) return `${numeral(Number(value) / 10 ** 6).format('0,0')} Million ${symbol}`
	if (value > 1000000000) return `${numeral(Number(value) / 10 ** 9).format('0,0')} Billion ${symbol}`
	return `${numeral(value).format('0,0')} ${symbol}`
}

export function formatGasValue(value) {
	if (isNaN(value) || isUndefined(value)) return 'NaN'
	if (value === 0 || value === '0') return `0`
	if (value <= 1000) return `${numeral(value).format('0,0')} NanoAstra`
	// if (value <= 1000) return `${numeral(value).format('0,0')} MWEI`
	if (value <= 1000000) return `${numeral(value / 10 ** 3).format('0,0')} MicroAstra`
	if (value <= 1000000000) return `${numeral(value / 10 ** 6).format('0,0')} Astra`
	return `${numeral(value).format('0,0')}`
}

//   function weiToEther (wei) {
// 	return new BigNumber(wei).dividedBy('1000000000000000000').toNumber()
//   }

//   function etherToUSD (ether, usdExchangeRate) {
// 	return new BigNumber(ether).multipliedBy(usdExchangeRate).toNumber()
//   }

export class LinkMaker {
	static address(address?: string, query: string = '') {
		if (address) return `/address/${address}${query}`
		return '/accounts'
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
	 * @param hash
	 * @param query
	 * @returns
	 */
	static transaction(hash?: string, props?: any) {
		if (!hash) {
			return '/tx'
		}

		if (props) return `/tx/${hash}?${qs.stringify(props)}`
		return `/tx/${hash}`
	}

	/**
	 *
	 * @param token
	 * @returns
	 */
	static token(token?: string, instance?: number | string) {
		if (isUndefined(instance)) return `/token/${token}`
		return `/token/${token}/instance/${instance}`
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

export const getEnvNumber = (key): number => {
	switch (key) {
		case 'NEXT_PUBLIC_PAGE_OFFSET':
			return parseInt(process.env.NEXT_PUBLIC_PAGE_OFFSET, 10) || 10
		case 'NEXT_PUBLIC_MAXIMUM_FRACTION_DIGITS':
			return parseInt(process.env.NEXT_PUBLIC_MAXIMUM_FRACTION_DIGITS, 10) || 4
		default:
			return 0
	}
}

export const capitalizeFirstLetter = (text: string) => {
	if (!text) return ''
	return text.charAt(0).toUpperCase() + text.slice(1)
}

export const isERC721 = (type: string): boolean => {
	return type === ErcTypeEnum.ERC721
}
