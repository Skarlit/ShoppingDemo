Anizon.Views.Cart = Support.CompositeView.extend({
  className: "cartSideBar",
  cartTemplate: JST["bottom/carts/cart_body"],

  initialize: function(){
    var parent = this;
    this.listenTo(this.collection, "add", function(cartItem){
      var cartItemView = new Anizon.Views.CartItem({model: cartItem});
      parent.children.push(cartItemView);
      cartItemView.parent = parent;
      parent.render();
      parent.updateCartTotal();
    });

    this.listenTo(this.collection, "remove", function(){
    }
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

    this.$el.droppable({
      drop: function(){
        parent.collection.add(Anizon.currentDraggedItem);
      }
    });

    return this;
  },

  events: {
    "click #hideCart" : "hideCart"
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
  }
})

Anizon.Views.CartItem = Support.CompositeView.extend({
  className: "cartItem",
  cartItemTemplate: JST["bottom/carts/cart_item"],

  initialize: function(){

  },

  render: function(){
    this.$el.html(this.cartItemTemplate({cartItem: this.model}));
    return this;
  }
})