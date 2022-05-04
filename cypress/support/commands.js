import { faker } from '@faker-js/faker';

//Performs API login
Cypress.Commands.add('apiLogin', (email, password) => {

    //We are getting csrf token first via parsing html
    cy.request('/login')
        .its('body')
        .then((body) => {
            const $html = Cypress.$(body);
            const csrf = $html.find('input[name=csrfToken]').val();

            //login in via API using email, password and csrfToken
            cy.request({
                method: 'POST',
                url: `${Cypress.env('loginAPIURL')}`,
                form: true, // to imitate that we are submitting a regular form body
                body: {
                    "login[emailAddress]": email,
                    "login[password]": password,
                    csrfToken: csrf
                },
            })
        });
})

//Generates random user
Cypress.Commands.add('generateRandomUser', () => {

    //generation of fake data via faker lib
    const randomFirstName = faker.name.firstName(); // Rowan
    const randomLastName = faker.name.lastName(); // Rowan
    const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

    //password created by lib is not strong enough - so hard-coded good one temporary
    const password = "123qweasdY$2"; // 
    cy.log(randomEmail);
    cy.log(password);

    var user = { firstName: randomFirstName, lastName: randomLastName, email: randomEmail, password: password };

    //creating user object and writing it to file
    return cy.wrap(user)
})