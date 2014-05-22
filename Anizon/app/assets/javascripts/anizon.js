window.Anizon = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    Anizon.router = new Anizon.Routers.Shop({el: "#top" });
    Anizon.router.shopIndex();
    Anizon.centerRouter = new Anizon.Routers.Center({el: "#center"});
    Backbone.history.start();
    
  }
};


$(document).ready(function(){
  window.Anizon.initialize();
});
