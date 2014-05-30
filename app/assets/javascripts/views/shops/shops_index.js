Anizon.Views.ShopIndex = Support.CompositeView.extend({

  //TEMPLATES
  navbarTemplate: JST['top/topNavBar'],
  signInMenuTemplate: JST['top/signInForm'],
  authButtonsTemplate: JST['top/authButtons'],
  consoleTemplate: JST['console'],
  
  //RENDER
  render: function(){
    var topNavBar = this.navbarTemplate({});
    this.$el.html(topNavBar);
    $('#console').html(this.consoleTemplate({username: Anizon.username}));
    this.handleConsoleInput();
    this.$el.find("#top-navbar-right").html(this.authButtonsTemplate({}));
    this.delegateEvents();
    return this;
  },

  //EVENTS 
  events: { 
    'mouseover .my-dropdown' : 'animateDropDown',
    'mouseleave .my-dropdown' : 'animateSlideUpParent',
    'mouseover .my-dropdown-menu' : 'animateDropDown',
    'mouseleave .my-dropdown-menu' : 'animateSlideUp',
    'click #sign-out-btn' : 'signOut',
    'click #sign-in-btn' : 'signInForm',
    'click #cancel-signin-btn' : 'authButtons',
    'click #signin-submit-btn' : 'signInSubmit',
    'click #sign-up-submit-btn' : 'signUpSubmit',
    'click #sign-up-btn' : 'signUpForm',
    'click #cart' : 'toggleCart',
    'click #consoleToggle' : 'toggleConsole'
  },

  //HANDLERS
  signInForm: function(event){
    
    event.preventDefault();
    $("#top-navbar-right").find("li").detach();
    $("#top-navbar-right").html(this.signInMenuTemplate({})).hide().fadeIn(600);
    $(".sign-in-form input:first-child").focus();
  },

  authButtons: function(event){
    
    event.preventDefault();
    $("#top-navbar-right").find("form").detach();
    $("#top-navbar-right").html(this.authButtonsTemplate({})).hide().fadeIn(600);
  },

  signInSubmit: function(event){
    
    event.preventDefault();
    var credential = $("#top-navbar-right").find("form").serializeJSON();
    $.ajax({
      type: "POST",
      url: "/sessions",
      dataType: "json",
      data: credential, 
      success: function(resp){  // resp: {name: "username"}        
        Anizon.username = resp.name;
        $("#top-navbar-right").html(JST["top/loginStatus"]({name: resp.name}));
      },
      error: function(resp){
        
      }
    });
  },

  signUpForm: function(event){
    
    event.preventDefault();
    $(event.target).dropdown();
  },

  signUpSubmit: function(event){
    
    event.preventDefault();
    var credential = $("#sign-up-form").serializeJSON();
    $.ajax({
      method: "POST",
      url: "/users",
      data: credential,
      success: function(resp){
        
        $("#top-navbar-right").html(JST["top/loginStatus"]({name: resp.name}));
      },
      error: function(resp){

      }
    });
  },

  toggleCart: function(event){
    event.preventDefault();
    
    if(Anizon.cart){
      $("#hideCart").click();
    }else{
      Anizon.cartCollection = new Anizon.Collections.Cart();
      Anizon.cart = new Anizon.Views.Cart({collection: Anizon.cartCollection});
      $("#bottom").html(Anizon.cart.render().$el).show("slide", {direction: "down"}, 1000);
    }
  },

  animateDropDown: function(event){
    

    $(event.target).parent().find('.my-dropdown-menu').stop().slideDown(200);
    event.stopPropagation();
  },

  animateSlideUp: function(event){
    
    var $target = $(event.target)
    if($target.prop("tagName") === "UL") {
      $target.stop().slideUp(200);
    } else {
      $target.closest('ul').stop().slideUp(200);
    }
    event.stopPropagation();
  },

  animateSlideUpParent: function(event){
    
    $(event.target).parent().find('.my-dropdown-menu').stop().slideUp(200);
    event.stopPropagation();
  },

  signOut: function(event){
    
    var parent = this;
    event.preventDefault();
    $.ajax({
      method: "DELETE",
      url: "/sessions",
      data: "",
      success: function(resp){
        $("#top-navbar-right").html(parent.authButtonsTemplate({}));
      },
      error: function(resp){

      }
    })
  },

  toggleConsole: function(event){
    $("#console").toggle('slide',{direction: 'right'},500);
  },

  handleConsoleInput: function(){

    // $("#console").css("height", Math.round($(document).height() * 0.6) );
    $("#console input").on('keyup', function(event){
       console.log(event.keyCode);
       if (event.which == 13 || event.keyCode == 13) {
          if($(event.target).val() == "clear"){
            $("#console-content").html("");
          }else{
            $("#console-content").html("<p> error: command could not be found</p>")
          }
          $(event.target).html("");
       }
    });

    $("#console-minimize").on("click", function(){
      $("#console").hide('slide', {direction: 'right'}, 200);
    })
  }
});
