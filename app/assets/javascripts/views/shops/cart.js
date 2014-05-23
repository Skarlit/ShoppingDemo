Anizon.Views.Cart = Support.CompositeView.extend({
  className: "cartSideBar",
  cartTemplate: JST["bottom/carts/cart_body"],

  initialize: function(){

  },

  render: function(){
    this.$el.html(this.cartTemplate({}));

    return this;
  },

  events: {
    "click #hideCart" : "hideCart"
  },

  hideCart: function(event){
    console.log("toggle cart");
    event.preventDefault();
    $("#cartBody").toggle("slow");
  }


})