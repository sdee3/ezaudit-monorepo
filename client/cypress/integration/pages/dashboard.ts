beforeEach('load dashboard', () => {
    cy.visit('/audits')
})

it('renders a table with audits', () => {
   cy.dataCy('auditsTable').should('be.visible')
})