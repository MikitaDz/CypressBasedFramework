//API Login command
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