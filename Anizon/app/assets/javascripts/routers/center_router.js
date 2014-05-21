
Anizon.Routers.Center = Support.SwappingRouter.extend({
  initialize: function(option){
    this.el = $(option.el);
  },
  routes: {
    'news' : 'newsPanel'
  },
  newsPanel: function(){
    var newsView = new Anizon.Views.NewsPanel();
    this.swap(newsView);
  }
})