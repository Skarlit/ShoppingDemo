Anizon.Views.ProductPanel = Support.CompositeView.extend({
  className: "col-md-10 col-md-offset-1",
  initialize: function(){

  },

  productsPanelTemplate: JST["shops/products_panel"],

  render: function(){
    this.$el.html(this.productsPanelTemplate({}));
    

    return this;
  }


})

