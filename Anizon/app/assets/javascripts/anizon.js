window.Anizon = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    Anizon.router = new Anizon.Routers.Shop({el: "#content" });
    Anizon.centerRouter = new Anizon.Routers.Center({el: "#center"})
    Backbone.history.start();
    Anizon.router.shopIndex();
  }
};


$(document).ready(function(){
  window.Anizon.initialize();
});
