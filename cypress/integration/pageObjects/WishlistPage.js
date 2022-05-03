//Cypress team doesn't suggest using PO pattern btw https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/  

class WishlistPage {

    visit() {
        cy.visit('/wunschliste');
    }

    //Adding postal number - it's required to proceed to checkout
    addPostalCode(postalNumber) {
        cy.get('#zipcode-logistic-input').type(postalNumber);
    }

    //Add all items to shopping card
    addAllItemsToShoppingCard() {
        cy.get('#addAddToWishlist').click();
        cy.contains('Zum Warenkorb').click();
    }

    //Get number of items in the list
    getWishlistItemsNumber() {
        return cy.get('.wishlist__articleList').children('.wishlistEntry').its('length');
    }
}

export default WishlistPage