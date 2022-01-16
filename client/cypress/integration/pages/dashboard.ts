beforeEach('load dashboard', () => {
  cy.visit('/audits')
})

it('renders a table with audits', () => {
  cy.dataCy('auditsTable').should('be.visible')
})

it('opens an audit table row to view the audit in a separate page', () => {
  const auditId = 1
  cy.dataCy(`auditTableRow${auditId}`).click()
  cy.location('pathname').should('equal', `/audits/${auditId}`)
})
