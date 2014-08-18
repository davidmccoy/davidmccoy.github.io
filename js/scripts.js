$(document).ready(function(){

  // // // portfolio

  var columns;
  var animateInfo;

  // Hand-roll an artisinal Array.prototype.indexOf because IE8 doesn't support it
  if (!Array.prototype.indexOf)
  {
    Array.prototype.indexOf = function(elt /*, from*/)
    {
      var len = this.length >>> 0;
  
      var from = Number(arguments[1]) || 0;
      from = (from < 0)
           ? Math.ceil(from)
           : Math.floor(from);
      if (from < 0)
        from += len;
  
      for (; from < len; from++)
      {
        if (from in this &&
            this[from] === elt)
          return from;
      }
      return -1;
    };
  };

  // IE8 also doesn't have window.innerWidth
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  // set initial value of columns based on window width
  if (width >= 920) {
    columns = 3;
  } else if (width > 620) {
    columns = 2;
  } else {
    columns = 1;
  };


  // project click event handler
  $('.project_container').click(function(event){

    event.stopPropogation; 
    
    // get all projects
    var projects = $('.project_container');

    // find the index of clicked project (and normalize)
    var index = Array.prototype.indexOf.call(projects, this) + 1;

    // remove other active classes
    if ($('div.active')) {

      if ($(this).hasClass('active')) {
        $('.project_info_display').children().hide()
        $('.project_info_display').slideUp('fast', function(){
          $(this).remove();
        });
        $('div.active').removeClass('active');
        return;
      }

      // don't animate diplay project info if the new project is in the same row
      var oldIndex = Array.prototype.indexOf.call(projects, $('div.active')[0]) + 1;
      if (Math.floor((index - 1) / columns) != Math.floor((oldIndex - 1) / columns)) {
        animateInfo = true; 
      } else {
        animateInfo = false;
      };

      $('div.active').removeClass('active');
    };

    // set project to active
    $(this).addClass('active');

    // clear previous project info
    if ($('.project_info_display') && !!animateInfo) {
      $('.project_info_display').children().slideUp('fast')
      $('.project_info_display').slideUp('fast', function(){
        $(this).remove();
      });
    } else {
      $('.project_info_display').remove();
    };

    // if statement that determines where the new bio div should be inserted
    if (index % columns === 0) {
      // selected project is already at the end of a row
      addInfo(this, this);
    } else if (index > projects.length - (projects.length % columns)) {
      // selected project is in the final row
      var lastProjectInTheRow = $(projects).last();
      addInfo(this, lastProjectInTheRow);
    } else  {
      // project is neither the end of a row nor in the last row
      // find the index of the project at end of the row (and de-normalize)
      var rowEnd = index + (columns - (index % columns)) - 1;
      var lastProjectInTheRow = projects[rowEnd];
      addInfo(this, lastProjectInTheRow);
    };

  });

  // displays the info for a selected project 
  var addInfo = function(selectedProject, lastProjectInTheRow) {
    // get info
    var oldInfo = $(selectedProject).children()[1];

    // create new element with info
    var newInfo = $('<div class="project_info_display">').html($(oldInfo).html()).attr('style', 'display: none');
    var closeInfo = $('<img class="close_bio_display" src="assets/close.png" style="position:absolute;width:18px;height:18px;top:10px;right:10px;z-index:1;">').appendTo($(newInfo));

    // create click event to close info
    $(closeInfo).click(function(event) {
      $('.project_info_display').children().hide()
      $('.project_info_display').slideUp('fast', function(){
        $(this).remove();
      });
      $('div.active').removeClass('active');
    });
    
    // apend new info
    $(lastProjectInTheRow).after(newInfo);
    
    // only slide down if it's in a new row
    if (animateInfo) {
      $(newInfo).children().hide();
      $(newInfo).slideDown('fast', function() {
        $(newInfo).children().show();
      });
    } else {
      $(newInfo).show();
    };
  };

  // reposition elements on resize
  $(window).resize(function(event){

    // reset initial value of columns based on window width
    // IE8 also doesn't have window.innerWidth
    width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    
    // reset the number of columns and adjust the location of the display bio
    if (width >= 920 && (columns == 1 || columns == 2)) {
      columns = 3;
      
      adjustInfoDisplay();
    } else if (width >= 920) {

      columns = 3;

    } else if (width > 620 && (columns == 1 || columns == 3)){
      
      columns = 2;
      adjustInfoDisplay();

    } else if (width > 620) {

      columns = 2;

    } else if (width <= 620 && (columns == 2 || columns == 3)) {
      columns = 1;
      adjustInfoDisplay();
    } else {
      columns = 1;
    };

    if (width >= 920) {

      $('#title').attr("style", "width: 850px").text("Index of /david mccoy/protocol droid/human-cyborg relations");

    } else {
      $('#title').attr("style", "width: 100%").text("Index of /david mccoy/protocol droid/human-cyborg relations");
    };
    
  });


  // changes the position of the profile_bio_display div based on recalculating the end of the rows and repositioning the div accordingly
  var adjustInfoDisplay = function() {
    
    // get all projects
    var projects = $('.project_container');
    
    // get the active project
    var project = $('div.active')[0];
    
    // get the current display info
    var displayInfo = $('.project_info_display');
    
    // find the index of clicked project (and normalize)
    var index = Array.prototype.indexOf.call(projects, project) + 1;

    // if statement that determines where the new info div should be inserted
    if (index % columns === 0) {
      // selected project is already at the end of a row
      $(project).after(displayInfo);
    } else if (index > projects.length - (projects.length % columns)) {
      // selected project is in the final row
      var lastProjectInTheRow = $(projects).last();
      $(lastProjectInTheRow).after(displayInfo);
    } else  {
      // project is neither the end of a row nor in the last row
      // find the index of the project at end of the row (and un-normalize)
      var rowEnd = index + (columns - (index % columns)) - 1;
      var lastProjectInTheRow = projects[rowEnd];
      $(lastProjectInTheRow).after(displayInfo);
    }
  };
  


  // // // category table rows

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

  // // // title

  // changes "full-stack web developer" to "protocol droid" on hover
  $("#title").hover(function(event) {
    event.stopPropagation();

    if (width >= 920) {

      $(this).attr("style", "width: 850px").text("Index of /david mccoy/protocol droid/human-cyborg relations");

    } else {
      $(this).attr("style", "width: 100%").text("Index of /david mccoy/protocol droid/human-cyborg relations");
    };

  }, function(event) {
    event.stopPropagation();

    if (width >= 920) {

      $(this).attr("style", "width: 650px").text("Index of /david mccoy/full-stack web developer");
  
    } else {
      $(this).attr("style", "width: 100%").text("Index of /david mccoy/full-stack web developer");
    };

  });
  
});