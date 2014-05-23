
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
    var view = new Anizon.Views.ItemsPanel({})
    switch(cat){
      case "geometry":
      break;
      case "algebra":
      break;
      case "analysis":
      break;
      case "probability":
      break;
      case "numerical":
      break;
    }
    this.swap(view);
  },

  swap: function(newView) {
    if (this.currentView && this.currentView.leave) {
      this.currentView.leave();
    }

    this.currentView = newView;
    $(this.el).empty().append(this.currentView.render().el).hide().fadeIn(1000);
  }
})

