let audits = null

beforeEach('load dashboard', () => {
  cy.visit('/audits')

  cy.fixture('audits.json').then(data => (audits = data.message))
  cy.intercept('/api/audits', { audits })
})

it('renders a table with audits', () => {
  cy.dataCy('auditsTable').should('be.visible')
})

it('opens an audit table row to view the audit in a separate page', () => {
  const auditId = audits[0].id
  cy.dataCy(`auditTableRow${auditId}`).click()
  cy.location('pathname').should('equal', `/audits/${auditId}`)
})
