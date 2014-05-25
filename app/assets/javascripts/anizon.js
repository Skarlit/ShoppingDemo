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

window.persistentLogin = function(){
  $.ajax({
    type: "POST",
    url: "sessions/auto",
    data: "",
    success: function(resp){
      $("#top-navbar-right").html(JST["top/loginStatus"]({name: resp.name}));
    }
  })
}

$(document).ready(function(){

  window.Anizon.initialize();
  window.persistentLogin(); 
});
