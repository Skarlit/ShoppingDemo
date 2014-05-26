Anizon.Collections.Generic = Backbone.Collection.extend({

  model: Anizon.Models.Generic

});


Anizon.Collections.Feeds = Backbone.Collection.extend({
  url: "api/feeds",
  model: Anizon.Models.Feed

})


Anizon.Collections.Items = Backbone.Collection.extend({
  model: Anizon.Models.Item,

  initialize: function(option){
    this.page = option.page || 1;
    this.cat = option.cat;
  },

  setUrl: function(){
    this.url = "api/" + this.cat + "?page=" + this.page 
  }
})

Anizon.Collections.Cart = Backbone.Collection.extend({
  model: Anizon.Models.CartItem,

  url: 'api/cart_items',

  initialize: function(option){

  }
})


Anizon.Collections.Comments = Backbone.Collection.extend({
  model: Anizon.Models.Comment,

  initialize: function(option){
    this.url = "api/items/" + option.item_id + "/comments";
  }
})