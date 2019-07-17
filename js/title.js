// changes "full-stack web developer" to "protocol droid" on hover
$(document).ready(function() {
  $("#title").hover(function(e) {
    $(this).text("Index of /david mccoy/protocol droid/human-cyborg relations");
  }, function(e) {
    $(this).text("Index of /david mccoy/senior full-stack web developer");
  });
})
