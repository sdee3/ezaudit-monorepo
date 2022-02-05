beforeEach('load homepage', () => {
  cy.visit('/')
  cy.dataCy('submitAuditBtn').should('be.visible')
  cy.dataCy('submitAuditSiteInput').should('be.visible')
})

it('sees a disabled submit button if the domain value is invalid', () => {
  cy.dataCy('submitAuditSiteInput').type('google')
  cy.dataCy('submitAuditBtn').should('be.disabled')
})

it('sees an enabled submit button if the domain input value is valid', () => {
  cy.dataCy('submitAuditSiteInput').clear()
  cy.dataCy('submitAuditSiteInput').type('google.com')
  cy.dataCy('submitAuditBtn').should('not.be.disabled')
})

it('sends an audit request', () => {
  cy.dataCy('submitAuditSiteInput').clear()
  cy.dataCy('submitAuditSiteInput').type('google.com')

  cy.intercept('/api/audit', req => {
    req.reply({
      statusCode: 202,
      body: {
        message:
          'Audit scheduled successfully! You will receive an email once the audit is ready.',
      },
    })
  })

  cy.dataCy('submitAuditBtn').click()
  cy.dataCy('alert').should('be.visible')
})
