(function( $ ){

	$.fn.pager = function( options ) {

		var htmltop = '<div class="ptr top">' +
					'<div class="chapternumber"></div>' +
					'<div class="chaptername"></div>' +
				'</div>';

		var htmlbottom = '<div class="ptr bottom">' +
					'<div class="chapternumber"></div>' +
					'<div class="chaptername"></div>' +
				'</div>';

		return this.each(function() {

			var e = $(this);
			$('body').prepend(htmltop);
			$('body').append(htmlbottom);

			$('.ptr.top').click(function() {
				if ($('.ptr.top').css('opacity') == 1) {
					$(this).css({'opacity': 0, '-webkit-transform': 'translate3d(0px,0px,0px)'});
					var cursec = $('section');
					var i = parseInt($('section').attr('id').substr(7));
					var next = i-1;
					cursec.transition({opacity: 0}, 1000, function() {
						$(this).remove();
						$('<section>').load(next+'.html', function() {
							var html = $(this).html();
							$('.wrap').append('<section id="chapter'+next+'">'+html+'</section>');
							$('section').css('opacity', 0);
							popify();
							pinify();
							$(".slideshow").slideshow();
							e.scrollTop($('.wrap').outerHeight() - $(document).outerHeight());
							updatePtr(next);
							$('section').transition({opacity: 1}, 1000, function() {
								updateMenu(next);
							});
						});
					});
				}
			});

			$('.ptr.bottom').click(function() {
				if ($('.ptr.bottom').css('opacity') == 1) {
					$(this).css({'opacity': 0, '-webkit-transform': 'translate3d(0px,0px,0px)'});
					var cursec = $('section');
					var i = parseInt($('section').attr('id').substr(7));
					var next = i+1;
					cursec.transition({opacity: 0}, 1000, function() {
						$(this).remove();
						$('<section>').load(next+'.html', function() {
							var html = $(this).html();
							$('.wrap').append('<section id="chapter'+next+'">'+html+'</section>');
							$('section').css('opacity', 0);
							popify();
							pinify();
							$(".slideshow").slideshow();
							e.scrollTop(0);
							updatePtr(next);
							$('section').transition({opacity: 1}, 1000, function() {
								updateMenu(next);
							});
						});
					});
				}
			});

			$('.wrap').on('touchstart touchmove touchend', function (ev) {

				var top = e.scrollTop();

				if (top <= 0 && menushown == false) {
					$('.ptr.top').css({'opacity': 1, '-webkit-transform': 'translate3d(0px,0px,0px)'});
				} else {
					$('.ptr.top').css({'opacity': 0, '-webkit-transform': 'translate3d(0px,0px,0px)'});
				}

				var vph = $(document).height(); // compute viewport height
				var wh = $('.wrap').height(); // compute wraper height

				if (top >= 0 + wh - vph && menushown == false) {
					$('.ptr.bottom').css({'opacity': 1, '-webkit-transform': 'translate3d(0px,0px,0px)'});
				} else {
					$('.ptr.bottom').css({'opacity': 0, '-webkit-transform': 'translate3d(0px,0px,0px)'});
				}

			});

		});

	};
})( jQuery );
