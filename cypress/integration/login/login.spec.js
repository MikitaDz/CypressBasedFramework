import LoginPage from '../pageObjects/LoginPage';
const loginPage = new LoginPage();
import { Given, When, Then, Before, And } from 'cypress-cucumber-preprocessor/steps';

Before(() => {
    //I disable cookies acceptance form by setting corresponding cookie to true.
    //Proper acceptance screnario definitely should be covered, but in a separate test
    cy.setCookie('optOutAccepted', 'true');

});

Given('I open login page', () => {
    loginPage.visit();
})

When('I log in by default user', () => {
    loginPage.login(Cypress.env('login'), Cypress.env('password'));
})

When('I log in by default user with incorrect password', () => {
    const invalidPassword = "abc123qwe"
    loginPage.login(Cypress.env('login'), invalidPassword);
})

Then('the url is {word}', (url) => {
    cy.url()
        .should('eq', `${Cypress.config().baseUrl}${url}`)
})

Then('I see label about incorrect credentials', () => {
    loginPage.verifyIncorrectLoginLabelPresent();
})