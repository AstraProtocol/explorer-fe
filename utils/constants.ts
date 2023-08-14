import { Token } from '@solarswap/sdk'

export const CONFIG = {
	APPROXIMATE_ZERO: 10 ** -6,
	TXS_MOBILE_SPLIT_LENGTH: 12,
	TXS_DESKTOP_SPLIT_LENGTH: 16
}
export const LIMIT_PER_PAGE = 10

export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID) || 11115
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const WASA_ADDRESS = process.env.NEXT_PUBLIC_WASA_ADDRESS
export const WASA_TOKEN = new Token(CHAIN_ID, WASA_ADDRESS, 18, 'WASA', 'WASA')
