describe('Home Page with Desktop', () => {
	const HOST = 'http://localhost:3000'
	beforeEach(() => {
		cy.viewport('macbook-13')
		cy.visit(HOST)
	})
	it('loads home page with full navbar and right title/chain', () => {
		cy.title({ timeout: 10000 }).should('eq', 'Astra Explorer')
		cy.get('[cypress-id="nav-block"] > span').should('have.html', 'Blocks')
		cy.get('[cypress-id="nav-transaction"] > span').should('have.html', 'Transactions')
		cy.get('[cypress-id="nav-token"]> span').should('have.html', 'Tokens')
		cy.get('[cypress-id="nav-stats"] > span').should('have.html', 'Stats')
		cy.get('[cypress-id="nav-chain"] > span:nth-child(2)').should('have.html', 'Astra Mainnet')

		cy.get('[cypress-id="nav-desktop-others"] > .search').should('be.visible')
	})

	it('Navigate to Block page', () => {
		cy.get('[cypress-id="nav-block"]').click()

		cy.get('[cypress-id="page-title"]').should('have.html', 'Blocks')
		cy.url().should('eq', `${HOST}/block`)
	})

	it('Navigate to Transactions page', () => {
		cy.get('[cypress-id="nav-transaction"]').click()

		cy.get('[cypress-id="page-title"]').should('have.html', 'Transactions')
		cy.url().should('eq', `${HOST}/tx`)
	})

	it('Navigate to Stats page', () => {
		cy.get('[cypress-id="nav-stats"]').click()

		cy.url().should('eq', `${HOST}/charts`)
	})

	it('Navigate to Home page', () => {
		cy.visit(`${HOST}/tx`)
		cy.get('.logo').click({ multiple: true })

		cy.url().should('eq', `${HOST}/`)
	})

	it('Navigate to Token Holder page', () => {
		cy.get('[cypress-id="nav-token"]').click()
		cy.get('[cypress-id="nav-token"] > ul > li:nth-child(2)').click()

		cy.get('[cypress-id="page-title"]').should('have.html', 'Astra Address')
	})

	it('Navigate to All Tokens page', () => {
		cy.get('[cypress-id="nav-token"]').click()
		cy.get('[cypress-id="nav-token"] > ul > li:nth-child(1)').click()

		cy.get('[cypress-id="page-title"]').should('have.html', 'Tokens')
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

describe('Home Page with Mobile', () => {
	const HOST = 'http://localhost:3000'
	beforeEach(() => {
		cy.viewport('iphone-x')
		cy.visit(HOST)
	})
	it('loads home page with full navbar and right title/chain', () => {
		cy.title({ timeout: 10000 }).should('eq', 'Astra Explorer')
		cy.get('[cypress-id="nav-mobile-others"] > .search').should('be.visible')
	})

	it('Navigate to Home page', () => {
		cy.get('.logo').click({ multiple: true })

		cy.url().should('eq', `${HOST}/`)
	})

	it('Navigate to Transaction page and back with Logo click', () => {
		cy.visit(`${HOST}/tx`)
		cy.get('.logo').click({ multiple: true })

		cy.url().should('eq', `${HOST}/`)
	})

	it('Navigate to Block page', () => {
		cy.get('[cypress-id="hamburger-menu-btn"]').click()
		cy.get('[cypress-id="nav-block"] > span > a').click()

		cy.get('[cypress-id="page-title"]').should('have.html', 'Blocks')
		cy.url().should('eq', `${HOST}/block`)
	})

	it('Navigate to Transactions page', () => {
		cy.get('[cypress-id="hamburger-menu-btn"]').click()
		cy.get('[cypress-id="nav-transaction"] > span > a').click()

		cy.get('[cypress-id="page-title"]').should('have.html', 'Transactions')
		cy.url().should('eq', `${HOST}/tx`)
	})

	it('Navigate to Stats page', () => {
		cy.get('[cypress-id="hamburger-menu-btn"]').click()
		cy.get('[cypress-id="nav-stats"] > span > a').click()

		cy.url().should('eq', `${HOST}/charts`)
	})

	it('Navigate to All Tokens page', () => {
		cy.get('[cypress-id="hamburger-menu-btn"]').click()
		cy.get('[cypress-id="nav-token-1"]').click()

		cy.get('[cypress-id="page-title"]').should('have.html', 'Tokens')
	})

	it('Navigate to Astra Holders page', () => {
		cy.get('[cypress-id="hamburger-menu-btn"]').click()
		cy.get('[cypress-id="nav-token-2"]').click()

		cy.get('[cypress-id="page-title"]').should('have.html', 'Astra Address')
	})

	it('Close Popup Menu', () => {
		cy.get('[cypress-id="hamburger-menu-btn"]').click()
		cy.get('[cypress-id="hamburger-menu-close-btn"] > span').click()

		cy.get('[cypress-id="hamburger-menu-close-btn"]').should('not.exist')
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

// export { }

