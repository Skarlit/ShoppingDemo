Anizon.Views.Cart = Support.CompositeView.extend({
  className: "cartSideBar",
  cartTemplate: JST["bottom/carts/cart_body"],

  initialize: function(){
    this.lowerBound = 0;
    this.upperBound = 5;

    this.collection.fetch();
    
    var parent = this;
    this.listenTo(this.collection, "add", function(cartItem){
      cartItem.save({
        success: function(resp){
          $.notify(resp.escape("title") + "\n added to the cart", "success")
        },
        error: function(resp){
          $.notify("unable to add/load item")
        }
      });
      var cartItemView = new Anizon.Views.CartItem({model: cartItem});
      parent.children.push(cartItemView);
      cartItemView.parent = parent;
      parent.render();
      parent.updateCartTotal();
    });

    this.listenTo(this.collection, "change remove", function(){
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
          title: Anizon.currentDraggedItem.escape("title")
        });
        parent.collection.add(cartItem);
      }
    });

    $('.editQuantity').qtip({
       content: { 
         text: "Edit quantity for this item"
       },
       style: {
         classes: 'qtip-dark qtip-tipsy'
       },
       hide: {delay: 100}
     });

    $('.removeCartItem').qtip({
       content: { 
         text: "Remove all quantity for this item"
       },
       style: {
         classes: 'qtip-dark qtip-tipsy'
       },
       hide: {delay: 100}
     });

    parent.delegateEvents();

    return this;
  },

  events: {
    "click #hideCart" : "toggleCart",
    'click #cartScrollRight' : "slideItemsRight",
    'click #cartScrollLeft' : "slideItemsLeft",
    'click #checkout-btn' : "checkout"
  },

  toggleCart: function(event){
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

  hideCart: function(){
    if($("#cartBody").is(":visible")){
      $("#cartBody").hide();
      $("#hideCart").html('<span class="glyphicon glyphicon-chevron-up"></span>');
    }
  },

  showCart: function(){
    if(!$("#cartBody").is(":visible")){
      $("#hideCart").click();
    }
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

  checkout: function(){
    var checkoutView = new Anizon.Views.CheckOut();
    $("body").append(checkoutView.render().$el);
    //hide class has display:none important
    checkoutView.render().$el.modal().removeClass("hide");
  }

})

Anizon.Views.CartItem = Support.CompositeView.extend({
  className: "cartItem col-md-2",
  cartItemTemplate: JST["bottom/carts/cart_item"],

  events: {
    'click #editQuantity' : 'editQuantity',
    'click #removeCartItem' : 'removeItem'
  },

  initialize: function(){
    var parent = this;

    this.listenTo(this.model, 'change:quantity', function(){
      parent.render();
      parent.model.save({
        success: function(resp){
          $.notify("quantity updated", "success");
        },
        error: function(resp){
          $.notify("failed to update quantity");
        }
      });
    });
  },

  render: function(){
    this.$el.html(this.cartItemTemplate({cartItem: this.model}));
    this.delegateEvents();
    return this;
  },

  editQuantity: function(event){
    console.log("editing item quantity");
    event.preventDefault();
    var editView = new Anizon.Views.EditQuantity({model: this.model});
    this.$el.append(editView.render().$el);
  },

  removeItem: function(event){
    console.log("remove cart item");
    event.preventDefault();
    this.model.destroy({
        success: function(resp){
          $.notify(resp.escape("title") + " removed", "success");
        },
        error: function(resp){
          $.notify("error removing item");
        }
    });
    this.leave();
  }
})


Anizon.Views.EditQuantity = Support.CompositeView.extend({
  className: "floatingDialog",
  editQuantityTemplate: JST["bottom/carts/edit_quantity"],

  render:function(){
    this.$el.html(this.editQuantityTemplate({item: this.model}))
    return this;
  },

  events: {
    'click .edit' : 'submit'
  },

  submit: function(event){
    event.preventDefault();
    var new_quantity =  this.$el.find("input").val().match(/^\d+$/);
    if(new_quantity){
       this.model.set({quantity: parseInt(new_quantity[0])});
       this.leave();
    }else{
      this.$el.effect("shake");
    }
    event.stopPropagation();
  }
})


Anizon.Views.CheckOut = Support.CompositeView.extend({
  id: 'base-modal',
  className: 'modal fade hide mymodal',
  checkoutTemplate: JST['bottom/carts/checkout'],
  changeInfoFormTemplate: JST['bottom/carts/change_info_form'],

  initialize: function(){
    this.collection = new Anizon.Collections.Cart()
    this.collection.fetch();
    this.userInfo = new Anizon.Models.UserInfo()
    var parent = this;
    this.userInfo.fetch({
      success: function(resp){
        $.notify("shipping info retrived", "success");
        parent.infoExist = true;
      },
      error: function(resp){
        $.notify("cannot find shipping info")
        parent.infoExist = false;
      }
    });
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.userInfo, "sync", this.render);
  },

  events: {
    'click #change-info-btn' : 'changeInfo',
    'click #cancel-info-btn' : 'cancelInfo',
    'click #checkout-btn' : 'checkout',
    'click .close' : 'closeModal'
  },

  render: function(){
    this.$el.html(this.checkoutTemplate({cart: this.collection, userInfo: this.userInfo, infoExist: this.infoExist}));
    var parent = this;
    $(".modal-backdrop").on('click', function(){
      parent.remove();
      console.log("destroyed");
      $(".modal-backdrop").remove();
    });
    return this;
  },

  changeInfo: function(){
    var form = this.changeInfoFormTemplate({userInfo: this.userInfo});
    this.$el.find("#checkout-form-wrapper").append(form);
  },

  cancelInfo: function(){
    $("#userinfo-form").remove();
  },

  checkout: function(){
    var user_info = this.$el.find("#userinfo-form").serializeJSON();
    // $.ajax({
    //   method: "POST",
    //   url: "api/orders",
    //   data: 
    // })
  },

  closeModal: function(){
    $(".modal-backdrop").remove();
    this.leave();
  }
})