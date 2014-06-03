$(document).ready(function(){
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
  })

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
  })
});