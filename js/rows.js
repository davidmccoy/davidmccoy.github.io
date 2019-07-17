// click event handlers for the category table rows and render
// animations on the child divs since table rows can't animate
$(document).ready(function() {
  $('.category').click(function(e) {
    e.preventDefault();
    e.stopPropagation();

    var row       = $(this),
        rowName   = $(this).attr('id')
        childRow  = $('tr.' + rowName),
        childDivs = $('tr.' + rowName + ' div.td-inner-container');

    // control the order in which elements are animated--outer element first
    // when opening, inner element first when closing
    if ($(row).is($('.active'))) {
      childDivs.slideToggle('fast', function() {
        childRow.toggle();
      });
    } else {
      childRow.toggle();
      childDivs.slideToggle('fast');
    }

    row.toggleClass('active');
  });
})
