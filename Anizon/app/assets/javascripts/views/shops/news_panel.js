Anizon.Views.NewsPanel = Support.CompositeView.extend({
  initialize: function(){
    var popularView = new Anizon.Views.Popular();
    var newsView = new Anizon.Views.News();
    var releaseView = new Anizon.Views.Release();
    this.children.push(popularView);
    this.children.push(releaseView);
    this.children.push(newsView);
  },

  newsSkeletonTemplate: JST["shops/news"],

  render: function(){
    this.$el.html(this.newsSkeletonTemplate({}));

    var parent = this;
    this.children.each(function(child){
      $(parent.el).find("#news-container").append(child.render().$el);
    })
    return this;
  }
});


Anizon.Views.News = Support.CompositeView.extend({
  className: "col-md-12 news-panel",

  newsTemplate: JST["center/news/news"],

  newsEntryTemplate: JST["center/news/news_entry"],

  initialize: function(){
    this.collection = new Anizon.Collections.Feeds();
    this.collection.fetch();

    var parent = this;
    this.collection.each(function(entry){
      var newsEntryView = new Anizon.Views.Entry({model: entry, template: parent.newsEntryTemplate }) 
      parent.children.push(newsEntryView);
    })

    this.listenTo(this.collection, "sync add", this.render);
  },

  render: function(){
    this.$el.html(this.newsTemplate({}));
    debugger
    var parent = this;
    this.children.each(function(childView){
      this.$el.append(childView.render().$el);
    })

    return this;
  }

});


Anizon.Views.Release = Support.CompositeView.extend({
  className: "col-md-6 news-panel",
  initialize: function(){
    
  },

  releaseTemplate: JST["center/news/release"],

  render: function(){
    this.$el.html(this.releaseTemplate({}));

    return this;
  }


});

Anizon.Views.Popular = Support.CompositeView.extend({
  className: "col-md-6 news-panel",
  initialize: function(){
    
  },

  popularTemplate: JST["center/news/popular"],

  render: function(){
    this.$el.html(this.popularTemplate({}));

    return this;
  }
});

Anizon.Views.Entry = Support.CompositeView.extend({
  className: "col-md-10 col-md-offset-1",
  initialize: function(option){
    this.template = option.template;
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
    this.$el.html(this.template({entry: this.model}))
    return this;
  }
})