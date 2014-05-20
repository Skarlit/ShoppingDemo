// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


$(function(){
  alert($("#sign-in-btn").text());
  $("#sign-in-btn").on('click', function(e){
     e.stopPropagation();
     if($('#sign-in-form').is(":hidden")){
       $('#sign-in-form').show("slide");
     }else{
       $('#sign-in-form').hide('slide');
     }
  }) ;

  $("#sign-in-btn").on('click', function(){

  });
});