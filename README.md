ShoppingDemo
============

Final Project in A/A, this will basically be an amazon clone with twists


* Sever-side: 
    + **_Rails_**
    + **_Jbuilder_**
    + **_Kaminari_**
* Client-side: 
    + Data: **_Backbone-on-rails_**, **_backbone-support_**
    + UI:  **_Jquery_**, **_Kendo UI_**(Depends)
    + CSS: **_Gumby_**(Looks good)

Main Features
========
  * User is able to drag and drop products on their carts. 
  * User is able to comment on a product and rate it
  * User is able to add product to wishlist
  * User is able to view product by category
  * User is able to use auto completion search bar to search for product
  * Guest's cart or list will be stored on Cookie until they Sign Up
  * Horizontal scrolling/paging with animation 
  * Product info on mouse hover
  * Modal Product show page

####Possible Additional Features
  * Recommendation (table stored the distance between each pair of product using some custom metric)
  * User tracking
  * Fancier UI
  * MultiLanguage support


Phase1
========
  
* Building the server side constructs. That includes setting up Models( Product, User, WishList, ShoppingCart, Session) and corresponding associations. Make Auth. 

* Set up controllers and Json api and corresponding routes


Phase2
========
* Set Up server side logic(calculation) for the features mentioned above. (How to respond to search, rating, Totaling for the purchase, etc..)

Phase3
========
* Start Building client side UI.
* Bare bone of the whole site using backbone view (includes info panel on hover and modal show page)
* Add drag and drop ,sort Logics

Phase 4
========
* Styling and animation using Gumby, Kendo and Jquery (horizontal scrolling)
  
