describe('Home Page', () => {
	const HOST = 'http://localhost:3000'
	beforeEach(() => {
		cy.viewport('macbook-13')
		cy.visit(HOST)
	})
	it('loads home page with full navbar and right title/chain', () => {
		cy.title().should('eq', 'Astra Explorer')
		cy.get('#nav-block > span').should('have.html', 'Blocks')
		cy.get('#nav-transaction > span').should('have.html', 'Transactions')
		cy.get('#nav-token > span').should('have.html', 'Tokens')
		cy.get('#nav-stats > span').should('have.html', 'Stats')
		cy.get('#nav-chain > span:nth-child(2)').should('have.html', 'Astra Mainnet')

		cy.get('#nav-desktop-others > .search').should('be.visible')
	})

	it('Navigate to Block page', () => {
		cy.get('#nav-block').click()

		cy.get('.page-title').should('have.html', 'Blocks')
		cy.url().should('eq', `${HOST}/block`)
	})

	it('Navigate to Transactions page', () => {
		cy.get('#nav-transaction').click()

		cy.get('.page-title').should('have.html', 'Transactions')
		cy.url().should('eq', `${HOST}/tx`)
	})

	it('Navigate to Stats page', () => {
		cy.get('#nav-stats').click()

		cy.url().should('eq', `${HOST}/charts`)
	})

	it('Navigate to Home page', () => {
		cy.get('.logo').click({ multiple: true })

		cy.url().should('eq', `${HOST}/`)
	})

	/**
	 * Current disable change theme feature
	 */
	// it('Change theme', () => {
	// 	cy.get('#__next > div:nth-child(2)').should('have.class', 'dark--mode')
	// 	cy.get('#nav-desktop-others > .switch-theme').should('be.visible').click()
	// 	cy.get('#__next > div:nth-child(2)').should('have.class', 'light--mode')
	// })
})
