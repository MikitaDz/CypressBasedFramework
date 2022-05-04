import BettenPage from '../pageObjects/BettenPage';
import WishlistPage from '../pageObjects/WishlistPage';
import ShoppingCardPage from '../pageObjects/ShoppingCardPage';
import RegistrationPage from '../pageObjects/RegistrationPage';
import { Given, When, Then, Before, And } from 'cypress-cucumber-preprocessor/steps';
const bettenPage = new BettenPage();
const wishlistPage = new WishlistPage();
const shoppingCardPage = new ShoppingCardPage();
const registrationPage = new RegistrationPage();
var loggedIn;

Before(() => {
    //if user is not created yet, let's register a new one. Perhaps this better should be done via API
    if (Cypress.env('login') === "" && Cypress.env('password') === "") {
        cy.setCookie('optOutAccepted', 'true');
        registrationPage.visit();
        cy.generateRandomUser().then(data => {
            cy.log(data);
            registrationPage.register(data.firstName, data.lastName, data.email, data.password);
            Cypress.env('login', data.email);
            Cypress.env('password', data.password);
        })
        loggedIn = true;
    }

    //I disable cookies acceptance form by setting corresponding cookie to true.
    //Proper acceptance screnario definitely should be covered, but in a separate test
    cy.setCookie('optOutAccepted', 'true');
});

//Loading test data
beforeEach(function() {
    cy.fixture('postalCodes').then((postalCodes) => {
        this.postalCodes = postalCodes
    })
})

//I would prefer to login via API in all scenarios except Login itself
//It adds more stability
Given('I logged in by default user via API', () => {

    //skipping api login if we have already logged in
    cy.visit('/');
    if (!(loggedIn === true)) {
        cy.apiLogin(Cypress.env('login'), Cypress.env('password'));
    }
    cy.reload();
})

//In a real world I would prefer to prepare test data from the backend and separate to more granular tests
When('I add {int} items to wishlist', (itemsNumber) => {
    bettenPage.visit();
    cy.log(itemsNumber);
    bettenPage.addToWishlist(itemsNumber);
    cy.reload();
})

Then('I see {int} items in the wishlist', (itemsNumber) => {
    wishlistPage.visit();
    wishlistPage.getWishlistItemsNumber().should('eq', itemsNumber);
})

When('I add all items from wishilst to the shopping card', function() {

    //Adding default (in a real world should be data driven testing around it) postal code
    wishlistPage.addPostalCode(this.postalCodes.berlin);

    //Sending all items to the shopping card
    wishlistPage.addAllItemsToShoppingCard();
})

Then('I see {int} items in the shopping card', (itemsNumber) => {
    cy.url()
        .should('eq', `${Cypress.config().baseUrl}/warenkorb`)
    shoppingCardPage.getCardItemsNumber().should('eq', itemsNumber);
})

Then('I see correctly calculated summary price of all {int} items in the shopping card', (itemsNumber) => {
    //retrieve app summary total value
    shoppingCardPage.getItemsSummaryValueExcludingShipping();

    //calculate value for all items
    shoppingCardPage.getCalculatedValueExcludingShipping();

    //retrieve (with aliases) both value and compare
    cy.get('@summaryTotalPrice').then(text => {
        let summaryTotalPrice = parseFloat(text);
        cy.get('@' + (itemsNumber - 1) + '_itemTotal').then(text => {
            cy.log('Calculation of summary price');
            let calculatedTotalPrice = parseFloat(text);
            cy.log(summaryTotalPrice);
            cy.log(calculatedTotalPrice);
            expect(calculatedTotalPrice).to.equal(summaryTotalPrice);
        })
    })
})