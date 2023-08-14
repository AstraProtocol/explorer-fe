import { expect, test } from '@jest/globals'
import { convertBalanceToView, convertHexToUtf8, getAmountFromBignumber } from 'utils/helper'

describe('helper.getAmountFromBignumber() fnc', () => {
	test('with normal bignumber', () => {
		expect(getAmountFromBignumber('1111111111111111111')).toBe('1.111111111111111111')
	})
	test('with decimal point (.)', () => {
		expect(getAmountFromBignumber('1111111111111111111.1')).toBe('1.111111111111111111')
	})
	test('with very small bignumber', () => {
		expect(getAmountFromBignumber('0.000000000000000001')).toBe('0.0')
	})
	test('with small bignumber (.)', () => {
		expect(getAmountFromBignumber('0.000001')).toBe('0.0')
	})
	test('with small bignumber like 500100000000.000000000000000000', () => {
		expect(getAmountFromBignumber('500100000000.000000000000000000')).toBe('0.0000005001')
	})
	test('with negative bignumber (.)', () => {
		expect(getAmountFromBignumber('-1111111000000000000')).toBe('-1.111111')
	})
	test('with small negative bignumber (.)', () => {
		expect(getAmountFromBignumber('-11111')).toBe('-0.000000000000011111')
	})
	test('with very small negative bignumber (.)', () => {
		expect(getAmountFromBignumber('-0.0011111')).toBe('0.0')
	})
})

describe('helper.convertBalanceToView() fnc', () => {
	test('with bignumber', () => {
		expect(convertBalanceToView('1000000000000000000')).toBe('1')
	})
	test('with bignumber and decimal point', () => {
		expect(convertBalanceToView('1230000000000000000')).toBe('1.23000')
	})
	test('with small bignumber and decimal point', () => {
		expect(convertBalanceToView('1230000000000')).toBe('0.00000')
	})
	test('with decimals = 0', () => {
		expect(convertBalanceToView('1', '0')).toBe('1')
	})
})

describe('helper.convertHexToUtf8() fnc', () => {
	test('with hex string', () => {
		expect(
			convertHexToUtf8(
				'0x4769e1baa369207468c6b0e1bb9f6e67204d696e6967616d65205468c3aa6d2062e1baa16e207468c3aa6d20415341'
			).replace(/\0/g, '') // remove null character from received string
		).toBe('Giải thưởng Minigame Thêm bạn thêm ASA')
	})

	test('with empty string', () => {
		expect(convertHexToUtf8('')).toBe('')
	})

	test('with null', () => {
		expect(convertHexToUtf8(null)).toBe('')
	})
})