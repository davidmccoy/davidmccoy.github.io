// Preload images to allow for smoother animations
$(document).ready(function() {
  var imageUrls = [
    'assets/headshot.jpg',
    'assets/fund-that-flip-logo.jpg',
    'assets/hipsters-logo.png',
    'assets/thousand-leagues-logo.jpg',
    'assets/mtgcast-logo.png',
    'assets/mira-logo.jpg',
    'assets/basira-logo.jpg',
    'assets/curate-logo.jpg',
    'assets/tdl-logo.jpg',
    'assets/casthaven-logo.jpg',
    'assets/sportswire-logo.jpg',
    'assets/alameda-logo.png',
    'assets/screentexture-logo.png',
    'assets/rallyflix-logo.jpg',
    'assets/jirafe-logo.jpg'
  ]

  preload_images = function(images, callback) {
    var images_count = images.length;
    var loaded_count = 0;
    $.each(images, function(index, src) {
        var image = $('<img src="' + src + '">');
        image.load(function() {
            loaded_count++;
            if (loaded_count == images_count && callback) {
                callback();
            }
        });
    });
  }

  preload_images(imageUrls);
})
