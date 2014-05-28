Anizon.Views.ItemsPanel = Support.CompositeView.extend({
  className: "col-md-12 row",

  itemsPanelTemplate: JST["center/items/items_panel"],
  prevPageTemplate: JST["center/items/prev_page"],
  nextPageTemplate: JST["center/items/next_page"],

  initialize: function(){
    this.page = 1;
    this.book = [];
    this.book[this.page] = this.collection;

    var parent = this;
    this.listenTo(this.collection, "sync", function(){
      parent.children.each(function(childView){
        childView.leave();
      })
      parent.collection.each(function(item){
        var itemView = new Anizon.Views.Item({model: item});
        parent.children.push(itemView);
        itemView.parent = parent;
      })
      parent.render();
    })
  },

  events: {
    'scroll #items-panel': "hideCart",
    'click .prevPage' : "previousPage",
    'click .nextPage' : "nextPage"
  },

  hideCart: function(event){
    if(Anizon.cart){
      Anizon.cart.hideCart();
    }
  },

  render: function(){
    this.$el.html(this.itemsPanelTemplate({books: this.collection, page: this.page}));
    
    var parent = this;

    this.$el.find("#items-panel").append(this.prevPageTemplate());
    this.children.each(function(childView){
      parent.$el.find("#items-panel").append(childView.render().$el);
    })
    this.$el.find("#items-panel").append(this.nextPageTemplate());


    this.initSly();
    this.$frame.sly('on', 'change', function(event){
      parent.hideCart();
    });

    this.$frame.sly('cycle', function(event){
      console.log("you went around : )");
    });

    this.delegateEvents();
    return this;
  },

  pager: function(index){ 
    console("called with" + index);

  },

  nextPage: function(){
    console.log("next");
    var cat = this.book[this.page].cat;
    this.book[this.page].off();
    if(!this.book[this.page + 1]){
      this.book[this.page + 1] = this.book[this.page + 1] || new Anizon.Collections.Items({page: this.page + 1, cat: cat});
      this.book[this.page + 1].setUrl();
      this.book[this.page + 1].fetch();
    }
    this.collection = this.book[this.page + 1];
    this.page += 1;

    var parent = this;
    this.listenTo(this.collection, "sync", function(){
      parent.children.each(function(childView){
        childView.leave();
      })
      parent.collection.each(function(item){
        var itemView = new Anizon.Views.Item({model: item});
        parent.children.push(itemView);
        itemView.parent = parent;
      })
      parent.render();
    }) 

    this.render();
  },

  previousPage: function(){
    console.log("prev");
    debugger
    var cat = this.book[this.page].cat;
    this.book[this.page].off();
    if(!this.book[this.page - 1 ]){
      this.book[this.page - 1] =  new Anizon.Collections.Items({page: this.page - 1, cat: cat});
      this.book[this.page - 1].setUrl();
      this.book[this.page - 1].fetch();
    }
    this.collection = this.book[this.page - 1];
    this.page -= 1;
    
    var parent = this;
    this.listenTo(this.collection, "sync", function(){
      parent.children.each(function(childView){
        childView.leave();
      })
      parent.collection.each(function(item){
        var itemView = new Anizon.Views.Item({model: item});
        parent.children.push(itemView);
        itemView.parent = parent;
      })
      parent.render();
    })

    this.render(); 
  },

  initSly: function(){
    this.$frame  = $('#items-frame');
    this.$slidee = this.$frame.children('ul').eq(0);
    this.$wrap   = this.$frame.parent();

    // Call Sly on frame
    var parent = this;
    this.$frame.sly({
      horizontal: 1,
      itemNav: 'basic',
      smart: 1,
      mouseDragging: 0,
      touchDragging: 0,
      releaseSwing: 0,
      startAt: 3,
      scrollBar: parent.$wrap.find('.scrollbar'),
      scrollBy: 1,
      pagesBar: parent.$wrap.find('.pages'),
      // activatePageOn: 'click',
      keyboardNavBy: 'pages',
      dragHandle: true,
      speed: 300,
      elasticBounds: 1,
      easing: 'easeOutExpo',
      dragHandle: 0,
      dynamicHandle: 1,
      clickBar: 1,
      pageBuilder: parent.pager,
    });
  }
})


Anizon.Views.Item = Support.CompositeView.extend({
  tagName: "li",
  className: "item",

  itemTemplate: JST["center/items/item"],

  initialize: function(){

    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    'click .itemDetail' : 'showInfo', 
    'click .addToCart' : 'addToCart'
  },

  render: function(){

    this.$el.html(this.itemTemplate({item: this.model}))

    var parent = this;

    this.$el.draggable({
      revert: true,  
      distance: 10,
      //helper: "clone",
      stack: "#cartBody",
      zIndex: 9000,
      start: function(event, ui){
        // console.log(event.clientY + " " + event.clientX);
        // console.log(ui.offset.top + " " + ui.offset.left);
        // console.log(parent.$el.offset());  

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



