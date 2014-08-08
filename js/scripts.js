$(document).ready(function(){

  // click event handlers for the category table rows
  $('.category').click(function(event) {
    event.preventDefault();
    event.stopPropagation();

    var category = $(this);
    var childRow = $(this).attr('id');

    if ($(category).is($('.active'))) {
      $('tr.' + $('tr.active').attr('id')).hide();
      $('tr.active').removeClass('active');
    } else if ($('tr.active')) {
      $('tr.' + $('tr.active').attr('id')).hide();
      $('tr.active').removeClass('active');

      $(this).addClass('active');
      $('tr.' + childRow ).show();
    }

  });

  // changes "full-stack web developer" to "protocol droid" on hover
  $("h1").hover(function(event) {
    event.preventDefault();
    event.stopPropagation();

    $(this).attr("style", "width: 850px").text("Index of /david mccoy/protocol droid/human-cyborg relations");

  }, function(event) {
    event.preventDefault();
    event.stopPropagation();

    $(this).attr("style", "width: 650px").text("Index of /david mccoy/full-stack web developer");
  });  
});