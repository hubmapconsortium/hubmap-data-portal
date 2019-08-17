import { cyan } from "@material-ui/core/colors";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('stubLoginUser', () => {
    const log = Cypress.log({
        name: 'stubLoginUser',
    })
    cy.server()
    .setCookie('email', 'test@gmail.com')
    .route('http://localhost:8000/auth/login/globus/', 'fixture:login')
    .then(()=>{log.snapshot().end()})
});

Cypress.Commands.add('stubLogoutUser', () => {
    const log = Cypress.log({
        name: 'stubLogoutUser',
    })
    cy.server()
    .route('http://localhost:8000/logout/', 'fixture:logout')
    .clearCookie('email')
    .then(()=>{log.snapshot().end()})
})
