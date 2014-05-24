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

  render: function(){
    this.$el.html(this.itemsPanelTemplate({books: this.collection}));
    
    var parent = this;
    this.children.each(function(childView){
      parent.$el.find("#items-panel").append(childView.render().$el);
    })
    return this;
  }

})


Anizon.Views.Item = Support.CompositeView.extend({
  className: "item",

  itemTemplate: JST["center/items/item"],

  initialize: function(){

    this.listenTo(this.model, "sync", this.render);
  },


  events:{
    "click .item" : "showInfo",
  },

  render: function(){

    this.$el.html(this.itemTemplate({item: this.model}))

    var parent = this;
    this.$el.draggable({
      revert: "invalid",  
      helper: "clone",
      zIndex: 200,
      start: function(){
        Anizon.currentDraggedItem = parent.model
      }
    });
    return this;
  },

  showInfo: function(event){
    var infoView = new Anizon.Views.Info({model: this.model})
  }
})



Anizon.Views.Info = Support.CompositeView.extend({
  className: "info",

  infoTemplate: JST["center/items/info"],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render)
  },

  render: function(){
    this.$el.html(this.infoTemplate({}));
    return this;
  }
})