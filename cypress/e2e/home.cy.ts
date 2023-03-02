describe('Home Page', () => {
	beforeEach(() => {
		cy.viewport('macbook-13')
		cy.visit('http://localhost:3000')
	})
	it('loads home page with right title/chain', () => {
		cy.title().should('eq', 'Astra Explorer')
		// cy.get('#menu-chain').should('eq', 'Astra Mainnet')
	})
})
