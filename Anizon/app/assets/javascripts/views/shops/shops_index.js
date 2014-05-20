Anizon.Views.ShopIndex = Support.CompositeView.extend({

  //EVENTS 
  events: {
    'click #sign-in-btn' : 'signInMenu'
  },
  //HANDLERS
  //TEMPLATES
  skeletonTemplate: JST['shops/index'],
  navbarTemplate: JST['interfaces/topNavBar'],
  
  //RENDER
  render: function(){
    var skeleton = this.skeletonTemplate({});
    var topNavBar = this.navbarTemplate({});
    this.$el.html(skeleton);
    this.$el.find("#top").html(topNavBar);
    return this;
  },

});
