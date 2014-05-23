
Anizon.Routers.Center = Support.SwappingRouter.extend({
  initialize: function(option){
    this.el = option.el;
  },
  routes: {
    '' : 'welcomePanel',
    'news' : 'newsPanel',
    'items/:cat' : 'itemsPanel',
  },
  newsPanel: function(){
    var newsView = new Anizon.Views.NewsPanel();
    this.swap(newsView);
  },
  welcomePanel: function(){
    var welcomeView = new Anizon.Views.WelcomePanel();
    this.swap(welcomeView);
  },
  itemsPanel: function(cat){
    switch(cat){
      case "geometry":
      break;
      case "algebra":
      break;
      case "analysis":
      break;
      case "probability":
      break;
    }
  }
})