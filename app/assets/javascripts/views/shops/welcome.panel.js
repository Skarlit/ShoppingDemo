Anizon.Views.WelcomePanel = Support.CompositeView.extend({
  className: "col-md-8 welcomeBanner  col-md-offset-2",
  initialize: function(){

  },

  welcomePanelTemplate: JST["center/welcome/welcome_panel"],

  events: {
  	'click #wallpaperUrl-btn' : "changeWallpaper"
  },


  render: function(){
    this.$el.html(this.welcomePanelTemplate({}));

    return this;
  },

  changeWallpaper: function(){
    if($("#wallpaperUrl").val() == ""){
      var wallpaper = this.$el.find(".selectpicker").val()
      $.cookie("wall", wallpaper);
      $.backstretch(wallpaper);
    }else{  
      var wallpaper = $("#wallpaperUrl").val()
      $.cookie("wall", wallpaper);
  	  $.backstretch(wallpaper);
    }
  }

})