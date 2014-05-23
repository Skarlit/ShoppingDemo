Anizon.Views.ItemsPanel = Support.CompositeView.extend({
  className: "col-md-12 row",

  itemsPanelTemplate: JST["center/items/items_panel"],

  initialize: function(){
    this.page = 1;

    var parent = this;
    this.listenTo(this.collection, "sync", function(){
      // parent.children.each(function(childView){
      //   childView.leave();
      // })
      parent.collection.each(function(item){
        var itemView = new Anizon.Views.Item({model: item});
        parent.children.push(itemView);
      })
      parent.render();
    })
  },

  render: function(){
    this.$el.html(this.itemsPanelTemplate({}));
    
    var parent = this;
    this.children.each(function(childView){
      parent.$el.append(childView.render().$el);
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

  render: function(){
    this.$el.html(this.itemTemplate({item: this.model}))
    return this;
  }
})