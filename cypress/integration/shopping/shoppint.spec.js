import LoginPage from '../pageObjects/LoginPage';
import BettenPage from '../pageObjects/BettenPage';
import { Given, When, Then, Before, And } from 'cypress-cucumber-preprocessor/steps';
const loginPage = new LoginPage();
const bettenPage = new BettenPage();

Before(() => {
    //I disable cookies acceptance form by setting corresponding cookie to true.
    //Proper acceptance screnario definitely should be covered, but in a separate test
    cy.setCookie('optOutAccepted', 'true');

});

//I would prefer to login via API in all scenarios except Login itself
//It adds more stability
Given('I logged in by default user via API', () => {
    cy.visit('/');
    cy.apiLogin(Cypress.env('login'), Cypress.env('password'));
    cy.reload();
})

When('I add {int} beds to wishlist', (itemsNumber) => {
    bettenPage.visit();
    cy.log(itemsNumber);
    bettenPage.addToWishlist(itemsNumber);
})