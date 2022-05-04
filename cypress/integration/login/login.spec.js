import LoginPage from '../pageObjects/LoginPage';
import RegistrationPage from '../pageObjects/RegistrationPage';
import { Given, When, Then, Before, And } from 'cypress-cucumber-preprocessor/steps';
const loginPage = new LoginPage();
const registrationPage = new RegistrationPage();

//All scenarios are realized except 1.b - restore the password
//I have observed different solutions https://medium.com/@mitchwd/how-to-intercept-email-for-cypress-testing-3f2c806c8332 
//I haven't found a quick way to point prod website to local smtp server - perhaps we should look into intersepting request and changing it
//There are couple solutions like Mailosaur that allowing to use disposable mail server - but all of them are not free
//For now I just verify that loggin in with incorrect email gives corresponding error to the user

Before(() => {
    //I disable cookies acceptance form by setting corresponding cookie to true.
    //Proper acceptance screnario definitely should be covered, but in a separate test
    cy.setCookie('optOutAccepted', 'true');
});

Given('I open registration page', () => {
    registrationPage.visit();
})

When('I register a new user', () => {
    cy.generateRandomUser().then(data => {
        cy.log(data);
        registrationPage.register(data.firstName, data.lastName, data.email, data.password);

        //I set login/password of a new registered user as environmental variable to use later
        Cypress.env('login', data.email);
        Cypress.env('password', data.password);
    })
})

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