//Cypress team doesn't suggest using PO pattern btw https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/  

class BettenPage {

    visit() {
        cy.visit('/warenkorb');
    }

    //Getting number of items in the shopping card
    getCardItemsNumber() {
        //TODO
    }

    //Getting number of items in the shopping card
    getItemsSummaryValueExcludingShipping() {
        //TODO
    }
}

export default BettenPage