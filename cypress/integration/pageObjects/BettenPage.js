//Cypress team doesn't suggest using PO pattern btw https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/  

//There are many similarities on pages with different type of goods (beds, linen, etc ) - so parent class could be defined
class BettenPage {

    visit() {
        cy.visit('/betten');
    }

    //Add elements to wishlist
    addToWishlist(number) {
        cy.get('.articleTile__content').each(($el, index) => {

            if (index > (number)) {
                // stop iteration
                return false
            }

            //added mouseover (no hover in the Cypress) on item as sometimes elements overlay happened
            cy.wrap($el).trigger('mouseover');
            cy.wrap($el).within(($el) => {
                cy.get('.articleTile__wishlist').click();
            })
        })
    }
}

export default BettenPage