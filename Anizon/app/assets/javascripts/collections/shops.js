Anizon.Collections.Shops = Backbone.Collection.extend({

  model: Anizon.Models.Shop

});


Anizon.Collections.Feeds = Backbone.Collection.extend({
  url: "api/feeds",
  model: Anizon.Models.Feed

})