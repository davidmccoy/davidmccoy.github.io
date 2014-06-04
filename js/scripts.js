$(document).ready(function(){

  // four click functions, one for each category
  // toggles table row background color and slide status
  $("tr#about").click(function(event){
    event.preventDefault();
    event.stopPropagation;

    var about = $("tr.about");

    if( $("tr#about").css("background-color") === "rgb(255, 255, 0)") {
      $("tr#about").attr("style", "background-color: none");
    } else {
      $("tr#about").attr("style", "background-color: rgb(255, 255, 0)");
    }

    $(about).slideToggle();

  });

  $("tr#technologies").click(function(event){
    event.preventDefault();
    event.stopPropagation;

    var tech = $("tr.technologies");

    if( $("tr#technologies").css("background-color") === "rgb(255, 255, 0)") {
      $("tr#technologies").attr("style", "background-color: none");
    } else {
      $("tr#technologies").attr("style", "background-color: rgb(255, 255, 0)");
    }

    $(tech).slideToggle();
  });

  $("tr#portfolio").click(function(event){
    event.preventDefault();
    event.stopPropagation;

    var portfolio = $("tr.portfolio");

    if( $("tr#portfolio").css("background-color") === "rgb(255, 255, 0)") {
      $("tr#portfolio").attr("style", "background-color: none");
    } else {
      $("tr#portfolio").attr("style", "background-color: rgb(255, 255, 0)");
    }

    $(portfolio).slideToggle();
  });

  $("tr#find-me").click(function(event){
    event.preventDefault();
    event.stopPropagation;

    var findMe = $("tr.find-me");

    if( $("tr#find-me").css("background-color") === "rgb(255, 255, 0)") {
      $("tr#find-me").attr("style", "background-color: none");
    } else {
      $("tr#find-me").attr("style", "background-color: rgb(255, 255, 0)");
    }

    $(findMe).slideToggle();
  });

  // changes "full-stack web developer" to "protocol droid" on hover
  $("h1").hover(function(event) {
    event.preventDefault();
    event.stopPropagation;

    $(this).text("Index of /david mccoy/protocol droid");

  }, function(event) {
    event.preventDefault();
    event.stopPropagation;

    $(this).text("Index of /david mccoy/full-stack web developer");
  });  
});