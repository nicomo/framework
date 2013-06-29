(function( $ ){

	$.fn.pager = function( options ) {

		var isTouch = !!('ontouchstart' in window);

		var htmltop = '<div class="ptr top">' +
				'<div class="message">' +
					'<i class="arrow"></i>' +
					'<i class="spinner"></i>' +
				  '</div>' +
				'</div>';

		var htmlbottom = '<div class="ptr bottom">' +
				'<div class="message">' +
					'<i class="arrow"></i>' +
					'<i class="spinner"></i>' +
				  '</div>' +
				'</div>';

		return this.each(function() {
			if (!isTouch) {
				return;
			}

			var e = $(this);
			e.prepend(htmltop);
			e.append(htmlbottom);

			var arrowDelay = 120 / 3 * 2;

			var arrow = $('.ptr.top .arrow');
			var spinner = $('.ptr.top .spinner');
			var isActivated = false;
			var isLoading = false;

			var arrow2 = $('.ptr.bottom .arrow');
			var spinner2 = $('.ptr.bottom .spinner');
			var isActivated2 = false;
			var isLoading2 = false;

			$('.wrap').on('touchstart', function (ev) {
				if (e.scrollTop() === 0) { // fix scrolling
					e.scrollTop(1);
				}
			}).on('touchmove', function (ev) {

				var top = e.scrollTop();
				var deg = 180 - (-top > 120 ? 180 : // degrees to move for the arrow (starts at 180° and decreases)
						  (top < -arrowDelay ? Math.round(180 / (120 - arrowDelay) * (-top - arrowDelay)) 
						  : 0));

				if (isLoading) { // if is already loading -> do nothing
					return true;
				}

				arrow.show();
				arrow.css('transform', 'rotate('+ deg + 'deg)'); // move arrow

				spinner.hide();

				if (-top > 120) { // release state
					isActivated = true;
				} else if (top > -120) { // pull state
					isActivated = false;
				}

				if (isLoading2) { // if is already loading -> do nothing
					return true;
				}

				// compute viewport height
				var vph = $(document).height() - 20;
				// compute wraper height
				var wh = $('.wrap').height();

				var deg = 180 - (top > 120 + wh - vph ? 0 : // degrees to move for the arrow (starts at 180° and decreases)
						  (top - wh + vph > arrowDelay ? Math.round(180 / (120 - arrowDelay) * (top - wh + vph - arrowDelay)) + 180
						  : 180));

				arrow2.show();
				arrow2.css('transform', 'rotate('+ deg + 'deg)'); // move arrow

				spinner2.hide();

				if (top > 120 + wh - vph) { // release state
					isActivated2 = true;
				} else if (top < 120 + wh - vph) { // pull state
					isActivated2 = false;
				}

			}).on('touchend', function(ev) {

				function updateMenu() {
					$("nav>ul>li>ul>li>ul").css('max-height', 0);
					$("nav a").removeClass('active');
					$("nav>ul>li>ul>li:nth-child("+next+")>a").addClass('active');
					$("nav>ul>li>ul>li:nth-child("+next+")>ul").css('max-height', 300);
				}

				if (isActivated) { // loading state

					var cursec = $('section');
					var i = parseInt($('section').attr('id').substr(7));
					var next = i-1;

					if (next >= 0) {

						isLoading = true;
						isActivated = false;
						arrow.hide();
						spinner.show();

						$('.ptr.top').css('position', 'static');

						cursec.transition({opacity: 0}, 1000, function() {
							$(this).remove();
							$('<section>').load(next+'.html', function() {
								var html = $(this).html();
								$('.ptr.top').css({
									position: 'absolute',
									height: 80
								});
								$('.wrap').append('<section id="chapter'+next+'">'+html+'</section>');
								$('section').css('opacity', 0);
								$('.pop').append('&nbsp;<i class="icon-eye-open"></i>');

								var poped = false;
								$('.pop').click(function() {
									if (! poped) {
									poped = true;
									$('body').append('<div class="overlay"></div>');
									$('.overlay').append($(this).attr('data-content'));
									$('.overlay>*').append('<button class="close"></button>');
									$('.overlay').on({'touchstart' : function(){
										$(this).remove();
										poped = false;
									}});
									}
								});

								$(".slideshow").slideshow();
								e.scrollTop($('.wrap').outerHeight() - $(document).height());
								$('section').transition({opacity: 1}, 1000, function() {
									isLoading = false;
									updateMenu();
								});
							});
						});
					}

				}

				if (isActivated2) { // loading state

					var cursec = $('section');
					var i = parseInt($('section').attr('id').substr(7));
					var next = i+1;

					if (next <= $('nav>ul>li>ul>li').size()) {

						isLoading2 = true;
						isActivated2 = false;
						arrow2.hide();
						spinner2.show();

						cursec.transition({opacity: 0}, 1000, function() {
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
									$('.overlay>*').append('<button class="close"></button>');
									$('.overlay').on({'touchstart' : function(){
										$(this).remove();
										poped = false;
									}});
									}
								});

								$(".slideshow").slideshow();
								e.scrollTop(0);
								$('section').transition({opacity: 1}, 1000, function() {
									isLoading2 = false;
									updateMenu();
								});
							});
						});
					}

				}

			});

		});

	};
})( jQuery );
