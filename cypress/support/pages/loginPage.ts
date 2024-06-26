export default class LoginPage {
    // Elements on the Login Page
    usernameField: string = 'input[name="username"]';
    passwordField: string = 'input[name="password"]';
    loginButton: string = '[type="submit"]';
    invalidCredentialsAlert: string = '.oxd-alert'
    usernameFieldValidation: string = ':nth-child(2) > .oxd-input-group > .oxd-text';
    passwordFieldValidation: string = ':nth-child(3) > .oxd-input-group > .oxd-text';

    // Methods
    login(username: string, password: string) {
        cy.get(this.usernameField).clear().type(username).should('have.value', username);
        cy.get(this.passwordField).clear().type(password).should('have.value', password);
        this.clickLoginButton();
    }

    verifyLoginSuccessful(url: string) {
        cy.url().should('eq', url);
        cy.get(this.usernameField).should('not.exist');
        cy.get(this.passwordField).should('not.exist');
    }

    verifyLogoutSuccessful(url: string) {
        cy.url().should('eq', Cypress.config("baseUrl"));
        cy.get(this.usernameField).should('be.visible');
        cy.get(this.passwordField).should('be.visible');
    }

    verifyLoginFailed() {
        cy.url().should('eq', Cypress.config("baseUrl"));
        cy.get(this.usernameField).should('be.visible');
        cy.get(this.passwordField).should('be.visible');
        cy.get(this.invalidCredentialsAlert).should('be.visible').should('have.text', 'Invalid credentials');
    }

    clickLoginButton() {
        cy.get(this.loginButton).click();
    }

    verifyUsernameFieldValidation() {
        cy.get(this.usernameField).should('be.visible').should('be.empty');
        cy.get(this.usernameFieldValidation).should('be.visible').should('have.text', 'Required');
    }

    verifyPasswordFieldValidation() {
        cy.get(this.passwordField).should('be.visible').should('be.empty');
        cy.get(this.passwordFieldValidation).should('be.visible').should('have.text', 'Required');
    }
}