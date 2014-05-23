Anizon.Views.ShopIndex = Support.CompositeView.extend({

  //TEMPLATES
  navbarTemplate: JST['top/topNavBar'],
  signInMenuTemplate: JST['top/signInForm'],
  authButtonsTemplate: JST['top/authButtons'],
  
  //RENDER
  render: function(){
    var topNavBar = this.navbarTemplate({});
    this.$el.html(topNavBar);
    this.$el.find("#top-navbar-right").html(this.authButtonsTemplate({}));
    return this;
  },

  //EVENTS 
  events: { 
    'click #sign-in-btn' : 'signInForm',
    'click #cancel-signin-btn' : 'authButtons',
    'click #signin-submit-btn' : 'signInSubmit',
    'click #sign-up-submit-btn' : 'signUpSubmit',
    'click #sign-up-btn' : 'signUpForm',
    'click #cart' : 'toggleCart',
    'hover .dropdown' : 'animateDropDown'
  },

  //HANDLERS
  signInForm: function(event){
    console.log("Sign In clicked");
    event.preventDefault();
    $("#top-navbar-right").find("li").detach();
    $("#top-navbar-right").html(this.signInMenuTemplate({})).hide().fadeIn(600);
    $(".sign-in-form input:first-child").focus();
  },

  authButtons: function(event){
    console.log("Sign In Canceled");
    event.preventDefault();
    $("#top-navbar-right").find("form").detach();
    $("#top-navbar-right").html(this.authButtonsTemplate({})).hide().fadeIn(600);
  },

  signInSubmit: function(event){
    console.log("Sign In Submitted");

    event.preventDefault();
    var credential = $("#top-navbar-right").find("form").serializeJSON();
    $.ajax({
      type: "POST",
      url: "/sessions",
      dataType: "json",
      data: credential, 
      success: function(resp){  // resp: {name: "username"}
        console.log(resp);
        $("#top-navbar-right").html(JST["top/loginStatus"]({name: resp.name}));
      },
      error: function(resp){
        console.log(resp);
      }
    });
  },

  signUpForm: function(event){
    console.log("Sign Up clicked");
    event.preventDefault();
    $(event.target).dropdown();
  },

  signUpSubmit: function(event){
    console.log("Sign Up Submitted");
    event.preventDefault();
    var credential = $("#sign-up-form").serializeJSON();
    $.ajax({
      method: "POST",
      url: "/users",
      data: credential,
      success: function(resp){
        console.log(resp);        
        $("#top-navbar-right").html(JST["top/loginStatus"]({name: resp.name}));
      },
      error: function(resp){

      }
    });
  },

  toggleCart: function(event){
    event.preventDefault();
    console.log("rendering cart");
    if(Anizon.cart){
      $("#hideCart").click();
    }else{
      Anizon.cartCollection = new Anizon.Collections.Cart({});
      Anizon.cart = new Anizon.Views.Cart({collection: Anizon.cartCollection});
      $("#bottom").hide().html(Anizon.cart.render().$el).show("slow");
    }
  },

  animateDropDown: function(event){
    console.log("cat dropdown");
    $(this).find('.dropdown-menu').first().stop(true,true).delay(250).toggle();
  }

});
