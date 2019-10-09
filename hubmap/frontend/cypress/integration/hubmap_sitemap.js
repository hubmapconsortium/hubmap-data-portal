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
    cy.contains('This is browse page for all Entities').should('be.visible');
    cy.contains('Entity Type').should('be.visible');
    cy.contains('HuBMAP Id').should('be.visible');
  });
  it('Test route to browse all samples and details pages', () => {
    cy.visit('/');
    cy.contains('Browse all Samples').click();
    cy.contains('This is browse page for all samples').should('be.visible');
    cy.contains('Entity Type').should('be.visible');
    cy.contains('HuBMAP Id').should('be.visible');
    cy.contains('th', 'sample').find('a').click();
    cy.contains('Entity Type').should('be.visible');
    cy.contains('HuBMAP Id').should('be.visible');
    cy.contains('This is sample details page').should('be.visible');
  });
  it('Test route to browse all donors and details pages', () => {
    cy.visit('/');
    cy.contains('Browse all Donors').click();
    cy.contains('This is browse page for all donors').should('be.visible');
    cy.contains('Entity Type').should('be.visible');
    cy.contains('HuBMAP Id').should('be.visible');
    cy.contains('th', 'donor').find('a').click();
    cy.contains('Entity Type').should('be.visible');
    cy.contains('HuBMAP Id').should('be.visible');
    cy.contains('This is donor details page').should('be.visible');
  });
  it('Test route to browse all datasets and details pages', () => {
    cy.visit('/');
    cy.contains('Browse all Datasets').click();
    cy.contains('This is browse page for all datasets').should('be.visible');
    cy.contains('Entity Type').should('be.visible');
    cy.contains('HuBMAP Id').should('be.visible');
    cy.contains('th', 'dataset').find('a').click();
    cy.contains('Entity Type').should('be.visible');
    cy.contains('HuBMAP Id').should('be.visible');
    cy.contains('This is dataset details page').should('be.visible');
  });
  it('Test route to help', () => {
    cy.visit('/');
    cy.contains('Help').click();
    cy.contains('Help');
  });
});
