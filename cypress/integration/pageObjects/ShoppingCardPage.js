//Cypress team doesn't suggest using PO pattern btw https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/  
class ShoppingCardPage {
    visit() {
        cy.visit('/warenkorb');
    }

    //Getting number of items in the shopping card
    getCardItemsNumber() {
        return cy.get('.cartEntries').children('.cartEntry').its('length');
    }

    //Getting summary value excluding shipping
    getItemsSummaryValueExcludingShipping() {

        //in a real world I would talk to development - and asked to add for example data-cy attributes
        cy.contains('Warenwert')
            .next()
            .find('.articlePrice__integer')
            .then(($el) => {
                cy.wrap($el.text()).as('integerPrice');
            })

        cy.contains('Warenwert')
            .next()
            .find('.articlePrice__fraction')
            .then(($el) => {
                cy.wrap($el.text()).as('fractionPrice');
            });

        //I guess there are better ways to pass variables within Cypress chains? I would like to know more about them
        cy.get('@integerPrice').then(text => {
            cy.log(text);
            let intPrice = String(text).replace('.', '');
            cy.get('@fractionPrice').then(text => {
                cy.log(text);
                let fractionPrice = String(text);
                cy.log(fractionPrice);
                cy.log(intPrice);
                var totalPrice = parseFloat(intPrice + '.' + fractionPrice);
                cy.log(totalPrice);
                cy.wrap(totalPrice).as('summaryTotalPrice');
            })
        })
    }

    //Getting elements calculated value excluding shipping
    //Also in case if calculation logic is on the backend, I would suggest to validate it via API in a real world
    //As the calculations below can be fragile and passing variables via aliases in Cypress is a bit crazy :)
    getCalculatedValueExcludingShipping() {

        //looping through each shopping card entry
        cy.get('.cartEntry').each(($el, index) => {
            cy.wrap($el).within(($el) => {
                //getting integer price part
                cy.get('.articlePrice__integer')
                    .first()
                    .then(($el) => {
                        cy.log($el.text().replace('.', ''));
                        //replacing unnecessary floating point for int
                        cy.wrap($el.text().replace('.', '')).as('integerItemPrice');
                    });
                cy.get('@integerItemPrice').then(function() {
                    //getting float price part
                    cy.get('.articlePrice__fraction')
                        .first()
                        .then(($el) => {
                            cy.log($el.text());
                            cy.wrap($el.text()).as('fractionItemPrice');
                            var totalItemsPrice = parseFloat(this.integerItemPrice + '.' + this.fractionItemPrice);
                            //looping through all elements and summarizing prices
                            if (index > 0) {
                                cy.get('@' + (index - 1) + '_itemTotal').then(text => {
                                    cy.log('Calculation of summary price');
                                    totalItemsPrice = totalItemsPrice + parseFloat(text);
                                    cy.wrap(totalItemsPrice).as(index + '_itemTotal')
                                    cy.log(totalItemsPrice);
                                })
                            } else {
                                cy.wrap(totalItemsPrice).as(index + '_itemTotal')
                            }

                        })
                })
            })
        })
    }
}

export default ShoppingCardPage