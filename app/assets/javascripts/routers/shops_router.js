Anizon.Routers.Shop = Support.SwappingRouter.extend({
  initialize: function(option){
    this.el = option.el;
  },

  shopIndex: function(){
    var indexView = Anizon.indexView  = new Anizon.Views.ShopIndex();
    this.swap(indexView);
  },
});

