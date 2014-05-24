Anizon.Views.NewsPanel = Support.CompositeView.extend({
  
  releaseTemplate: JST["center/news/release"],
  releaseEntryTemplate: JST["center/news/release_entry"],
  newsSkeletonTemplate: JST["shops/news"],
  newsTemplate: JST["center/news/news"],
  newsEntryTemplate: JST["center/news/news_entry"],
  popularTemplate: JST["center/news/popular"],
  popularEntryTemplate: JST["center/news/popular_entry"],

  initialize: function(){
    this.collection = new Anizon.Collections.Feeds();

    this.collection.fetch();

    var popularView = new Anizon.Views.Panel({
        className: "col-md-6 news-panel",
        entryClassName: "col-md-10 col-md-offset-1",
        panelTemplate: this.popularTemplate,
        entryTemplate: this.popularEntryTemplate,
        collection: this.collection
    });
    var newsView = new Anizon.Views.Panel({
        className: "col-md-8 news-panel", 
        entryClassName: "col-md-10 col-md-offset-1",
        panelTemplate: this.newsTemplate,
        entryTemplate: this.newsEntryTemplate,
        collection: this.collection
    });

    var releaseView = new Anizon.Views.Panel({
        className: "col-md-6 news-panel", 
        entryClassName: "col-md-10 col-md-offset-1",
        panelTemplate: this.releaseTemplate,
        entryTemplate: this.releaseEntryTemplate,
        collection: this.collection
    })

    var logView = new Anizon.Views.Log();
    this.children.push(popularView);
    this.children.push(releaseView);
    this.children.push(newsView);
    this.children.push(logView);

    popularView.parent = this;
    releaseView.parent = this;
    newsView.parent = this;
    logView.parent = this;
  },

  render: function(){
    this.$el.html(this.newsSkeletonTemplate({}));

    var parent = this;
    this.children.each(function(child){
      $(parent.el).find("#news-container").append(child.render().$el);
    })

    $("#popuar-list").smoothScroll(7, 600);
    return this;
  }
});


Anizon.Views.Panel = Support.CompositeView.extend({
  initialize: function(option){
    this.panelTemplate = option.panelTemplate;
    this.entryTemplate = option.entryTemplate;
    this.entryClassName = option.entryClassName;
   
    var parent = this;
    this.listenTo(this.collection, "sync", function(){
      parent.collection.each(function(entry){
        var entryView = new Anizon.Views.Entry({
          model: entry, 
          template: parent.entryTemplate,
          className: parent.entryClassName
        });
        parent.children.push(entryView);
        parent.render();
      })
    });
  },

  render: function(){
    this.$el.html(this.panelTemplate({}));
    var parent = this;
    this.children.each(function(childView){
      parent.$el.append(childView.render().$el);
    })
    return this;
  }
})

Anizon.Views.Entry = Support.CompositeView.extend({
  initialize: function(option){
    this.template = option.template;  
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
    this.$el.html(this.template({entry: this.model}))
    return this;
  }
})  

Anizon.Views.Log = Support.CompositeView.extend({
  className: "col-md-4 news-panel",
  initialize: function(){

  },

  logTemplate: JST["center/news/log"],

  render: function(){
    this.$el.html(this.logTemplate({}));

    return this;
  }
});