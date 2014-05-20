window.Anizon = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    Anizon.router = new Anizon.Routers.Shop({el: "#content" });
    Backbone.history.start();
    Anizon.router.shopIndex();
  }
};


$(document).ready(function(){
  window.Anizon.initialize();
});
