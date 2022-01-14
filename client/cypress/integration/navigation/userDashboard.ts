beforeEach('load homepage', () => {
    cy.visit('/')
    cy.dataCy('submitAuditBtn').should('be.visible')
    cy.dataCy('submitAuditInput').should('be.visible')
  })

it('sees a clickable user icon', () => {
    cy.dataCy('userDashboardBtn').should('be.visible')
    cy.dataCy('userDashboardBtn').should('not.be.disabled')
})

it('clicks on user button and navigates to list of audits', () =>{
    cy.dataCy('userDashboardBtn').click()
    cy.location('pathname').should('equal', '/audits')
})
