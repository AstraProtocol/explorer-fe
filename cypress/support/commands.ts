// ***********************************************

/**
 * This is random key from https://asecuritysite.com/encryption/ethadd
 * One test in swap.test.ts requires to have some BNB amount available to test swap confirmation modal
 * Seems that there are some problems with usying Cypress.env('INTEGRATION_TEST_PRIVATE_KEY') in CI
 * And sharing some key here is not safe as somebody can empty it and test will fail
 * For now that test is skipped
 */

Cypress.on('uncaught:exception', () => {
	// returning false here prevents Cypress from failing the test
	// Needed for trading competition page since it throws unhandled rejection error
	return false
})

Cypress.Commands.overwrite('log', (subject, message) => cy.task('log', message))
