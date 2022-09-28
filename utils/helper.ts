import { BigNumber } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'

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
