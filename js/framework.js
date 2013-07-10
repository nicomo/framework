var menushown = false;
var isLoading = false;

function updateMenu(next) {
  $("nav>ul>li>ul>li>ul").css('max-height', 0);
  $("nav a").removeClass('active');
  $("nav>ul>li>ul>li:nth-child("+next+")>a").addClass('active');
  $("nav>ul>li>ul>li:nth-child("+next+")>ul").css('max-height', 300);
}

function showMenu() {
  $('.row-fluid').css("-webkit-transition-duration", "0.25s");
  $('.row-fluid').css("-webkit-transform", "translate3d(0px,0px,0px)");
  $('#burger').css("-webkit-transition-duration", "0.25s");
  $('#burger').css("-webkit-transform", "translate3d(266px,10px,0px)");
}

function hideMenu() {
  $('.row-fluid').css("-webkit-transition-duration", "0.25s");
  $('.row-fluid').css("-webkit-transform", "translate3d(-256px,0px,0px)");
  $('#burger').css("-webkit-transition-duration", "0.25s");
  $('#burger').css("-webkit-transform", "translate3d(10px,10px,0px)");
}

function popify() {
  $('.pop').append('&nbsp;<i class="icon-eye-open"></i>');
  var poped = false;
  $('.pop').click(function() {
    if (! poped) {
    poped = true;
    $('body').append('<div class="overlay"></div>');
    $('.overlay').append($(this).attr('data-content'));
    $('.overlay>*').append('<button class="close"></button>');
    $('.overlay>*').css('margin-left', - $('.overlay>*').outerWidth()/2);
    $('.overlay>*').css('margin-top', - $('.overlay>*').outerHeight()/2);
    $('.overlay').on({'touchstart' : function(){
      $(this).remove();
      poped = false;
    }});
    }
  });
}

function pinify() {
  var clientID = "1432309";
  var baseURL = "http://pinterest.citronours.s3-website-us-east-1.amazonaws.com/";
  var sourceURL = "http://www.citronours.fr";
  var defaultText = "J'ai trouvé cette image dans un livre de citronours.fr"
  window.pinterest.initPin(clientID);
  window.pinterest.canPin(function(result) {
    if (result) {
      $('figure.pinterest').append('<button class="pinterest"></div>');
      $('button.pinterest').click(function() {
        var imageURL = $(this).parent().find('img').attr('src').replace('assets/img/', baseURL);
        var descriptionText = $(this).parent().find('figcaption').html() || defaultText;
        window.pinterest.composePin(imageURL, sourceURL, descriptionText);
      });
    }
  });
}

function loadpage(i) {
  if (isLoading) { // if is already loading -> do nothing
    return true;
  }
  if (menushown) {
    hideMenu();
    menushown = false;
  }
  $('.ptr').css('opacity', 0);
  var cursec = $('section');
  cursec.transition({opacity: 0}, 500, function() {
    $(this).remove();
    $('<section>').load(i+'.html', function() {
      var html = $(this).html();
      $('.wrap').append('<section id="chapter'+i+'">'+html+'</section>');
      $('section').css('opacity', 0);
      popify();
      pinify();
      $(".slideshow").slideshow();
      $('.scrollable').scrollTop(0);
      updatePtr(i);
      $('section').transition({opacity: 1}, 500, function() {
        isLoading = false;
        updateMenu(i);
      });
    });
  });
}

function updatePtr(i) {
  if (i == 0) { $('.ptr.top').hide(); } else { $('.ptr.top').show(); }
  if (i == $('nav>ul>li>ul>li').size()) { $('.ptr.bottom').hide(); } else { $('.ptr.bottom').show(); }
  $('.ptr.bottom>.chapternumber').html('Suivant: Chapitre ' + (i+1));
  $('.ptr.bottom>.chaptername').html($('nav>ul>li>ul>li:nth-child('+(i+1)+')>a').html());
  $('.ptr.top>.chapternumber').html('Précédant: Chapitre ' + (i-1));
  $('.ptr.top>.chaptername').html($('nav>ul>li>ul>li:nth-child('+(i-1)+')>a').html());
  if (i == 1) {
    $('.ptr.top>.chapternumber').html('Précédant: Couverture');
    $('.ptr.top>.chaptername').html($('nav>ul>li>a').html());
  }
}

$(function() {

  $("nav>ul>li>ul>li>ul").css('max-height', 0);

  $('.scrollable').pager();

  $('<section>').load('0.html', function() {
    $('.wrap').append('<section id="chapter0">'+$(this).html()+'</section>');
    updatePtr(0);
    $('.ptr').css('opacity', 1);
  });

  $('nav>ul>li>a').click(function() {
    loadpage(0);
  });

  $('nav>ul>li>ul>li').click(function() {
    var next = parseInt($(this).index())+1;
    loadpage(next);
  });

  $('#burger').click(function() {
    $('.ptr').css('opacity', 0);
    if (menushown) {
      hideMenu();
      menushown = false;
    } else {
      showMenu();
      menushown = true;
    }
  });

  $(window).bind('orientationchange', function(e) {
    $('.ptr').css('opacity', 0);
    if (window.orientation == 90 || window.orientation == -90) { // horizontal
      $('.row-fluid').css("-webkit-transform", "translate3d(0px,0px,0px)");
      $('#burger').css("-webkit-transform", "translate3d(266px,10px,0px)");
      menushown = false;
    } else { // vertical
      $('.row-fluid').css("-webkit-transform", "translate3d(-256px,0px,0px)");
      $('#burger').css("-webkit-transform", "translate3d(10px,10px,0px)");
      menushown = false;
    }
  });

});