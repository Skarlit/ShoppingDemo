
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
    var items = new Anizon.Collections.Items({cat: cat, page: 1})
    items.setUrl();
    items.fetch();
    var view = new Anizon.Views.ItemsPanel({collection: items})
    this.swap(view);
  },

  swap: function(newView) {
    if (this.currentView && this.currentView.leave) {

      this.currentView.leave();
    }

    this.currentView = newView;
    $(this.el).empty().append(this.currentView.render().el).hide().fadeIn(1000);
  },

  nonFadeSwap: function(newView){
    if (this.currentView && this.currentView.leave) {
      this.currentView.leave();
    }

    this.currentView = newView;
    $(this.el).empty().append(this.currentView.render().el);
  },
})

