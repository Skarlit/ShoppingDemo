Anizon.Views.Search =  Support.CompositeView.extend({
  id: "search-panel",
  className: "col-md-8 col-md-offset-2",
  searchTemplate: JST['center/search/search_index'],
  initialize: function(){
    Anizon.debug = this;
    this.queries = [];
    this.collection = new Anizon.Collections.Items({})
    var parent = this;
    $.ajax({
      method: "GET",
      url: 'api/hotwords/index',
      success: function(resp){
        parent.queries = resp.queries;
        parent.$el.find('#remote .typeahead').typeahead(null, {
          name: 'book',
          source: parent.queriesMatcher(parent.queries)
        });
      }
    });

    this.listenTo(this.collection, "add", function(item){
      var childView = new Anizon.Views.Item({model: item});
      this.children.push(childView);
      childView.parent = this;
      parent.renderChildren();
    })

    this.listenTo(this.collection, "reset", function(){
      parent.eraseChildren();
    });
  },

  events: {
    'click #search-submit' : 'submitQuery'
  },

  render: function(){
    this.$el.html(this.searchTemplate({}));
    this.delegateEvents();
    return this;
  },

  eraseChildren: function(callback){
    var parent = this;
    var child;
    while(child = parent.children.first()){
      child.leave();
    };
    if(callback){
      callback();
    }
  },

  renderChildren: function(){
    var parent = this;
    this.children.each(function(child){
      parent.$el.find("#search-panel-result").append(child.render().$el);
    });
  },

  queriesMatcher: function(strs){
    return function findMatches(q, cb) {
      var matches, substringRegex;
   
      matches = [];

      substrRegex = new RegExp(q, 'i');

      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {

          matches.push({ value: str });
        }
      });
   
      cb(matches);
    };
  },

  submitQuery: function(){
    var query = this.$el.find("#search-bar").val();
    if(this.queries.indexOf(query) !== -1)
      this.ajaxSearch({query: query, found: true});
    else{
      this.ajaxSearch({query: query, found: false});
    }
  },

  ajaxSearch: function(option){
    var parent = this;
    $.ajax({
      method: "POST",
      url: "api/hotwords/search",
      data: {query: option.query, found: option.found},
      success: function(resp){
        parent.queries.push(option.query);
        parent.collection.reset();
        parent.collection.set(resp);
      },
      error: function(){
        $.notify("No items with such title");
      }
    })
  }

});