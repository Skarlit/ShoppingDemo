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
      Anizon.username = resp.name;
      $("#top-navbar-right").html(JST["top/loginStatus"]({name: resp.name}));
    },
    error: function(resp){
      $.notify("You are not signed in, your cart items would be stored on local cookies");
    }
  })
}

$(document).ready(function(){

  window.Anizon.initialize();
  window.persistentLogin(); 
  $.backstretch("http://cdn.wallwuzz.com/uploads/vector-wallpaper-patterns-black-wallpapers-array-wallwuzz-hd-wallpaper-7577.png");

  $("#cart").qtip({
    content: {
      text: 'Click Here to Create/Toggle Cart'
    },
    style: {
      classes: 'qtip-dark qtip-tipsy'
    }
  })

});
