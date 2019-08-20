// ideally it is not recommended to test tags/redirects outside of domain in cypress. we should not be testing this in cypress,
// since our login, logout urls are redirect urls outside domain (REST api). However, we want to test just UI-side.
// But since the issue #98 does not recommend either. In view of Api gateway, we might require this live auth test.
// https://docs.cypress.io/guides/references/error-messages.html#Cypress-detected-a-cross-origin-error-happened-on-page-load
// Refer: https://github.com/hubmapconsortium/hubmap-data-portal/issues/3
// We also can click <a> tags and redirect to cross-domain urls, which otherwise need to be
// stubbed. We don't stub these urls.
// Pre-requisites:
// a) // When running this test: do remove :  "blacklistHosts": ["localhost:8000"] from cypress.json.
// Otherwise REST api is not reachable in dev tests, since we do not have relative urls configured.
// b) Start Django rest api
//
describe('The Login Page', () => {
  before(() => {
    Cypress.Cookies.debug(true);
    cy.server();
    const api = 'http://localhost:8000/';
    cy.route(`${api}/api/?format=json`, 'fixture:base.json');
    cy.route(`${api}/api/colors/?format=json`, 'fixture:colors.json');
    cy.route(`${api}/api/genes/?format=json`, 'fixture:genes.json');
  });

  after(() => {
    Cypress.Cookies.debug(false);
  });

  it.skip('sets auth cookie when logging in via form submission', () => {
    cy.visit('/');
    cy.contains('Login');

    // click login
    cy.get('#globuslogin').click();

    // we should be redirected to / (home)
    cy.url().should('eq', '/');

    cy.get('#loggedin-menu').should('exist');

    // auth cookie should be present
    const cookie = cy.getCookie('email');
    cy.getCookie('email').should('exist');

    // UI should reflect this user logged in status
    cy.get('#loggedin-menu').children().get('#loggedinemail').should('exist');

    // The clicks are <a> tags since we refer REST api that are outside domain.
    // So clicks redirect to other domain but it appears, we cannot **stub** to route/request
    // for redirects (Http 304) + urls that point to outside of domain.
    cy.get('#button-menu').click();
    cy.get('#loggedinemail').trigger('mousemove').click();
    cy.get('#loggedinemail').should('contain', cookie.value);
    cy.get('#loggedin-menu').children().get('#logout-menuitem').should('exist');
    cy.get('#loggedin-menu').children().get('#logout-menuitem')
      .children()
      .get('#logout')
      .should('exist');

    // The material-ui's menu's menu items are hidden by default, so we need to
    // manually navigate (move the mouse) to menu item and click.
    cy.get('#button-menu').click();
    cy.get('#logout').trigger('mousemove').click();
  });
});
