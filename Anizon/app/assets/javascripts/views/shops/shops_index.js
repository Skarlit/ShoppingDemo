Anizon.Views.ShopIndex = Support.CompositeView.extend({

  //TEMPLATES
  skeletonTemplate: JST['shops/index'],
  navbarTemplate: JST['interfaces/topNavBar'],
  signInMenuTemplate: JST['forms/signInForm'],
  authButtonsTemplate: JST['auth/authButtons'],
  
  //RENDER
  render: function(){
    var skeleton = this.skeletonTemplate({});
    var topNavBar = this.navbarTemplate({});
    this.$el.html(skeleton);
    this.$el.find("#top").html(topNavBar);
    this.$el.find("#top-navbar-right").html(this.authButtonsTemplate({}));
    return this;
  },

  //EVENTS 
  events: {
    'click #sign-in-btn' : 'signInMenu',
    'click #cancel-signin-btn' : 'authButtons'
  },

  //HANDLERS
  signInMenu: function(event){
    console.log("Sign In clicked");
    event.preventDefault();
    $("#top-navbar-right").find("li").remove();
    $("#top-navbar-right").html(this.signInMenuTemplate({})).hide().fadeIn(600);
  },

  authButtons: function(event){
    console.log("Sign In Canceled");
    event.preventDefault();
    $("#top-navbar-right").find("form").remove();
    $("#top-navbar-right").html(this.authButtonsTemplate({})).hide().fadeIn(600);
  },

  signInSubmit: function(event){
    console.log("Sign In Submitted");
    event.preventDefault();
    var credential = $("#top-navbar-right").find("form").serializeJSON();
    $.ajax({
      method: "POST",
      url: "/session/new",
      data: credential,
      success: function(resp){  // resp: {name: "username"}
        $("#top-navbar-right").html(JST["auth/loginStatus"]({name: resp.name}));
      }
      error: function(resp){
        
      }
    });
  }

});
