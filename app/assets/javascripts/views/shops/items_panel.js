Anizon.Views.ItemsPanel = Support.CompositeView.extend({
  className: "col-md-12 row",

  itemsPanelTemplate: JST["center/items/items_panel"],

  initialize: function(){
    this.page = 1;

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
    'scroll #items-panel': "hideCart"
  },

  hideCart: function(event){
    console.log("scrolled");
  },

  render: function(){
    this.$el.html(this.itemsPanelTemplate({books: this.collection}));
    
    var parent = this;
    this.children.each(function(childView){
      parent.$el.find("#items-panel").append(childView.render().$el);
    })

    $('#items-panel').on('scroll', function(){
      if(Anizon.cart){
        Anizon.cart.hideCart();
      }
    });
    this.initSly();
    this.delegateEvents();
    return this;
  },

  initSly: function(){
    this.$frame  = $('#items-frame');
    this.$slidee = this.$frame.children('ul').eq(0);
    this.$wrap   = this.$frame.parent();

    // Call Sly on frame
    this.$frame.sly({
      horizontal: 1,
      itemNav: 'basic',
      smart: 1,
      mouseDragging: 0,
      touchDragging: 0,
      releaseSwing: 0,
      startAt: 3,
      scrollBar: this.$wrap.find('.scrollbar'),
      scrollBy: 1,
      pagesBar: this.$wrap.find('.pages'),
      // activatePageOn: 'click',
      speed: 300,
      elasticBounds: 1,
      easing: 'easeOutExpo',
      dragHandle: 0,
      dynamicHandle: 1,
      clickBar: 1,

      // Buttons
      forward: this.$wrap.find('.forward'),
      backward: this.$wrap.find('.backward'),
      prev: this.$wrap.find('.prev'),
      next: this.$wrap.find('.next'),
      prevPage: this.$wrap.find('.prevPage'),
      nextPage: this.$wrap.find('.nextPage')
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
    'click .itemDetail' : 'showInfo'
  },

  render: function(){

    this.$el.html(this.itemTemplate({item: this.model}))

    var parent = this;
    this.$el.draggable({
      revert: "invalid",  
      helper: "clone",
      zIndex: 200,
      start: function(){
        Anizon.currentDraggedItem = parent.model;
        if(Anizon.cart){
          Anizon.cart.showCart();
        }else{
         parent.$el.notify(
          "You don't have a cart currently, \nclick on Cart above to create or load a cart", 
          {
            position: "top right"
          });
         $("#cart").trigger("mouseover");
        }
      },
      stop: function(){
        $("#cart").trigger("mouseleave");
      }
    });

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
    return this;
  },

  showInfo: function(event){
    event.preventDefault();
    var infoView = new Anizon.Views.Info({model: this.model});
    infoView.render().$el.modal().removeClass("hide");
  },

})



Anizon.Views.Info = Support.CompositeView.extend({
  id: 'base-modal',
  className: 'modal fade hide mymodal',
  infoTemplate: JST["center/items/info"],

  initialize: function(option){
    this.comments = this.model.comments();
    this.itemInfo = this.model.itemInfo();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.comments, "sync", this.render);
    this.listenTo(this.itemInfo, "sync", this.render);
  },

  render: function(){
    this.$el.html(this.infoTemplate({itemInfo: this.itemInfo, item: this.model, comments: this.comments}));
    return this;
  }
})