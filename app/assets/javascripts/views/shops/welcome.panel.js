Anizon.Views.WelcomePanel = Support.CompositeView.extend({
  className: "jumbotron",
  initialize: function(){

  },

  welcomePanelTemplate: JST["center/welcome/welcome_panel"],

  render: function(){
    this.$el.html(this.welcomePanelTemplate({}));

    return this;
  }

})