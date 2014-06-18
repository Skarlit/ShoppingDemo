Anizon.Views.NewsPanel = Support.CompositeView.extend({
  
  rankingTemplate: JST["center/news/ranking"],
  rankingEntryTemplate: JST["center/news/ranking_entry"],
  newsSkeletonTemplate: JST["shops/news"],
  newsTemplate: JST["center/news/news"],
  newsEntryTemplate: JST["center/news/news_entry"],
  popularTemplate: JST["center/news/popular"],
  popularEntryTemplate: JST["center/news/popular_entry"],

  initialize: function(){
    this.collection = new Anizon.Collections.Feeds();
    this.collection.fetch();

    this.popularItems = new Anizon.Collections.Items({});
    this.popularItems.setPopularUrl();
    this.popularItems.fetch();

    this.rankingItems = new Anizon.Collections.Items({});
    this.rankingItems.setRankingUrl();
    this.rankingItems.fetch();

    var popularView = new Anizon.Views.listItemPanel({
        className: "col-md-6 news-panel",
        entryClassName: "col-md-10 col-md-offset-1 popular_Entry",
        panelTemplate: this.popularTemplate,
        entryTemplate: this.popularEntryTemplate,
        collection: this.popularItems,
        root: "#popular-list"
    });
    var rankingView = new Anizon.Views.listItemPanel({
        className: "col-md-6 news-panel", 
        entryClassName: "col-md-10 col-md-offset-1 ranking_Entry",
        panelTemplate: this.rankingTemplate,
        entryTemplate: this.rankingEntryTemplate,
        collection: this.rankingItems,
        root: "#ranking-list"
    })
    var newsView = new Anizon.Views.Panel({
        className: "col-md-8 news-panel", 
        entryClassName: "col-md-10 col-md-offset-1 newsEntry",
        panelTemplate: this.newsTemplate,
        entryTemplate: this.newsEntryTemplate,
        collection: this.collection,
        root: "#news-list"
    });


    var logView = new Anizon.Views.Log();
    this.children.push(popularView);
    this.children.push(rankingView);
    this.children.push(newsView);
    this.children.push(logView);

    popularView.parent = this;
    rankingView.parent = this;
    newsView.parent = this;
    logView.parent = this;
  },

  render: function(){
    this.$el.html(this.newsSkeletonTemplate({}));

    var parent = this;
    this.children.each(function(child){
      $(parent.el).find("#news-container").append(child.render().$el);
    })
    
    return this;
  }
});


Anizon.Views.Panel = Support.CompositeView.extend({
  initialize: function(option){
    this.panelTemplate = option.panelTemplate;
    this.entryTemplate = option.entryTemplate;
    this.entryClassName = option.entryClassName;
    this.root = option.root
   
    var parent = this;

    this.listenTo(this.collection, "add", function(entry){
        var entryView = new Anizon.Views.Entry({
          model: entry, 
          template: parent.entryTemplate,
          className: parent.entryClassName
        });
        parent.children.push(entryView);
        parent.render();
    });
  },

  events: {
    'click a' : 'renderPdf',
    'click p' : 'renderPdf'
  },

  renderPdf: function(event){
    event.preventDefault();
    var url = $(event.target).parent().attr('href') || $(event.target).parent().find('a').attr('href');
    var title = $(event.target).parent().find('p').html();
    $("#console").show("slow");
    $("#console").find("#console-content").html(JST['center/news/pdfModal']({url: url, title: title}));
  },

  render: function(){
    this.$el.html(this.panelTemplate({}));
    var parent = this;
    this.children.each(function(childView){
      parent.$el.find(parent.root).append(childView.render().$el);
    })
    this.delegateEvents();
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


Anizon.Views.listItemPanel = Support.CompositeView.extend({
  initialize: function(option){
    this.panelTemplate = option.panelTemplate;
    this.entryTemplate = option.entryTemplate;
    this.entryClassName = option.entryClassName;
    this.root = option.root

    var parent = this;

    this.listenTo(this.collection, "add", function(entry){
      var entryView = new Anizon.Views.listItem({
        model: entry, 
        template: parent.entryTemplate,
        className: parent.entryClassName
      });
      parent.children.push(entryView);
      parent.render();
    });
  },

  render: function(){
    this.$el.html(this.panelTemplate({}));
    var parent = this;
    this.children.each(function(childView){
      parent.$el.find(parent.root).append(childView.render().$el);
    })
    return this;
  }
})

Anizon.Views.listItem = Anizon.Views.Item.extend({
  initialize: function(option){
    this.itemTemplate = option.template;
    this.className = option.entryClassName;
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    'click section' : 'showInfo'
  },

})

