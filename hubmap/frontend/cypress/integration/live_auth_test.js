//https://docs.cypress.io/guides/references/error-messages.html#Cypress-detected-a-cross-origin-error-happened-on-page-load
describe('The Login Page', function () {
  before(() => {
    Cypress.Cookies.debug(true)
    cy.server();
    const api = 'http://localhost:8000/';
    cy.route(`${api}/api/?format=json`, 'fixture:base.json');
    cy.route(`${api}/api/colors/?format=json`, 'fixture:colors.json');
    cy.route(`${api}/api/genes/?format=json`, 'fixture:genes.json');
  });

  after(()=>{
    Cypress.Cookies.debug(false);
  })
  
  it('sets auth cookie when logging in via form submission', function () {
      cy.visit('/');
      cy.contains('Login');

    // click login
    cy.get('#globuslogin').click();

    // we should be redirected to / (home)
    cy.url().should('include', '/');

    cy.get('#loggedin-menu').should('exist');

    // auth cookie should be present
    const cookie = cy.getCookie('email');
    cy.getCookie('email').should('exist');

    // UI should reflect this user logged in status
    cy.get('#loggedin-menu').children().get('#loggedinemail').should('exist');
    cy.get('#button-menu').click()
    cy.get('#loggedinemail').trigger('mousemove').click()
    cy.get('#loggedinemail').should('contain', cookie.value);
    cy.get('#loggedin-menu').children().get('#logout-menuitem').should('exist');
    cy.get('#loggedin-menu').children().get('#logout-menuitem')
    .children().get('#logout').should('exist')

    cy.get('#button-menu').click()
    cy.get('#logout').trigger('mousemove').click()
  })
})