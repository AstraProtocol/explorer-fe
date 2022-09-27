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
