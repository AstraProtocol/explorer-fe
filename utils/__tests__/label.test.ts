import { expect, test } from '@jest/globals'
import { getAddressLabel } from 'utils/label'

describe('getAddressLabel() fnc', () => {
	test('return Tiki Account label', () => {
		expect(getAddressLabel('', '0x661276b8c832da06c709dbc2b0c063e2f1d25ef9')).toBe('Tiki Account')
	})

	test('return contract name from data', () => {
		expect(getAddressLabel('TienUSD', '0x661276b8c832da06c709dbc2b0c063e2f1d25ef8')).toBe('TienUSD')
	})

	test('return contract name from Backend with address null', () => {
		expect(getAddressLabel('TienUSD', undefined)).toBe('TienUSD')
	})

	test('return empty with no whitelist address and no name from data', () => {
		expect(getAddressLabel('', '0x661276b8c832da06c709dbc2b0c063e2f1d25ef8')).toBe('')
	})
})
