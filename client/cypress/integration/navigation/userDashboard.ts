beforeEach('load homepage', () => {
  cy.visit('/')
  cy.dataCy('submitAuditBtn').should('be.visible')
  cy.dataCy('submitAuditSiteInput').should('be.visible')
  cy.dataCy('submitAuditEmailInput').should('be.visible')
})

it('sees a clickable user icon', () => {
  cy.dataCy('userDashboardBtn').should('be.visible')
  cy.dataCy('userDashboardBtn').should('not.be.disabled')
})

it('clicks on user button and navigates to user dashboard', () => {
  cy.dataCy('userDashboardBtn').click()
  cy.location('pathname').should('equal', '/dashboard')
})

it('navigates further to list of audits', () => {
  cy.visit('/dashboard')
  cy.dataCy('viewAuditsBtn').should('be.visible')

  cy.intercept('/api/audits', req => {
    req.reply({
      message: [],
    })
  })

  cy.dataCy('viewAuditsBtn').click()
  cy.location('pathname').should('equal', '/dashboard/audits')
})
