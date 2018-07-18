context('Login', () => {
  context('when the user exists', () => {
    it('redirects to home page', () => {
      cy.loginWith(Cypress.env('TEST_EMAIL'), Cypress.env('TEST_PASSWORD'));

      cy.url().should('be', '/');
    });
  });

  context('when the user does not exist', () => {
    it('shows an error message', () => {
      cy.loginWith('fake@email.com', '---');

      cy.get('.error-messages').should(($errorMessages) => {
        expect($errorMessages).to.contain('email or password is invalid');
      });
    });
  });
});
