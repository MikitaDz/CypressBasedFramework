//Cypress team doesn't suggest using PO pattern btw https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/  

class LoginPage {

    visit() {
        cy.visit('/login');
    }

    //this method is logging in
    login(user, password) {

        //enter username and password
        cy.get('#loginEmail').type(user);
        cy.get('#loginPassword').type(password);

        //submit form
        cy.get('#login-submit').click();
    }

    verifyIncorrectLoginLabelPresent() {
        cy.get('#loginEmail-error').should('be.visible');
    }
}

export default LoginPage