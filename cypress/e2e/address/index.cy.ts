// import data from '../fixtures/address.json'

describe('Address Page with Desktop', () => {
	const HOST = 'http://localhost:3000/tx'
	beforeEach(() => {
		cy.viewport('macbook-13')
		cy.visit(HOST)
	})
	it('Render page with true data', () => {})
	it('Render page with false data, example null balance', () => {})
	it('Render page with false data, example ... (other fields)', () => {})

	it('Link to block when click LastBalanceUpdated', () => {})

	it('Render page with full transactions', () => {})
	it('Render page with empty transactions', () => {})
})
describe('Address Page with Mobile', () => {
	const HOST = 'http://localhost:3000/tx'
	beforeEach(() => {
		cy.viewport('iphone-x')
		cy.visit(HOST)
	})
})
