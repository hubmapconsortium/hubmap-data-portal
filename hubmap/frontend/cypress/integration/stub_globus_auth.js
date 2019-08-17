describe('The Login Page', function () {
    before(() => {
      Cypress.Cookies.debug(true)
      cy.server();
      const api = 'http://localhost:8000/';
      cy.route(`${api}/api/?format=json`, 'fixture:base.json');
      cy.route(`${api}/api/colors/?format=json`, 'fixture:colors.json');
      cy.route(`${api}/api/genes/?format=json`, 'fixture:genes.json');
    });
    beforeEach(()=> {
        cy.server()
        .stubLoginUser()
    })
   
    afterEach(()=> {
        cy.server()
        .stubLogoutUser();
      const api = 'http://localhost:8000/';
      cy.route(`${api}/api/?format=json`, 'fixture:base.json');
      cy.route(`${api}/api/colors/?format=json`, 'fixture:colors.json');
      cy.route(`${api}/api/genes/?format=json`, 'fixture:genes.json');
      cy.visit('/');
      cy.contains('Login');
      Cypress.Cookies.debug(false);
    })
    it('sets auth cookie when logging in via form submission', function () {
        cy.visit('/');

      cy.get('#loggedin-menu').should('exist');
  
      // auth cookie should be present
      cy.getCookie('email').should('exist');
  
      // UI should reflect this user being logged in
      cy.get('#loggedinemail').should('contain', 'test@gmail.com').should('exist')
      cy.get('#loggedin-menu').children().get('#logout-menuitem').should('exist')
      cy.get('#loggedin-menu').children().get('#logout-menuitem')
      .children().get('#logout').should('exist')
    })
  })