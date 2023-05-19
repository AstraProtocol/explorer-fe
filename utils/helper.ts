import { astraToEth } from '@astradefi/address-converter'
import { BigNumber as BN } from 'bignumber.js'
import { BigNumber } from 'ethers'
import { formatEther, formatUnits } from 'ethers/lib/utils'
import { isEmpty, isUndefined } from 'lodash'
import numeral from 'numeral'
import qs from 'qs'
import { CONFIG } from './constants'
import { ErcTypeEnum } from './enum'

BN.config({ ROUNDING_MODE: 2 })

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

export const formatValueFromWei = (wei: string): string => {
	if (parseFloat(wei) == 0) return '0'
	if (parseFloat(wei) < CONFIG.APPROXIMATE_ZERO) return parseFloat(wei).toExponential()
	return wei
}

export const getAmountFromBignumber = (value: number | string, decimals: string = '18'): string => {
	if (!value) return '0'

	if (!decimals) decimals = '0'
	const parsedDecimals = parseInt(decimals)

	try {
		const big = BigNumber.from(value)
		const valueInWei = formatUnits(big, parsedDecimals).valueOf()
		return valueInWei
	} catch (err) {
		// bignumber (ethers) error with 500100000000.000000000000000000
		// bignumber.js caught this. but ethers not
		// must convert value to decimal, sometimes round this value
		return formatEther(BN(value).integerValue(BN.ROUND_DOWN).toString(10))
	}
}

export const convertBalanceToView = (value: number | string, decimals = '18'): string => {
	const amount = formatValueFromWei(getAmountFromBignumber(value, decimals))
	return isInt(amount) ? numeral(amount).format('0,0') : numeral(amount).format('0,0.00000')
}

export const calculateGasFee = (gasUsed: string, gasPrice: string): number => +gasUsed * +gasPrice
export const calculateAmountInVND = (asaAmount: number, asaPrice: string): number => asaAmount * +asaPrice
export const isInt = n => n % 1 === 0

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
	const minimumValue = 0.01
	if (isNaN(value) || isUndefined(value)) return '0'
	if (value === 0 || value === '0' || value <= minimumValue) return `0`
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
		blockNumber = blockNumber > 0 ? `${blockNumber}${query}` : ''
		return `/block/${blockNumber}`
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

export const isERC721 = (type: string): boolean => type === ErcTypeEnum.ERC721

export const getTransactionInOrOut = (
	address: string = '',
	from: string = '',
	to: string = '',
	defaultType: string = ''
) => {
	from = from?.toLowerCase()
	to = to?.toLowerCase()
	address = address?.toLowerCase()

	if (address?.startsWith('astra')) {
		address = astraToEth(address).toLowerCase()
	}

	if (from?.startsWith('astra')) {
		from = astraToEth(from).toLowerCase()
	}
	if (to?.startsWith('astra')) {
		to = astraToEth(to).toLowerCase()
	}
	if (!isEmpty(to) && address === from) {
		return 'OUT'
	}
	if (!isEmpty(from) && address === to) {
		return 'IN'
	}
	return defaultType
}

export function convertBigNumberToString(x: any) {
	if (!x) return '0'
	if (Math.abs(x) < 1.0) {
		var e = parseInt(x.toString().split('e-')[1])
		if (e) {
			x *= Math.pow(10, e - 1)
			x = '0.' + new Array(e).join('0') + x.toString().substring(2)
		}
	} else {
		var e = parseInt(x.toString().split('+')[1])
		if (e > 20) {
			e -= 20
			x /= Math.pow(10, e)
			x += new Array(e + 1).join('0')
		}
	}
	return isEmpty(x.toString()) ? '0' : x.toString()
}

export const isMainnet = process.env.NEXT_PUBLIC_ENV === 'mainnet'