describe('HuBMAP', () => {
  beforeEach(() => {
    // Cypress does not allow multiple superdomains per Test.
    //  https://docs.cypress.io/guides/guides/web-security.html#One-Superdomain-per-Test
    // Instead set baseUrl in test before.
    Cypress.config('baseUrl', 'http://localhost:8000/portal');
    cy.server();
  });
  it('Test sitemap for portal', () => {
    cy.visit('/');
    cy.contains('Browse All Entities');
    cy.contains('Browse all Samples').should('be.visible');
    cy.contains('Browse all Donors').should('be.visible');
    cy.contains('Browse all Datasets').should('be.visible');
    cy.contains('Help').should('be.visible');
  });
  it('Test route to browse all entities', () => {
    cy.visit('/');
    cy.contains('Browse All Entities').click();
    cy.contains('Entity Type').should('be.visible');
    cy.contains('HuBMAP Id').should('be.visible');
  });
  it('Test route to browse all samples', () => {
    cy.visit('/');
    cy.contains('Browse all Samples').click();
    cy.contains('Entity Type').should('be.visible');
    cy.contains('HuBMAP Id').should('be.visible');
    cy.contains('Browse sample entities');
  });
  it('Test route to browse all donors', () => {
    cy.visit('/');
    cy.contains('Browse all Donors').click();
    cy.contains('Entity Type').should('be.visible');
    cy.contains('HuBMAP Id').should('be.visible');
    cy.contains('Browse donor entities');
  });
  it('Test route to browse all datasets', () => {
    cy.visit('/');
    cy.contains('Browse all Datasets').click();
    cy.contains('Entity Type').should('be.visible');
    cy.contains('HuBMAP Id').should('be.visible');
    cy.contains('Browse dataset entities');
  });
  it('Test route to help', () => {
    cy.visit('/');
    cy.contains('Help').click();
    cy.contains('Help');
  });
});
