describe('Home Page', () => {
	beforeEach(() => cy.visit('http://localhost:3000'))
	it('loads home page', () => {
		cy.title().should('eq', 'Astra Explorer Testnet')
	})
})
