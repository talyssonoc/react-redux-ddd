Cypress.Commands.add('loginWith', (email, password) => {
  cy.visit('/login');

  cy.getByPlaceholder('Email')
    .type(email);

  cy.getByPlaceholder('Password')
    .type(password);

  cy.get('button').contains('Sign in')
    .click();

  cy.getByPlaceholder('Email')
    .should('not.be.disabled');
});

Cypress.Commands.add('getByPlaceholder', (placeholder) => {
  return cy.get(`[placeholder=${placeholder}`);
});
