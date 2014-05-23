Anizon.Collections.Generic = Backbone.Collection.extend({

  model: Anizon.Models.Generic

});


Anizon.Collections.Feeds = Backbone.Collection.extend({
  url: "api/feeds",
  model: Anizon.Models.Feed

})


Anizon.Collections.Items = Backbone.Collection.extend({
  url: "api/items",
  model: Anizon.Models.Item

})