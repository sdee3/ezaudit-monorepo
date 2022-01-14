beforeEach('load homepage', () => {
  cy.visit('/')
  cy.dataCy('submitAuditBtn').should('be.visible')
  cy.dataCy('submitAuditInput').should('be.visible')
})

it('sees a disabled submit button if the domain value is invalid', () => {
  cy.dataCy('submitAuditInput').type('google')
  cy.dataCy('submitAuditBtn').should('be.disabled')
})

it('sees an enabled submit button if the domain input value is valid', () => {
  cy.dataCy('submitAuditInput').clear()
  cy.dataCy('submitAuditInput').type('google.com')
  cy.dataCy('submitAuditBtn').should('not.be.disabled')
})
