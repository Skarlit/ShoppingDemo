Anizon.Views.NewsPanel = Support.CompositeView.extend({
  initialize: function(){
    var newsView = new Anizon.Views.News();
    var releaseView = new Anizon.Views.Release();
    var popularView = new Anizon.Views.Popular();

    this.renderChild(newsView);
    this.renderChild(releaseView);
    this.renderChild(popularView);
  },

  newsSkeletonTemplate: JST["shops/news"],

  render: function(){
    newsSkeletonTemplate
  }
});


Anizon.Views.News = Support.CompositeView.extend({
  initialize: function(){
    
  },

  newsSkeletonTemplate: JST["center/news/news"],



});


Anizon.Views.Release = Support.CompositeView.extend({
  initialize: function(){
    
  },

  newsSkeletonTemplate: JST["center/news/release"],



});


Anizon.Views.Popular = Support.CompositeView.extend({
  initialize: function(){
    
  },

  newsSkeletonTemplate: JST["center/news/popular"],



});