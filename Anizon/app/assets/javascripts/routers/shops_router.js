Anizon.Routers.Shop = Support.SwappingRouter.extend({
  initialize: function(option){
    this.el = $(option.el);
  },
  routes: {
  },

  shopIndex: function(){
    var indexView = new Anizon.Views.ShopIndex();
    this.swap(indexView);
  }
});
