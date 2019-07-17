// animate and control the portfolio section
$(document).ready(function() {
  var columns,
      animateInfo,
      colspan;

  // set initial value of columns based on window width to dynamically size tds
  if (width >= 1080) {
    columns = 3;
    colspan = 4;
  } else if (width >= 920) {
    columns = 3;
    colspan = 6;
    $('#portfolio-wrapper').attr('colspan', colspan);
  } else if (width >= 580) {
    columns = 2;
    colspan = 6;
    $('#portfolio-wrapper').attr('colspan', colspan);
  } else {
    columns = 1;
    colspan = 4;
  }


  // show and hide information about the clicked portfolio project
  $('.project_container').click(function(e){

    e.stopPropagation();

    // get all projects
    var projects = $('.project_container');

    // find the index of clicked project (and normalize)
    var index = Array.prototype.indexOf.call(projects, this) + 1;

    // remove other active classes
    if ($('div.active')) {

      if ($(this).hasClass('active')) {
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
      }

      $('div.active').removeClass('active');
    }

    // set clicked project to active
    $(this).addClass('active');

    // clear previous project's info
    if ($('.project_info_display') && !!animateInfo) {
      $('.project_info_display').children().slideUp('fast')
      $('.project_info_display').slideUp('fast', function(){
        $(this).remove();
      });
    } else {
      $('.project_info_display').remove();
    }

    // determine where the new bio div should be inserted
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
    }

  });

  // displays the info for a selected project
  var addInfo = function(selectedProject, lastProjectInTheRow) {
    // get info
    var oldInfo   = $(selectedProject).children()[1],
        newInfo   = $('<div class="project_info_display">')
                    .html($(oldInfo).html())
                    .attr('style', 'display: none'),
        closeInfo = $('<img class="close_bio_display"' +
                      'src="assets/close.png" ' +
                      'style="position:absolute;width:18px;' +
                      'height:18px;top:10px;right:10px;z-index:1;">')
                      .appendTo($(newInfo));

    // create click event to close info
    $(closeInfo).click(function(e) {
      $('.project_info_display').slideUp('fast', function(){
        $(this).remove();
      });
      $('div.active').removeClass('active');
    });

    // apend new info
    $(lastProjectInTheRow).after(newInfo);

    // only slide down if it's in a new row
    if (animateInfo) {
      $(newInfo).slideDown('fast');
    } else {
      $(newInfo).show();
    }
  }

  // reposition elements on resize
  $(window).resize(function(event){

    // reset initial value of columns based on window width
    // IE8 also doesn't have window.innerWidth
    width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;

    // reset the number of columns and adjust the location of the display bio
    if (width >= 1080) {
      columns = 3;
      colspan = 4;
      adjustInfoDisplay();
    } else if (width >= 920 && (columns == 1 || columns == 2)) {
      columns = 3;
      colspan = 6;
      adjustInfoDisplay();
    } else if (width >= 920) {

      columns = 3;
      colspan = 6;
      adjustInfoDisplay();
    } else if (width >= 580 && (columns == 1 || columns == 3)){

      columns = 2;
      colspan = 6;
      adjustInfoDisplay();

    } else if (width >= 580) {

      columns = 2;
      colspan = 6;

    } else if (width < 580 && (columns == 2 || columns == 3)) {
      columns = 1;
      colspan = 4;
      adjustInfoDisplay();
    } else {
      columns = 1;
      colspan = 4;
    }

  });


  // changes the position of the profile_bio_display div based on recalculating
  // the end of the rows and repositioning the div accordingly
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

    $('#portfolio-wrapper').attr('colspan', colspan);
  }
})
