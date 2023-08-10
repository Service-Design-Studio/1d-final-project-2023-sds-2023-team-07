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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (nric, userpin) => {
  cy.session(
    [nric, userpin],
    () => {
      cy.visit("/");
      cy.get("button").contains("LOGIN").click();
      cy.get("input").type(nric);
      cy.get("button").contains("Next").click();
      for (let i = 0; i < userpin.length; i++) {
        const char = userpin.charAt(i);
        cy.get("input").eq(i).type(char);
        cy.wait(100);
      }
      cy.get("button").contains("AUTH NOW").click();
    }
  );
});
