(function( $ ) {

  $.fn.slideshow = function() {

    return this.each(function() {

      var slideshow = $(this);
      var wrap = slideshow.find('.slideshow-wrap');
      var currentImg = 0;
      var maxImages = wrap.find('figure').size();
      var IMG_WIDTH = wrap.find('figure').first().outerWidth(true);
      var speed = 600;

      slideshow.css('height', getMaxHeight(wrap.find('figcaption')) + 365 + 80);
      wrap.css('width', maxImages * IMG_WIDTH);

      wrap.swipe( {
        triggerOnTouchEnd : true,
        swipeStatus : swipeStatus,
        allowPageScroll : "vertical",
        threshold : 300,
      });

      function getMaxHeight(elements) {
        var h = -1;
        elements.each(function() {
          h = h > $(this).height() ? h : $(this).height();
        });
        return h;
      }

      function swipeStatus(event, phase, direction, distance, fingers) {
        if( phase=="move" && (direction=="left" || direction=="right") ) {
          var duration=0;
          if (direction == "left")
            scrollImages((IMG_WIDTH * currentImg) + distance, duration);
          else if (direction == "right")
            scrollImages((IMG_WIDTH * currentImg) - distance, duration);
        } else if ( phase == "cancel") {
          scrollImages(IMG_WIDTH * currentImg, speed);
        } else if ( phase =="end" ) {
          if (direction == "right")
            previousImage()
          else if (direction == "left")
            nextImage()
        }
      }

      function previousImage() {
        currentImg = Math.max(currentImg-1, 0);
        scrollImages( IMG_WIDTH * currentImg, speed);
      }

      function nextImage() {
        currentImg = Math.min(currentImg+1, maxImages-1);
        scrollImages( IMG_WIDTH * currentImg, speed);
      }

      function scrollImages(distance, duration) {
        wrap.css("-webkit-transition-duration", (duration/1000).toFixed(1) + "s");
        var value = (distance<0 ? "" : "-") + Math.abs(distance).toString();
        wrap.css("-webkit-transform", "translate3d("+value +"px,0px,0px)");
      }

    });

  };

}( jQuery ));