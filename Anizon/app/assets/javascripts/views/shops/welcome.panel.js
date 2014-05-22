Anizon.Views.WelcomePanel = Support.CompositeView.extend({
  className: "col-md-8 col-md-offset-2",
  initialize: function(){

  },

  welcomePanelTemplate: JST["center/welcome/welcome_panel"],

  render: function(){
    this.$el.html(this.welcomePanelTemplate({}));

    return this;
  }

})