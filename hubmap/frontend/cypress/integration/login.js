describe('The Login Page', function () {
    before(() => {
      cy.server();
      const api = 'http://localhost:8000/';
      cy.route(`${api}/api/?format=json`, 'fixture:base.json');
      cy.route(`${api}/api/colors/?format=json`, 'fixture:colors.json');
      cy.route(`${api}/api/genes/?format=json`, 'fixture:genes.json');
      cy.route(`${api}/auth/login/globus`, 'fixture:login.json');
      cy.setCookie('email', 'test@gmail.com');
      cy.route(`${api}/logout`, 'fixture:logout.json');
      cy.getCookie('email', 'test@gmail.com');

    });

    it('sets auth cookie when logging in via form submission', function () {
        cy.visit('/');
        cy.contains('Logged in');
      // click login
      //cy.get('.login').click()
  
      // we should be redirected to / (home)
      cy.url().should('include', '/')

      cy.get('#loggedin-menu').should('exist')
  
      // our auth cookie should be present
      cy.getCookie('email').should('exist')
  
      // UI should reflect this user being logged in
      cy.get('#loggedinemail').should('contain', 'test@gmail.com').should('exist')
      cy.get('#loggedin-menu').children().get('#logout-menuitem').should('exist')
      cy.get('#loggedin-menu').children().get('#logout-menuitem')
      .children().get('#logout').should('exist')
      cy.get('#button-menu').click()
      cy.get('#logout').trigger('mousemove').click()
      cy.getCookie('email', 'test@gmail.com')
    })
  })