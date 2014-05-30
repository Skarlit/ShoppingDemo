Anizon.Views.Item = Support.CompositeView.extend({
  tagName: "li",
  className: "item",

  itemTemplate: JST["center/items/item"],

  initialize: function(){

    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    'click .thumbnail' : 'showInfo',
    'click .itemDetail' : 'showInfo', 
    'click .addToCart' : 'addToCart'
  },

  render: function(){

    this.$el.html(this.itemTemplate({item: this.model}))

    var parent = this;

    this.$el.draggable({
      appendTo: 'body',
      revert: true,  
      distance: 10,
      helper: 'clone',
      stack: "#cartBody",
      zIndex: 9000,
      start: function(event, ui){

        Anizon.currentDraggedItem = parent.model;
        if(Anizon.cart){
          Anizon.cart.showCart();
        }else{
         $.notify(
          "Cart created : )",
          {
            className: "success",
            position: "top right"
          });
         $("#cart").click();
        }
      }
    })

    this.$el.qtip({
      content: {
        text: 'Drag to cart below.'
      },
      position: {
        my: 'top center'
      },
      style: {
        classes: 'qtip-dark qtip-tipsy'
      }
    })

    this.delegateEvents();
    return this;
  },

  showInfo: function(event){
    event.preventDefault();
    this.model.updateClicks(1);
    var infoView  = new Anizon.Views.Info({model: this.model});
    this.swapInfoView(infoView);
  },

  swapInfoView: function(infoView){
    if(Anizon.infoView){
      Anizon.infoView.leave();
    }
    Anizon.infoView = infoView;
    infoView.render().$el.modal().removeClass("hide");
  },

  addToCart: function(event){
    event.preventDefault();
    if(!Anizon.cart || $("#cartBody").is(":hidden")){
      $('#cart').click();
    }
    var cartItem = new Anizon.Models.CartItem({
          item_id: this.model.escape('id'),
          quantity: 1,
          price: this.model.escape('price'),
          title: this.model.escape("title")
        });
    Anizon.cart.collection.add(cartItem);
  }

})