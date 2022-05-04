//Cypress team doesn't suggest using PO pattern btw https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/  

class RegistrationPage {

    visit() {
        cy.visit('/registrierung');
    }

    //this method is registering new user by data provided
    //TODO -  to pass this data as a User object
    register(firstName, lastName, email, password) {

        //enter provided user data
        cy.get('#firstName').type(firstName);
        cy.get('#lastName').type(lastName);
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('#password2').type(password);

        //clicking on accept AGB checkbox
        cy.contains('Ja, ich stimme den')
            .prev()
            .click();

        //Submit form
        cy.get('#register-submit').click();
    }
}

export default RegistrationPage