Anizon.Views.ItemsPanel = Support.CompositeView.extend({
  className: "col-md-12 row",

  itemsPanelTemplate: JST["center/items/items_panel"],
  prevPageTemplate: JST["center/items/prev_page"],
  nextPageTemplate: JST["center/items/next_page"],

  initialize: function(){
    this.page = 1;
    this.book = [];
    this.book[this.page] = this.collection;
    this.render();

    var parent = this;
    this.listenTo(this.collection, "sync", function(){
      
      parent.eraseChildren();
      parent.collection.each(function(item){
        var itemView = new Anizon.Views.Item({model: item});
        parent.children.push(itemView);
        itemView.parent = parent;
      })
      parent.renderChildren();
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

    this.initSly();
    this.$frame.sly('on', 'change', function(event){
      parent.hideCart();
    });

    this.delegateEvents();
    return this;
  },

  eraseChildren: function(){
    var parent = this;
    var child;
    while(child = parent.children.first()){
      child.leave();
    }
    parent.$el.find(".prevPage").remove();
    parent.$el.find(".nextPage").remove();
  },

  renderChildren: function(){
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

  },

  pager: function(index){ 
    console("called with" + index);
  },

  nextPage: function(){
    
    var cat = this.book[this.page].cat;
    this.book[this.page].off();
    if(!this.book[this.page + 1]){
      this.book[this.page + 1] = new Anizon.Collections.Items({page: this.page + 1, cat: cat});
      this.book[this.page + 1].setUrl();
      this.book[this.page + 1].fetch();
    }
    this.collection = this.book[this.page + 1];
    this.page += 1;

    var parent = this;
    this.listenTo(this.collection, "sync", this.refreshChildrenAndRender) 

    this.refreshChildrenAndRender();
  },

  previousPage: function(){
    
    if(this.page > 1){
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
      this.listenTo(this.collection, "sync",this.refreshChildrenAndRender)

      this.refreshChildrenAndRender();

    }else{
      $.notify("You have reach the end of page");
    } 
  },


  refreshChildrenAndRender: function(){
    var parent = this;
    parent.eraseChildren();
    parent.collection.each(function(item){
      var itemView = new Anizon.Views.Item({model: item});
      parent.children.push(itemView);
      itemView.parent = parent;
    })
    parent.renderChildren();
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






