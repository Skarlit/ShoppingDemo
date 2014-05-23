Anizon.Models.Generic = Backbone.Model.extend({

});


Anizon.Models.Feed = Backbone.Model.extend({
  rootUrl: "api/feeds"
});


Anizon.Models.Item = Backbone.Model.extend({
  rootUrl: "api/items"
});

Anizon.Models.CartItem = Backbone.Model.extend({
  rootUrl: "api/cart_items"
});