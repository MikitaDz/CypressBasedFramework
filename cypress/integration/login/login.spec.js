import LoginPage from '../pageObjects/LoginPage';
const loginPage = new LoginPage();
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I open homepage', () => {

  //I disable cookies acceptance form by setting corresponding cookie to true.
  //Proper acceptance screnario definitely should be covered, but in a separate test
  cy.setCookie('optOutAccepted', 'true');
  loginPage.visit();

})

When('I log in by default user', () => {

  loginPage.login(Cypress.env('login'),Cypress.env('password'))

})

Then('the url is {word}', (url) => {

  cy.url()

    .should('eq', `${Cypress.config().baseUrl}${url}`)

})