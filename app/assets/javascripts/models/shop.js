Anizon.Models.Generic = Backbone.Model.extend({

});


Anizon.Models.Feed = Backbone.Model.extend({
  urlRoot: "api/feeds"
});



Anizon.Models.CartItem = Backbone.Model.extend({
  urlRoot: "api/cart_items",
});

Anizon.Models.ItemInfo = Backbone.Model.extend({

})

Anizon.Models.Item = Backbone.Model.extend({
  urlRoot: "api/items",

  itemInfo: function(){
    if(this.info)
      return info;
    else{
      this.info = new Anizon.Models.ItemInfo();
      this.info.fetch({
        url: "api/items/" + this.id,
        error: function(){
          $.notify("Cannot get the Information on this Book. Maybe it doesn't exist", {position: "top left"});
        }
      });
      return info;
    }
  },

  comments: function(){


  }
});


Anizon.Models.Comment = Backbone.Model.extend({

})