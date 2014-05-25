Anizon.Views.Cart = Support.CompositeView.extend({
  className: "cartSideBar",
  cartTemplate: JST["bottom/carts/cart_body"],

  initialize: function(){
    this.lowerBound = 0;
    this.upperBound = 9;
    var parent = this;
    this.listenTo(this.collection, "add", function(cartItem){
      var cartItemView = new Anizon.Views.CartItem({model: cartItem});
      parent.children.push(cartItemView);
      cartItemView.parent = parent;
      parent.render();
      parent.updateCartTotal();
    });

    this.listenTo(this.collection, "remove", function(){
      parent.updateCartTotal();
    })
  },

  updateCartTotal: function(){
    var amount = 0;
    Anizon.cartCollection.each(function(item){
      if(item.get("price") && item.get("quantity")){
        amount += parseFloat(item.get("price")) * parseInt(item.get("quantity"));
      }
    });
    amount = Math.round(amount*100)/100
    $("#cartTotal").html("Total: " + String(amount) + "$");
    Anizon.cart.total = amount;
  },

  render: function(){
    this.$el.html(this.cartTemplate({}));

    var parent = this;

    this.children.each(function(childView){
      parent.$el.find("#itemsContainer").append(childView.render().$el)
    });

    for(var i = 0; i < parent.lowerBound; i++){
      this.children._wrapped[i].$el.hide();
    }
    for(var i = parent.upperBound + 1; i < parent.children.length; i++){
      this.children._wrapped[i].$el.hide();
    }

    this.$el.droppable({
      drop: function(){
        var cartItem = new Anizon.Models.CartItem({
          item_id: Anizon.currentDraggedItem.escape('id'),
          quantity: 1,
          price: Anizon.currentDraggedItem.escape('price'),
        });
        cartItem.title = Anizon.currentDraggedItem.escape("title");
        parent.collection.add(cartItem);
      }
    });

    $('.editQuantity').qtip({
       content: { 
         text: "Edit quantity for this item"
       },
       style: {
         classes: 'qtip-dark qtip-shadow'
       },
       hide: { delay: 100}
     });

    $('.removeCartItem').qtip({
       content: { 
         text: "Remove all quantity for this item"
       },
       style: {
         classes: 'qtip-dark qtip-shadow'
       },
       hide: { delay: 100}
     });

    parent.delegateEvents();

    return this;
  },

  events: {
    "click #hideCart" : "hideCart",
    'click #cartScrollRight' : "slideItemsRight",
    'click #cartScrollLeft' : "slideItemsLeft"
  },

  hideCart: function(event){
    console.log("toggle cart");
    event.preventDefault();
    $("#cartBody").toggle("slow",function(){ 
      if($("#cartBody").is(":visible"))
      { 
        $("#hideCart").html('<span class="glyphicon glyphicon-chevron-down"></span>');
      }else{
        $("#hideCart").html('<span class="glyphicon glyphicon-chevron-up"></span>');
      }
    });
  },

  slideItemsRight: function(){
    console.log("slide right");
    if(this.upperBound+1 < this.children._wrapped.length){
      this.children._wrapped[this.upperBound+1].$el.show("slow");
      this.children._wrapped[this.lowerBound].$el.hide("slow");
      this.upperBound +=1;
      this.lowerBound +=1;
    }
  },

  slideItemsLeft: function(){
    console.log("slide left");
    if(this.lowerBound - 1 >= 0 ){
      this.children._wrapped[this.lowerBound-1].$el.show("slow");
      this.children._wrapped[this.upperBound].$el.hide("slow");
      this.upperBound -= 1;
      this.lowerBound -= 1;
    }
  },

})

Anizon.Views.CartItem = Support.CompositeView.extend({
  className: "cartItem col-md-2",
  cartItemTemplate: JST["bottom/carts/cart_item"],

  events: {
    'click #editQuantity' : 'editQuantity',
    'click #removeCartItem' : 'removeItem'
  },

  initialize: function(){

  },

  render: function(){
    this.$el.html(this.cartItemTemplate({cartItem: this.model}));
    this.delegateEvents();
    return this;
  },

  editQuantity: function(event){
    console.log("editing item quantity");
    event.preventDefault();

    event.stopPropagation();
  },

  removeItem: function(event){
    console.log("remove cart item");
    event.preventDefault();
    this.model.destroy();
    this.leave();
    event.stopPropagation();
  }
})