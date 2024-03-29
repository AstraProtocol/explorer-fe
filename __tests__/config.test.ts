import { expect, test } from '@jest/globals'

describe('check config', () => {
	test('Check not empty any config define in next.config.js', () => {
		expect(process.env.NEXT_PUBLIC_BLOCK_INTERVAL).toBeDefined()
		expect(process.env.NEXT_PUBLIC_TRANSACTION_INTERVAL).toBeDefined()
		expect(process.env.NEXT_PUBLIC_CHART_INTERVAL).toBeDefined()
		expect(process.env.NEXT_PUBLIC_DATE_FORMAT_VI).toBeDefined()
		expect(process.env.NEXT_PUBLIC_DATE_FROMAT_OTHER).toBeDefined()
		expect(process.env.NEXT_PUBLIC_ITEM_SHOW_HOME_PAGE).toBeDefined()
		expect(process.env.NEXT_PUBLIC_PAGE_OFFSET).toBeDefined()
		expect(process.env.NEXT_PUBLIC_MAXIMUM_FRACTION_DIGITS).toBeDefined()
		expect(process.env.NEXT_PUBLIC_NATIVE_TOKEN).toBeDefined()
		expect(process.env.NEXT_PUBLIC_ENV).toBeDefined()
	})
	test('Check env number is right', () => {
		expect(Number(process.env.NEXT_PUBLIC_BLOCK_INTERVAL)).toBeGreaterThanOrEqual(0)
		expect(Number(process.env.NEXT_PUBLIC_TRANSACTION_INTERVAL)).toBeGreaterThanOrEqual(0)
		expect(Number(process.env.NEXT_PUBLIC_CHART_INTERVAL)).toBeGreaterThanOrEqual(0)
		expect(Number(process.env.NEXT_PUBLIC_ITEM_SHOW_HOME_PAGE)).toBeGreaterThanOrEqual(0)
		expect(Number(process.env.NEXT_PUBLIC_PAGE_OFFSET)).toBeGreaterThanOrEqual(0)
		expect(Number(process.env.NEXT_PUBLIC_MAXIMUM_FRACTION_DIGITS)).toBeGreaterThanOrEqual(0)
	})
	test('Check native token is right', () => {
		expect(process.env.NEXT_PUBLIC_NATIVE_TOKEN).toBe('asa')
	})
})
