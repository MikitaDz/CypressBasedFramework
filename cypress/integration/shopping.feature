Feature: ShoppingFeature

Scenario:
  Given I logged in by default user via API

  When I add 5 items to wishlist

  Then I see 5 items in the wishlist

  When I add all items from wishilst to the shopping card

  Then I see 5 items in the shopping card

  Then I see correctly calculated summary price of all 5 items in the shopping card

