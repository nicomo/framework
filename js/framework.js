$(function() {

  var menushown = false;

  $("nav>ul>li>ul>li>ul").css('max-height', 0);

  $('.scrollable').pager();

  $('<section>').load('0.html', function() {
    $('.wrap').append('<section id="chapter0">'+$(this).html()+'</section>');
  });

  var isLoading = false;
  $('nav>ul>li>ul>li').click(function() {
    if (isLoading) { // if is already loading -> do nothing
      return true;
    }
    if (menushown) {
      $('.row-fluid').css("-webkit-transition-duration", "0.25s");
      $('.row-fluid').css("-webkit-transform", "translate3d(-256px,0px,0px)");
      $('#burger').css("-webkit-transition-duration", "0.25s");
      $('#burger').css("-webkit-transform", "translate3d(10px,10px,0px)");
      menushown = false;
    }
    var next = parseInt($(this).index())+1;
    var cursec = $('section');
    cursec.transition({opacity: 0}, 500, function() {
      $(this).remove();
      $('<section>').load(next+'.html', function() {
        var html = $(this).html();
        $('.wrap').append('<section id="chapter'+next+'">'+html+'</section>');
        $('section').css('opacity', 0);
        $('.pop').append('&nbsp;<i class="icon-eye-open"></i>');

        var poped = false;
        $('.pop').click(function() {
          if (! poped) {
            poped = true;
            $('body').append('<div class="overlay"></div>');
            $('.overlay').append($(this).attr('data-content'));
            $('.overlay').on({'touchstart' : function(){
              $(this).remove();
              poped = false;
            }});
          }
        });

        $(".slideshow").slideshow();
        $('.scrollable').scrollTop(0);
        $('section').transition({opacity: 1}, 500, function() {
          isLoading = false;
          $("nav>ul>li>ul>li>ul").css('max-height', 0);
          $("nav a").removeClass('active');
          $("nav>ul>li>ul>li:nth-child("+next+")>a").addClass('active');
          $("nav>ul>li>ul>li:nth-child("+next+")>ul").css('max-height', 300);
        });
      });
    });
  });

  $('#burger').click(function() {
    if (menushown) {
      $('.row-fluid').css("-webkit-transition-duration", "0.25s");
      $('.row-fluid').css("-webkit-transform", "translate3d(-256px,0px,0px)");
      $('#burger').css("-webkit-transition-duration", "0.25s");
      $('#burger').css("-webkit-transform", "translate3d(10px,10px,0px)");
      menushown = false;
    } else {
      $('.row-fluid').css("-webkit-transition-duration", "0.25s");
      $('.row-fluid').css("-webkit-transform", "translate3d(0px,0px,0px)");
      $('#burger').css("-webkit-transition-duration", "0.25s");
      $('#burger').css("-webkit-transform", "translate3d(266px,10px,0px)");
      menushown = true;
    }
  });

  $(window).bind('orientationchange', function(e) {
    if (window.orientation == 90 || window.orientation == -90) { // horizontal
      //if (menushown) {
      $('.row-fluid').css("-webkit-transform", "translate3d(0px,0px,0px)");
      $('#burger').css("-webkit-transform", "translate3d(266px,10px,0px)");
      //}
      menushown = false;
    } else { // vertical
      //if (menushown) {
      $('.row-fluid').css("-webkit-transform", "translate3d(-256px,0px,0px)");
      $('#burger').css("-webkit-transform", "translate3d(10px,10px,0px)");
      //}
      menushown = false;
    }
  });

});