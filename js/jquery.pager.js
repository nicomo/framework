(function( $ ){

	$.fn.pager = function( options ) {

		var isTouch = !!('ontouchstart' in window);

		var htmltop = '<div class="ptr top">' +
					'<div class="chapternumber"></div>' +
					'<div class="chaptername"></div>' +
				'</div>';

		var htmlbottom = '<div class="ptr bottom">' +
					'<div class="chapternumber"></div>' +
					'<div class="chaptername"></div>' +
				'</div>';

		return this.each(function() {
			if (!isTouch) {
				return;
			}

			var e = $(this);
			$('.wrap').prepend(htmltop);
			$('.wrap').append(htmlbottom);

			var isActivated = false;
			var isLoading = false;

			var isActivated2 = false;
			var isLoading2 = false;

			$('.wrap').on('touchmove', function (ev) {

				var top = e.scrollTop();

				if (isLoading) { // if is already loading -> do nothing
					return true;
				}

				if (-top >= 0) { // release state
					isActivated = true;
				} else if (top > -0) { // pull state
					isActivated = false;
				}

				if (top > 0) {
					$('.ptr.top').css({'opacity': 0, '-webkit-transform': 'translate3d(0px,0px,0px)'});
				}

				if (isLoading2) { // if is already loading -> do nothing
					return true;
				}

				// compute viewport height
				var vph = $(document).height();
				// compute wraper height
				var wh = $('.wrap').height();

				if (top >= 0 + wh - vph) { // release state
					isActivated2 = true;
				} else if (top < 0 + wh - vph) { // pull state
					isActivated2 = false;
				}

				if (top < 0 + wh - vph) {
					$('.ptr.bottom').css({'opacity': 0, '-webkit-transform': 'translate3d(0px,0px,0px)'});
				}

			}).on('touchend', function(ev) {

				if (isActivated) { // loading state

					$('.ptr.top').css({'opacity': 1, '-webkit-transform': 'translate3d(0px,0px,0px)'});

					$('.ptr.top').click(function() {
						isActivated = false;
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
								e.scrollTop($('.wrap').height() - $(document).height());
								updatePtr(next);
								$('section').transition({opacity: 1}, 1000, function() {
									updateMenu(next);
								});
							});
						});
					});

				}

				if (isActivated2) { // loading state

					$('.ptr.bottom').css({'opacity': 1, '-webkit-transform': 'translate3d(0px,0px,0px)'});

					$('.ptr.bottom').click(function() {
						isActivated2 = false;
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
					});

				}

			});

		});

	};
})( jQuery );
