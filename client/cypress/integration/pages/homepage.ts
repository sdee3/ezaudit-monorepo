it('loads homepage', () => {
  cy.visit('/')
  cy.dataCy('submitAuditBtn').should('be.visible')
})
